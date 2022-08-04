import { SUCCESS_VALUE_INDEX } from "./constants";

import type { Result, ResultSuccess, SuccessValue } from "./result";

export const isSuccess = <S extends SuccessValue>(
  result: Result<S>
): result is ResultSuccess<S> => result[SUCCESS_VALUE_INDEX] !== undefined;
