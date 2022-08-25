import { test, expect } from "vitest";

import { zip, zipLong } from "./zip";

const iterator1 = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

const iterator2 = function* (): Generator<string, number, undefined> {
  yield "a";
  yield "b";
  yield "c";
  yield "d";
  yield "e";
  yield "f";
  yield "g";

  return 43;
};

test("zip 2 iterators", () => {
  const it = zip(iterator1(), iterator2());

  expect(it.next()).toEqual({ done: false, value: [1, "a"] });
  expect(it.next()).toEqual({ done: false, value: [2, "b"] });
  expect(it.next()).toEqual({ done: false, value: [3, "c"] });
  expect(it.next()).toEqual({ done: false, value: [4, "d"] });
  expect(it.next()).toEqual({ done: false, value: [5, "e"] });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("zip 2 iterators", () => {
  const it = zipLong(iterator1(), iterator2());

  expect(it.next()).toEqual({ done: false, value: [1, "a"] });
  expect(it.next()).toEqual({ done: false, value: [2, "b"] });
  expect(it.next()).toEqual({ done: false, value: [3, "c"] });
  expect(it.next()).toEqual({ done: false, value: [4, "d"] });
  expect(it.next()).toEqual({ done: false, value: [5, "e"] });
  expect(it.next()).toEqual({ done: false, value: [undefined, "f"] });
  expect(it.next()).toEqual({ done: false, value: [undefined, "g"] });
  expect(it.next()).toEqual({ done: true, value: undefined });
});
