/* eslint-disable max-classes-per-file */
export type SuccessValue =
  | Record<string, unknown>
  | bigint
  | boolean
  | number
  | string
  | symbol;

export class ResultSuccess<S extends SuccessValue> {
  public value: S;

  public constructor(value: S) {
    this.value = value;
  }
}

export class ResultFailure<F extends Error = Error> {
  public error: F;

  public constructor(error: F) {
    this.error = error;
  }
}

export type Result<S extends SuccessValue, F extends Error = Error> =
  | ResultFailure<F>
  | ResultSuccess<S>;

export const success = <S extends SuccessValue>(value: S): ResultSuccess<S> =>
  new ResultSuccess(value);

export const failure = <F extends Error>(error: F): ResultFailure<F> =>
  new ResultFailure(error);

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

export const isSuccess = <S extends SuccessValue>(
  result: Result<S>
): result is ResultSuccess<S> => result instanceof ResultSuccess;

export const isFailure = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>
): result is ResultFailure<F> => result instanceof ResultFailure;

export const getValue = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: S
): S => {
  if (isSuccess(result)) return result.value;
  if (typeof defaultValue === "undefined")
    throw new Error("failed to get value", { cause: result.error });
  return defaultValue;
};

export const getError = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: F
): F => {
  if (isFailure(result)) return result.error;
  if (typeof defaultValue === "undefined")
    throw new Error("expect failure but succeed");
  return defaultValue;
};

export const and = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  andFunction: Result<S, F> | ((value: S) => Result<S, F>)
): Result<S, F> => {
  if (isFailure(result)) return result;
  if (typeof andFunction === "function") return andFunction(result.value);
  return andFunction;
};

export const or = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  orFunction: Result<S, F> | ((error: F) => Result<S, F>)
): Result<S, F> => {
  if (isSuccess(result)) return result;
  if (typeof orFunction === "function") return orFunction(result.error);
  return orFunction;
};
