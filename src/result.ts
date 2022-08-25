export { and } from "./result/and";
export { isSuccess, isFailure } from "./result/guard";
export { or } from "./result/or";
export { getValue, getError } from "./result/unwrap";
export { success, failure, result } from "./result/wrap";

export type {
  Result,
  ResultSuccess,
  ResultFailure,
  SuccessValue,
} from "./result/result";
