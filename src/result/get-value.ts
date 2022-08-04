import { FAILURE_ERROR_INDEX, SUCCESS_VALUE_INDEX } from "./constants";
import { isSuccess } from "./is-success";

import type { Result, SuccessValue } from "./result";

export const getValue = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: S
): S => {
  if (isSuccess(result)) {
    return result[SUCCESS_VALUE_INDEX];
  }

  if (typeof defaultValue === "undefined") {
    const error = result[FAILURE_ERROR_INDEX];
    throw new Error("failed to get value", { cause: error });
  }

  return defaultValue;
};
