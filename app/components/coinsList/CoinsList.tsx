'use client';
import React from 'react';
import sortBy from '@/app/utils/helpers/sortBy';
import CoinLayout from './CoinLayout';
import Stat from './Stat';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import type { Coin, SafeUser } from '@/app/utils/types';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchParamsKeys } from '@/app/utils/constants';

interface CoinList {
  coins: Coin[];
  currentUser: null | SafeUser | undefined;
}
const stats = [
  { key: 'name', name: 'Coin' },
  { key: 'current_price', name: 'Price' },
  { key: 'price_change_percentage_24h', name: 'Change' },
  { key: 'low_24h', name: 'Low' },
  { key: 'high_24h', name: 'High' },
  { key: 'market_cap', name: 'Market Cap' },
];

const CoinsList: React.FC<CoinList> = ({ coins, currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(
    searchParams as ReadonlyURLSearchParams
  );
  const currencyCode = searchParams?.get(SearchParamsKeys.CURRENCY) || 'usd';
  // sort functionality
  const [active, setActive] = React.useState(''); //emphasize sorted parameter
  const [sorted, setSorted] = React.useState(coins);
  const [condition, setCondition] = React.useState(false); // arrow direction depends on it

  const handleClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as Element;
    const key = target.getAttribute('data-value') as keyof Coin;
    const up = sortBy([...coins], key, 'up');
    const down = sortBy([...coins], key, 'down');
    const condition = JSON.stringify(sorted) === JSON.stringify(up);
    condition ? setSorted(down) : setSorted(up);
    setActive(key);
    setCondition(condition);
  };

  // exchange rates functionality
  const currencyCodes = ['usd', 'eur', 'czk'];

  const handleCurrencyClick = (e: React.MouseEvent) => {
    const target = e.target as Element;
    const currencyCode = target.innerHTML;
    newSearchParams.set(SearchParamsKeys.CURRENCY, currencyCode);
    router.push(pathname + '?' + newSearchParams);
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
                  stats.map((stat) => (
                    <Stat
                      active={active}
                      stat={stat}
                      condition={condition}
                      onClick={handleClick}
                    />
                  ))
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
