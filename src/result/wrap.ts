import { Result } from "./result";
import { success } from "./success";
import { failure } from "./failure";

export const wrap = <S extends {}>(callback: () => S): Result<S> => {
  try {
    return success(callback());
  } catch (error) {
    return failure(error instanceof Error ? error : new Error("" + error));
  }
};
