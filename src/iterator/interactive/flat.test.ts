import { test, expect } from "vitest";

import { flat } from "./flat";

const iterator1 = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("3");
  expect(yield 3).toBe("4");
  expect(yield 4).toBe("5");
  expect(yield 5).toBe("6");

  return 42;
};

const iterator2A = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("3");

  return 42;
};
const iterator2B = function* (): Generator<number, number, string> {
  expect(yield 3).toBe("4");
  expect(yield 4).toBe("5");
  expect(yield 5).toBe("6");

  return 43;
};

const iterator2 = function* (): Generator<
  Generator<number, number, string>,
  number,
  number
> {
  expect(yield iterator2A()).toBe(42);
  expect(yield iterator2B()).toBe(43);

  return 44;
};

const iterator3A = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("3");

  return 42;
};
const iterator3B = function* (): Generator<number, number, string> {
  expect(yield 3).toBe("4");
  expect(yield 4).toBe("5");

  return 43;
};

const iterator3C = function* (): Generator<
  Generator<number, number, string>,
  number,
  number
> {
  expect(yield iterator3A()).toBe(42);

  return 44;
};
const iterator3D = function* (): Generator<
  Generator<number, number, string> | number,
  number,
  number | string
> {
  expect(yield iterator3B()).toBe(43);
  expect(yield 5).toBe("6");

  return 45;
};

const iterator3 = function* (): Generator<
  Generator<
    Generator<number, number, string> | number,
    number,
    number | string
  >,
  number,
  number
> {
  expect(yield iterator3C()).toBe(44);
  expect(yield iterator3D()).toBe(45);

  return 46;
};

test("flat 1 depth to 1 depth", () => {
  expect.assertions(6 + 5);

  const it: Generator<number, number, string> = flat(
    iterator1(),
    Number.POSITIVE_INFINITY
  );

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });
  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });
  expect(it.next("6")).toEqual({ done: true, value: 42 });
});

test("flat 2 depth to 1 depth", () => {
  expect.assertions(6 + 7);

  const it: Generator<number, number, string> = flat(
    iterator2(),
    Number.POSITIVE_INFINITY
  );

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });
  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });
  expect(it.next("6")).toEqual({ done: true, value: 44 });
});

test("flat 3 depth to 1 depth", () => {
  expect.assertions(6 + 9);

  const it: Generator<number, number | string, number | string> = flat(
    iterator3(),
    Number.POSITIVE_INFINITY
  );

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });
  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });
  expect(it.next("6")).toEqual({ done: true, value: 46 });
});

test("flat 3 depth to 2 depth", () => {
  expect.assertions(6 + 5);

  const it = flat(iterator3(), 1);

  let result = it.next();
  expect(result.done).toBe(false);
  expect(result.value).toBeInstanceOf(iterator3A);
  result = it.next(42);
  expect(result.done).toBe(false);
  expect(result.value).toBeInstanceOf(iterator3B);
  expect(it.next(43)).toEqual({ done: false, value: 5 });
  expect(it.next("6")).toEqual({ done: true, value: 46 });
});
