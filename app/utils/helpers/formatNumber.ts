export default function formatNumber(
  num: number,
  currencyCode?: string
): number | string {
  const strNum = num.toString();
  const decimalIndex = strNum.indexOf('.');
  const decimals = strNum.slice(decimalIndex + 1);
  const firstPositiveDecimalIndex = decimals
    .split('')
    .findIndex((char) => Math.sign(+char));
  const formattedNum = Number(num.toPrecision(firstPositiveDecimalIndex + 2));
  if (currencyCode) {
    const countryCode = (code: string) => {
      if (code === 'USD') return 'en-US';
      if (code === 'EUR') return 'de-DE';
      if (code === 'CZK') return 'cz-CZ';
    };
    const formatCurrency = new Intl.NumberFormat(countryCode(currencyCode), {
      style: 'currency',
      currency: currencyCode,
      notation: 'compact',
      compactDisplay: 'short',
    });
    if (num > 1) return formatCurrency.format(num);
    return formatCurrency.format(formattedNum);
  }

  return formattedNum;
}
