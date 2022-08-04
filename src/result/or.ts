import { FAILURE_ERROR_INDEX } from "./constants";
import { isSuccess } from "./is-success";

import type { Result, SuccessValue } from "./result";

export const or = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  orFunction: (error: F) => Result<S, F>
): Result<S, F> => {
  if (isSuccess(result)) {
    return result;
  }

  return orFunction(result[FAILURE_ERROR_INDEX]);
};
