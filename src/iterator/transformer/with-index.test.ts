import { test, expect } from "vitest";

import { withIndex } from "./with-index";

const iterator = function* (): Generator<string, number, undefined> {
  yield "a";
  yield "b";
  yield "c";
  yield "d";
  yield "e";

  return 42;
};

test("iterator with index", () => {
  const it = withIndex(iterator(), 1);

  expect(it.next()).toEqual({ done: false, value: [1, "a"] });
  expect(it.next()).toEqual({ done: false, value: [2, "b"] });
  expect(it.next()).toEqual({ done: false, value: [3, "c"] });
  expect(it.next()).toEqual({ done: false, value: [4, "d"] });
  expect(it.next()).toEqual({ done: false, value: [5, "e"] });
  expect(it.next()).toEqual({ done: true, value: undefined });
});
