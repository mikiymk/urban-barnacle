import { describe, test, expect } from "vitest";
import { empty } from "./empty";

test("empty iterator", () => {
  let it = empty();
  expect(it.next()).toEqual({ done: true, value: undefined });
});
