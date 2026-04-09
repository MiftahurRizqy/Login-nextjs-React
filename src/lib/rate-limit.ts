type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const limits = new Map<string, RateLimitRecord>();

export function checkRateLimit(ip: string, maxRequests: number, windowMs: number): { success: boolean; headers: HeadersInit } {
  const now = Date.now();
  let record = limits.get(ip);

  // If there's no record or the window expired, reset.
  if (!record || record.resetTime < now) {
    record = { count: 0, resetTime: now + windowMs };
  }

  record.count += 1;
  limits.set(ip, record);

  const remaining = Math.max(0, maxRequests - record.count);

  const headers = {
    'X-RateLimit-Limit': maxRequests.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': record.resetTime.toString(),
  };

  if (record.count > maxRequests) {
    return { success: false, headers };
  }

  return { success: true, headers };
}
