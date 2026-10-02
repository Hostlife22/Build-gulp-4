export function boundedDelta(delta: number): number {
  return Math.min(Math.max(Number.isFinite(delta) ? delta : 0, 0), 1 / 30);
}
export function approach(
  current: number,
  target: number,
  delta: number,
  immediate = false,
): number {
  if (immediate || Math.abs(target - current) < 0.0001) return target;
  return (
    current + (target - current) * (1 - Math.exp(-8 * boundedDelta(delta)))
  );
}
