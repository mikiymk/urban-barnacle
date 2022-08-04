import { describe, expect, test } from "vitest";

import { success, failure } from "./result";

describe("generate result", () => {
  test("success", () => {
    const actual = success(42),
      expected = [42] as const;
    expect(actual).toEqual(expected);
  });

  test("failure", () => {
    const actual = failure(new Error("foo")),
      expected = [undefined, new Error("foo")] as const;
    expect(actual).toEqual(expected);
  });
});
