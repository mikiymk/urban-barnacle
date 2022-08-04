export const find = function <T>(
  iterator: Iterator<T>,
  findFunction: (value: T) => boolean
): T | undefined {
  let cur = iterator.next();

  while (!cur.done) {
    if (findFunction(cur.value)) {
      return cur.value;
    }
    cur = iterator.next();
  }

  return undefined;
};
