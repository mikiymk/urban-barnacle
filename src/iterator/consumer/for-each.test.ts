import { test, expect } from "vitest";

import { forEach } from "./for-each";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("find all match", () => {
  let count = 1;
  forEach(iterator(), (item) => {
    expect(item).toBe(count);
    count += 1;
  });
});
