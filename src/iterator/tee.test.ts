import { test, expect } from "vitest";

import { tee } from "./tee";

const iterator = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("3");
  expect(yield 3).toBe("4");
  expect(yield 4).toBe("5");
  expect(yield 5).toBe("6");

  return 42;
};

test("tee 2 way", () => {
  expect.assertions(12 + 5);

  const its = tee(iterator(), 2);
  const [it1, it2] = its;

  expect(it1.next("1")).toEqual({ done: false, value: 1 });
  expect(it1.next("2")).toEqual({ done: false, value: 2 });
  expect(it1.next("3")).toEqual({ done: false, value: 3 });
  expect(it1.next("4")).toEqual({ done: false, value: 4 });
  expect(it1.next("5")).toEqual({ done: false, value: 5 });
  expect(it1.next("6")).toEqual({ done: true, value: 42 });

  expect(it2.next("1b")).toEqual({ done: false, value: 1 });
  expect(it2.next("2b")).toEqual({ done: false, value: 2 });
  expect(it2.next("3b")).toEqual({ done: false, value: 3 });
  expect(it2.next("4b")).toEqual({ done: false, value: 4 });
  expect(it2.next("5b")).toEqual({ done: false, value: 5 });
  expect(it2.next("6b")).toEqual({ done: true, value: 42 });
});

test("tee 2 way alternately", () => {
  expect.assertions(12 + 5);

  const its = tee(iterator(), 2);
  const [it1, it2] = its;

  // 1
  expect(it1.next("1")).toEqual({ done: false, value: 1 });
  // 2
  expect(it1.next("2")).toEqual({ done: false, value: 2 });

  expect(it2.next("1b")).toEqual({ done: false, value: 1 });
  expect(it2.next("2b")).toEqual({ done: false, value: 2 });
  // 3
  expect(it2.next("3")).toEqual({ done: false, value: 3 });

  expect(it1.next("3a")).toEqual({ done: false, value: 3 });
  // 4
  expect(it1.next("4")).toEqual({ done: false, value: 4 });

  expect(it2.next("4b")).toEqual({ done: false, value: 4 });
  // 5
  expect(it2.next("5")).toEqual({ done: false, value: 5 });
  // Return
  expect(it2.next("6")).toEqual({ done: true, value: 42 });

  expect(it1.next("5a")).toEqual({ done: false, value: 5 });
  expect(it1.next("6a")).toEqual({ done: true, value: 42 });
});

test("tee 999 way", () => {
  expect.assertions(6 * 999 + 5);

  const [it1, ...its] = tee(iterator(), 999);

  expect(it1.next("1")).toEqual({ done: false, value: 1 });
  expect(it1.next("2")).toEqual({ done: false, value: 2 });
  expect(it1.next("3")).toEqual({ done: false, value: 3 });
  expect(it1.next("4")).toEqual({ done: false, value: 4 });
  expect(it1.next("5")).toEqual({ done: false, value: 5 });
  expect(it1.next("6")).toEqual({ done: true, value: 42 });

  for (const it of its) {
    expect(it.next("1x")).toEqual({ done: false, value: 1 });
    expect(it.next("2x")).toEqual({ done: false, value: 2 });
    expect(it.next("3x")).toEqual({ done: false, value: 3 });
    expect(it.next("4x")).toEqual({ done: false, value: 4 });
    expect(it.next("5x")).toEqual({ done: false, value: 5 });
    expect(it.next("6x")).toEqual({ done: true, value: 42 });
  }
});
