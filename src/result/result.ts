export type SuccessValue = Record<string, unknown> | boolean | number | string;
export type ResultSuccess<S extends SuccessValue> = readonly [S];
export type ResultFailure<F extends Error = Error> = readonly [undefined, F];
export type Result<S extends SuccessValue, F extends Error = Error> =
  | ResultFailure<F>
  | ResultSuccess<S>;
