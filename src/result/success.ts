import { ResultSuccess } from "./result";

export const success = <S extends {}>(value: S): ResultSuccess<S> => {
  return [true, value];
};
