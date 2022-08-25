export const SUCCESS_TAG = Symbol("success");
export const FAILURE_TAG = Symbol("failure");

export type SuccessValue = Record<string, unknown> | boolean | number | string;
export type ResultSuccess<S extends SuccessValue> = readonly [
  typeof SUCCESS_TAG,
  S
];
export type ResultFailure<F extends Error = Error> = readonly [
  typeof FAILURE_TAG,
  F
];
export type Result<S extends SuccessValue, F extends Error = Error> =
  | ResultFailure<F>
  | ResultSuccess<S>;
