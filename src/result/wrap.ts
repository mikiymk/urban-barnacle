import { success, failure } from "./result";

import type { Result, SuccessValue } from "./result";

export const wrap = <S extends SuccessValue>(callback: () => S): Result<S> => {
  try {
    return success(callback());
  } catch (error) {
    if (error instanceof Error) {
      return failure(error);
    }
    return failure(new Error(String(error)));
  }
};
