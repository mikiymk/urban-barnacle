export const and = <S extends {}>(
  result1: Result<S>,
  ...results: Result<S>[]
): Result<S> => {
  for (const result of results) {
    if (isFailure(result)) {
      return result;
    }
  }

  return results.at(-1) ?? result1;
};

export const or = <S extends {}>(
  result1: Result<S>,
  ...results: Result<S>[]
): Result<S> => {
  for (const result of results) {
    if (isSuccess(result)) {
      return result;
    }
  }

  return results.at(-1) ?? result1;
};
