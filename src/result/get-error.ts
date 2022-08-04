import { FAILURE_ERROR_INDEX } from "./constants";
import { isFailure } from "./is-failure";

import type { Result, SuccessValue } from "./result";

export const getError = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: F
): F => {
  if (isFailure(result)) {
    return result[FAILURE_ERROR_INDEX];
  }
  if (typeof defaultValue === "undefined") {
    throw new Error("expect failure but succeed");
  }
  return defaultValue;
};
