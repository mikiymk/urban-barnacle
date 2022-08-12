import { describe, expect, test } from "vitest";

import { getValue, getError } from "./unwrap";
import { success, failure } from "./wrap";

describe("unwrap result", () => {
  test("unwrap success", () => {
    const result = success(42);

    expect(() => getValue(result)).not.toThrow();
    expect(() => getError(result)).toThrow();

    expect(getValue(result)).toBe(42);
  });

  test("unwrap failure", () => {
    const result = failure(new Error("foo"));

    expect(() => getValue(result)).toThrow();
    expect(() => getError(result)).not.toThrow();

    expect(getError(result)).toEqual(new Error("foo"));
  });

  test("unwrap success with default value", () => {
    const result = success(42);

    expect(() => getError(result, new Error("foo"))).not.toThrow();

    expect(getError(result, new Error("foo"))).toEqual(new Error("foo"));
  });

  test("unwrap failure with default value", () => {
    const result = failure(new Error("foo"));

    expect(() => getValue(result, 42)).not.toThrow();

    expect(getValue(result, 42)).toBe(42);
  });
});
