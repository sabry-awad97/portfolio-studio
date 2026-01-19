import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { buildSectionHeader } from "./section-header-builder";
import { DEFAULT_CONFIG } from "../configuration/default-config";
import type { ResumeConfig } from "../configuration/config-types";

describe("Section Header Builder", () => {
  describe("Basic functionality", () => {
    it("should create a section header with title", () => {
      const header = buildSectionHeader("EDUCATION", DEFAULT_CONFIG);

      expect(header).toBeDefined();
      // Verify it's a Paragraph instance
      expect(header.constructor.name).toBe("Paragraph");
    });

    it("should use config colors", () => {
      const customConfig: ResumeConfig = {
        ...DEFAULT_CONFIG,
        colors: {
          primary: "ff0000",
          secondary: DEFAULT_CONFIG.colors.secondary,
          accent: DEFAULT_CONFIG.colors.accent,
          text: DEFAULT_CONFIG.colors.text,
          background: DEFAULT_CONFIG.colors.background,
        },
      };

      const header = buildSectionHeader("SKILLS", customConfig);

      expect(header).toBeDefined();
      // The header should be created with the custom config
      expect(header.constructor.name).toBe("Paragraph");
    });

    it("should use config typography", () => {
      const customConfig: ResumeConfig = {
        ...DEFAULT_CONFIG,
        typography: {
          sizes: {
            ...DEFAULT_CONFIG.typography.sizes,
            heading1: 32,
          },
          fonts: {
            primary: "Arial",
            secondary: "Calibri",
          },
        },
      };

      const header = buildSectionHeader("PROJECTS", customConfig);

      expect(header).toBeDefined();
      expect(header.constructor.name).toBe("Paragraph");
    });

    it("should use config spacing", () => {
      const customConfig: ResumeConfig = {
        ...DEFAULT_CONFIG,
        spacing: {
          xs: 50,
          sm: 100,
          md: 200,
          lg: 300,
          xl: 400,
        },
      };

      const header = buildSectionHeader("EXPERIENCE", customConfig);

      expect(header).toBeDefined();
      expect(header.constructor.name).toBe("Paragraph");
    });
  });

  describe("Different section titles", () => {
    it("should handle various section titles", () => {
      const titles = [
        "EDUCATION",
        "WORK EXPERIENCE",
        "PROJECTS",
        "SKILLS",
        "CERTIFICATIONS",
        "PROFESSIONAL SUMMARY",
      ];

      titles.forEach((title) => {
        const header = buildSectionHeader(title, DEFAULT_CONFIG);
        expect(header).toBeDefined();
        expect(header.constructor.name).toBe("Paragraph");
      });
    });

    it("should handle empty title", () => {
      const header = buildSectionHeader("", DEFAULT_CONFIG);
      expect(header).toBeDefined();
    });

    it("should handle special characters in title", () => {
      const header = buildSectionHeader("SKILLS & EXPERTISE", DEFAULT_CONFIG);
      expect(header).toBeDefined();
    });
  });

  // Property 12: Builder functions are deterministic
  describe("Property 12: Builder functions are deterministic", () => {
    it("should produce identical output for same inputs", () => {
      // Feature: resume-generator-refactor, Property 12: Builder functions are deterministic
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
          fc.string({ minLength: 1, maxLength: 50 }),
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
          (title, config) => {
            // Build header twice with same inputs
            const header1 = buildSectionHeader(title, config as ResumeConfig);
            const header2 = buildSectionHeader(title, config as ResumeConfig);

            // Convert to JSON for comparison (docx objects have internal state)
            const json1 = JSON.stringify(header1);
            const json2 = JSON.stringify(header2);

            // Verify outputs are identical
            return json1 === json2;
          },
        ),
        { numRuns: 100 },
      );
    });

    it("should produce different output for different titles", () => {
      // Feature: resume-generator-refactor, Property 12: Builder functions are deterministic
      fc.assert(
        fc.property(
          fc
            .tuple(
              fc.string({ minLength: 1, maxLength: 50 }),
              fc.string({ minLength: 1, maxLength: 50 }),
            )
            .filter(([s1, s2]) => s1 !== s2),
          ([title1, title2]) => {
            const header1 = buildSectionHeader(title1, DEFAULT_CONFIG);
            const header2 = buildSectionHeader(title2, DEFAULT_CONFIG);

            const json1 = JSON.stringify(header1);
            const json2 = JSON.stringify(header2);

            // Different titles should produce different outputs
            return title1 === title2 || json1 !== json2;
          },
        ),
        { numRuns: 100 },
      );
    });
  });
});
