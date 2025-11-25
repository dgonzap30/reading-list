export function todayYMD() {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

export function diffWeeks(fromISO, toISO = todayYMD()) {
  if (!fromISO) return 0;
  const from = new Date(`${fromISO}T00:00:00`);
  const to = new Date(`${toISO}T00:00:00`);
  const diffMs = to - from;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)));
}

export function diffDays(fromISO, toISO = todayYMD()) {
  if (!fromISO) return 0;
  const from = new Date(`${fromISO}T00:00:00`);
  const to = new Date(`${toISO}T00:00:00`);
  const diffMs = to - from;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}
