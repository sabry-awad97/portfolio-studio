import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { COLORS } from "./colors";

describe("Design System - Colors", () => {
  it("should export all color values", () => {
    expect(COLORS.primary).toBeDefined();
    expect(COLORS.secondary).toBeDefined();
    expect(COLORS.accent).toBeDefined();
    expect(COLORS.text).toBeDefined();
    expect(COLORS.background).toBeDefined();
  });

  it("should have valid 6-character hex strings for all colors", () => {
    const hexRegex = /^[0-9A-Fa-f]{6}$/;

    expect(COLORS.primary).toMatch(hexRegex);
    expect(COLORS.secondary).toMatch(hexRegex);
    expect(COLORS.accent).toMatch(hexRegex);
    expect(COLORS.text).toMatch(hexRegex);
    expect(COLORS.background).toMatch(hexRegex);
  });

  it("should have all colors as strings", () => {
    expect(typeof COLORS.primary).toBe("string");
    expect(typeof COLORS.secondary).toBe("string");
    expect(typeof COLORS.accent).toBe("string");
    expect(typeof COLORS.text).toBe("string");
    expect(typeof COLORS.background).toBe("string");
  });

  it("should have exactly 6 characters for each color", () => {
    expect(COLORS.primary.length).toBe(6);
    expect(COLORS.secondary.length).toBe(6);
    expect(COLORS.accent.length).toBe(6);
    expect(COLORS.text.length).toBe(6);
    expect(COLORS.background.length).toBe(6);
  });

  it("should not include # prefix in color values", () => {
    expect(COLORS.primary).not.toContain("#");
    expect(COLORS.secondary).not.toContain("#");
    expect(COLORS.accent).not.toContain("#");
    expect(COLORS.text).not.toContain("#");
    expect(COLORS.background).not.toContain("#");
  });

  // Property test for color validation
  it("should validate all colors are valid hex strings", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("primary", "secondary", "accent", "text", "background"),
        (key) => {
          const color = COLORS[key as keyof typeof COLORS];
          const hexRegex = /^[0-9A-Fa-f]{6}$/;
          return hexRegex.test(color);
        },
      ),
      { numRuns: 100 },
    );
  });
});
