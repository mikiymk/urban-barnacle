import { Result } from "./result";
import { isSuccess } from "./is-success";

export const getError = <S extends {}, F extends Error>(result: Result<S, F>, defaultValue?: F): F => {
  if (isFailure(result)) {
    return result[1];
  } else if (defaultValue !== undefined) {
    return defaultValue;
  } else {
    throw new Error("expect failure but succeed");
  }
};
