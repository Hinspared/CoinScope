const hostNames = [
  'assets.coingecko.com',
  'avatars.githubusercontent.com',
  'lh3.googleusercontent.com',
];
const remotePatterns = hostNames.map((name) => ({
  protocol: 'https',
  hostname: name,
  port: '',
}));

export default remotePatterns;
