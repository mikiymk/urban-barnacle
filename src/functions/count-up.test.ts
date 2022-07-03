import { describe, test, expect } from "vitest";
import { countUp } from "./count-up";

test("count up", () => {
  let it = countUp();

  expect(it.next()).toEqual({ done: false, value: 0 });
  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
});

test("count up start", () => {
  let it = countUp(5);

  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: false, value: 6 });
  expect(it.next()).toEqual({ done: false, value: 7 });
  expect(it.next()).toEqual({ done: false, value: 8 });
  expect(it.next()).toEqual({ done: false, value: 9 });
});
