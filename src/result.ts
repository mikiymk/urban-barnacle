export type { Result, ResultSuccess, ResultFailure, SuccessValue } from "./result/result";
export { isSuccess, isFailure } from "./result/guard";
export { success, failure, result } from "./result/wrap";
export { and } from "./result/and";
export { or } from "./result/or";
export { getValue, getError } from "./result/unwrap";

