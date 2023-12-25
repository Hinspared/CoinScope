'use client';
import React from 'react';
import CoinLayout from './CoinLayout';
import Stat from './Stat';
import type { Coin, SafeUser } from '@/app/utils/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SEARCH_PARAMS_KEYS } from '@/app/utils/constants';

type CoinList = {
  coins: Coin[];
  currentUser: null | SafeUser | undefined;
};
const stats = [
  { key: 'name', name: 'Coin' },
  { key: 'current_price', name: 'Price' },
  { key: 'price_change_percentage_24h', name: 'Change' },
  { key: 'volume', name: 'Volume', sortable: true },
  { key: 'market_cap', name: 'Market Cap', sortable: true },
];

const CoinsList: React.FC<CoinList> = ({ coins, currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const currencyCode = searchParams?.get(SEARCH_PARAMS_KEYS.CURRENCY) || 'usd';

  // exchange rates functionality
  const currencyCodes = ['usd', 'eur', 'czk'];
  const handleCurrencyClick = (e: React.MouseEvent) => {
    const target = e.target as Element;
    const currencyCode = target.innerHTML;
    newSearchParams.set(SEARCH_PARAMS_KEYS.CURRENCY, currencyCode);
    router.push(pathname + '?' + newSearchParams, { scroll: false });
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 m:px-12 sm:px-2 px-4 pb-20 pt-20">
      <div className="px-4">
        <div className="flex pt-5 mb-5 gap-5">
          {React.Children.toArray(
            currencyCodes.map((code) => (
              <button
                onClick={handleCurrencyClick}
                className={`py-2 px-8 rounded-lg  ${
                  code === currencyCode
                    ? 'bg-gradient-to-r from-indigo-200 to-indigo-500 text-white'
                    : 'bg-[#f8f9ff] text-[#9A97AB]'
                }`}
              >
                {code}
              </button>
            ))
          )}
          {/* <SearchBar coins={coins} currency={currencyCode} /> */}
        </div>
        <hr />
        <div className="overflow-x-auto no-scrollbar">
          <table className="min-w-[800px] w-full">
            <thead>
              <tr className="relative">
                {React.Children.toArray(
                  stats.map((stat) => <Stat stat={stat} />)
                )}
              </tr>
            </thead>
            <tbody>
              {React.Children.toArray(
                coins.map((coin) => (
                  <>
                    <CoinLayout coin={coin} currentUser={currentUser} />
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
        /> */}
      </div>
    </div>
  );
};

export default CoinsList;
