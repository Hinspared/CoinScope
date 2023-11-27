export default function roundToNonZeroDecimal(num: number): number {
  const numString = num.toString();
  const decimalIndex = numString.indexOf('.');
  if (decimalIndex === -1) {
    return num;
  }
  let nonZeroPos =
    numString.slice(decimalIndex + 1).search(/[1-9]/) + decimalIndex;
  if (nonZeroPos === decimalIndex) {
    nonZeroPos++; // handle edge case of numbers like 0.001
  }
  if (nonZeroPos === -1) {
    nonZeroPos = numString.length; // handle edge case of numbers like 10.0
  }
  const result = num.toFixed(nonZeroPos - decimalIndex);
  return Number(result);
}
