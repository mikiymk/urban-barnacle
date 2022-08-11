import { test, expect } from "vitest";

import { from, fromArray, fromIterable } from "./from";

const array = [1, 2, 3, 4, 5];
const arrayLike = {
  /* eslint-disable @typescript-eslint/naming-convention */
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "4": 5,
  /* eslint-enable @typescript-eslint/naming-convention */
  length: 5,
};

const map = new Map([
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
]);
const set = new Set([1, 2, 3, 4, 5]);
const iterable = {
  *[Symbol.iterator](): Generator<number, void> {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
  },
};

test("fromArray Array", () => {
  const it = fromArray(array);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("fromArray ArrayLike", () => {
  const it = fromArray(arrayLike);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("fromIterable Array", () => {
  const it = fromIterable(array);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("fromIterable Map", () => {
  const it = fromIterable(map);

  expect(it.next()).toEqual({ done: false, value: [0, 1] });
  expect(it.next()).toEqual({ done: false, value: [1, 2] });
  expect(it.next()).toEqual({ done: false, value: [2, 3] });
  expect(it.next()).toEqual({ done: false, value: [3, 4] });
  expect(it.next()).toEqual({ done: false, value: [4, 5] });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("fromIterable Set", () => {
  const it = fromIterable(set);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("fromIterable Iterable", () => {
  const it = fromIterable(iterable);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("from Array", () => {
  const it = from(array);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("from ArrayLike", () => {
  const it = from(arrayLike);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("from Map", () => {
  const it = from(map);

  expect(it.next()).toEqual({ done: false, value: [0, 1] });
  expect(it.next()).toEqual({ done: false, value: [1, 2] });
  expect(it.next()).toEqual({ done: false, value: [2, 3] });
  expect(it.next()).toEqual({ done: false, value: [3, 4] });
  expect(it.next()).toEqual({ done: false, value: [4, 5] });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("from Set", () => {
  const it = from(set);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("from Iterable", () => {
  const it = from(iterable);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});
