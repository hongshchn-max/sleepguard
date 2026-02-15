import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const webpush = (await import('web-push')).default;
  webpush.setVapidDetails(process.env.VAPID_EMAIL!, process.env.VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!);
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { data: profiles } = await supabase.from('user_profiles').select('id, target_bedtime, timezone').eq('push_enabled', true);
  if (!profiles) return NextResponse.json({ sent: 0 });

  let sent = 0;
  const now = new Date();

  for (const profile of profiles) {
    const nowInTz = new Date(now.toLocaleString('en-US', { timeZone: profile.timezone }));
    const [targetH, targetM] = profile.target_bedtime.split(':').map(Number);
    const diff = (nowInTz.getHours() * 60 + nowInTz.getMinutes()) - (targetH * 60 + targetM);

    let message = '';
    if (diff >= -30 && diff < -25) message = '30 minutes until bedtime! Start winding down.';
    else if (diff >= 0 && diff < 5) message = "It's bedtime! Time to put the phone down.";
    else if (diff >= 15 && diff < 20) message = "You're past bedtime! Talk to Luna if you need help sleeping.";
    else continue;

    const { data: subs } = await supabase.from('push_subscriptions').select('*').eq('user_id', profile.id);
    for (const sub of subs || []) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.keys_p256dh, auth: sub.keys_auth } },
          JSON.stringify({ title: 'SleepGuard', body: message })
        );
        sent++;
      } catch { await supabase.from('push_subscriptions').delete().eq('id', sub.id); }
    }
  }

  return NextResponse.json({ sent });
}
