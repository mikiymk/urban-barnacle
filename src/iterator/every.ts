export const every = <T>(
  iterator: Iterator<T>,
  everyFunction: (value: T) => boolean
): boolean => {
  let cur = iterator.next();

  while (!cur.done) {
    if (!everyFunction(cur.value)) {
      return false;
    }
    cur = iterator.next();
  }

  return true;
};
