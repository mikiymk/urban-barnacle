import { isSuccess } from "./guard";

import type { Result, SuccessValue } from "./result";

export const or = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  orFunction: Result<S, F> | ((error: F) => Result<S, F>)
): Result<S, F> => {
  if (isSuccess(result)) return result;
  if (typeof orFunction === "function") return orFunction(result[1]);
  return orFunction;
};
