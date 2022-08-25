type IteratorsValue<T, Its extends Iterator<T>[]> = {
  [K in keyof Its]: Its[K] extends Iterator<infer U> ? U : never;
};

type IteratorsValueOrUndefined<T, Its extends Iterator<T>[]> = {
  [K in keyof Its]: Its[K] extends Iterator<infer U> ? U | undefined : never;
};

type ZippedGenerator<T, Its extends Iterator<T>[]> = Generator<
  IteratorsValue<T, Its>,
  void,
  undefined
>;

type LongZippedGenerator<T, Its extends Iterator<T>[]> = Generator<
  IteratorsValueOrUndefined<T, Its>,
  void,
  undefined
>;

export const zip = function* <T, Its extends Iterator<T>[]>(
  ...iterators: Its
): ZippedGenerator<T, Its> {
  let curs = iterators.map((iterator) => iterator.next());

  while (curs.every((cur): cur is IteratorYieldResult<T> => !cur.done)) {
    yield curs.map((cur) => cur.value) as IteratorsValue<T, Its>;
    curs = iterators.map((iterator) => iterator.next());
  }
};

export const zipLong = function* <T, Its extends Iterator<T>[]>(
  ...iterators: Its
): LongZippedGenerator<T, Its> {
  let curs = iterators.map((iterator) => iterator.next());

  while (!curs.every((cur) => Boolean(cur.done))) {
    yield curs.map((cur) => {
      if (cur.done) {
        return undefined;
      }
      return cur.value;
    }) as IteratorsValueOrUndefined<T, Its>;
    curs = iterators.map((iterator) => iterator.next());
  }
};
