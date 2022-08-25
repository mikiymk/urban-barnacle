import { test, expect } from "vitest";

import { withIndex } from "./with-index";

const iterator = function* (): Generator<string, number, string> {
  expect(yield "a").toBe("2");
  expect(yield "b").toBe("3");
  expect(yield "c").toBe("4");
  expect(yield "d").toBe("5");
  expect(yield "e").toBe("6");

  return 42;
};

test("iterator with index", () => {
  expect.assertions(6 + 5);

  const it = withIndex(iterator(), 1);

  expect(it.next("1")).toEqual({ done: false, value: [1, "a"] });
  expect(it.next("2")).toEqual({ done: false, value: [2, "b"] });
  expect(it.next("3")).toEqual({ done: false, value: [3, "c"] });
  expect(it.next("4")).toEqual({ done: false, value: [4, "d"] });
  expect(it.next("5")).toEqual({ done: false, value: [5, "e"] });
  expect(it.next("6")).toEqual({ done: true, value: 42 });
});
