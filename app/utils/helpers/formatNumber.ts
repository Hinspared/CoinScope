export default function formatNumber(
  num: number,
  currency?: string
): number | string {
  const strNum = num.toString();
  const decimalIndex = strNum.indexOf('.');
  const decimals = strNum.slice(decimalIndex + 1);
  const firstPositiveDecimalIndex = decimals
    .split('')
    .findIndex((char) => Math.sign(+char));
  const formattedNum = Number(num.toPrecision(firstPositiveDecimalIndex + 2));
  if (currency) {
    const countryCode = (code: string) => {
      if (code === 'usd') return 'en-US';
      if (code === 'eur') return 'de-DE';
      if (code === 'czk') return 'cz-CZ';
    };
    const formatCurrency = new Intl.NumberFormat(countryCode(currency), {
      style: 'currency',
      currency: currency,
      notation: 'compact',
      compactDisplay: 'short',
    });
    if (num > 1) return formatCurrency.format(num);

    return formatCurrency.format(formattedNum);
  }

  return formattedNum;
}
