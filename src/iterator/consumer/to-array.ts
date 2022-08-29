import { toIterable } from "./to-iterable";

export const toArray = function <T>(iterator: Iterator<T>): T[] {
  const valueCollector = [];

  for (const value of toIterable(iterator)) {
    valueCollector.push(value);
  }

  return valueCollector;
};
