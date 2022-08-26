export type SuccessValue =
  | Record<string, unknown>
  | bigint
  | boolean
  | number
  | string
  | symbol;
export type ResultSuccess<S extends SuccessValue> = readonly [true, S];
export type ResultFailure<F extends Error = Error> = readonly [false, F];
export type Result<S extends SuccessValue, F extends Error = Error> =
  | ResultFailure<F>
  | ResultSuccess<S>;

export const success = <S extends SuccessValue>(value: S): ResultSuccess<S> => [
  true,
  value,
];

export const failure = <F extends Error>(error: F): ResultFailure<F> => [
  false,
  error,
];

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

export const isSuccess = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>
): result is ResultSuccess<S> => result[0];

export const isFailure = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>
): result is ResultFailure<F> => !result[0];

export const getValue = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: S
): S => {
  if (result[0]) return result[1];
  if (typeof defaultValue === "undefined")
    throw new Error("failed to get value", { cause: result[1] });
  return defaultValue;
};

export const getError = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  defaultValue?: F
): F => {
  if (!result[0]) return result[1];
  if (typeof defaultValue === "undefined")
    throw new Error("expect failure but succeed");
  return defaultValue;
};

export const and = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  andFunction: Result<S, F> | ((value: S) => Result<S, F>)
): Result<S, F> => {
  if (!result[0]) return result;
  if (typeof andFunction === "function") return andFunction(result[1]);
  return andFunction;
};

export const or = <S extends SuccessValue, F extends Error>(
  result: Result<S, F>,
  orFunction: Result<S, F> | ((error: F) => Result<S, F>)
): Result<S, F> => {
  if (result[0]) return result;
  if (typeof orFunction === "function") return orFunction(result[1]);
  return orFunction;
};
