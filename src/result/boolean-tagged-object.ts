export type SuccessValue =
  | Record<string, unknown>
  | bigint
  | boolean
  | number
  | string
  | symbol;
export type ResultSuccess<S extends SuccessValue> = {
  readonly type: true;
  readonly value: S;
};
export type ResultFailure<F extends Error = Error> = {
  readonly type: false;
  readonly error: F;
};
export type Result<S extends SuccessValue, F extends Error = Error> =
  | ResultFailure<F>
  | ResultSuccess<S>;

export const success = <S extends SuccessValue>(
  value: S
): ResultSuccess<S> => ({
  type: true,
  value,
});

export const failure = <F extends Error>(error: F): ResultFailure<F> => ({
  error,
  type: false,
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
): result is ResultSuccess<S> => result.type;

export const isFailure = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>
): result is ResultFailure<F> => !result.type;

export const getValue = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: S
): S => {
  if (result.type) return result.value;
  if (typeof defaultValue === "undefined")
    throw new Error("failed to get value", { cause: result.error });
  return defaultValue;
};

export const getError = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: F
): F => {
  if (!result.type) return result.error;
  if (typeof defaultValue === "undefined")
    throw new Error("expect failure but succeed");
  return defaultValue;
};

export const and = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  andFunction: Result<S, F> | ((value: S) => Result<S, F>)
): Result<S, F> => {
  if (!result.type) return result;
  if (typeof andFunction === "function") return andFunction(result.value);
  return andFunction;
};

export const or = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  orFunction: Result<S, F> | ((error: F) => Result<S, F>)
): Result<S, F> => {
  if (result.type) return result;
  if (typeof orFunction === "function") return orFunction(result.error);
  return orFunction;
};
