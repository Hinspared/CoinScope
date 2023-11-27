import type { Coin } from '../types';

export default function sortBy(coins: Coin[], arg1: keyof Coin, arg2: string) {
  const isDescending = arg2 === 'down';
  coins.sort((a, b) => {
    if (arg1 === 'name') {
      return a.name.localeCompare(b.name) * (isDescending ? -1 : 1);
    } else {
      const aValue = Number(a[arg1]);
      const bValue = Number(b[arg1]);
      return (aValue - bValue) * (isDescending ? -1 : 1);
    }
  });
  return coins;
}
