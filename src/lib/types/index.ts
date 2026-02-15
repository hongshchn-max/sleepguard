import type { CoachPersonality } from './database';
export type { Database, CoachPersonality, Json } from './database';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  targetBedtime: string;
  targetWaketime: string;
  timezone: string;
  locale: string;
  coachPersonality: CoachPersonality;
  isPremium: boolean;
  currentStreak: number;
  longestStreak: number;
  totalNightsLogged: number;
  pushEnabled: boolean;
}

export interface SleepLog {
  id: string;
  sessionDate: string;
  targetBedtime: string;
  actualBedtime: string | null;
  actualWaketime: string | null;
  achieved: boolean;
  durationMinutes: number | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface Achievement {
  key: string;
  unlockedAt: string | null;
  isPremium: boolean;
}

export const ACHIEVEMENT_DEFINITIONS = [
  { key: 'firstNight', isPremium: false, condition: 'first_log' },
  { key: 'threeDayStreak', isPremium: false, condition: 'streak_3' },
  { key: 'sevenDayStreak', isPremium: false, condition: 'streak_7' },
  { key: 'thirtyDayStreak', isPremium: true, condition: 'streak_30' },
  { key: 'earlyBird', isPremium: true, condition: 'early_5' },
  { key: 'chatWithLuna', isPremium: false, condition: 'chats_10' },
  { key: 'perfectWeek', isPremium: true, condition: 'perfect_week' },
] as const;

export const FREE_MESSAGES_PER_NIGHT = 3;

export const COACH_PERSONALITIES = ['gentle', 'strict', 'humor', 'science'] as const;
export const FREE_PERSONALITIES: import('./database').CoachPersonality[] = ['gentle', 'strict'];
export const PREMIUM_PERSONALITIES: import('./database').CoachPersonality[] = ['humor', 'science'];
