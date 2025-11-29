'use client';

import { useEffect } from 'react';

export function useDevServerHeartbeat() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;
    let lastAction = Date.now();

    const sendHeartbeat = () => {
      fetch('/', {
        method: 'GET',
      }).catch((error) => {
        // this is a no-op, we just want to keep the dev server alive
      });
    };

    const handleAction = () => {
      const now = Date.now();
      // Throttle to once every 3 minutes
      if (now - lastAction > 60_000 * 3) {
        lastAction = now;
        sendHeartbeat();
      }
    };

    // Set up event listeners for user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, handleAction);
    });

    // Set up timeout for inactivity
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sendHeartbeat();
      }, 60_000);
    };

    resetTimeout();
    events.forEach(event => {
      window.addEventListener(event, resetTimeout);
    });

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, handleAction);
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, []);
}
