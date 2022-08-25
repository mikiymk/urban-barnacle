import { test, expect } from "vitest";

import { filter } from "./filter";

test("filter no filtered", () => {
  expect.assertions(6 + 5);
  const iterator1 = function* (): Generator<number, number, string> {
    expect(yield 1).toBe("2");
    expect(yield 2).toBe("3");
    expect(yield 3).toBe("4");
    expect(yield 4).toBe("5");
    expect(yield 5).toBe("6");

    return 42;
  };

  const it = filter(iterator1(), (item) => item > 0);

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });
  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });
  expect(it.next("6")).toEqual({ done: true, value: 42 });
});

test("filter some filtered", () => {
  expect.assertions(3 + 5);

  const iterator2 = function* (): Generator<number, number, string> {
    expect(yield 1).toBe(undefined);
    expect(yield 2).toBe("4");
    expect(yield 3).toBe(undefined);
    expect(yield 4).toBe("6");
    expect(yield 5).toBe(undefined);

    return 42;
  };

  const it = filter(iterator2(), (item) => item % 2 === 0);

  expect(it.next("2")).toEqual({ done: false, value: 2 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("6")).toEqual({ done: true, value: 42 });
});

test("filter all filtered", () => {
  expect.assertions(1 + 5);

  const iterator3 = function* (): Generator<number, number, string> {
    expect(yield 1).toBe(undefined);
    expect(yield 2).toBe(undefined);
    expect(yield 3).toBe(undefined);
    expect(yield 4).toBe(undefined);
    expect(yield 5).toBe(undefined);

    return 42;
  };

  const it = filter(iterator3(), (item) => item < 0);

  expect(it.next("6")).toEqual({ done: true, value: 42 });
});
