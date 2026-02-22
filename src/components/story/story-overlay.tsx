'use client';

import { useState, useEffect } from 'react';

interface StoryOverlayProps {
  text: string;
  onComplete?: () => void;
  autoClose?: number; // ms
}

/**
 * Narrative overlay with typewriter text effect.
 */
export function StoryOverlay({ text, onComplete, autoClose }: StoryOverlayProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        if (autoClose) {
          setTimeout(() => onComplete?.(), autoClose);
        }
      }
    }, 40); // 40ms per character for dreamlike pacing

    return () => clearInterval(interval);
  }, [text, autoClose, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-8" onClick={() => done && onComplete?.()}>
      <div className="max-w-md text-center">
        <p className="font-display text-xl font-light leading-relaxed text-spectral/90">
          {displayed}
          {!done && <span className="animate-pulse">|</span>}
        </p>
        {done && (
          <p className="mt-8 text-sm text-white/30 animate-pulse">
            {'\u2727'} tap to continue {'\u2727'}
          </p>
        )}
      </div>
    </div>
  );
}
