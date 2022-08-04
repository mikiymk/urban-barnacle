import type { ResultFailure } from "./result";

export const failure = <F extends Error>(error: F): ResultFailure<F> => [
  undefined,
  error,
];
