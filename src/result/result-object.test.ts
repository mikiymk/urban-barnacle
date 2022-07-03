import { describe, test, expect } from "vitest";
import { success, failure, isSuccess, isFailure, wrap, unwrap } from "./result-object";

describe("generate result", () => {
  test("success", () => {
    let expected = { ok: true, value: 42 };
    let actual = success(42);
    expect(actual).toEqual(expected);
  });

  test("failure", () => {
    let expected = { ok: false, value: new Error("foo") };
    let actual = failure(new Error("foo"));
    expect(actual).toEqual(expected);
  });
});

describe("type guard result", () => {
  test("success is success", () => {
    let result = success(42);
    expect(isSuccess(result)).toBe(true);
    expect(isFailure(result)).toBe(false);
  });

  test("failure is failure", () => {
    let result = failure(new Error("foo"));
    expect(isSuccess(result)).toBe(false);
    expect(isFailure(result)).toBe(true);
  });
});

describe("wrap result", () => {
  test("wrap success", () => {
    let expected = { ok: true, value: 42 };
    let actual = wrap(() => 42);
    expect(actual).toEqual(expected);
  });

  test("wrap failure", () => {
    let expected = { ok: false, value: new Error("foo") };
    let actual = wrap(() => { throw new Error("foo"); });
    expect(actual).toEqual(expected);
  });

  test("wrap non-error failure", () => {
    let expected = { ok: false, value: new Error("foo") };
    let actual = wrap(() => { throw "foo"; });
    expect(actual).toEqual(expected);
  });
});

describe("unwrap result", () => {
  test("unwrap success", () => {
    let result = success(42);
    expect(() => unwrap(result)).not.toThrow();
    expect(unwrap(result)).toBe(42);
  });

  test("unwrap failure", () => {
    let result = failure(new Error("foo"));
    expect(() => unwrap(result)).toThrow("foo");
  });
});
