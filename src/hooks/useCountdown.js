import { useEffect, useRef, useState } from 'react';

export function useCountdown() {
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) {
      return undefined;
    }
    intervalRef.current = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (remaining === 0) setRunning(false);
  }, [remaining]);

  const start = (seconds) => {
    setRemaining(seconds);
    setDuration(seconds);
    setRunning(true);
  };

  return {
    remaining,
    running,
    duration,
    start,
    pause: () => setRunning(false),
    resume: () => setRunning(true),
    reset: () => {
      setRunning(false);
      setRemaining(0);
      setDuration(0);
    },
  };
}
