import { identity } from "../transformer/identity";

export const toArray = function <T>(iterator: Iterator<T>): T[] {
  const valueCollector = [];

  for (const value of identity(iterator)) {
    valueCollector.push(value);
  }

  return valueCollector;
};
