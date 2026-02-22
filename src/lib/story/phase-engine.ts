import { PHASE_THRESHOLDS } from './constants';
import { isEarlyMorning } from './sleep-window';
import type { StoryPhase } from '@/lib/types';

interface StoryState {
  phase: StoryPhase;
  screenOffAccumulated: number;
  phaseState: Record<string, unknown>;
}

interface AdvanceResult {
  advanced: boolean;
  newPhase: StoryPhase;
  triggerReason: string;
}

/**
 * Server-authoritative phase transition logic.
 * Returns whether a phase advance should occur and the reason.
 */
export function checkAndAdvancePhase(
  state: StoryState,
  context: {
    timezone: string;
    currentTime?: Date;
  }
): AdvanceResult {
  const now = context.currentTime || new Date();
  const noAdvance: AdvanceResult = { advanced: false, newPhase: state.phase, triggerReason: '' };

  switch (state.phase) {
    case 0: {
      // 0→1: Screen off accumulated >= 300 minutes
      if (state.screenOffAccumulated >= PHASE_THRESHOLDS.SCREEN_OFF_MINUTES_FOR_PHASE_1) {
        return { advanced: true, newPhase: 1, triggerReason: 'screen_off_threshold' };
      }
      return noAdvance;
    }
    case 1: {
      // 1→2: Luna slip seen
      if (state.phaseState.luna_slip_seen === true) {
        return { advanced: true, newPhase: 2, triggerReason: 'luna_slip_witnessed' };
      }
      return noAdvance;
    }
    case 2: {
      // 2→3: Early morning login (5:00-6:30)
      if (isEarlyMorning(now, context.timezone)) {
        return { advanced: true, newPhase: 3, triggerReason: 'early_login' };
      }
      return noAdvance;
    }
    case 3: {
      // 3→4: All exploration items found
      if (state.phaseState.exploration_complete === true) {
        return { advanced: true, newPhase: 4, triggerReason: 'exploration_complete' };
      }
      return noAdvance;
    }
    case 4: {
      // 4→5: Auto-advance on next app open (next day)
      return { advanced: true, newPhase: 5, triggerReason: 'next_day_open' };
    }
    default:
      return noAdvance;
  }
}
