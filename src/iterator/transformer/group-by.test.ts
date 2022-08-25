import { test, expect } from "vitest";

import { groupBy } from "./group-by";

const iterator = function* (): Generator<[number, string], number, undefined> {
  yield [1, "1"];
  yield [1, "2"];
  yield [1, "3"];
  yield [1, "4"];
  yield [2, "5"];
  yield [3, "6"];
  yield [3, "7"];
  yield [4, "8"];
  yield [5, "9"];
  yield [5, "10"];
  yield [5, "11"];

  return 42;
};

test("group by predication", () => {
  const result = groupBy(iterator(), (prev, curr) => prev[0] === curr[0]);

  expect(result.next()).toEqual({
    done: false,
    value: [
      [1, "1"],
      [1, "2"],
      [1, "3"],
      [1, "4"],
    ],
  });
  expect(result.next()).toEqual({
    done: false,
    value: [[2, "5"]],
  });
  expect(result.next()).toEqual({
    done: false,
    value: [
      [3, "6"],
      [3, "7"],
    ],
  });
  expect(result.next()).toEqual({
    done: false,
    value: [[4, "8"]],
  });
  expect(result.next()).toEqual({
    done: false,
    value: [
      [5, "9"],
      [5, "10"],
      [5, "11"],
    ],
  });
  expect(result.next()).toEqual({ done: true, value: undefined });
});
