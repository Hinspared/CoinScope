import React from 'react';
import CoinsList from './components/coinsList/CoinsList';
import getCoins from './utils/helpers/getCoins';
import Header from './components/Header';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const coins = await getCoins(searchParams);
  const currentUser = null;
  return (
    <main>
      <Header currentUser={currentUser} />
      <CoinsList coins={coins} currentUser={currentUser} />
    </main>
  );
}
