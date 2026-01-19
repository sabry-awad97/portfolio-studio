import { describe, it, expect } from "vitest";
import fc from "fast-check";

describe("Testing Framework Setup", () => {
  it("should have vitest configured correctly", () => {
    expect(true).toBe(true);
  });

  it("should have fast-check configured correctly", () => {
    // Simple property test: reversing a string twice returns the original
    fc.assert(
      fc.property(fc.string(), (str) => {
        const reversed = str.split("").reverse().join("");
        const doubleReversed = reversed.split("").reverse().join("");
        return doubleReversed === str;
      }),
      { numRuns: 100 },
    );
  });

  it("should support property-based testing with custom generators", () => {
    // Test that adding a positive number always increases the value
    fc.assert(
      fc.property(fc.integer(), fc.nat(), (base, increment) => {
        return base + increment >= base;
      }),
      { numRuns: 100 },
    );
  });
});
