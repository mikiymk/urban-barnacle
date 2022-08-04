import { SUCCESS_VALUE_INDEX } from "./constants";

import type { Result, ResultFailure, SuccessValue } from "./result";

export const isFailure = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>
): result is ResultFailure<F> => result[SUCCESS_VALUE_INDEX] === undefined;
