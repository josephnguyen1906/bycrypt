/**
 * Normalize hyorder duration to seconds.
 * - DB / contractjc: `time` is minutes (1, 1.5, 2, 3)
 * - createOrder (legacy): `time` was minutes * 60 (seconds)
 * - Prefer buytime→selltime span when present
 */
export function contractDurationSeconds(data: {
  time?: number | string | null;
  time_seconds?: number | string | null;
  buytime?: string | Date | null;
  selltime?: string | Date | null;
} | null | undefined): number {
  if (!data) return 0;

  if (data.buytime && data.selltime) {
    const start = new Date(data.buytime).getTime();
    const end = new Date(data.selltime).getTime();
    if (Number.isFinite(start) && Number.isFinite(end) && end > start) {
      return Math.floor((end - start) / 1000);
    }
  }

  const explicit = Number(data.time_seconds);
  if (Number.isFinite(explicit) && explicit > 0) {
    return Math.round(explicit);
  }

  const t = Number(data.time);
  if (!Number.isFinite(t) || t <= 0) return 0;

  // Minutes from settings are small; seconds from API are >= 60.
  return t < 60 ? Math.round(t * 60) : Math.round(t);
}
