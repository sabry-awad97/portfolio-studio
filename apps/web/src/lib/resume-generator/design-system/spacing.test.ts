import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { SPACING } from "./spacing";

describe("Design System - Spacing", () => {
  it("should export all spacing values", () => {
    expect(SPACING.xs).toBeDefined();
    expect(SPACING.sm).toBeDefined();
    expect(SPACING.md).toBeDefined();
    expect(SPACING.lg).toBeDefined();
    expect(SPACING.xl).toBeDefined();
  });

  it("should have positive numeric values for all spacing", () => {
    expect(SPACING.xs).toBeGreaterThan(0);
    expect(SPACING.sm).toBeGreaterThan(0);
    expect(SPACING.md).toBeGreaterThan(0);
    expect(SPACING.lg).toBeGreaterThan(0);
    expect(SPACING.xl).toBeGreaterThan(0);
  });

  it("should have spacing values in ascending order", () => {
    expect(SPACING.xs).toBeLessThan(SPACING.sm);
    expect(SPACING.sm).toBeLessThan(SPACING.md);
    expect(SPACING.md).toBeLessThan(SPACING.lg);
    expect(SPACING.lg).toBeLessThan(SPACING.xl);
  });

  it("should have all spacing values as numbers", () => {
    expect(typeof SPACING.xs).toBe("number");
    expect(typeof SPACING.sm).toBe("number");
    expect(typeof SPACING.md).toBe("number");
    expect(typeof SPACING.lg).toBe("number");
    expect(typeof SPACING.xl).toBe("number");
  });

  // Property 1: Design system exports valid spacing
  it("Property 1: Design system exports valid spacing", () => {
    // Feature: resume-generator-refactor, Property 1: Design system exports valid spacing
    fc.assert(
      fc.property(fc.constantFrom("xs", "sm", "md", "lg", "xl"), (key) => {
        const value = SPACING[key as keyof typeof SPACING];
        return typeof value === "number" && value > 0;
      }),
      { numRuns: 100 },
    );
  });
});
