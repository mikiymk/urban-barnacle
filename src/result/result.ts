export type ResultSuccess<S extends {}> = { ok: true; value: S };
export type ResultFailure<F extends Error = Error> = { ok: false; error: F };
export type Result<S extends {}, F extends Error = Error> =
  | ResultSuccess<S>
  | ResultFailure<F>;
