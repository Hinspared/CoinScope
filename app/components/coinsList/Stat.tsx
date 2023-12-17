'use client';
import { SEARCH_PARAMS_KEYS } from '@/app/utils/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from 'react-icons/ti';

interface StatProps {
  stat: { key: string; name: string; sortable?: boolean };
}

const Stat: React.FC<StatProps> = (props) => {
  const { stat } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const newSearchParams = new URLSearchParams(searchParams);
  const order = searchParams.get(SEARCH_PARAMS_KEYS.ORDER);
  const isActiveStat = order && order.includes(stat.key);
  const typeOfOrder = order?.includes('_desc') ? '_asc' : '_desc';
  const ascendingOrder = isActiveStat && order.includes('_asc');
  const handleStatClick = () => {
    if (!stat.sortable) return;
    newSearchParams.set(SEARCH_PARAMS_KEYS.ORDER, stat.key + typeOfOrder);
    router.push(pathname + '?' + newSearchParams, { scroll: false });
  };

  const arrowStyle = `text-sm`;

  return (
    <th className="py-5 first:sticky left-0 bg-[#eaebf5] dark:bg-[#0d0e30] overflow-x-auto first:pl-4 last:pr-4">
      <div
        data-value={stat.key}
        onClick={handleStatClick}
        className={`flex items-center cursor-pointer  ${
          isActiveStat
            ? 'text-neutral-900 dark:text-indigo-400'
            : 'text-[#9A97AB]'
        } ${stat.key === 'name' ? 'justify-start' : 'justify-end'}`}
      >
        <p>{stat.name}</p>

        {stat.sortable &&
          (!isActiveStat ? (
            <TiArrowUnsorted className={arrowStyle} />
          ) : ascendingOrder ? (
            <TiArrowSortedDown className={arrowStyle} />
          ) : (
            <TiArrowSortedUp className={arrowStyle} />
          ))}
      </div>
    </th>
  );
};

export default Stat;
