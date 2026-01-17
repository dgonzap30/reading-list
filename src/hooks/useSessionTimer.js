import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export function useSessionTimer() {
  const [sessionTicker, setSessionTicker] = useState(null);

  // Timer countdown effect
  useEffect(() => {
    if (!sessionTicker) return undefined;
    const interval = window.setInterval(() => {
      setSessionTicker((prev) => {
        if (!prev) return null;
        const remaining = Math.max(0, Math.round((prev.endsAt - Date.now()) / 1000));
        if (remaining === 0) {
          toast.success('Session block finished! Mark it complete?');
          return null;
        }
        return { ...prev, remaining };
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [sessionTicker?.endsAt]);

  // Start timer from session object with optional seconds duration
  const handleStartSessionTimer = (session, seconds) => {
    const duration = seconds || 25 * 60;
    const endsAt = Date.now() + duration * 1000;
    setSessionTicker({
      sessionId: session.id,
      label: session.book,
      duration,
      remaining: duration,
      endsAt,
      minutes: Math.round(duration / 60),
    });
  };

  // Start timer with explicit parameters
  const handleStartTimer = (sessionId, label, minutes) => {
    const duration = minutes * 60;
    const endsAt = Date.now() + duration * 1000;
    setSessionTicker({
      sessionId,
      label,
      duration,
      remaining: duration,
      endsAt,
      minutes,
    });
  };

  // Clear/stop timer
  const clearTimer = () => setSessionTicker(null);

  return {
    sessionTicker,
    handleStartSessionTimer,
    handleStartTimer,
    clearTimer,
  };
}
