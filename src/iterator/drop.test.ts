import { test, expect } from "vitest";

import { drop, dropCount, dropWhile } from "./drop";
import { from } from "./from";

test("dropCount count", () => {
  const iterator = from([1, 2, 3, 4, 5]);
  const it = dropCount(iterator, 3);

  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("dropWhile while", () => {
  const iterator = from([1, 2, 3, 4, 5]);
  const it = dropWhile(iterator, v => v < 4);

  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("drop count", () => {
  const iterator = from([1, 2, 3, 4, 5]);
  const it = drop(iterator, 3);

  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("drop while", () => {
  const iterator = from([1, 2, 3, 4, 5]);
  const it = drop(iterator, v => v < 4);

  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});
