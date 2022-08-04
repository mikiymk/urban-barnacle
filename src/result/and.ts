import { isFailure } from "./guard";

import type { Result, SuccessValue } from "./result";

export const and = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  andFunction: Result<S, F> | ((value: S) => Result<S, F>)
): Result<S, F> => {
  if (isFailure(result)) return result;
  if (typeof andFunction === "function") return andFunction(result[0]);
  return andFunction;
};
