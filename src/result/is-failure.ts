export const isFailure = <S extends {}, F extends Error>(
  result: Result<S, F>
): result is ResultFailure<F> => {
  return !result.ok;
};