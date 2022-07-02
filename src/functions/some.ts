export function some<T>(iterator: Iterator<T>, someFunction: (value: T) => boolean): boolean {
  let cur = iterator.next();

  while (!cur.done) {
    if (someFunction(cur.value)) {
      return true;
    }
    cur = iterator.next();
  }

  return false;
}
