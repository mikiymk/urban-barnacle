import { SUCCESS_VALUE_INDEX } from "./constants";
import { isFailure } from "./is-failure";

import type { Result, SuccessValue } from "./result";

export const and = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  andFunction: (value: S) => Result<S, F>
): Result<S, F> => {
  if (isFailure(result)) {
    return result;
  }

  return andFunction(result[SUCCESS_VALUE_INDEX]);
};
