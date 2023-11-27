import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChangePage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onChangePage,
}) => {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => i + start);

  const visiblePages = (() => {
    if (totalPages <= 3) {
      return range(1, totalPages);
    } else if (currentPage === 1) {
      return range(1, 3);
    } else if (currentPage === totalPages) {
      return range(totalPages - 2, totalPages);
    } else {
      return range(currentPage - 1, currentPage + 1);
    }
  })();

  return (
    <div className="flex justify-center space-x-2 mt-10">
      <button
        onClick={() => onChangePage(currentPage - 1)}
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
          onClick={() => onChangePage(page)}
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
        onClick={() => onChangePage(currentPage + 1)}
        className={`border border-gray-300 px-3 py-1 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 ${
          currentPage < totalPages ? '' : 'opacity-0'
        }`}
        disabled={currentPage < totalPages ? false : true}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
