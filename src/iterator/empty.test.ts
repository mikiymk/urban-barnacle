import { test, expect } from "vitest";

import { empty } from "./empty";

test("empty iterator", () => {
  const it = empty();
  expect(it.next()).toEqual({ done: true, value: undefined });
});
