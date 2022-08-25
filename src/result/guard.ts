import { SUCCESS_TAG, FAILURE_TAG } from "./result";

import type {
  Result,
  ResultSuccess,
  ResultFailure,
  SuccessValue,
} from "./result";

export const isSuccess = <S extends SuccessValue>(
  result: Result<S>
): result is ResultSuccess<S> => result[0] === SUCCESS_TAG;

export const isFailure = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>
): result is ResultFailure<F> => result[0] === FAILURE_TAG;
