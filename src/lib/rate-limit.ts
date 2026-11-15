const windowMs = 10 * 60 * 1000;
const maxRequests = 3;
const maxTrackedKeys = 1000;

const hits = new Map<string, number[]>();

function prune(now: number) {
  for (const [key, times] of hits) {
    if (times.every((time) => now - time >= windowMs)) hits.delete(key);
  }
}

export function isRateLimited(key: string) {
  const now = Date.now();
  if (hits.size > maxTrackedKeys) prune(now);

  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= maxRequests) {
    hits.set(key, recent);
    return true;
  }

  hits.set(key, [...recent, now]);
  return false;
}
