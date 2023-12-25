'use client';

import { SEARCH_PARAMS_KEYS } from '@/app/utils/constants';
import useNewSearchParams from '@/app/utils/hooks/useNewSearchParams';
import React from 'react';

type PaginationProps = {
  children?: React.ReactNode;
};

const Pagination: React.FC<PaginationProps> = ({}) => {
  const { newSearchParams, setSearchParams } = useNewSearchParams();

  const currentPage = Number(newSearchParams.get(SEARCH_PARAMS_KEYS.PAGE)) || 1;

  const handlePaginationChange = (page: number) => {
    newSearchParams.set(SEARCH_PARAMS_KEYS.PAGE, page.toString());
    setSearchParams(newSearchParams);
  };

  const prevPage = currentPage === 1 ? null : currentPage - 1;

  const visiblePages = [prevPage, currentPage, currentPage + 1].filter(Boolean);

  return (
    <div className="flex justify-center space-x-2 mt-10">
      <button
        onClick={() => handlePaginationChange(currentPage - 1)}
        className={`border border-gray-300 px-3 py-1 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 ${
          currentPage === 1 ? 'opacity-0' : ''
        }`}
        disabled={currentPage === 1 ? true : false}
      >
        Prev
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => page && handlePaginationChange(page)}
          className={`border ${
            currentPage === page
              ? 'bg-gray-200 text-neutral-900'
              : 'border-gray-300 text-gray-500 hover:text-gray-700'
          } px-3 py-1 rounded-md text-sm font-medium`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePaginationChange(currentPage + 1)}
        className={`border border-gray-300 px-3 py-1 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 ${
          currentPage < 20 ? '' : 'opacity-0'
        }`}
        disabled={currentPage < 20 ? false : true}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
