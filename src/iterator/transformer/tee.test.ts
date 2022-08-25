import { test, expect } from "vitest";

import { tee } from "./tee";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("tee 2 way", () => {
  const its = tee(iterator(), 2);
  const [it1, it2] = its;

  expect(it1.next()).toEqual({ done: false, value: 1 });
  expect(it1.next()).toEqual({ done: false, value: 2 });
  expect(it1.next()).toEqual({ done: false, value: 3 });
  expect(it1.next()).toEqual({ done: false, value: 4 });
  expect(it1.next()).toEqual({ done: false, value: 5 });
  expect(it1.next()).toEqual({ done: true, value: undefined });

  expect(it2.next()).toEqual({ done: false, value: 1 });
  expect(it2.next()).toEqual({ done: false, value: 2 });
  expect(it2.next()).toEqual({ done: false, value: 3 });
  expect(it2.next()).toEqual({ done: false, value: 4 });
  expect(it2.next()).toEqual({ done: false, value: 5 });
  expect(it2.next()).toEqual({ done: true, value: undefined });
});

test("tee 2 way alternately", () => {
  const its = tee(iterator(), 2);
  const [it1, it2] = its;

  // 1
  expect(it1.next()).toEqual({ done: false, value: 1 });
  // 2
  expect(it1.next()).toEqual({ done: false, value: 2 });

  expect(it2.next()).toEqual({ done: false, value: 1 });
  expect(it2.next()).toEqual({ done: false, value: 2 });
  // 3
  expect(it2.next()).toEqual({ done: false, value: 3 });

  expect(it1.next()).toEqual({ done: false, value: 3 });
  // 4
  expect(it1.next()).toEqual({ done: false, value: 4 });

  expect(it2.next()).toEqual({ done: false, value: 4 });
  // 5
  expect(it2.next()).toEqual({ done: false, value: 5 });
  // Return
  expect(it2.next()).toEqual({ done: true, value: undefined });

  expect(it1.next()).toEqual({ done: false, value: 5 });
  expect(it1.next()).toEqual({ done: true, value: undefined });
});

test("tee 999 way", () => {
  expect.assertions(6 * 999);

  const [it1, ...its] = tee(iterator(), 999);

  expect(it1.next()).toEqual({ done: false, value: 1 });
  expect(it1.next()).toEqual({ done: false, value: 2 });
  expect(it1.next()).toEqual({ done: false, value: 3 });
  expect(it1.next()).toEqual({ done: false, value: 4 });
  expect(it1.next()).toEqual({ done: false, value: 5 });
  expect(it1.next()).toEqual({ done: true, value: undefined });

  for (const it of its) {
    expect(it.next()).toEqual({ done: false, value: 1 });
    expect(it.next()).toEqual({ done: false, value: 2 });
    expect(it.next()).toEqual({ done: false, value: 3 });
    expect(it.next()).toEqual({ done: false, value: 4 });
    expect(it.next()).toEqual({ done: false, value: 5 });
    expect(it.next()).toEqual({ done: true, value: undefined });
  }
});
