export type ResultSuccess<S extends {}> = [S, null];
export type ResultFailure<F extends Error = Error> = [null, F];
export type Result<S extends {}, F extends Error = Error> =
  | ResultSuccess<S>
  | ResultFailure<F>;

export const success = <S extends {}>(value: S): Result<S> => {
  return [value, null];
};

export const failure = <S extends {}, F extends Error>(
  error: F
): Result<S, F> => {
  return [null, error];
};

export const isSuccess = <S extends {}>(
  result: Result<S>
): result is ResultSuccess<S> => {
  return result[0] !== null;
};

export const isFailure = <S extends {}, F extends Error>(
  result: Result<S, F>
): result is ResultFailure<F> => {
  return result[1] !== null;
};

export const wrap = <S extends {}>(callback: () => S): Result<S> => {
  try {
    return success(callback());
  } catch (error) {
    return failure(error instanceof Error ? error : new Error("" + error));
  }
};

export const unwrap = <S extends {}>(result: Result<S>, defaultValue?: S): S => {
  if (result[0] !== null) {
    return result[0];
  } else if (defaultValue !== undefined) {
    return defaultValue;
  } else {
    throw result[1];
  }
};
