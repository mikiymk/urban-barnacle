import { describe, test, expect } from "vitest";
import { countUp } from "./count-up";

test("count up", () => {
  let it = countUp();
  expect(it.next().value).toBe(0);
  expect(it.next().value).toBe(1);
  expect(it.next().value).toBe(2);
  expect(it.next().value).toBe(3);
  expect(it.next().value).toBe(4);
});

test("count up start", () => {
  let it = countUp(5);
  expect(it.next().value).toBe(5);
  expect(it.next().value).toBe(6);
  expect(it.next().value).toBe(7);
  expect(it.next().value).toBe(8);
  expect(it.next().value).toBe(9);
});
