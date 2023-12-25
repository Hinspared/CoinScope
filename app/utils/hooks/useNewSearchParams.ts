'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useNewSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const setSearchParams = (updatedSeasrchParams: URLSearchParams) =>
    router.replace(pathname + '?' + updatedSeasrchParams, { scroll: false });

  return { newSearchParams, setSearchParams };
};

export default useNewSearchParams;
