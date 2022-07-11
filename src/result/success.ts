import { Result } from "./result";

export const success = <S extends {}>(value: S): Result<S> => {
  return [true, value];
};
