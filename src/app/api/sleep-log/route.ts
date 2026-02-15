import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getSessionDate } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const days = parseInt(new URL(req.url).searchParams.get('days') || '7');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data } = await supabase.from('sleep_logs').select('*').eq('user_id', user.id)
    .gte('session_date', startDate.toISOString().split('T')[0]).order('session_date', { ascending: false });

  return NextResponse.json({ logs: data || [] });
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { data: profile } = await supabase.from('user_profiles').select('timezone, target_bedtime').eq('id', user.id).single();
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const sessionDate = getSessionDate(profile.timezone);

  const { data, error } = await supabase.from('sleep_logs').upsert({
    user_id: user.id, session_date: sessionDate,
    target_bedtime: body.target_bedtime || `${sessionDate}T${profile.target_bedtime}:00`,
    actual_bedtime: body.actual_bedtime, actual_waketime: body.actual_waketime,
    achieved: body.achieved ?? false, duration_minutes: body.duration_minutes,
  }, { onConflict: 'user_id,session_date' }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ log: data });
}
