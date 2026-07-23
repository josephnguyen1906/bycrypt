/** Normalize API list payloads so tab UI never receives non-arrays. */
export function normalizeList(data: unknown): any[] {
  return Array.isArray(data) ? data : [];
}

export function shouldShowPositions(
  perpetualMode: boolean,
  perpPositions: unknown,
  orderOpen: unknown,
): boolean {
  const positions = perpetualMode
    ? normalizeList(perpPositions)
    : normalizeList(orderOpen);
  return positions.length > 0;
}
