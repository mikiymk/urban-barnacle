import { describe, test, expect } from "vitest";
import { countUp } from "./count-up";

test("count up", () => {
  let it = countUp();
  expect(it.next().value).toEqual(0);
  expect(it.next().value).toEqual(1);
  expect(it.next().value).toEqual(2);
  expect(it.next().value).toEqual(3);
  expect(it.next().value).toEqual(4);
});

test("count up start", () => {
  let it = countUp(5);
  expect(it.next().value).toEqual(5);
  expect(it.next().value).toEqual(6);
  expect(it.next().value).toEqual(7);
  expect(it.next().value).toEqual(8);
  expect(it.next().value).toEqual(9);
});
