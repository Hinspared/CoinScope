'use client';
import React from 'react';
import Image from 'next/image';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import formatNumber from '@/app/utils/helpers/formatNumber';
import { useRouter } from 'next/navigation';
import type { Coin, SafeUser } from '@/app/utils/types';

interface Props {
  coin: Coin;
  currentUser: null | SafeUser | undefined;
}

const CoinLayout: React.FC<Props> = ({ coin, currentUser }) => {
  const router = useRouter();
  const favouriteUserCoins = currentUser?.coins.map((coin) => coin.symbol);
  const favouriteCoin = favouriteUserCoins?.includes(coin.symbol);
  const handleClick = () => {
    router.push(`/coins/${coin.id}`);
  };
  return (
    <tr className="h-20">
      <td
        className="mr-auto sticky left-0 bg-[#eaebf5] dark:bg-[#0d0e30] w-[12rem] cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex gap-3 items-center">
          <Image src={coin.image} alt={coin.name} width={30} height={30} />
          {favouriteCoin ? (
            <AiFillStar
              size={20}
              className="text-slate-500 dark:text-indigo-500 flex-shrink-0"
            />
          ) : (
            <AiOutlineStar size={20} className="flex-shrink-0" />
          )}
          <div className="flex flex-col md:flex-row md:flex-shrink-0 md:gap-3">
            <p className="font-semibold">{coin.name}</p>
            <p className="text-slate-500">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
      </td>
      <td className="text-right">{coin.current_price}</td>
      <td
        className={`text-right ${
          coin.price_change_percentage_24h > 0
            ? 'text-green-600'
            : 'text-red-600'
        }`}
      >
        {formatNumber(coin.price_change_percentage_24h)}%
      </td>
      <td className="text-right">{coin.low_24h}</td>
      <td className="text-right">{coin.high_24h}</td>
      <td className="text-right w-[12rem]">{coin.market_cap}</td>
    </tr>
  );
};

export default CoinLayout;
