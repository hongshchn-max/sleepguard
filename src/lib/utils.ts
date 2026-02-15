export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export function getSessionDate(timezone: string): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(now);
  const year = parts.find(p => p.type === 'year')!.value;
  const month = parts.find(p => p.type === 'month')!.value;
  const day = parts.find(p => p.type === 'day')!.value;

  const hours = Number(
    new Intl.DateTimeFormat('en', { timeZone: timezone, hour: 'numeric', hour12: false }).format(now)
  );

  // If before 4 AM, it's still "yesterday's" session
  if (hours < 4) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yParts = formatter.formatToParts(yesterday);
    return `${yParts.find(p => p.type === 'year')!.value}-${yParts.find(p => p.type === 'month')!.value}-${yParts.find(p => p.type === 'day')!.value}`;
  }

  return `${year}-${month}-${day}`;
}

export function getCountdown(targetBedtime: string, timezone: string): {
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  totalSeconds: number;
} {
  const now = new Date();
  const [targetH, targetM] = targetBedtime.split(':').map(Number);

  const nowInTz = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const target = new Date(nowInTz);
  target.setHours(targetH, targetM, 0, 0);

  const diff = (target.getTime() - nowInTz.getTime()) / 1000;
  const isPast = diff < 0;
  const absDiff = Math.abs(diff);

  return {
    hours: Math.floor(absDiff / 3600),
    minutes: Math.floor((absDiff % 3600) / 60),
    seconds: Math.floor(absDiff % 60),
    isPast,
    totalSeconds: diff,
  };
}
