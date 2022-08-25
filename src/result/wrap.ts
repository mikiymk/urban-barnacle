import { SUCCESS_TAG, FAILURE_TAG } from "./result";

import type {
  Result,
  ResultSuccess,
  ResultFailure,
  SuccessValue,
} from "./result";

export const success = <S extends SuccessValue>(value: S): ResultSuccess<S> => [
  SUCCESS_TAG,
  value,
];

export const failure = <F extends Error>(error: F): ResultFailure<F> => [
  FAILURE_TAG,
  error,
];

export const result = <S extends SuccessValue>(
  callback: () => S
): Result<S> => {
  try {
    return success(callback());
  } catch (error) {
    if (error instanceof Error) {
      return failure(error);
    }
    return failure(new Error(String(error)));
  }
};
