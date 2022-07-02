export function reduce<T, TNext>(iterator: Iterator<T, void, TNext>, reduceFunction: (previousValue: T, currentValue: T) => T, initialValue: T, nextProvidor: () => TNext): T;
export function reduce<T, TNext, U>(iterator: Iterator<T, void, TNext>, reduceFunction: (previousValue: U, currentValue: T) => U, initialValue: U, nextProvidor: () => TNext): U;
export function reduce<T, TNext, U>(iterator: Iterator<T, void, TNext>, reduceFunction: (previousValue: T | U, currentValue: T) => T | U, initialValue: T | U, nextProvidor: () => TNext): T | U {
  let prev = initialValue ?? iterator.next().value;
  let curr = iterator.next();

  while (!curr.done) {
    prev = reduceFunction(prev, curr.value);
    curr = iterator.next(nextProvidor());
  }

  return prev
}
