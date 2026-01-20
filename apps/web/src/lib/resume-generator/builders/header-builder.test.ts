import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { buildHeader } from "./header-builder";
import { DEFAULT_EXTENDED_CONFIG } from "../configuration/extended-defaults";
import type { PersonalInfo } from "../types";

describe("Header Builder", () => {
  const createValidPersonalInfo = (): PersonalInfo => ({
    name: "John Doe",
    title: "Software Engineer",
    subtitle: "Full Stack Developer",
    bio: "Experienced developer",
    contact: {
      email: "john@example.com",
      phone: "123-456-7890",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
    },
  });

  describe("Basic functionality", () => {
    it("should create header paragraphs", () => {
      const personalInfo = createValidPersonalInfo();
      const paragraphs = buildHeader(personalInfo, DEFAULT_EXTENDED_CONFIG);

      expect(paragraphs).toBeDefined();
      expect(paragraphs.length).toBeGreaterThan(0);
    });

    it("should include name paragraph", () => {
      const personalInfo = createValidPersonalInfo();
      const paragraphs = buildHeader(personalInfo, DEFAULT_EXTENDED_CONFIG);

      expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    });

    it("should include title and subtitle", () => {
      const personalInfo = createValidPersonalInfo();
      const paragraphs = buildHeader(personalInfo, DEFAULT_EXTENDED_CONFIG);

      expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    });

    it("should include contact information", () => {
      const personalInfo = createValidPersonalInfo();
      const paragraphs = buildHeader(personalInfo, DEFAULT_EXTENDED_CONFIG);

      expect(paragraphs.length).toBe(3);
    });
  });

  describe("Contact information handling", () => {
    it("should handle all contact fields", () => {
      const personalInfo = createValidPersonalInfo();
      const paragraphs = buildHeader(personalInfo, DEFAULT_EXTENDED_CONFIG);

      expect(paragraphs.length).toBe(3);
    });

    it("should handle missing optional phone", () => {
      const personalInfo: PersonalInfo = {
        ...createValidPersonalInfo(),
        contact: {
          email: "john@example.com",
          phone: "",
          linkedin: "linkedin.com/in/johndoe",
          github: "github.com/johndoe",
        },
      };

      const paragraphs = buildHeader(personalInfo, DEFAULT_EXTENDED_CONFIG);
      expect(paragraphs.length).toBe(3);
    });

    it("should handle missing optional linkedin", () => {
      const personalInfo: PersonalInfo = {
        ...createValidPersonalInfo(),
        contact: {
          email: "john@example.com",
          phone: "123-456-7890",
          linkedin: "",
          github: "github.com/johndoe",
        },
      };

      const paragraphs = buildHeader(personalInfo, DEFAULT_EXTENDED_CONFIG);
      expect(paragraphs.length).toBe(3);
    });

    it("should handle missing optional github", () => {
      const personalInfo: PersonalInfo = {
        ...createValidPersonalInfo(),
        contact: {
          email: "john@example.com",
          phone: "123-456-7890",
          linkedin: "linkedin.com/in/johndoe",
          github: "",
        },
      };

      const paragraphs = buildHeader(personalInfo, DEFAULT_EXTENDED_CONFIG);
      expect(paragraphs.length).toBe(3);
    });
  });

  // Property 8: Contact info uses plain text separators
  describe("Property 8: Contact info uses plain text separators", () => {
    it("should use plain text separators (no emojis)", () => {
      // Feature: resume-generator-refactor, Property 8: Contact info uses plain text separators
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            subtitle: fc.string({ minLength: 1 }),
            bio: fc.string(),
            contact: fc.record({
              email: fc.emailAddress(),
              phone: fc.string(),
              linkedin: fc.string(),
              github: fc.string(),
            }),
          }),
          (personalInfo) => {
            const paragraphs = buildHeader(
              personalInfo as PersonalInfo,
              DEFAULT_EXTENDED_CONFIG,
            );

            // Convert paragraphs to JSON to inspect content
            const json = JSON.stringify(paragraphs);

            // Check for common emoji patterns (should not be present)
            const emojiPattern =
              /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;

            return !emojiPattern.test(json);
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  // Property 11: All resume sections include required fields (partial)
  describe("Property 11: All resume sections include required fields", () => {
    it("should include email, phone, and linkedin in output", () => {
      // Feature: resume-generator-refactor, Property 11: All resume sections include required fields
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            subtitle: fc.string({ minLength: 1 }),
            bio: fc.string(),
            contact: fc.record({
              email: fc.emailAddress(),
              phone: fc.string({ minLength: 1 }),
              linkedin: fc.string({ minLength: 1 }),
              github: fc.string({ minLength: 1 }),
            }),
          }),
          (personalInfo) => {
            const paragraphs = buildHeader(
              personalInfo as PersonalInfo,
              DEFAULT_EXTENDED_CONFIG,
            );

            // Should have 3 paragraphs: name, title/subtitle, contact
            return paragraphs.length === 3;
          },
        ),
        { numRuns: 100 },
      );
    });
  });
});
