import type { ResultSuccess, SuccessValue } from "./result";

export const success = <S extends SuccessValue>(value: S): ResultSuccess<S> => [
  value,
];
