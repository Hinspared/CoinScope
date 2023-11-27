// 'use client';
// import React from 'react';
// import { AiOutlineSearch } from 'react-icons/ai';
// import useOutsideClick from '@/app/utils/hooks/useOutsideClick';
// import useDebounce from '@/app/utils/hooks/useDebounce';
// import type Coin from '@/app/utils/interfaces/Coin';
// import Image from 'next/image';
// import formatNumber from '@/app/utils/helpers/formatNumber';
// import Link from 'next/link';

// interface SearchBarProps {
//   coins: Coin[];
//   currency: { code: string; rate: number };
// }

// const SearchBar: React.FC<SearchBarProps> = ({ coins, currency }) => {
//   const [searchInput, setSearchInput] = React.useState('');
//   const [isResultOpen, setResultOpen] = React.useState(false);
//   const [searchResults, setSearchResults] = React.useState<Coin[]>();
//   const debounce = useDebounce(searchInput, 200);

//   const handleCloseResult = () => {
//     setResultOpen(false);
//     setSearchInput('');
//   };

//   const handleSearch = React.useCallback(() => {
//     if (searchInput === '') {
//       setSearchResults(undefined);
//     } else {
//       const result = coins.filter((coin) =>
//         coin.name.toLowerCase().includes(searchInput.toLowerCase())
//       );
//       setSearchResults(result);
//     }
//   }, [coins, searchInput]);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchInput(value);
//     handleSearch();
//   };

//   React.useEffect(() => {
//     if (debounce) {
//       handleSearch();
//       setResultOpen(true);
//     }
//   }, [debounce, handleSearch]);

//   const ref = useOutsideClick(handleCloseResult);

//   return (
//     <div
//       className={`relative flex items-center rounded-lg bg-[#f8f9ff] text-[#9A97AB] ml-auto`}
//       ref={ref}
//     >
//       <div className="flex w-full items-center rounded-lg px-3 py-2 text-xl">
//         <AiOutlineSearch className="font-bold" />
//         <input
//           type="search"
//           className="w-full bg-transparent px-2 text-[#403B57] outline-none placeholder:text-[#9A97AB]"
//           placeholder="Coin name"
//           onChange={handleChange}
//           value={searchInput}
//           autoComplete="off"
//           name="searchTerm"
//         />
//       </div>
//       {isResultOpen ? (
//         <div className="text-lg text-[#403B57] dark:text-[#eaebf5] absolute top-14 max-h-56 overflow-y-auto flex w-full flex-col rounded-lg bg-[#f8f9ff] dark:bg-[#0d0e30] shadow-lg">
//           {searchResults?.length !== 0 ? (
//             React.Children.toArray(
//               searchResults?.map((coin) => (
//                 <>
//                   <Link
//                     className="flex p-1 gap-3 justify-end"
//                     href={`/coins/${coin.id}`}
//                   >
//                     <Image
//                       src={coin.image}
//                       alt={coin.symbol}
//                       height={20}
//                       width={20}
//                     />
//                     <p className="mr-auto">{coin.name}</p>
//                     <p>
//                       {formatNumber(
//                         coin.current_price * currency.rate,
//                         currency.code
//                       )}
//                     </p>
//                   </Link>
//                   <hr className="last:hidden w-full" />
//                 </>
//               ))
//             )
//           ) : (
//             <p className="p-1">No results found</p>
//           )}
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default SearchBar;

'use client';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useOutsideClick from '@/app/utils/hooks/useOutsideClick';
import useDebounce from '@/app/utils/hooks/useDebounce';
import Image from 'next/image';
import formatNumber from '@/app/utils/helpers/formatNumber';
import Link from 'next/link';
import useMobile from '@/app/utils/hooks/useMobile';
import type { Coin } from '@/app/utils/types';

interface SearchBarProps {
  coins: Coin[];
  currency: { code: string; rate: number };
}

const SearchBar: React.FC<SearchBarProps> = ({ coins, currency }) => {
  const [searchInput, setSearchInput] = React.useState('');
  const [isResultOpen, setResultOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Coin[]>();
  const debounce = useDebounce(searchInput, 200);
  const mobile = useMobile();

  const handleCloseResult = () => {
    setResultOpen(false);
    setSearchInput('');
  };

  const handleSearch = React.useCallback(() => {
    if (searchInput === '') {
      setSearchResults(undefined);
    } else {
      const result = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(result);
    }
  }, [coins, searchInput]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    handleSearch();
  };

  React.useEffect(() => {
    if (debounce) {
      handleSearch();
      setResultOpen(true);
    }
  }, [debounce, handleSearch]);

  const ref = useOutsideClick(handleCloseResult);

  if (mobile) {
    return (
      <div className="relative">
        <AiOutlineSearch
          className="ml-auto text-2xl cursor-pointer"
          onClick={() => setResultOpen(true)}
        />
        {isResultOpen && (
          <div className="absolute z-30 flex h-14 flex-1 items-center rounded-xl bg-white`">
            <div className="flex w-full items-center rounded-lg px-3 py-2 text-xl">
              <AiOutlineSearch className="font-bold" />
              <input
                type="search"
                className="w-full bg-transparent px-2 text-[#403B57] outline-none placeholder:text-[#9A97AB]"
                placeholder="Coin name"
                onChange={handleChange}
                value={searchInput}
                autoComplete="off"
                name="searchTerm"
              />
            </div>
            {searchResults?.length !== 0 ? (
              searchResults?.map((coin) => (
                <Link
                  key={coin.id}
                  className="flex p-1 gap-3 justify-end"
                  href={`/coins/${coin.id}`}
                >
                  <Image
                    src={coin.image}
                    alt={coin.symbol}
                    height={20}
                    width={20}
                  />
                  <p className="mr-auto">{coin.name}</p>
                  <p>
                    {formatNumber(
                      coin.current_price * currency.rate,
                      currency.code
                    )}
                  </p>
                </Link>
              ))
            ) : (
              <p className="p-1">No results found</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center rounded-lg bg-[#f8f9ff] text-[#9A97AB] ml-auto`}
      ref={ref}
    >
      <div className="flex w-full items-center rounded-lg px-3 py-2 text-xl">
        <AiOutlineSearch className="font-bold" />
        <input
          type="search"
          className="w-full bg-transparent px-2 text-[#403B57] outline-none placeholder:text-[#9A97AB]"
          placeholder="Coin name"
          onChange={handleChange}
          value={searchInput}
          autoComplete="off"
          name="searchTerm"
        />
      </div>
      {isResultOpen ? (
        <div className="text-lg text-[#403B57] dark:text-[#eaebf5] absolute top-14 max-h-56 overflow-y-auto flex w-full flex-col rounded-lg bg-[#f8f9ff] dark:bg-[#0d0e30] shadow-lg">
          {searchResults?.length !== 0 ? (
            searchResults?.map((coin) => (
              <Link
                key={coin.id}
                className="flex p-1 gap-3 justify-end"
                href={`/coins/${coin.id}`}
              >
                <Image
                  src={coin.image}
                  alt={coin.symbol}
                  height={20}
                  width={20}
                />
                <p className="mr-auto">{coin.name}</p>
                <p>
                  {formatNumber(
                    coin.current_price * currency.rate,
                    currency.code
                  )}
                </p>
              </Link>
            ))
          ) : (
            <p className="p-1">No results found</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
