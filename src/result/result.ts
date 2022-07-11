export type ResultSuccess<S extends {}> = [true, S];
export type ResultFailure<F extends Error = Error> = [false, F];
export type Result<S extends {}, F extends Error = Error> =
  | ResultSuccess<S>
  | ResultFailure<F>;
