import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { buildEducation } from "./education-builder";
import { DEFAULT_EXTENDED_CONFIG } from "../configuration/extended-defaults";
import type { Education } from "../types";

describe("Education Builder", () => {
  const createEducation = (): Education[] => [
    {
      id: 1,
      date: "2020",
      title: "BS Computer Science",
      description: "University of Example",
    },
    {
      id: 2,
      date: "2018",
      title: "High School Diploma",
      description: "Example High School",
    },
  ];

  it("should create education section with header", () => {
    const education = createEducation();
    const paragraphs = buildEducation(education, DEFAULT_EXTENDED_CONFIG);

    expect(paragraphs).toBeDefined();
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it("should include section header", () => {
    const education = createEducation();
    const paragraphs = buildEducation(education, DEFAULT_EXTENDED_CONFIG);

    // Header + (title+description) * entries
    expect(paragraphs.length).toBe(1 + 2 * education.length);
  });

  it("should format each education entry correctly", () => {
    const education = createEducation();
    const paragraphs = buildEducation(education, DEFAULT_EXTENDED_CONFIG);

    // 1 header + 2 paragraphs per entry (title+date, description)
    expect(paragraphs.length).toBe(5);
  });

  it("should handle single education entry", () => {
    const education: Education[] = [
      {
        id: 1,
        date: "2020",
        title: "BS Computer Science",
        description: "University of Example",
      },
    ];

    const paragraphs = buildEducation(education, DEFAULT_EXTENDED_CONFIG);
    expect(paragraphs.length).toBe(3); // Header + title+date + description
  });

  it("should handle empty education array", () => {
    const education: Education[] = [];
    const paragraphs = buildEducation(education, DEFAULT_EXTENDED_CONFIG);

    expect(paragraphs.length).toBe(1); // Just header
  });

  // Property 11: All resume sections include required fields (partial)
  describe("Property 11: All resume sections include required fields", () => {
    it("should include title, date, and description for each entry", () => {
      // Feature: resume-generator-refactor, Property 11: All resume sections include required fields
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.integer(),
              date: fc.string({ minLength: 1 }),
              title: fc.string({ minLength: 1 }),
              description: fc.string({ minLength: 1 }),
            }),
            { minLength: 1, maxLength: 5 },
          ),
          (education) => {
            const paragraphs = buildEducation(
              education as Education[],
              DEFAULT_EXTENDED_CONFIG,
            );

            // Should have header + 2 paragraphs per entry
            return paragraphs.length === 1 + 2 * education.length;
          },
        ),
        { numRuns: 100 },
      );
    });
  });
});
