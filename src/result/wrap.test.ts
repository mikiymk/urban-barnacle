import { describe, expect, test } from "vitest";

import { success, failure } from "./result";
import { wrap } from "./wrap";

describe("wrap result", () => {
  test("wrap success", () => {
    const actual = wrap(() => 42),
      expected = success(42);
    expect(actual).toEqual(expected);
  });

  test("wrap failure", () => {
    const actual = wrap(() => {
        throw new Error("foo");
      }),
      expected = failure(new Error("foo"));
    expect(actual).toEqual(expected);
  });

  test("wrap non-error failure", () => {
    const actual = wrap(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw "foo";
      }),
      expected = failure(new Error("foo"));
    expect(actual).toEqual(expected);
  });
});
