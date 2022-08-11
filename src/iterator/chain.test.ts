import { test, expect } from "vitest";

import { chain } from "./chain";

export const iterator1 = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("3");
  expect(yield 3).toBe("4");
  expect(yield 4).toBe("5");
  expect(yield 5).toBe("6");

  return 42;
};

export const iterator2 = function* (): Generator<number, number, string> {
  expect(yield 6).toBe("7");
  expect(yield 7).toBe("8");
  expect(yield 8).toBe("9");
  expect(yield 9).toBe("10");
  expect(yield 10).toBe("11");

  return 43;
};

test("chain 1 iterator", () => {
  expect.assertions(6 + 5);

  const it = chain(iterator1());

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });
  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });
  expect(it.next("6")).toEqual({ done: true, value: 42 });
});

test("chain 2 iterator", () => {
  expect.assertions(11 + 10);

  const it = chain(iterator1(), iterator2());

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });
  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });
  expect(it.next("6")).toEqual({ done: false, value: 6 });
  expect(it.next("7")).toEqual({ done: false, value: 7 });
  expect(it.next("8")).toEqual({ done: false, value: 8 });
  expect(it.next("9")).toEqual({ done: false, value: 9 });
  expect(it.next("10")).toEqual({ done: false, value: 10 });
  expect(it.next("11")).toEqual({ done: true, value: 43 });
});
