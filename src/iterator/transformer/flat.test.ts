import { test, expect } from "vitest";

import { flat } from "./flat";

const iterator1 = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

const iterator2A = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;

  return 42;
};
const iterator2B = function* (): Generator<number, number, undefined> {
  yield 3;
  yield 4;
  yield 5;

  return 43;
};

const iterator2 = function* (): Generator<
  Generator<number, number, undefined>,
  number,
  undefined
> {
  yield iterator2A();
  yield iterator2B();

  return 44;
};

const iterator3A = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;

  return 42;
};
const iterator3B = function* (): Generator<number, number, undefined> {
  yield 3;
  yield 4;

  return 43;
};

const iterator3C = function* (): Generator<
  Generator<number, number, undefined>,
  number,
  undefined
> {
  yield iterator3A();

  return 44;
};
const iterator3D = function* (): Generator<
  Generator<number, number, undefined> | number,
  number,
  undefined
> {
  yield iterator3B();
  yield 5;

  return 45;
};

const iterator3 = function* (): Generator<
  Generator<Generator<number, number, undefined> | number, number, undefined>,
  number,
  undefined
> {
  yield iterator3C();
  yield iterator3D();

  return 46;
};

test("flat 1 depth to 1 depth", () => {
  const it: Generator<number, void, undefined> = flat(
    iterator1(),
    Number.POSITIVE_INFINITY
  );

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("flat 2 depth to 1 depth", () => {
  const it: Generator<number, void, undefined> = flat(
    iterator2(),
    Number.POSITIVE_INFINITY
  );

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("flat 3 depth to 1 depth", () => {
  const it: Generator<number, void, undefined> = flat(
    iterator3(),
    Number.POSITIVE_INFINITY
  );

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("flat 3 depth to 2 depth", () => {
  const it = flat(iterator3(), 1);

  let result = it.next();
  expect(result.done).toBe(false);
  expect(result.value).toBeInstanceOf(iterator3A);
  result = it.next();
  expect(result.done).toBe(false);
  expect(result.value).toBeInstanceOf(iterator3B);
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});
