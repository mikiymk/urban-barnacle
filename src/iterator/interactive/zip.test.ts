import { test, expect } from "vitest";

import { zip, zipLong } from "./zip";

const iterator1 = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("3");
  expect(yield 3).toBe("4");
  expect(yield 4).toBe("5");
  expect(yield 5).toBe("6");

  return 42;
};

const iterator2 = function* (): Generator<string, number, string> {
  expect(yield "a").toBe("2");
  expect(yield "b").toBe("3");
  expect(yield "c").toBe("4");
  expect(yield "d").toBe("5");
  expect(yield "e").toBe("6");
  expect(yield "f").toBe("7");
  expect(yield "g").toBe("8");

  return 43;
};

test("zip 2 iterators", () => {
  expect.assertions(6 + 5 + 5);

  const it = zip(iterator1(), iterator2());

  expect(it.next("1")).toEqual({ done: false, value: [1, "a"] });
  expect(it.next("2")).toEqual({ done: false, value: [2, "b"] });
  expect(it.next("3")).toEqual({ done: false, value: [3, "c"] });
  expect(it.next("4")).toEqual({ done: false, value: [4, "d"] });
  expect(it.next("5")).toEqual({ done: false, value: [5, "e"] });
  expect(it.next("6")).toEqual({ done: true, value: [42, "f"] });
});

test("zip 2 iterators", () => {
  expect.assertions(8 + 5 + 7);

  const it = zipLong(iterator1(), iterator2());

  expect(it.next("1")).toEqual({ done: false, value: [1, "a"] });
  expect(it.next("2")).toEqual({ done: false, value: [2, "b"] });
  expect(it.next("3")).toEqual({ done: false, value: [3, "c"] });
  expect(it.next("4")).toEqual({ done: false, value: [4, "d"] });
  expect(it.next("5")).toEqual({ done: false, value: [5, "e"] });
  expect(it.next("6")).toEqual({ done: false, value: [undefined, "f"] });
  expect(it.next("7")).toEqual({ done: false, value: [undefined, "g"] });
  expect(it.next("8")).toEqual({ done: true, value: [42, 43] });
});
