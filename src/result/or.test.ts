import { describe, expect, test } from "vitest";

import { or } from "./or";
import { success, failure } from "./wrap";

describe("result or result", () => {
  test("success or success", () => {
    const actual = or(success(42), success(43)),
      expected = success(42);
    expect(actual).toEqual(expected);
  });

  test("success or failure", () => {
    const actual = or(success(42), failure(new Error("bar"))),
      expected = success(42);
    expect(actual).toEqual(expected);
  });

  test("failure or success", () => {
    const actual = or(failure(new Error("foo")), success(43)),
      expected = success(43);
    expect(actual).toEqual(expected);
  });

  test("failure or failure", () => {
    const actual = or(failure(new Error("foo")), failure(new Error("bar"))),
      expected = failure(new Error("bar"));
    expect(actual).toEqual(expected);
  });
});

describe("result or () => result", () => {
  test("success or success", () => {
    const actual = or(success(42), () => success(43)),
      expected = success(42);
    expect(actual).toEqual(expected);
  });

  test("success or failure", () => {
    const actual = or(success(42), () => failure(new Error("bar"))),
      expected = success(42);
    expect(actual).toEqual(expected);
  });

  test("failure or success", () => {
    const actual = or(failure(new Error("foo")), () => success(43)),
      expected = success(43);
    expect(actual).toEqual(expected);
  });

  test("failure or failure", () => {
    const actual = or(failure(new Error("foo")), () =>
        failure(new Error("bar"))
      ),
      expected = failure(new Error("bar"));
    expect(actual).toEqual(expected);
  });
});
