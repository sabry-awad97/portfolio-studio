import { describe, it, expect } from "vitest";
import {
  PROFESSIONAL_THEME,
  MODERN_THEME,
  MINIMAL_THEME,
  THEME_PRESETS,
} from "./theme-presets";
import { validateConfiguration } from "./config-loader";

describe("Theme Presets", () => {
  describe("PROFESSIONAL_THEME", () => {
    it("should have valid configuration", () => {
      expect(() => validateConfiguration(PROFESSIONAL_THEME)).not.toThrow();
    });

    it("should use professional template", () => {
      expect(PROFESSIONAL_THEME.template).toBe("professional");
    });

    it("should have all required properties", () => {
      expect(PROFESSIONAL_THEME.colors).toBeDefined();
      expect(PROFESSIONAL_THEME.typography).toBeDefined();
      expect(PROFESSIONAL_THEME.spacing).toBeDefined();
      expect(PROFESSIONAL_THEME.margins).toBeDefined();
    });
  });

  describe("MODERN_THEME", () => {
    it("should have valid configuration", () => {
      expect(() => validateConfiguration(MODERN_THEME)).not.toThrow();
    });

    it("should use modern template", () => {
      expect(MODERN_THEME.template).toBe("modern");
    });

    it("should have different colors from professional", () => {
      expect(MODERN_THEME.colors.primary).not.toBe(
        PROFESSIONAL_THEME.colors.primary,
      );
    });

    it("should have larger font sizes than professional", () => {
      expect(MODERN_THEME.typography.sizes.title).toBeGreaterThan(
        PROFESSIONAL_THEME.typography.sizes.title,
      );
    });
  });

  describe("MINIMAL_THEME", () => {
    it("should have valid configuration", () => {
      expect(() => validateConfiguration(MINIMAL_THEME)).not.toThrow();
    });

    it("should use professional template", () => {
      expect(MINIMAL_THEME.template).toBe("professional");
    });

    it("should have black primary color", () => {
      expect(MINIMAL_THEME.colors.primary).toBe("000000");
    });

    it("should have tighter spacing than default", () => {
      expect(MINIMAL_THEME.spacing.xs).toBeLessThan(
        PROFESSIONAL_THEME.spacing.xs,
      );
    });
  });

  describe("THEME_PRESETS", () => {
    it("should export all three themes", () => {
      expect(THEME_PRESETS.professional).toBeDefined();
      expect(THEME_PRESETS.modern).toBeDefined();
      expect(THEME_PRESETS.minimal).toBeDefined();
    });

    it("should have professional theme matching PROFESSIONAL_THEME", () => {
      expect(THEME_PRESETS.professional).toEqual(PROFESSIONAL_THEME);
    });

    it("should have modern theme matching MODERN_THEME", () => {
      expect(THEME_PRESETS.modern).toEqual(MODERN_THEME);
    });

    it("should have minimal theme matching MINIMAL_THEME", () => {
      expect(THEME_PRESETS.minimal).toEqual(MINIMAL_THEME);
    });
  });
});
