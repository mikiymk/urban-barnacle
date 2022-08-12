import { describe, expect, test } from "vitest";

import { and } from "./and";
import { success, failure } from "./wrap";

describe("result and result", () => {
  test("success and success", () => {
    const actual = and(success(42), success(43)),
      expected = success(43);
    expect(actual).toEqual(expected);
  });

  test("success and failure", () => {
    const actual = and(success(42), failure(new Error("bar"))),
      expected = failure(new Error("bar"));
    expect(actual).toEqual(expected);
  });

  test("failure and success", () => {
    const actual = and(failure(new Error("foo")), success(43)),
      expected = failure(new Error("foo"));
    expect(actual).toEqual(expected);
  });

  test("failure and failure", () => {
    const actual = and(failure(new Error("foo")), failure(new Error("bar"))),
      expected = failure(new Error("foo"));
    expect(actual).toEqual(expected);
  });
});

describe("result and () => result", () => {
  test("success and success", () => {
    const actual = and(success(42), () => success(43)),
      expected = success(43);
    expect(actual).toEqual(expected);
  });

  test("success and failure", () => {
    const actual = and(success(42), () => failure(new Error("bar"))),
      expected = failure(new Error("bar"));
    expect(actual).toEqual(expected);
  });

  test("failure and success", () => {
    const actual = and(failure(new Error("foo")), () => success(43)),
      expected = failure(new Error("foo"));
    expect(actual).toEqual(expected);
  });

  test("failure and failure", () => {
    const actual = and(failure(new Error("foo")), () =>
        failure(new Error("bar"))
      ),
      expected = failure(new Error("foo"));
    expect(actual).toEqual(expected);
  });
});
