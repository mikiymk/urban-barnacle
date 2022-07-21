import { success } from "./success";
import { failure } from "./failure";
import { isSuccess } from "./is-success";
import { isFailure } from "./is-failure";
import { wrap } from "./wrap";
import { getValue } from "./get-value";
import { getError } from "./get-value";
import { and } from "./and";
import { or } from "./or";

describe("generate result", () => {
  test("success", () => {
    let expected = [true, 42];
    let actual = success(42);
    expect(actual).toEqual(expected);
  });

  test("failure", () => {
    let expected = [false, new Error("foo")];
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
    let expected = success(42);
    let actual = wrap(() => 42);
    expect(actual).toEqual(expected);
  });

  test("wrap failure", () => {
    let expected = failure(new Error("foo"));
    let actual = wrap(() => { throw new Error("foo"); });
    expect(actual).toEqual(expected);
  });

  test("wrap non-error failure", () => {
    let expected = failure(new Error("foo"));
    let actual = wrap(() => { throw "foo"; });
    expect(actual).toEqual(expected);
  });
});

describe("unwrap result", () => {
  test("unwrap success", () => {
    let result = success(42);
    expect(() => getValue(result)).not.toThrow();
    expect(() => getError(result)).toThrow();

    expect(getValue(result)).toBe(42);
  });

  test("unwrap failure", () => {
    let result = failure(new Error("foo"));
    expect(() => getValue(result)).toThrow();
    expect(() => getError(result)).not.toThrow();

    expect(getError(result)).toEqual(new Error("foo"));
  });

  test("unwrap default value", () => {
    let result = failure(new Error("foo"));
    expect(() => getValue(result, 42)).not.toThrow();
    expect(getValue(result, 42)).toBe(42);

    result = success(42);
    expect(() => getError(result, new Error("foo"))).not.toThrow();
    expect(getError(result, new Error("foo"))).toEqual(new Error("foo"));
  });
});
