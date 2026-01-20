import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  ConfigurationError,
  validateColor,
  validateSpacing,
  validateColumnWidths,
  validateContrast,
  validateConfig,
} from "./validation-helpers";
import { DEFAULT_CONFIG } from "../configuration/default-config";

describe("Validation Helpers", () => {
  describe("ConfigurationError", () => {
    it("should create error with field and expectedFormat", () => {
      const error = new ConfigurationError(
        "Test error",
        "test.field",
        "expected format",
      );

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe("ConfigurationError");
      expect(error.message).toBe("Test error");
      expect(error.field).toBe("test.field");
      expect(error.expectedFormat).toBe("expected format");
    });

    it("should work without expectedFormat", () => {
      const error = new ConfigurationError("Test error", "test.field");

      expect(error.field).toBe("test.field");
      expect(error.expectedFormat).toBeUndefined();
    });
  });

  describe("validateColor", () => {
    it("should accept valid 6-character hex", () => {
      expect(() => validateColor("002ad2", "primary")).not.toThrow();
      expect(() => validateColor("FFFFFF", "background")).not.toThrow();
      expect(() => validateColor("000000", "text")).not.toThrow();
      expect(() => validateColor("abc123", "accent")).not.toThrow();
    });

    it("should reject color with # prefix", () => {
      expect(() => validateColor("#002ad2", "primary")).toThrow(
        ConfigurationError,
      );
    });

    it("should reject invalid length", () => {
      expect(() => validateColor("002", "primary")).toThrow(ConfigurationError);
      expect(() => validateColor("002ad2ff", "primary")).toThrow(
        ConfigurationError,
      );
    });

    it("should reject non-hex characters", () => {
      expect(() => validateColor("gggggg", "primary")).toThrow(
        ConfigurationError,
      );
      expect(() => validateColor("blue", "primary")).toThrow(
        ConfigurationError,
      );
    });

    it("should include field name in error", () => {
      try {
        validateColor("invalid", "colors.primary");
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect((error as ConfigurationError).field).toBe("colors.primary");
      }
    });

    it("should include expected format in error", () => {
      try {
        validateColor("#002ad2", "colors.primary");
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect((error as ConfigurationError).expectedFormat).toContain("hex");
      }
    });
  });

  describe("validateSpacing", () => {
    it("should accept positive numbers", () => {
      expect(() => validateSpacing(100, "spacing.xs")).not.toThrow();
      expect(() => validateSpacing(200, "spacing.sm")).not.toThrow();
      expect(() => validateSpacing(1, "spacing.md")).not.toThrow();
    });

    it("should accept zero", () => {
      expect(() => validateSpacing(0, "spacing.xs")).not.toThrow();
    });

    it("should reject negative numbers", () => {
      expect(() => validateSpacing(-100, "spacing.xs")).toThrow(
        ConfigurationError,
      );
    });

    it("should reject non-numbers", () => {
      expect(() => validateSpacing("100" as any, "spacing.xs")).toThrow(
        ConfigurationError,
      );
      expect(() => validateSpacing(NaN, "spacing.xs")).toThrow(
        ConfigurationError,
      );
    });

    it("should include field name in error", () => {
      try {
        validateSpacing(-100, "spacing.md");
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect((error as ConfigurationError).field).toBe("spacing.md");
      }
    });

    it("should include expected format in error", () => {
      try {
        validateSpacing(-100, "spacing.xs");
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect((error as ConfigurationError).expectedFormat).toContain(
          "positive",
        );
      }
    });
  });

  describe("validateColumnWidths", () => {
    it("should accept widths that sum to 100", () => {
      expect(() => validateColumnWidths([25, 75])).not.toThrow();
      expect(() => validateColumnWidths([50, 50])).not.toThrow();
      expect(() => validateColumnWidths([33, 33, 34])).not.toThrow();
      expect(() => validateColumnWidths([100])).not.toThrow();
    });

    it("should reject widths that don't sum to 100", () => {
      expect(() => validateColumnWidths([30, 60])).toThrow(ConfigurationError);
      expect(() => validateColumnWidths([25, 25, 25])).toThrow(
        ConfigurationError,
      );
      expect(() => validateColumnWidths([50, 51])).toThrow(ConfigurationError);
    });

    it("should include sum in error message", () => {
      try {
        validateColumnWidths([30, 60]);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect((error as ConfigurationError).message).toContain("90");
      }
    });

    it("should include expected format in error", () => {
      try {
        validateColumnWidths([30, 60]);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect((error as ConfigurationError).expectedFormat).toContain("100");
      }
    });
  });

  describe("validateContrast", () => {
    it("should pass for black on white (21:1)", () => {
      const result = validateContrast("000000", "ffffff");
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThan(4.5);
      expect(result.ratio).toBeCloseTo(21, 0);
    });

    it("should pass for white on black", () => {
      const result = validateContrast("ffffff", "000000");
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThan(4.5);
    });

    it("should fail for light gray on white", () => {
      const result = validateContrast("cccccc", "ffffff");
      expect(result.passes).toBe(false);
      expect(result.ratio).toBeLessThan(4.5);
    });

    it("should fail for similar colors", () => {
      const result = validateContrast("aaaaaa", "bbbbbb");
      expect(result.passes).toBe(false);
      expect(result.ratio).toBeLessThan(4.5);
    });

    it("should calculate correct ratio for known pairs", () => {
      // Dark blue on white should pass
      const result1 = validateContrast("002ad2", "ffffff");
      expect(result1.passes).toBe(true);

      // Light blue on white should fail
      const result2 = validateContrast("88ccff", "ffffff");
      expect(result2.passes).toBe(false);
    });

    it("should return ratio rounded to 2 decimal places", () => {
      const result = validateContrast("000000", "ffffff");
      expect(result.ratio).toBe(Math.round(result.ratio * 100) / 100);
    });

    it("should handle same color (1:1 ratio)", () => {
      const result = validateContrast("888888", "888888");
      expect(result.ratio).toBe(1);
      expect(result.passes).toBe(false);
    });
  });

  describe("validateConfig", () => {
    it("should accept valid complete config", () => {
      expect(() => validateConfig(DEFAULT_CONFIG)).not.toThrow();
    });

    it("should accept empty config", () => {
      expect(() => validateConfig({})).not.toThrow();
    });

    it("should validate all color fields", () => {
      const invalidConfig = {
        colors: {
          primary: "invalid",
          secondary: "002ad2",
          accent: "ff6b6b",
          text: "333333",
          background: "ffffff",
        },
      };

      expect(() => validateConfig(invalidConfig)).toThrow(ConfigurationError);
    });

    it("should validate all spacing fields", () => {
      const invalidConfig = {
        spacing: {
          xs: 100,
          sm: -200, // Invalid
          md: 300,
          lg: 400,
          xl: 500,
        },
      };

      expect(() => validateConfig(invalidConfig)).toThrow(ConfigurationError);
    });

    it("should validate all margin fields", () => {
      const invalidConfig = {
        margins: {
          top: 1,
          right: 1,
          bottom: -0.5, // Invalid
          left: 1,
        },
      };

      expect(() => validateConfig(invalidConfig)).toThrow(ConfigurationError);
    });

    it("should accept partial config with valid values", () => {
      const partialConfig = {
        colors: {
          primary: "002ad2",
        },
        spacing: {
          xs: 100,
        },
      };

      expect(() => validateConfig(partialConfig)).not.toThrow();
    });

    it("should throw with field name for color errors", () => {
      try {
        validateConfig({
          colors: {
            primary: "#002ad2",
            secondary: "002ad2",
            accent: "ff6b6b",
            text: "333333",
            background: "ffffff",
          },
        });
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect((error as ConfigurationError).field).toBe("colors.primary");
      }
    });

    it("should throw with field name for spacing errors", () => {
      try {
        validateConfig({
          spacing: {
            xs: 100,
            sm: 200,
            md: -300,
            lg: 400,
            xl: 500,
          },
        });
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect((error as ConfigurationError).field).toBe("spacing.md");
      }
    });

    it("should throw with field name for margin errors", () => {
      try {
        validateConfig({
          margins: {
            top: 1,
            right: -1,
            bottom: 1,
            left: 1,
          },
        });
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect((error as ConfigurationError).field).toBe("margins.right");
      }
    });
  });

  /**
   * Property 8: Color Contrast Validation
   * Validates: Requirements 4.4
   *
   * Verifies that the contrast ratio calculation is correct and consistent
   * for any pair of valid hex colors. The contrast ratio should:
   * - Always be >= 1 (same color has ratio of 1)
   * - Be symmetric (contrast(A, B) === contrast(B, A))
   * - Pass WCAG AA (4.5:1) for known high-contrast pairs
   */
  describe("Property 8: Color Contrast Validation", () => {
    it("should calculate consistent contrast ratios for any color pair", () => {
      // Feature: resume-generator-improvements, Property 8: Color Contrast Validation

      // Generate valid 6-character hex colors
      const hexDigit = fc.constantFrom(
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
      );

      const hexColor = fc
        .array(hexDigit, { minLength: 6, maxLength: 6 })
        .map((arr) => arr.join(""));

      fc.assert(
        fc.property(hexColor, hexColor, (color1, color2) => {
          const result = validateContrast(color1, color2);

          // Contrast ratio should always be >= 1
          expect(result.ratio).toBeGreaterThanOrEqual(1);

          // Contrast ratio should be symmetric
          const reverseResult = validateContrast(color2, color1);
          expect(result.ratio).toBeCloseTo(reverseResult.ratio, 2);

          // Passes flag should be consistent with ratio
          if (result.ratio >= 4.5) {
            expect(result.passes).toBe(true);
          } else {
            expect(result.passes).toBe(false);
          }
        }),
        { numRuns: 100 },
      );
    });

    it("should always pass for black on white", () => {
      // Feature: resume-generator-improvements, Property 8: Color Contrast Validation

      const blackVariants = fc.constantFrom("000000", "000", "0");
      const whiteVariants = fc.constantFrom("ffffff", "FFFFFF", "FFF");

      fc.assert(
        fc.property(blackVariants, whiteVariants, (black, white) => {
          // Normalize to 6 characters
          const normalizedBlack = black.padEnd(6, "0").substring(0, 6);
          const normalizedWhite = white.padEnd(6, "f").substring(0, 6);

          const result = validateContrast(normalizedBlack, normalizedWhite);

          expect(result.passes).toBe(true);
          expect(result.ratio).toBeGreaterThan(20); // Should be ~21:1
        }),
      );
    });

    it("should always fail for same or very similar colors", () => {
      // Feature: resume-generator-improvements, Property 8: Color Contrast Validation

      const hexDigit = fc.constantFrom(
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      );

      const hexColor = fc
        .array(hexDigit, { minLength: 6, maxLength: 6 })
        .map((arr) => arr.join(""));

      fc.assert(
        fc.property(hexColor, (color) => {
          // Same color should have ratio of 1
          const result = validateContrast(color, color);

          expect(result.ratio).toBe(1);
          expect(result.passes).toBe(false);
        }),
        { numRuns: 50 },
      );
    });
  });

  /**
   * Property 16: Configuration Error Field Names
   * Validates: Requirements 12.5
   *
   * Verifies that all configuration validation errors include the field name
   * that caused the error. This helps users quickly identify and fix
   * configuration issues.
   */
  describe("Property 16: Configuration Error Field Names", () => {
    it("should include field name for invalid color errors", () => {
      // Feature: resume-generator-improvements, Property 16: Configuration Error Field Names

      const invalidColor = fc.oneof(
        fc.constant("#000000"), // Has # prefix
        fc.constant("00"), // Too short
        fc.constant("00000000"), // Too long
        fc.constant("gggggg"), // Invalid characters
        fc.constant("blue"), // Not hex
      );

      const colorField = fc.constantFrom(
        "primary",
        "secondary",
        "accent",
        "text",
        "background",
      );

      fc.assert(
        fc.property(invalidColor, colorField, (color, field) => {
          try {
            validateColor(color, `colors.${field}`);
            expect.fail("Should have thrown ConfigurationError");
          } catch (error) {
            expect(error).toBeInstanceOf(ConfigurationError);
            expect((error as ConfigurationError).field).toBe(`colors.${field}`);
            expect((error as ConfigurationError).message).toContain(
              `colors.${field}`,
            );
          }
        }),
        { numRuns: 50 },
      );
    });

    it("should include field name for invalid spacing errors", () => {
      // Feature: resume-generator-improvements, Property 16: Configuration Error Field Names

      const invalidSpacing = fc.oneof(
        fc.integer({ max: -1 }), // Negative
        fc.constant(NaN), // NaN
        fc.constant("100" as any), // String
      );

      const spacingField = fc.constantFrom("xs", "sm", "md", "lg", "xl");

      fc.assert(
        fc.property(invalidSpacing, spacingField, (spacing, field) => {
          try {
            validateSpacing(spacing, `spacing.${field}`);
            expect.fail("Should have thrown ConfigurationError");
          } catch (error) {
            expect(error).toBeInstanceOf(ConfigurationError);
            expect((error as ConfigurationError).field).toBe(
              `spacing.${field}`,
            );
            expect((error as ConfigurationError).message).toContain(
              `spacing.${field}`,
            );
          }
        }),
        { numRuns: 50 },
      );
    });

    it("should include field name for invalid column width errors", () => {
      // Feature: resume-generator-improvements, Property 16: Configuration Error Field Names

      // Generate arrays that don't sum to 100
      const invalidWidths = fc
        .array(fc.integer({ min: 1, max: 50 }), { minLength: 2, maxLength: 4 })
        .filter((arr) => arr.reduce((sum, val) => sum + val, 0) !== 100);

      fc.assert(
        fc.property(invalidWidths, (widths) => {
          try {
            validateColumnWidths(widths);
            expect.fail("Should have thrown ConfigurationError");
          } catch (error) {
            expect(error).toBeInstanceOf(ConfigurationError);
            expect((error as ConfigurationError).field).toBe(
              "table_config.skills_column_widths",
            );
            expect((error as ConfigurationError).message).toContain(
              "Column widths",
            );
          }
        }),
        { numRuns: 50 },
      );
    });

    it("should include expected format in error messages", () => {
      // Feature: resume-generator-improvements, Property 16: Configuration Error Field Names

      fc.assert(
        fc.property(fc.constant("#000000"), (invalidColor) => {
          try {
            validateColor(invalidColor, "colors.primary");
            expect.fail("Should have thrown");
          } catch (error) {
            expect(error).toBeInstanceOf(ConfigurationError);
            expect((error as ConfigurationError).expectedFormat).toBeDefined();
            expect((error as ConfigurationError).expectedFormat).toContain(
              "hex",
            );
          }
        }),
      );
    });
  });
});
