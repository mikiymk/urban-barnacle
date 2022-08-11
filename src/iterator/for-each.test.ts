import { test, expect } from "vitest";

import { forEach } from "./for-each";

const iterator = function* (): Generator<number, number, undefined> {
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe(undefined);
  expect(yield 3).toBe(undefined);
  expect(yield 4).toBe(undefined);
  expect(yield 5).toBe(undefined);

  return 42;
};

test("find all match", () => {
  expect.assertions(1 + 5 + 5);

  let count = 1;
  const result = forEach(iterator(), (item) => {
    expect(item).toBe(count);
    count += 1;
  });

  expect(result).toBe(42);
});
