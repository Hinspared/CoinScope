import { SEARCH_PARAMS_KEYS } from '../constants';
import { Coin } from '../types';

export default async function getCoins(
  searchParams: Record<string, string | string[] | undefined>
): Promise<Coin[]> {
  const currency = searchParams.vs_currency ? searchParams.vs_currency : 'usd';
  const page = searchParams.page ? searchParams.page : 1;

  const initialQueryParams = new Map([
    [SEARCH_PARAMS_KEYS.CURRENCY, currency],
    [SEARCH_PARAMS_KEYS.ORDER, 'market_cap_desc'],
    [SEARCH_PARAMS_KEYS.PER_PAGE, '10'],
    [SEARCH_PARAMS_KEYS.PAGE, page],
    [SEARCH_PARAMS_KEYS.SPARKLINE, 'false'],
    [SEARCH_PARAMS_KEYS.LOCAL, 'en'],
  ]);
  const queryParamsFromSearchParams = new Map(
    Object.entries(searchParams).map(([key, value]) => [key, value])
  );

  const uniqueQueryParams = new Map([
    ...initialQueryParams,
    ...queryParamsFromSearchParams,
  ]);

  const queryParams = Object.fromEntries(uniqueQueryParams);

  const apiUrl = `${process.env.API_URL}/coins/markets?${new URLSearchParams(
    queryParams as Record<string, string>
  )}`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (Array.isArray(data)) {
      return data as Coin[];
    } else {
      console.error('Unexpected response structure:', data);
      return [];
    }
  } catch (error) {
    error instanceof Error && console.error(error.cause, error.message);
    // Return an empty array or handle the error case appropriately
    return [];
  }
}
