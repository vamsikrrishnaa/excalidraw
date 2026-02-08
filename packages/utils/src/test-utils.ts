import { diffStringsUnified } from "jest-diff";

declare const expect: {
  extend: (matchers: Record<string, unknown>) => void;
};

expect.extend({
  toCloselyEqualPoints(
    received: ReadonlyArray<ReadonlyArray<number>>,
    expected: ReadonlyArray<ReadonlyArray<number>>,
    precision?: number,
  ) {
    if (!Array.isArray(received) || !Array.isArray(expected)) {
      throw new Error("expected and received are not point arrays");
    }

    const p = precision ?? 2;
    const COMPARE = 1 / p === 0 ? 1 : Math.pow(10, p);
    const pass = expected.every(
      (point: ReadonlyArray<number>, idx: number) =>
        Math.abs(received[idx][0] - point[0]) < COMPARE &&
        Math.abs(received[idx][1] - point[1]) < COMPARE,
    );

    if (!pass) {
      return {
        message: () => ` The provided array of points are not close enough.

${diffStringsUnified(
  JSON.stringify(expected, undefined, 2),
  JSON.stringify(received, undefined, 2),
)}`,
        pass: false,
      };
    }

    return {
      message: () => `expected ${received} to not be close to ${expected}`,
      pass: true,
    };
  },
});
