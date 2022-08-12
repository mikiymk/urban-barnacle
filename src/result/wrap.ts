import type { Result, SuccessValue } from "./result";

export const success = <S extends SuccessValue>(value: S): ResultSuccess<S> => [
  value,
];

export const failure = <F extends Error>(error: F): ResultFailure<F> => [
  undefined,
  error,
];

export const tryResult = <S extends SuccessValue>(callback: () => S): Result<S> => {
  try {
    return success(callback());
  } catch (error) {
    if (error instanceof Error) {
      return failure(error);
    }
    return failure(new Error(String(error)));
  }
};
