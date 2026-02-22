import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { buildSystemPrompt, buildStoryAwarePrompt } from '@/lib/ai/prompts';
import { getSessionDate } from '@/lib/utils';
import { FREE_MESSAGES_PER_NIGHT } from '@/lib/types';
import type { CoachPersonality } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { message } = await req.json();
    const { data: profile } = await supabase.from('user_profiles').select('*').eq('id', user.id).single();
    if (!profile) return Response.json({ error: 'Profile not found' }, { status: 404 });

    const sessionDate = getSessionDate(profile.timezone);
    const { count } = await supabase.from('chat_messages').select('*', { count: 'exact', head: true })
      .eq('user_id', user.id).eq('session_date', sessionDate).eq('role', 'user');

    const messageCount = count || 0;
    if (!profile.is_premium && messageCount >= FREE_MESSAGES_PER_NIGHT) {
      return Response.json({ error: 'limit_reached' }, { status: 429 });
    }

    await supabase.from('chat_messages').insert({
      user_id: user.id, session_date: sessionDate, role: 'user', content: message, personality: profile.coach_personality,
    });

    const { data: history } = await supabase.from('chat_messages').select('role, content')
      .eq('user_id', user.id).eq('session_date', sessionDate).order('created_at', { ascending: true }).limit(20);

    const [targetH, targetM] = profile.target_bedtime.split(':').map(Number);
    const now = new Date();
    const nowInTz = new Date(now.toLocaleString('en-US', { timeZone: profile.timezone }));
    const targetToday = new Date(nowInTz);
    targetToday.setHours(targetH, targetM, 0, 0);
    const minutesPastBedtime = Math.floor((nowInTz.getTime() - targetToday.getTime()) / 60000);

    const basePrompt = buildSystemPrompt({
      personality: profile.coach_personality as CoachPersonality,
      targetBedtime: profile.target_bedtime,
      minutesPastBedtime, currentStreak: profile.current_streak,
      locale: profile.locale, messageCount: messageCount + 1,
    });

    // Read story progress for phase-aware prompt
    const { data: storyProgress } = await supabase.from('story_progress')
      .select('phase').eq('user_id', user.id).eq('chapter', 1).single();
    const storyPhase = storyProgress?.phase ?? 0;

    const systemPrompt = buildStoryAwarePrompt(basePrompt, storyPhase);

    const messages = (history || []).map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

    const stream = await anthropic.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: systemPrompt,
      messages,
    });

    let fullResponse = '';
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            fullResponse += event.delta.text;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
          }
        }
        await supabase.from('chat_messages').insert({
          user_id: user.id, session_date: sessionDate, role: 'assistant', content: fullResponse, personality: profile.coach_personality,
        });
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
