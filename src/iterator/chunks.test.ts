import { describe, test, expect } from "vitest";
import { chunks } from "./chunks";
import { from } from "./from";

test("chunks 2", () => {
  let it = from([1, 2, 3, 4, 5]);
  it = chunks(it, 2);

  expect(it.next()).toEqual({ done: false, value: [1, 2] });
  expect(it.next()).toEqual({ done: false, value: [3, 4] });
  expect(it.next()).toEqual({ done: false, value: [5] });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

const iterator = {
  *[Symbol.iterator]() {
    expect(yield 1).toBe(undefined);
    expect(yield 2).toBe("1");
    expect(yield 3).toBe(undefined);
    expect(yield 4).toBe("3");
    expect(yield 5).toBe("5");

    return 42;
  }
};

test("count up iterator", () => {
  let it = from([1, 2, 3, 4, 5]);
  it = chunks(iterator, 2);

  expect(it.next("1")).toEqual({ done: false, value: [1, 2] });
  expect(it.next("3")).toEqual({ done: false, value: [3, 4] });
  expect(it.next("5")).toEqual({ done: false, value: [5] });
  expect(it.next()).toEqual({ done: true, value: 42 });
});
