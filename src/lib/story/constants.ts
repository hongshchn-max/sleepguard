// Phase transition thresholds for Chapter 1
export const PHASE_THRESHOLDS = {
  SCREEN_OFF_MINUTES_FOR_PHASE_1: 300, // ~3 good nights
  MIN_SCREEN_OFF_SESSION_MINUTES: 10,
  MAX_SCREEN_OFF_SESSION_HOURS: 12,
  EARLY_LOGIN_START_HOUR: 5,
  EARLY_LOGIN_END_HOUR: 6,
  EARLY_LOGIN_END_MINUTE: 30,
  MAX_EVENTS_PER_HOUR: 20,
} as const;

// Exploration nodes for Phase 4
export const EXPLORATION_NODES = ['terminal', 'note', 'orb'] as const;
export type ExplorationNode = typeof EXPLORATION_NODES[number];

export const CHAPTER_1_PHASES = {
  NORMAL: 0,
  LUNA_SLIP: 1,
  ANOMALIES: 2,
  LUNA_ABSENT: 3,
  EXPLORATION: 4,
  DREAM_ENDING: 5,
} as const;
