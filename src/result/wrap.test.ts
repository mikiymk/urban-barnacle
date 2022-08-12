import { describe, expect, test } from "vitest";

import { success, failure, result } from "./wrap";

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
