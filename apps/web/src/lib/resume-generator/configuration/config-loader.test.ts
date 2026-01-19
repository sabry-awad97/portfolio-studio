import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { loadConfiguration, validateConfiguration } from "./config-loader";
import { DEFAULT_CONFIG } from "./default-config";
import { ConfigurationError } from "../validation/errors";
import type { ResumeConfig } from "./config-types";

describe("Configuration Loader", () => {
  describe("loadConfiguration", () => {
    it("should return default config when no custom config provided", () => {
      const config = loadConfiguration();

      expect(config).toEqual(DEFAULT_CONFIG);
    });

    it("should merge custom config with defaults", () => {
      const customConfig = {
        colors: {
          primary: "ff0000",
        },
      };

      const config = loadConfiguration(customConfig);

      expect(config.colors.primary).toBe("ff0000");
      expect(config.colors.secondary).toBe(DEFAULT_CONFIG.colors.secondary);
      expect(config.typography).toEqual(DEFAULT_CONFIG.typography);
    });

    it("should deep merge nested objects", () => {
      const customConfig = {
        typography: {
          sizes: {
            title: 50,
          },
        },
      };

      const config = loadConfiguration(customConfig);

      expect(config.typography.sizes.title).toBe(50);
      expect(config.typography.sizes.body).toBe(
        DEFAULT_CONFIG.typography.sizes.body,
      );
      expect(config.typography.fonts).toEqual(DEFAULT_CONFIG.typography.fonts);
    });

    it("should throw error for invalid configuration", () => {
      const invalidConfig = {
        colors: {
          primary: "invalid",
        },
      };

      expect(() => loadConfiguration(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });
  });

  describe("validateConfiguration", () => {
    it("should pass validation for default config", () => {
      expect(() => validateConfiguration(DEFAULT_CONFIG)).not.toThrow();
    });

    it("should reject invalid hex colors", () => {
      const config = {
        ...DEFAULT_CONFIG,
        colors: {
          ...DEFAULT_CONFIG.colors,
          primary: "invalid",
        },
      };

      expect(() => validateConfiguration(config)).toThrow(ConfigurationError);
      expect(() => validateConfiguration(config)).toThrow(/hex color/);
    });

    it("should reject negative spacing values", () => {
      const config = {
        ...DEFAULT_CONFIG,
        spacing: {
          ...DEFAULT_CONFIG.spacing,
          xs: -10,
        },
      };

      expect(() => validateConfiguration(config)).toThrow(ConfigurationError);
      expect(() => validateConfiguration(config)).toThrow(/positive/);
    });

    it("should reject margins outside reasonable range", () => {
      const configTooSmall = {
        ...DEFAULT_CONFIG,
        margins: {
          ...DEFAULT_CONFIG.margins,
          top: 0.3,
        },
      };

      expect(() => validateConfiguration(configTooSmall)).toThrow(
        ConfigurationError,
      );

      const configTooLarge = {
        ...DEFAULT_CONFIG,
        margins: {
          ...DEFAULT_CONFIG.margins,
          bottom: 3,
        },
      };

      expect(() => validateConfiguration(configTooLarge)).toThrow(
        ConfigurationError,
      );
    });

    it("should reject invalid template type", () => {
      const config = {
        ...DEFAULT_CONFIG,
        template: "invalid" as any,
      };

      expect(() => validateConfiguration(config)).toThrow(ConfigurationError);
      expect(() => validateConfiguration(config)).toThrow(/template/i);
    });

    it("should reject negative font sizes", () => {
      const config = {
        ...DEFAULT_CONFIG,
        typography: {
          ...DEFAULT_CONFIG.typography,
          sizes: {
            ...DEFAULT_CONFIG.typography.sizes,
            title: -10,
          },
        },
      };

      expect(() => validateConfiguration(config)).toThrow(ConfigurationError);
    });
  });

  // Property 17: Configuration serialization round-trip
  describe("Property 17: Configuration serialization round-trip", () => {
    it("should preserve configuration through JSON serialization", () => {
      // Feature: resume-generator-refactor, Property 17: Configuration serialization round-trip
      // Generate valid 6-character hex strings
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
      const hexColorGen = fc
        .tuple(hexDigit, hexDigit, hexDigit, hexDigit, hexDigit, hexDigit)
        .map((arr) => arr.join(""));

      fc.assert(
        fc.property(
          fc.record({
            colors: fc.record({
              primary: hexColorGen,
              secondary: hexColorGen,
              accent: hexColorGen,
              text: hexColorGen,
              background: hexColorGen,
            }),
            typography: fc.record({
              sizes: fc.record({
                title: fc.integer({ min: 20, max: 60 }),
                heading1: fc.integer({ min: 18, max: 40 }),
                heading2: fc.integer({ min: 16, max: 35 }),
                body: fc.integer({ min: 14, max: 30 }),
                small: fc.integer({ min: 12, max: 25 }),
                caption: fc.integer({ min: 10, max: 20 }),
              }),
              fonts: fc.record({
                primary: fc.constantFrom("Calibri", "Arial", "Times New Roman"),
                secondary: fc.constantFrom(
                  "Calibri",
                  "Arial",
                  "Times New Roman",
                ),
              }),
            }),
            spacing: fc.record({
              xs: fc.integer({ min: 50, max: 200 }),
              sm: fc.integer({ min: 150, max: 300 }),
              md: fc.integer({ min: 250, max: 400 }),
              lg: fc.integer({ min: 350, max: 500 }),
              xl: fc.integer({ min: 500, max: 800 }),
            }),
            margins: fc.record({
              top: fc.float({
                min: Math.fround(0.5),
                max: Math.fround(2),
                noNaN: true,
              }),
              right: fc.float({
                min: Math.fround(0.5),
                max: Math.fround(2),
                noNaN: true,
              }),
              bottom: fc.float({
                min: Math.fround(0.5),
                max: Math.fround(2),
                noNaN: true,
              }),
              left: fc.float({
                min: Math.fround(0.5),
                max: Math.fround(2),
                noNaN: true,
              }),
            }),
            template: fc.constantFrom("professional", "modern"),
          }),
          (config) => {
            // Serialize to JSON
            const json = JSON.stringify(config);

            // Deserialize from JSON
            const deserialized = JSON.parse(json) as ResumeConfig;

            // Verify they are equal
            expect(deserialized).toEqual(config);

            return true;
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  // Property 18: Deserialized configuration is validated
  describe("Property 18: Deserialized configuration is validated", () => {
    it("should reject configurations with invalid hex colors", () => {
      // Feature: resume-generator-refactor, Property 18: Deserialized configuration is validated
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant("invalid"),
            fc.constant("12345"), // Too short
            fc.constant("1234567"), // Too long
            fc.constant("gggggg"), // Invalid hex
            fc
              .string()
              .filter((s) => !/^[0-9A-Fa-f]{6}$/.test(s) && s.length > 0),
          ),
          (invalidColor) => {
            const config = {
              ...DEFAULT_CONFIG,
              colors: {
                ...DEFAULT_CONFIG.colors,
                primary: invalidColor,
              },
            };

            try {
              validateConfiguration(config);
              return false; // Should have thrown
            } catch (error) {
              return error instanceof ConfigurationError;
            }
          },
        ),
        { numRuns: 100 },
      );
    });

    it("should reject configurations with negative spacing", () => {
      // Feature: resume-generator-refactor, Property 18: Deserialized configuration is validated
      fc.assert(
        fc.property(fc.integer({ max: 0 }), (negativeValue) => {
          const config = {
            ...DEFAULT_CONFIG,
            spacing: {
              ...DEFAULT_CONFIG.spacing,
              xs: negativeValue,
            },
          };

          try {
            validateConfiguration(config);
            return false; // Should have thrown
          } catch (error) {
            return error instanceof ConfigurationError;
          }
        }),
        { numRuns: 100 },
      );
    });

    it("should reject configurations with invalid margins", () => {
      // Feature: resume-generator-refactor, Property 18: Deserialized configuration is validated
      fc.assert(
        fc.property(
          fc
            .oneof(
              fc.float({ max: Math.fround(0.4), noNaN: true }),
              fc.float({
                min: Math.fround(2.1),
                max: Math.fround(10),
                noNaN: true,
              }),
            )
            .filter((n) => !isNaN(n)),
          (invalidMargin) => {
            const config = {
              ...DEFAULT_CONFIG,
              margins: {
                ...DEFAULT_CONFIG.margins,
                top: invalidMargin,
              },
            };

            try {
              validateConfiguration(config);
              return false; // Should have thrown
            } catch (error) {
              return error instanceof ConfigurationError;
            }
          },
        ),
        { numRuns: 100 },
      );
    });
  });
});
