import { Result, ResultSuccess } from "./result";

export const isSuccess = <S extends {}>(
  result: Result<S>
): result is ResultSuccess<S> => {
  return result[0];
};
