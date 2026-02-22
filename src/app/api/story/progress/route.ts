import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { checkAndAdvancePhase } from '@/lib/story/phase-engine';
import type { StoryPhase } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase.from('user_profiles').select('timezone').eq('id', user.id).single();
    if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

    // Get or create story progress
    let { data: progress } = await supabase.from('story_progress')
      .select('*').eq('user_id', user.id).eq('chapter', 1).single();

    if (!progress) {
      const { data: newProgress } = await supabase.from('story_progress')
        .insert({ user_id: user.id, chapter: 1 })
        .select().single();
      progress = newProgress;
    }

    if (!progress) return NextResponse.json({ error: 'Failed to create progress' }, { status: 500 });

    // Check for auto-advance (Phase 2→3 on early login, Phase 4→5 on next day)
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

      progress.phase = result.newPhase;
    }

    return NextResponse.json({
      chapter: progress.chapter,
      phase: progress.phase,
      screenOffAccumulated: progress.screen_off_accumulated,
      phaseState: progress.phase_state,
      chapterCompleted: progress.chapter_completed_at !== null,
    });
  } catch (error) {
    console.error('Story progress error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
