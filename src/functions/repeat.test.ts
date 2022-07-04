import { describe, test, expect } from "vitest";
import { repeat } from "./repeat";

test("repeat", () => {
  let it = repeat(42);

  expect(it.next()).toEqual({ done: false, value: 42 });
  expect(it.next()).toEqual({ done: false, value: 42 });
  expect(it.next()).toEqual({ done: false, value: 42 });
  expect(it.next()).toEqual({ done: false, value: 42 });
  expect(it.next()).toEqual({ done: false, value: 42 });
});
