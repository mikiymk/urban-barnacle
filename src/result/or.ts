export const or = <S extends {}, F extends Error>(result: Result<S, F>, orFunction: (error: F) => Result<S, F>): Result<S, F> => {
  if (isSuccess(result)) {
    return result;
  }

  return orFunction(result.error);
};
