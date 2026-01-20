import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fc from "fast-check";
import { loadExtendedConfiguration } from "./extended-config-loader";
import { DEFAULT_CONFIG } from "./default-config";
import {
  DEFAULT_SECTION_TITLES,
  DEFAULT_FORMATTING,
  DEFAULT_TABLE_CONFIG,
  DEFAULT_PAGE_CONFIG,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DOCUMENT_LANGUAGE,
} from "./extended-defaults";
import { ConfigurationError } from "../utilities/validation-helpers";

describe("Extended Config Loader", () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console.warn to capture warnings
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.warn after each test
    consoleWarnSpy.mockRestore();
  });

  describe("loadExtendedConfiguration", () => {
    it("should return default config when no custom config provided", () => {
      const result = loadExtendedConfiguration();

      expect(result.colors).toEqual(DEFAULT_CONFIG.colors);
      expect(result.typography).toEqual(DEFAULT_CONFIG.typography);
      expect(result.spacing).toEqual(DEFAULT_CONFIG.spacing);
      expect(result.margins).toEqual(DEFAULT_CONFIG.margins);
      expect(result.section_titles).toEqual(DEFAULT_SECTION_TITLES);
      expect(result.formatting).toEqual(DEFAULT_FORMATTING);
      expect(result.table_config).toEqual(DEFAULT_TABLE_CONFIG);
      expect(result.page_config).toEqual(DEFAULT_PAGE_CONFIG);
      expect(result.date_format).toEqual(DEFAULT_DATE_FORMAT);
      expect(result.document_language).toBe(DEFAULT_DOCUMENT_LANGUAGE);
    });

    it("should merge custom base config properties", () => {
      const result = loadExtendedConfiguration({
        colors: {
          primary: "FF0000",
        },
      });

      expect(result.colors.primary).toBe("FF0000");
      expect(result.colors.secondary).toBe(DEFAULT_CONFIG.colors.secondary);
    });

    it("should merge custom section titles", () => {
      const result = loadExtendedConfiguration({
        section_titles: {
          education: "AUSBILDUNG",
          projects: "PROJEKTE",
          skills: DEFAULT_SECTION_TITLES.skills,
          experience: DEFAULT_SECTION_TITLES.experience,
          certifications: DEFAULT_SECTION_TITLES.certifications,
          summary: DEFAULT_SECTION_TITLES.summary,
        },
      });

      expect(result.section_titles?.education).toBe("AUSBILDUNG");
      expect(result.section_titles?.projects).toBe("PROJEKTE");
      expect(result.section_titles?.skills).toBe(DEFAULT_SECTION_TITLES.skills);
    });

    it("should merge custom formatting options", () => {
      const result = loadExtendedConfiguration({
        formatting: {
          bullet_character: "→",
          date_separator: " | ",
          tag_separator: DEFAULT_FORMATTING.tag_separator,
        },
      });

      expect(result.formatting?.bullet_character).toBe("→");
      expect(result.formatting?.date_separator).toBe(" | ");
      expect(result.formatting?.tag_separator).toBe(
        DEFAULT_FORMATTING.tag_separator,
      );
    });

    it("should merge custom table config", () => {
      const result = loadExtendedConfiguration({
        table_config: {
          skills_column_widths: [30, 70],
        },
      });

      expect(result.table_config?.skills_column_widths).toEqual([30, 70]);
    });

    it("should merge custom page config", () => {
      const result = loadExtendedConfiguration({
        page_config: {
          enable_page_numbers: true,
          page_number_format: "{PAGE}",
          enable_page_header: DEFAULT_PAGE_CONFIG.enable_page_header,
        },
      });

      expect(result.page_config?.enable_page_numbers).toBe(true);
      expect(result.page_config?.page_number_format).toBe("{PAGE}");
      expect(result.page_config?.enable_page_header).toBe(
        DEFAULT_PAGE_CONFIG.enable_page_header,
      );
    });

    it("should merge custom date format", () => {
      const result = loadExtendedConfiguration({
        date_format: {
          locale: "de-DE",
          format_pattern: "MM.YYYY",
        },
      });

      expect(result.date_format?.locale).toBe("de-DE");
      expect(result.date_format?.format_pattern).toBe("MM.YYYY");
    });

    it("should set custom document language", () => {
      const result = loadExtendedConfiguration({
        document_language: "fr-FR",
      });

      expect(result.document_language).toBe("fr-FR");
    });

    it("should validate config before merging", () => {
      expect(() =>
        loadExtendedConfiguration({
          colors: {
            primary: "invalid",
          },
        }),
      ).toThrow(ConfigurationError);
    });

    it("should validate column widths", () => {
      expect(() =>
        loadExtendedConfiguration({
          table_config: {
            skills_column_widths: [30, 60], // Sum is 90, not 100
          },
        }),
      ).toThrow(ConfigurationError);
    });

    it("should accept valid column widths", () => {
      const result = loadExtendedConfiguration({
        table_config: {
          skills_column_widths: [40, 60],
        },
      });

      expect(result.table_config?.skills_column_widths).toEqual([40, 60]);
    });

    it("should support backward compatibility with old config format", () => {
      const oldConfig = {
        colors: {
          primary: "002ad2",
          secondary: "666666",
        },
        spacing: {
          xs: 100,
          sm: 200,
        },
      };

      const result = loadExtendedConfiguration(oldConfig);

      expect(result.colors.primary).toBe("002ad2");
      expect(result.spacing.xs).toBe(100);
      expect(result.section_titles).toEqual(DEFAULT_SECTION_TITLES);
      expect(result.formatting).toEqual(DEFAULT_FORMATTING);
    });

    it("should deep merge nested typography", () => {
      const result = loadExtendedConfiguration({
        typography: {
          sizes: {
            title: 32,
          },
          fonts: {
            primary: "Arial",
          },
        },
      });

      expect(result.typography.sizes.title).toBe(32);
      expect(result.typography.sizes.body).toBe(
        DEFAULT_CONFIG.typography.sizes.body,
      );
      expect(result.typography.fonts.primary).toBe("Arial");
      expect(result.typography.fonts.secondary).toBe(
        DEFAULT_CONFIG.typography.fonts.secondary,
      );
    });

    it("should throw error for invalid template type", () => {
      expect(() =>
        loadExtendedConfiguration({
          template: "invalid" as any,
        }),
      ).toThrow();
    });

    it("should throw error for invalid margins", () => {
      expect(() =>
        loadExtendedConfiguration({
          margins: {
            top: 3, // Too large
            right: 1,
            bottom: 1,
            left: 1,
          },
        }),
      ).toThrow();
    });

    it("should throw error for negative font sizes", () => {
      expect(() =>
        loadExtendedConfiguration({
          typography: {
            sizes: {
              title: -10,
            },
          },
        }),
      ).toThrow();
    });

    it("should handle partial section titles", () => {
      const result = loadExtendedConfiguration({
        section_titles: {
          education: "EDUCATION CUSTOM",
          projects: DEFAULT_SECTION_TITLES.projects,
          skills: DEFAULT_SECTION_TITLES.skills,
          experience: DEFAULT_SECTION_TITLES.experience,
          certifications: DEFAULT_SECTION_TITLES.certifications,
          summary: DEFAULT_SECTION_TITLES.summary,
        },
      });

      expect(result.section_titles.education).toBe("EDUCATION CUSTOM");
      expect(result.section_titles.projects).toBe(
        DEFAULT_SECTION_TITLES.projects,
      );
      expect(result.section_titles.skills).toBe(DEFAULT_SECTION_TITLES.skills);
      expect(result.section_titles.experience).toBe(
        DEFAULT_SECTION_TITLES.experience,
      );
      expect(result.section_titles.certifications).toBe(
        DEFAULT_SECTION_TITLES.certifications,
      );
      expect(result.section_titles.summary).toBe(
        DEFAULT_SECTION_TITLES.summary,
      );
    });

    it("should handle empty custom config", () => {
      const result = loadExtendedConfiguration({});

      expect(result.section_titles).toEqual(DEFAULT_SECTION_TITLES);
      expect(result.formatting).toEqual(DEFAULT_FORMATTING);
      expect(result.table_config).toEqual(DEFAULT_TABLE_CONFIG);
    });

    it("should merge all extended properties at once", () => {
      const result = loadExtendedConfiguration({
        section_titles: {
          education: "CUSTOM EDUCATION",
          projects: DEFAULT_SECTION_TITLES.projects,
          skills: DEFAULT_SECTION_TITLES.skills,
          experience: DEFAULT_SECTION_TITLES.experience,
          certifications: DEFAULT_SECTION_TITLES.certifications,
          summary: DEFAULT_SECTION_TITLES.summary,
        },
        formatting: {
          bullet_character: "▸",
          date_separator: DEFAULT_FORMATTING.date_separator,
          tag_separator: DEFAULT_FORMATTING.tag_separator,
        },
        table_config: {
          skills_column_widths: [20, 80],
        },
        page_config: {
          enable_page_numbers: true,
          page_number_format: DEFAULT_PAGE_CONFIG.page_number_format,
          enable_page_header: DEFAULT_PAGE_CONFIG.enable_page_header,
        },
        date_format: {
          locale: "es-ES",
          format_pattern: DEFAULT_DATE_FORMAT.format_pattern,
        },
        document_language: "es-ES",
      });

      expect(result.section_titles.education).toBe("CUSTOM EDUCATION");
      expect(result.formatting.bullet_character).toBe("▸");
      expect(result.table_config.skills_column_widths).toEqual([20, 80]);
      expect(result.page_config.enable_page_numbers).toBe(true);
      expect(result.date_format.locale).toBe("es-ES");
      expect(result.document_language).toBe("es-ES");
    });
  });

  describe("Contrast validation warnings", () => {
    it("should log warning for low-contrast text on background", () => {
      loadExtendedConfiguration({
        colors: {
          text: "CCCCCC", // Light gray
          background: "FFFFFF", // White - low contrast
        },
      });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Low contrast ratio"),
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("text on background"),
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("WCAG AA requires at least 4.5:1"),
      );
    });

    it("should log warning for low-contrast primary on background", () => {
      loadExtendedConfiguration({
        colors: {
          primary: "FFFF00", // Yellow
          background: "FFFFFF", // White - low contrast
        },
      });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("primary on background"),
      );
    });

    it("should not log warning for high-contrast colors", () => {
      loadExtendedConfiguration({
        colors: {
          text: "000000", // Black
          background: "FFFFFF", // White - high contrast (21:1)
        },
      });

      // Should not have warnings for text on background
      const warnings = consoleWarnSpy.mock.calls.filter((call: any[]) =>
        call[0].includes("text on background"),
      );
      expect(warnings).toHaveLength(0);
    });

    it("should include contrast ratio in warning message", () => {
      loadExtendedConfiguration({
        colors: {
          text: "777777", // Medium gray
          background: "FFFFFF", // White
        },
      });

      const warningCalls = consoleWarnSpy.mock.calls.filter((call: any[]) =>
        call[0].includes("text on background"),
      );
      expect(warningCalls.length).toBeGreaterThan(0);
      expect(warningCalls[0][0]).toMatch(/\d+\.\d+:1/); // Should contain ratio like "4.47:1"
    });

    it("should check all color combinations", () => {
      loadExtendedConfiguration({
        colors: {
          text: "AAAAAA",
          primary: "BBBBBB",
          secondary: "CCCCCC",
          accent: "DDDDDD",
          background: "FFFFFF",
        },
      });

      // All four combinations should trigger warnings
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("text on background"),
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("primary on background"),
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("secondary on background"),
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("accent on background"),
      );
    });

    it("should not throw error for low contrast (warning only)", () => {
      expect(() =>
        loadExtendedConfiguration({
          colors: {
            text: "CCCCCC",
            background: "FFFFFF",
          },
        }),
      ).not.toThrow();
    });

    it("should work with default colors (no warnings)", () => {
      loadExtendedConfiguration();

      // Default colors should have good contrast
      const textWarnings = consoleWarnSpy.mock.calls.filter((call: any[]) =>
        call[0].includes("text on background"),
      );
      expect(textWarnings).toHaveLength(0);
    });
  });

  /**
   * Property 1: Configuration Default Application
   * Validates: Requirements 11.1
   *
   * Verifies that when partial configurations are provided, all missing
   * properties are filled with appropriate defaults. This ensures that
   * the system always has complete configuration regardless of what
   * the user provides.
   */
  describe("Property 1: Configuration Default Application", () => {
    it("should apply defaults for any partial config", () => {
      // Feature: resume-generator-improvements, Property 1: Configuration Default Application

      // Generate valid hex colors
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

      // Generate partial configs with random properties
      const partialConfigGen = fc.record(
        {
          colors: fc.option(
            fc.record({
              primary: fc.option(hexColor, { nil: undefined }),
              secondary: fc.option(hexColor, { nil: undefined }),
            }),
            { nil: undefined },
          ),
          spacing: fc.option(
            fc.record({
              xs: fc.option(fc.integer({ min: 0, max: 1000 }), {
                nil: undefined,
              }),
              sm: fc.option(fc.integer({ min: 0, max: 1000 }), {
                nil: undefined,
              }),
            }),
            { nil: undefined },
          ),
          section_titles: fc.option(
            fc.record({
              education: fc.option(fc.string({ minLength: 1, maxLength: 50 }), {
                nil: undefined,
              }),
              projects: fc.option(fc.string({ minLength: 1, maxLength: 50 }), {
                nil: undefined,
              }),
            }),
            { nil: undefined },
          ),
        },
        { requiredKeys: [] },
      );

      fc.assert(
        fc.property(partialConfigGen, (partialConfig) => {
          // Filter out undefined values to simulate real usage
          const cleanConfig = JSON.parse(JSON.stringify(partialConfig));

          const result = loadExtendedConfiguration(cleanConfig);

          // All required properties should exist
          expect(result.colors).toBeDefined();
          expect(result.colors.primary).toBeDefined();
          expect(result.colors.secondary).toBeDefined();
          expect(result.colors.accent).toBeDefined();
          expect(result.colors.text).toBeDefined();
          expect(result.colors.background).toBeDefined();

          expect(result.spacing).toBeDefined();
          expect(result.spacing.xs).toBeDefined();
          expect(result.spacing.sm).toBeDefined();
          expect(result.spacing.md).toBeDefined();
          expect(result.spacing.lg).toBeDefined();
          expect(result.spacing.xl).toBeDefined();

          expect(result.section_titles).toBeDefined();
          expect(result.section_titles.education).toBeDefined();
          expect(result.section_titles.projects).toBeDefined();
          expect(result.section_titles.skills).toBeDefined();
          expect(result.section_titles.experience).toBeDefined();
          expect(result.section_titles.certifications).toBeDefined();
          expect(result.section_titles.summary).toBeDefined();

          expect(result.formatting).toBeDefined();
          expect(result.formatting.bullet_character).toBeDefined();
          expect(result.formatting.date_separator).toBeDefined();
          expect(result.formatting.tag_separator).toBeDefined();

          expect(result.table_config).toBeDefined();
          expect(result.table_config.skills_column_widths).toBeDefined();

          expect(result.page_config).toBeDefined();
          expect(result.page_config.enable_page_numbers).toBeDefined();
          expect(result.page_config.enable_page_header).toBeDefined();

          expect(result.date_format).toBeDefined();
          expect(result.date_format.locale).toBeDefined();
          expect(result.date_format.format_pattern).toBeDefined();

          expect(result.document_language).toBeDefined();

          // Custom values should be preserved
          if (cleanConfig.colors?.primary) {
            expect(result.colors.primary).toBe(cleanConfig.colors.primary);
          }
          if (cleanConfig.spacing?.xs !== undefined) {
            expect(result.spacing.xs).toBe(cleanConfig.spacing.xs);
          }
          if (cleanConfig.section_titles?.education) {
            expect(result.section_titles.education).toBe(
              cleanConfig.section_titles.education,
            );
          }
        }),
        { numRuns: 50 },
      );
    });

    it("should apply defaults for empty config", () => {
      // Feature: resume-generator-improvements, Property 1: Configuration Default Application

      fc.assert(
        fc.property(fc.constant({}), (emptyConfig) => {
          const result = loadExtendedConfiguration(emptyConfig);

          // Should match all defaults
          expect(result.colors).toEqual(DEFAULT_CONFIG.colors);
          expect(result.typography).toEqual(DEFAULT_CONFIG.typography);
          expect(result.spacing).toEqual(DEFAULT_CONFIG.spacing);
          expect(result.margins).toEqual(DEFAULT_CONFIG.margins);
          expect(result.section_titles).toEqual(DEFAULT_SECTION_TITLES);
          expect(result.formatting).toEqual(DEFAULT_FORMATTING);
          expect(result.table_config).toEqual(DEFAULT_TABLE_CONFIG);
          expect(result.page_config).toEqual(DEFAULT_PAGE_CONFIG);
          expect(result.date_format).toEqual(DEFAULT_DATE_FORMAT);
          expect(result.document_language).toBe(DEFAULT_DOCUMENT_LANGUAGE);
        }),
      );
    });
  });
});
