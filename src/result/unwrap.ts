import { isSuccess, isFailure } from "./guard";

import type { Result, SuccessValue } from "./result";

export const getValue = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: S
): S => {
  if (isSuccess(result)) return result[1];
  if (typeof defaultValue === "undefined")
    throw new Error("failed to get value", { cause: result[1] });
  return defaultValue;
};

export const getError = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: F
): F => {
  if (isFailure(result)) return result[1];
  if (typeof defaultValue === "undefined")
    throw new Error("expect failure but succeed");
  return defaultValue;
};
