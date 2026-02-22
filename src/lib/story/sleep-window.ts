/**
 * Determines if a given timestamp falls within the user's sleep window.
 * Sleep window = bedtime - 30min to waketime + 30min
 */
export function isInSleepWindow(
  timestamp: Date,
  bedtime: string,
  waketime: string,
  timezone: string
): boolean {
  const nowInTz = new Date(timestamp.toLocaleString('en-US', { timeZone: timezone }));
  const nowMinutes = nowInTz.getHours() * 60 + nowInTz.getMinutes();

  const [bedH, bedM] = bedtime.split(':').map(Number);
  const [wakeH, wakeM] = waketime.split(':').map(Number);

  const bedMinutes = bedH * 60 + bedM - 30; // 30 min before bedtime
  const wakeMinutes = wakeH * 60 + wakeM + 30; // 30 min after waketime

  // Handle overnight sleep windows (e.g., 22:30 to 07:30)
  if (bedMinutes > wakeMinutes) {
    // Overnight: in window if past bedtime OR before waketime
    return nowMinutes >= bedMinutes || nowMinutes <= wakeMinutes;
  }

  // Same-day window (unlikely but handle it)
  return nowMinutes >= bedMinutes && nowMinutes <= wakeMinutes;
}

/**
 * Checks if a timestamp is in the early morning window (5:00-6:30)
 */
export function isEarlyMorning(timestamp: Date, timezone: string): boolean {
  const inTz = new Date(timestamp.toLocaleString('en-US', { timeZone: timezone }));
  const hours = inTz.getHours();
  const minutes = inTz.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes >= 300 && totalMinutes <= 390; // 5:00 to 6:30
}
