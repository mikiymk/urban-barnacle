import { Result } from "./result";
import { isSuccess } from "./is-success";

export const getSuccessValue = <S extends {}>(result: Result<S>, defaultValue?: S): S => {
  if (isSuccess(result)) {
    return result[1];
  } else if (defaultValue !== undefined) {
    return defaultValue;
  } else {
    throw result[1];
  }
};
