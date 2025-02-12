export function getIncomeDifference(
  userIncome: number,
  medianValue: number
): {
  diffPercent: number;
  absDiff: string;
  isHigher: boolean;
  diffLabel: string;
} {
  const diffPercent = ((userIncome - medianValue) / medianValue) * 100;
  const absDiff = Math.abs(diffPercent).toFixed(2);
  const isHigher = diffPercent >= 0;
  const diffLabel =
    diffPercent === 0
      ? "exactly the same"
      : `${absDiff}% ${isHigher ? "higher" : "lower"}`;

  return { diffPercent, absDiff, isHigher, diffLabel };
}
