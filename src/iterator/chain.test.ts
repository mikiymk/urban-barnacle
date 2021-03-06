import { describe, test, expect } from "vitest";
import { chain } from "./chain";
import { from } from "./from";

test("chain 1 iterator", () => {
  let iterator = from([1, 2, 3, 4, 5]);
  let it = chain(iterator);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("chain 2 iterator", () => {
  let iterator1 = from([1, 2, 3, 4, 5]);
  let iterator2 = from([6, 7, 8, 9, 10]);
  let it = chain(iterator1, iterator2);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: false, value: 6 });
  expect(it.next()).toEqual({ done: false, value: 7 });
  expect(it.next()).toEqual({ done: false, value: 8 });
  expect(it.next()).toEqual({ done: false, value: 9 });
  expect(it.next()).toEqual({ done: false, value: 10 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("transmit next value", () => {
  expect.assertions(21);
  let iterator1 = {
    *[Symbol.iterator]() {
      expect(yield 1).toBe("2");
      expect(yield 2).toBe("3");
      expect(yield 3).toBe("4");
      expect(yield 4).toBe("5");
      expect(yield 5).toBe("6");

      return 42;
    }
  };

  let iterator2 = {
    *[Symbol.iterator]() {
      expect(yield 6).toBe("7");
      expect(yield 7).toBe("8");
      expect(yield 8).toBe("9");
      expect(yield 9).toBe("10");
      expect(yield 10).toBe("11");

      return 43;
    }
  };

  let it = chunks(iterator1, iterator2);

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });
  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });
  expect(it.next("6")).toEqual({ done: false, value: 6 });
  expect(it.next("7")).toEqual({ done: false, value: 7 });
  expect(it.next("8")).toEqual({ done: false, value: 8 });
  expect(it.next("9")).toEqual({ done: false, value: 9 });
  expect(it.next("10")).toEqual({ done: false, value: 10 });
  expect(it.next("11")).toEqual({ done: true, value: 43 });
});
