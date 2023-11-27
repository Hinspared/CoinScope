export default async function getCoin(id: string) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
