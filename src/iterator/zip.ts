type IteratorsValue<
  T,
  TReturn,
  TNext,
  Its extends Iterator<T, TReturn, TNext>[]
> = {
  [K in keyof Its]: Its[K] extends Iterator<infer U, unknown, unknown>
    ? U
    : never;
};

type IteratorsValueOrUndefined<
  T,
  TReturn,
  TNext,
  Its extends Iterator<T, TReturn, TNext>[]
> = {
  [K in keyof Its]: Its[K] extends Iterator<infer U, unknown, unknown>
    ? U | undefined
    : never;
};

type IteratorsReturnValue<
  T,
  TReturn,
  TNext,
  Its extends Iterator<T, TReturn, TNext>[]
> = {
  [K in keyof Its]: Its[K] extends Iterator<unknown, infer UReturn, unknown>
    ? UReturn
    : never;
};

type IteratorsValueOrReturnValue<
  T,
  TReturn,
  TNext,
  Its extends Iterator<T, TReturn, TNext>[]
> = {
  [K in keyof Its]: Its[K] extends Iterator<infer U, infer UReturn, unknown>
    ? U | UReturn
    : never;
};

type IteratorsNextValue<
  T,
  TReturn,
  TNext,
  Its extends Iterator<T, TReturn, TNext>[]
> = {
  [K in keyof Its]: Its[K] extends Iterator<unknown, unknown, infer UNext>
    ? UNext
    : never;
}[number];

type ZippedGenerator<
  T,
  TReturn,
  TNext,
  Its extends Iterator<T, TReturn, TNext>[]
> = Generator<
  IteratorsValue<T, TReturn, TNext, Its>,
  IteratorsValueOrReturnValue<T, TReturn, TNext, Its>,
  IteratorsNextValue<T, TReturn, TNext, Its>
>;

type LongZippedGenerator<
  T,
  TReturn,
  TNext,
  Its extends Iterator<T, TReturn, TNext>[]
> = Generator<
  IteratorsValueOrUndefined<T, TReturn, TNext, Its>,
  IteratorsReturnValue<T, TReturn, TNext, Its>,
  IteratorsNextValue<T, TReturn, TNext, Its>
>;

export const zip = function* <
  T,
  TReturn,
  TNext,
  Its extends Iterator<T, TReturn, TNext>[]
>(...iterators: Its): ZippedGenerator<T, TReturn, TNext, Its> {
  let curs = iterators.map((iterator) => iterator.next());

  while (curs.every((cur): cur is IteratorYieldResult<T> => !cur.done)) {
    try {
      const next = yield curs.map((cur) => cur.value) as IteratorsValue<
        T,
        TReturn,
        TNext,
        Its
      >;
      curs = iterators.map((iterator) => iterator.next(next as TNext));
    } catch (error) {
      iterators.forEach((iterator) => iterator.throw?.(error));
    }
  }

  return curs.map((cur) => cur.value) as IteratorsValueOrReturnValue<
    T,
    TReturn,
    TNext,
    Its
  >;
};

export const zipLong = function* <
  T,
  TReturn,
  TNext,
  Its extends Iterator<T, TReturn, TNext>[]
>(...iterators: Its): LongZippedGenerator<T, TReturn, TNext, Its> {
  let curs = iterators.map((iterator) => iterator.next());
  const returns: TReturn[] = [];

  while (
    !curs.every((cur): cur is IteratorReturnResult<TReturn> =>
      Boolean(cur.done)
    )
  ) {
    try {
      const next = yield curs.map((cur, index) => {
        if (cur.done) {
          if (!(index in returns)) {
            returns[index] = cur.value;
          }
          return undefined;
        }
        return cur.value;
      }) as IteratorsValueOrUndefined<T, TReturn, TNext, Its>;
      curs = iterators.map((iterator) => iterator.next(next as TNext));
    } catch (error) {
      iterators.forEach((iterator) => iterator.throw?.(error));
    }
  }

  curs.forEach((cur, index) => {
    if (!(index in returns)) {
      returns[index] = cur.value;
    }
  });

  return returns as IteratorsReturnValue<T, TReturn, TNext, Its>;
};
