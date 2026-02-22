import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { EXPLORATION_NODES } from '@/lib/story/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: progress } = await supabase.from('story_progress')
      .select('phase, phase_state').eq('user_id', user.id).eq('chapter', 1).single();

    if (!progress || progress.phase < 3) {
      return NextResponse.json({ error: 'Not in exploration phase' }, { status: 403 });
    }

    const phaseState = (progress.phase_state || {}) as Record<string, unknown>;
    const discovered = (phaseState.discovered_nodes || []) as string[];

    return NextResponse.json({
      nodes: EXPLORATION_NODES,
      discovered,
      allDiscovered: EXPLORATION_NODES.every(n => discovered.includes(n)),
    });
  } catch (error) {
    console.error('Exploration GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { node } = await req.json();
    if (!EXPLORATION_NODES.includes(node)) {
      return NextResponse.json({ error: 'Invalid node' }, { status: 400 });
    }

    const { data: progress } = await supabase.from('story_progress')
      .select('*').eq('user_id', user.id).eq('chapter', 1).single();

    if (!progress || progress.phase < 3) {
      return NextResponse.json({ error: 'Not in exploration phase' }, { status: 403 });
    }

    const phaseState = (progress.phase_state || {}) as Record<string, unknown>;
    const discovered = [...new Set([...(phaseState.discovered_nodes as string[] || []), node])];
    const allDiscovered = EXPLORATION_NODES.every(n => discovered.includes(n));

    const newPhaseState = {
      ...phaseState,
      discovered_nodes: discovered,
      ...(allDiscovered ? { exploration_complete: true } : {}),
    };

    await supabase.from('story_progress').update({
      phase_state: newPhaseState,
      updated_at: new Date().toISOString(),
    }).eq('id', progress.id);

    return NextResponse.json({
      discovered,
      allDiscovered,
    });
  } catch (error) {
    console.error('Exploration POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
