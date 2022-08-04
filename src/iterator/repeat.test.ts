import { test, expect } from "vitest";

import { repeat } from "./repeat";

test("repeat", () => {
  const it = repeat(42);

  expect(it.next()).toEqual({ done: false, value: 42 });
  expect(it.next()).toEqual({ done: false, value: 42 });
  expect(it.next()).toEqual({ done: false, value: 42 });
  expect(it.next()).toEqual({ done: false, value: 42 });
  expect(it.next()).toEqual({ done: false, value: 42 });
});

test("value object equality", () => {
  const fooObj = { foo: "foo" };
  const it = repeat(fooObj);

  expect(it.next().value).toBe(fooObj);
});
