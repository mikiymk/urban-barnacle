import { Result } from "./result";

export const failure = <S extends {}, F extends Error>(
  error: F
): Result<S, F> => {
  return { ok: false, error };
};
