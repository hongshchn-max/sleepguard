import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isInSleepWindow } from '@/lib/story/sleep-window';
import { PHASE_THRESHOLDS } from '@/lib/story/constants';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { event, sessionId } = await req.json();
    if (!event || !sessionId) {
      return NextResponse.json({ error: 'Missing event or sessionId' }, { status: 400 });
    }

    const { data: profile } = await supabase.from('user_profiles')
      .select('timezone, target_bedtime, target_waketime').eq('id', user.id).single();
    if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

    const now = new Date();

    // Reject future timestamps
    if (now.getTime() > Date.now() + 60000) {
      return NextResponse.json({ error: 'Invalid timestamp' }, { status: 400 });
    }

    // Rate limiting: max events per hour
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    const { count } = await supabase.from('screen_off_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', oneHourAgo);

    if ((count || 0) >= PHASE_THRESHOLDS.MAX_EVENTS_PER_HOUR) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
    }

    const sessionDate = now.toISOString().split('T')[0];

    if (event === 'hidden') {
      // Start a new screen-off session
      const inSleepWindow = isInSleepWindow(now, profile.target_bedtime, profile.target_waketime, profile.timezone);

      await supabase.from('screen_off_sessions').insert({
        id: sessionId,
        user_id: user.id,
        session_date: sessionDate,
        started_at: now.toISOString(),
        is_sleep_window: inSleepWindow,
      });

      return NextResponse.json({ ok: true });
    }

    if (event === 'visible') {
      // Close existing screen-off session
      const { data: session } = await supabase.from('screen_off_sessions')
        .select('*').eq('id', sessionId).eq('user_id', user.id).single();

      if (!session || session.ended_at) {
        return NextResponse.json({ ok: true }); // Already closed or doesn't exist
      }

      const startedAt = new Date(session.started_at);
      let durationMinutes = Math.floor((now.getTime() - startedAt.getTime()) / 60000);

      // Cap at max hours
      const maxMinutes = PHASE_THRESHOLDS.MAX_SCREEN_OFF_SESSION_HOURS * 60;
      durationMinutes = Math.min(durationMinutes, maxMinutes);

      await supabase.from('screen_off_sessions').update({
        ended_at: now.toISOString(),
        duration_minutes: durationMinutes,
      }).eq('id', sessionId);

      // Accumulate if in sleep window and meets minimum
      if (session.is_sleep_window && durationMinutes >= PHASE_THRESHOLDS.MIN_SCREEN_OFF_SESSION_MINUTES) {
        const { data: progress } = await supabase.from('story_progress')
          .select('id, screen_off_accumulated').eq('user_id', user.id).eq('chapter', 1).single();

        if (progress) {
          await supabase.from('story_progress').update({
            screen_off_accumulated: progress.screen_off_accumulated + durationMinutes,
            updated_at: new Date().toISOString(),
          }).eq('id', progress.id);
        }
      }

      return NextResponse.json({ ok: true, durationMinutes });
    }

    return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
  } catch (error) {
    console.error('Screen off error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
