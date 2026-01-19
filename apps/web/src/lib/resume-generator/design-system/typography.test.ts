import { describe, it, expect } from "vitest";
import { TYPOGRAPHY } from "./typography";

describe("Design System - Typography", () => {
  it("should export all font sizes", () => {
    expect(TYPOGRAPHY.sizes.title).toBeDefined();
    expect(TYPOGRAPHY.sizes.heading1).toBeDefined();
    expect(TYPOGRAPHY.sizes.heading2).toBeDefined();
    expect(TYPOGRAPHY.sizes.body).toBeDefined();
    expect(TYPOGRAPHY.sizes.small).toBeDefined();
    expect(TYPOGRAPHY.sizes.caption).toBeDefined();
  });

  it("should have positive numeric values for all font sizes", () => {
    expect(TYPOGRAPHY.sizes.title).toBeGreaterThan(0);
    expect(TYPOGRAPHY.sizes.heading1).toBeGreaterThan(0);
    expect(TYPOGRAPHY.sizes.heading2).toBeGreaterThan(0);
    expect(TYPOGRAPHY.sizes.body).toBeGreaterThan(0);
    expect(TYPOGRAPHY.sizes.small).toBeGreaterThan(0);
    expect(TYPOGRAPHY.sizes.caption).toBeGreaterThan(0);
  });

  it("should have font sizes in descending order", () => {
    expect(TYPOGRAPHY.sizes.title).toBeGreaterThan(TYPOGRAPHY.sizes.heading1);
    expect(TYPOGRAPHY.sizes.heading1).toBeGreaterThan(
      TYPOGRAPHY.sizes.heading2,
    );
    expect(TYPOGRAPHY.sizes.heading2).toBeGreaterThan(TYPOGRAPHY.sizes.body);
    expect(TYPOGRAPHY.sizes.body).toBeGreaterThan(TYPOGRAPHY.sizes.small);
    expect(TYPOGRAPHY.sizes.small).toBeGreaterThan(TYPOGRAPHY.sizes.caption);
  });

  it("should export font families", () => {
    expect(TYPOGRAPHY.fonts.primary).toBeDefined();
    expect(TYPOGRAPHY.fonts.secondary).toBeDefined();
  });

  it("should have valid string values for font families", () => {
    expect(typeof TYPOGRAPHY.fonts.primary).toBe("string");
    expect(typeof TYPOGRAPHY.fonts.secondary).toBe("string");
    expect(TYPOGRAPHY.fonts.primary.length).toBeGreaterThan(0);
    expect(TYPOGRAPHY.fonts.secondary.length).toBeGreaterThan(0);
  });

  it("should use standard fonts", () => {
    const standardFonts = [
      "Calibri",
      "Arial",
      "Times New Roman",
      "Helvetica",
      "Georgia",
    ];
    expect(standardFonts).toContain(TYPOGRAPHY.fonts.primary);
    expect(standardFonts).toContain(TYPOGRAPHY.fonts.secondary);
  });
});
