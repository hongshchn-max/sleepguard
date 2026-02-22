'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useStory } from './story-provider';
import { StoryOverlay } from './story-overlay';

/**
 * Phase 1: Luna's delayed chat entry with scripted "slip" message.
 * Shows extended typing indicator (2-3s) then a fixed message.
 * Fires only once per user.
 */
export function LunaDelayedEntry({ onSlipSeen }: { onSlipSeen: () => void }) {
  const t = useTranslations('story');
  const { phase, phaseState } = useStory();
  const [showSlip, setShowSlip] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (phase !== 1 || phaseState.luna_slip_seen) return;

    // Delay before showing the slip
    const timer = setTimeout(() => {
      setShowSlip(true);
    }, 3000); // 3 second delay (longer than normal typing)

    return () => clearTimeout(timer);
  }, [phase, phaseState]);

  if (phase !== 1 || phaseState.luna_slip_seen || !showSlip) return null;

  return (
    <>
      {!showOverlay && (
        <div
          className="flex justify-start cursor-pointer"
          onClick={() => {
            setShowOverlay(true);
          }}
        >
          <div className="dream-glass max-w-[80%] rounded-2xl px-4 py-2.5 text-white/90">
            {t('phase1Slip')}
          </div>
        </div>
      )}
      {showOverlay && (
        <StoryOverlay
          text={t('phase1Slip')}
          onComplete={() => {
            setShowOverlay(false);
            onSlipSeen();
          }}
          autoClose={5000}
        />
      )}
    </>
  );
}
