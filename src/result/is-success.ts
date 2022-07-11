export const isSuccess = <S extends {}>(
  result: Result<S>
): result is ResultSuccess<S> => {
  return result.ok;
};
