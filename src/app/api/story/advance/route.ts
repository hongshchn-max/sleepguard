import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { checkAndAdvancePhase } from '@/lib/story/phase-engine';
import type { StoryPhase } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { trigger } = await req.json();

    const { data: profile } = await supabase.from('user_profiles').select('timezone').eq('id', user.id).single();
    if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

    const { data: progress } = await supabase.from('story_progress')
      .select('*').eq('user_id', user.id).eq('chapter', 1).single();
    if (!progress) return NextResponse.json({ error: 'No story progress' }, { status: 404 });

    // Handle client-triggered state updates
    if (trigger === 'luna_slip_seen' && progress.phase === 1) {
      const phaseState = { ...(progress.phase_state as Record<string, unknown>), luna_slip_seen: true };
      await supabase.from('story_progress').update({
        phase_state: phaseState,
        updated_at: new Date().toISOString(),
      }).eq('id', progress.id);
      progress.phase_state = phaseState;
    }

    if (trigger === 'exploration_complete' && progress.phase === 3) {
      const phaseState = { ...(progress.phase_state as Record<string, unknown>), exploration_complete: true };
      await supabase.from('story_progress').update({
        phase_state: phaseState,
        updated_at: new Date().toISOString(),
      }).eq('id', progress.id);
      progress.phase_state = phaseState;
    }

    // Check for phase advance
    const result = checkAndAdvancePhase(
      {
        phase: progress.phase as StoryPhase,
        screenOffAccumulated: progress.screen_off_accumulated,
        phaseState: (progress.phase_state || {}) as Record<string, unknown>,
      },
      { timezone: profile.timezone }
    );

    if (result.advanced) {
      await supabase.from('story_progress').update({
        phase: result.newPhase,
        phase_advanced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...(result.newPhase === 5 ? { chapter_completed_at: new Date().toISOString() } : {}),
      }).eq('id', progress.id);

      await supabase.from('story_events').insert({
        user_id: user.id,
        chapter: 1,
        from_phase: progress.phase,
        to_phase: result.newPhase,
        trigger_reason: result.triggerReason,
      });

      // Award Somnium Sigil on chapter complete
      if (result.newPhase === 5) {
        await supabase.from('user_achievements').upsert({
          user_id: user.id,
          achievement_key: 'somniumSigil',
        }, { onConflict: 'user_id,achievement_key' });
      }

      return NextResponse.json({
        advanced: true,
        newPhase: result.newPhase,
        triggerReason: result.triggerReason,
      });
    }

    return NextResponse.json({ advanced: false, phase: progress.phase });
  } catch (error) {
    console.error('Story advance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
