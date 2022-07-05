export function map<T, U, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, mapFunction: (value: T) => U): Generator<U, TReturn, TNext>;
export function map<T, U, TReturn, UReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, mapFunction: (value: T) => U, mapReturnFunction: (value: TReturn) => UReturn): Generator<U, UReturn, TNext>;
export function map<T, U, TReturn, UReturn, TNext, UNext>(iterator: Iterator<T, TReturn, TNext>, mapFunction: (value: T) => U, mapReturnFunction: (value: TReturn) => UReturn, mapNextFunction: (value: UNext) => TNext): Generator<U, UReturn, UNext>;
export function* map<T, U, TReturn, UReturn, TNext, UNext>(iterator: Iterator<T, TReturn, TNext | UNext>, mapFunction: (value: T) => U, mapReturnFunction?: (value: TReturn) => UReturn, mapNextFunction?: (value: TNext) => UNext): Generator<U, TReturn | UReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield mapFunction(cur.value);
      const mappedNext = mapNextFunction ? mapNextFunction(next) : next;
      cur = iterator.next(mappedNext);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return mapReturnFunction ? mapReturnFunction(cur.value) : cur.value;
}
