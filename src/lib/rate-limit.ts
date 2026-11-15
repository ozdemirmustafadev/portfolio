const windowMs = 10 * 60 * 1000;
const maxRequests = 3;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= maxRequests) {
    hits.set(key, recent);
    return true;
  }

  hits.set(key, [...recent, now]);
  return false;
}
