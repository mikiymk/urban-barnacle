import { describe, expect, test } from "vitest";

import {
  success,
  failure,
  wrap,
  SUCCESS_TAG,
  and,
  FAILURE_TAG,
  getError,
  getValue,
  isFailure,
  isSuccess,
  or,
} from "./symbol-tagged-tuple";

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
