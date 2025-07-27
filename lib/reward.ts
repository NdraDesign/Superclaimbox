const tokenPool = [
  process.env.TOKEN_ADDRESS!,
  "0xMikasaToken",
  "0xToxicToken",
  "0xDrinkToken",
];

export function getRewardToken() {
  const i = Math.floor(Math.random() * tokenPool.length);
  return tokenPool[i];
}