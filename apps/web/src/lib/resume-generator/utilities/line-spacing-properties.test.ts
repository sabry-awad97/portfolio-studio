import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { applyLineSpacing } from "./line-spacing";
import type { ResumeConfig } from "../configuration/config-types";
import { PROFESSIONAL_THEME } from "../configuration/theme-presets";
import { SPACING } from "../design-system/spacing";

/**
 * Property-Based Tests for Line Spacing Application
 * Feature: resume-generator-improvements
 */

describe("Line Spacing Properties", () => {
  /**
   * Property 13: Body Text Line Spacing Application
   * Validates: Requirements 9.2
   *
   * For all body text paragraphs, the line spacing should match the configured
   * body line spacing value from ResumeConfig.typography.lineSpacing.body.
   */
  it("Property 13: Body text line spacing matches configured value", () => {
    // Feature: resume-generator-improvements, Property 13: Body Text Line Spacing Application

    fc.assert(
      fc.property(
        fc.float({ min: 1.0, max: 3.0, noNaN: true }),
        (bodyLineSpacing) => {
          const config: ResumeConfig = {
            colors: PROFESSIONAL_THEME.colors,
            typography: {
              sizes: {
                title: 32,
                heading1: 28,
                heading2: 24,
                body: 22,
                small: 20,
                caption: 18,
              },
              fonts: {
                primary: "Calibri",
                secondary: "Arial",
              },
              lineSpacing: {
                title: 1.2,
                heading: 1.15,
                body: bodyLineSpacing,
              },
            },
            spacing: SPACING,
            margins: {
              top: 0.5,
              right: 0.5,
              bottom: 0.5,
              left: 0.5,
            },
            template: "professional",
          };

          const result = applyLineSpacing("body", config);

          // Line spacing should be converted to docx format (ratio * 240)
          const expectedLineSpacing = Math.round(bodyLineSpacing * 240);

          expect(result.line).toBe(expectedLineSpacing);
          expect(result.rule).toBe("auto");
        },
      ),
      { numRuns: 100 },
    );
  });

  /**
   * Property 14: Heading Line Spacing Application
   * Validates: Requirements 9.3
   *
   * For all heading paragraphs, the line spacing should match the configured
   * heading line spacing value from ResumeConfig.typography.lineSpacing.heading.
   */
  it("Property 14: Heading line spacing matches configured value", () => {
    // Feature: resume-generator-improvements, Property 14: Heading Line Spacing Application

    fc.assert(
      fc.property(
        fc.float({ min: 1.0, max: 3.0, noNaN: true }),
        (headingLineSpacing) => {
          const config: ResumeConfig = {
            colors: PROFESSIONAL_THEME.colors,
            typography: {
              sizes: {
                title: 32,
                heading1: 28,
                heading2: 24,
                body: 22,
                small: 20,
                caption: 18,
              },
              fonts: {
                primary: "Calibri",
                secondary: "Arial",
              },
              lineSpacing: {
                title: 1.2,
                heading: headingLineSpacing,
                body: 1.5,
              },
            },
            spacing: SPACING,
            margins: {
              top: 0.5,
              right: 0.5,
              bottom: 0.5,
              left: 0.5,
            },
            template: "professional",
          };

          const result = applyLineSpacing("heading", config);

          // Line spacing should be converted to docx format (ratio * 240)
          const expectedLineSpacing = Math.round(headingLineSpacing * 240);

          expect(result.line).toBe(expectedLineSpacing);
          expect(result.rule).toBe("auto");
        },
      ),
      { numRuns: 100 },
    );
  });

  /**
   * Property 15: Title Line Spacing Application
   * Validates: Requirements 9.4
   *
   * For all title paragraphs (name, main title), the line spacing should match
   * the configured title line spacing value from ResumeConfig.typography.lineSpacing.title.
   */
  it("Property 15: Title line spacing matches configured value", () => {
    // Feature: resume-generator-improvements, Property 15: Title Line Spacing Application

    fc.assert(
      fc.property(
        fc.float({ min: 1.0, max: 3.0, noNaN: true }),
        (titleLineSpacing) => {
          const config: ResumeConfig = {
            colors: PROFESSIONAL_THEME.colors,
            typography: {
              sizes: {
                title: 32,
                heading1: 28,
                heading2: 24,
                body: 22,
                small: 20,
                caption: 18,
              },
              fonts: {
                primary: "Calibri",
                secondary: "Arial",
              },
              lineSpacing: {
                title: titleLineSpacing,
                heading: 1.15,
                body: 1.5,
              },
            },
            spacing: SPACING,
            margins: {
              top: 0.5,
              right: 0.5,
              bottom: 0.5,
              left: 0.5,
            },
            template: "professional",
          };

          const result = applyLineSpacing("title", config);

          // Line spacing should be converted to docx format (ratio * 240)
          const expectedLineSpacing = Math.round(titleLineSpacing * 240);

          expect(result.line).toBe(expectedLineSpacing);
          expect(result.rule).toBe("auto");
        },
      ),
      { numRuns: 100 },
    );
  });
});
