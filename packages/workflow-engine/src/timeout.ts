export const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> => {
  return Promise.race([
    promise,

    new Promise<T>((_, reject) =>
      setTimeout(() => {
        reject(new Error(`Execution timed out after ${timeoutMs}ms`));
      }, timeoutMs),
    ),
  ]);
};
