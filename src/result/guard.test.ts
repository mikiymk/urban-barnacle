import { describe, expect, test } from "vitest";

import { isSuccess, isFailure } from "./guard";
import { success, failure } from "./wrap";

describe("type guard result", () => {
  test("success is success", () => {
    const result = success(42);
    expect(isSuccess(result)).toBe(true);
    expect(isFailure(result)).toBe(false);
  });

  test("failure is failure", () => {
    const result = failure(new Error("foo"));
    expect(isSuccess(result)).toBe(false);
    expect(isFailure(result)).toBe(true);
  });
});
