export const SUCCESS_TAG = Symbol("success");
export const FAILURE_TAG = Symbol("failure");

export type SuccessValue =
  | Record<string, unknown>
  | bigint
  | boolean
  | number
  | string
  | symbol;
export type ResultSuccess<S extends SuccessValue> = {
  readonly type: typeof SUCCESS_TAG;
  readonly value: S;
};
export type ResultFailure<F extends Error = Error> = {
  readonly type: typeof FAILURE_TAG;
  readonly error: F;
};
export type Result<S extends SuccessValue, F extends Error = Error> =
  | ResultFailure<F>
  | ResultSuccess<S>;

export const success = <S extends SuccessValue>(
  value: S
): ResultSuccess<S> => ({
  type: SUCCESS_TAG,
  value,
});

export const failure = <F extends Error>(error: F): ResultFailure<F> => ({
  error,
  type: FAILURE_TAG,
});

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
): result is ResultSuccess<S> => result.type === SUCCESS_TAG;

export const isFailure = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>
): result is ResultFailure<F> => result.type === FAILURE_TAG;

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
  if (typeof andFunction === "function") return andFunction(getValue(result));
  return andFunction;
};

export const or = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  orFunction: Result<S, F> | ((error: F) => Result<S, F>)
): Result<S, F> => {
  if (isSuccess(result)) return result;
  if (typeof orFunction === "function") return orFunction(getError(result));
  return orFunction;
};
