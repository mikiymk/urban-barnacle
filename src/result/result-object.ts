export type ResultSuccess<S extends {}> = { ok: true; value: S };
export type ResultFailure<F extends Error = Error> = { ok: false; error: F };
export type Result<S extends {}, F extends Error = Error> =
  | ResultSuccess<S>
  | ResultFailure<F>;

export const success = <S extends {}>(value: S): Result<S> => {
  return { ok: true, value };
};

export const failure = <S extends {}, F extends Error>(
  error: F
): Result<S, F> => {
  return { ok: false, error };
};

export const isSuccess = <S extends {}>(
  result: Result<S>
): result is ResultSuccess<S> => {
  return result.ok;
};

export const isFailure = <S extends {}, F extends Error>(
  result: Result<S, F>
): result is ResultFailure<F> => {
  return !result.ok;
};

export const wrap = <S extends {}>(callback: () => S): Result<S> => {
  try {
    return success(callback());
  } catch (error) {
    return failure(error instanceof Error ? error : new Error("" + error));
  }
};

export const unwrap = <S extends {}>(result: Result<S>, defaultValue?: S): S => {
  if (isSuccess(result)) {
    return result.value;
  } else if (defaultValue !== undefined) {
    return defaultValue;
  } else {
    throw result.error;
  }
};
