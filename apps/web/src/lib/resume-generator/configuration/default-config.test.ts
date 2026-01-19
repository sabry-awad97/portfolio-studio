import { describe, it, expect } from "vitest";
import { DEFAULT_CONFIG } from "./default-config";
import { COLORS } from "../design-system/colors";
import { TYPOGRAPHY } from "../design-system/typography";
import { SPACING } from "../design-system/spacing";
import { validateConfiguration } from "./config-loader";

describe("Default Configuration", () => {
  it("should use design system colors", () => {
    expect(DEFAULT_CONFIG.colors).toEqual(COLORS);
  });

  it("should use design system typography", () => {
    expect(DEFAULT_CONFIG.typography.sizes).toEqual(TYPOGRAPHY.sizes);
    expect(DEFAULT_CONFIG.typography.fonts).toEqual(TYPOGRAPHY.fonts);
  });

  it("should use design system spacing", () => {
    expect(DEFAULT_CONFIG.spacing).toEqual(SPACING);
  });

  it("should have default margins of 0.75 inches", () => {
    expect(DEFAULT_CONFIG.margins.top).toBe(0.75);
    expect(DEFAULT_CONFIG.margins.right).toBe(0.75);
    expect(DEFAULT_CONFIG.margins.bottom).toBe(0.75);
    expect(DEFAULT_CONFIG.margins.left).toBe(0.75);
  });

  it("should use professional template by default", () => {
    expect(DEFAULT_CONFIG.template).toBe("professional");
  });

  it("should pass validation", () => {
    expect(() => validateConfiguration(DEFAULT_CONFIG)).not.toThrow();
  });

  it("should have all required properties", () => {
    expect(DEFAULT_CONFIG.colors).toBeDefined();
    expect(DEFAULT_CONFIG.typography).toBeDefined();
    expect(DEFAULT_CONFIG.spacing).toBeDefined();
    expect(DEFAULT_CONFIG.margins).toBeDefined();
    expect(DEFAULT_CONFIG.template).toBeDefined();
  });
});
