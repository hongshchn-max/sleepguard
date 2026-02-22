'use client';

import { useEffect, useRef } from 'react';

/**
 * Invisible component that tracks page visibility changes
 * and reports them to the story/screen-off API.
 */
export function ScreenOffTracker() {
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    function generateId() {
      return crypto.randomUUID();
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        // Page hidden — start screen-off session
        const id = generateId();
        sessionIdRef.current = id;

        // Use sendBeacon for reliability on page close
        const payload = JSON.stringify({ event: 'hidden', sessionId: id });
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/story/screen-off', payload);
        } else {
          fetch('/api/story/screen-off', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } else {
        // Page visible — end screen-off session
        if (sessionIdRef.current) {
          fetch('/api/story/screen-off', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: 'visible', sessionId: sessionIdRef.current }),
          }).catch(() => {});
          sessionIdRef.current = null;
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return null; // Invisible component
}
