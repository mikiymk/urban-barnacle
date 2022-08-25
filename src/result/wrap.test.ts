import { describe, expect, test } from "vitest";

import { FAILURE_TAG, SUCCESS_TAG } from "./result";

import { success, failure, result } from "./wrap";

describe("generate result", () => {
  test("success", () => {
    const actual = success(42),
      expected = [SUCCESS_TAG, 42] as const;
    expect(actual).toEqual(expected);
  });

  test("failure", () => {
    const actual = failure(new Error("foo")),
      expected = [FAILURE_TAG, new Error("foo")] as const;
    expect(actual).toEqual(expected);
  });
});

describe("wrap result", () => {
  test("wrap success", () => {
    const actual = result(() => 42),
      expected = success(42);
    expect(actual).toEqual(expected);
  });

  test("wrap failure", () => {
    const actual = result(() => {
        throw new Error("foo");
      }),
      expected = failure(new Error("foo"));
    expect(actual).toEqual(expected);
  });

  test("wrap non-error failure", () => {
    const actual = result(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw "foo";
      }),
      expected = failure(new Error("foo"));
    expect(actual).toEqual(expected);
  });
});
