import { Result } from "./result";
import { isFailure } from "./is-failure";

export const and = <S extends {}, F extends Error>(result: Result<S, F>, andFunction: (value: S) => Result<S, F>): Result<S, F> => {
  if (isFailure(result)) {
    return result;
  }

  return andFunction(result[1]);
};
