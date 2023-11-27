'use client';
import React from 'react';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from 'react-icons/ti';

interface StatProps {
  active: string;
  stat: { key: string; name: string };
  condition: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const Stat: React.FC<StatProps> = ({ active, stat, condition, onClick }) => {
  const arrowStyle = `text-sm`;
  const isActiveStat = active === stat.key;
  return (
    <th
      className="py-5 first:sticky left-0 bg-[#eaebf5] dark:bg-[#0d0e30] cursor-pointer overflow-x-auto"
      data-value={stat.key}
      onClick={onClick}
    >
      <div
        className={`flex items-center cursor-pointer  ${
          isActiveStat
            ? 'text-neutral-900 dark:text-indigo-400'
            : 'text-[#9A97AB]'
        } ${stat.key === 'name' ? 'justify-start' : 'justify-end'}`}
      >
        <p>{stat.name}</p>
        {!isActiveStat ? (
          <TiArrowUnsorted className={arrowStyle} />
        ) : condition ? (
          <TiArrowSortedDown className={arrowStyle} />
        ) : (
          <TiArrowSortedUp className={arrowStyle} />
        )}
      </div>
    </th>
  );
};

export default Stat;
