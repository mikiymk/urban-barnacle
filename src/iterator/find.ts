export function find<T>(iterator: Iterator<T>, findFunction: (value: T) => boolean): T | undefined {
  let cur = iterator.next();

  while (!cur.done) {
    if (someFunction(cur.value)) {
      return cur.value;
    }
    cur = iterator.next();
  }

  return undefined;
}
