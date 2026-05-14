export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const exponentialBackoff = (baseMs: number, attempt: number) => {
  return baseMs * 2 ** attempt;
};
