import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { validateResumeData } from "./validator";
import type { ResumeData, Education } from "../types";

describe("Data Validator", () => {
  // Helper to create valid resume data
  const createValidResumeData = (): ResumeData => ({
    personalInfo: {
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
    },
    education: [
      {
        id: 1,
        date: "2020",
        title: "BS Computer Science",
        description: "University of Example",
      },
    ],
    projects: [],
    skills: {
      languages: [],
      frameworks: [],
      tools: [],
    },
  });

  describe("Valid data", () => {
    it("should pass validation for valid data", () => {
      const data = createValidResumeData();
      const result = validateResumeData(data);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should pass validation with optional fields", () => {
      const data = createValidResumeData();
      data.experience = [
        {
          id: 1,
          company: "Tech Corp",
          role: "Developer",
          startDate: "2020-01",
          endDate: "2023-12",
          responsibilities: ["Developed features"],
        },
      ];
      data.certifications = [
        {
          id: 1,
          name: "AWS Certified",
          issuer: "Amazon",
          date: "2022",
        },
      ];

      const result = validateResumeData(data);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe("Missing required fields", () => {
    it("should detect missing name", () => {
      const data = createValidResumeData();
      data.personalInfo.name = "";

      const result = validateResumeData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: "personalInfo.name",
        message: "Name is required",
      });
    });

    it("should detect missing name (whitespace only)", () => {
      const data = createValidResumeData();
      data.personalInfo.name = "   ";

      const result = validateResumeData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === "personalInfo.name")).toBe(
        true,
      );
    });

    it("should detect missing email", () => {
      const data = createValidResumeData();
      data.personalInfo.contact.email = "";

      const result = validateResumeData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: "personalInfo.contact.email",
        message: "Email is required",
      });
    });

    it("should detect missing education array", () => {
      const data = createValidResumeData();
      data.education = [];

      const result = validateResumeData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: "education",
        message: "At least one education entry is required",
      });
    });
  });

  describe("Invalid data formats", () => {
    it("should detect invalid email format - no @", () => {
      const data = createValidResumeData();
      data.personalInfo.contact.email = "notanemail.com";

      const result = validateResumeData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: "personalInfo.contact.email",
        message: "Email format is invalid",
      });
    });

    it("should detect invalid email format - no domain", () => {
      const data = createValidResumeData();
      data.personalInfo.contact.email = "user@";

      const result = validateResumeData(data);

      expect(result.isValid).toBe(false);
      expect(
        result.errors.some((e) => e.field === "personalInfo.contact.email"),
      ).toBe(true);
    });

    it("should detect invalid email format - no TLD", () => {
      const data = createValidResumeData();
      data.personalInfo.contact.email = "user@domain";

      const result = validateResumeData(data);

      expect(result.isValid).toBe(false);
      expect(
        result.errors.some((e) => e.field === "personalInfo.contact.email"),
      ).toBe(true);
    });

    it("should detect empty phone when provided", () => {
      const data = createValidResumeData();
      data.personalInfo.contact.phone = "   ";

      const result = validateResumeData(data);

      expect(result.isValid).toBe(false);
      expect(
        result.errors.some((e) => e.field === "personalInfo.contact.phone"),
      ).toBe(true);
    });
  });

  describe("Multiple validation errors", () => {
    it("should collect all validation errors", () => {
      const data = createValidResumeData();
      data.personalInfo.name = "";
      data.personalInfo.contact.email = "invalid";
      data.education = [];

      const result = validateResumeData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(3);
      expect(result.errors.some((e) => e.field === "personalInfo.name")).toBe(
        true,
      );
      expect(
        result.errors.some((e) => e.field === "personalInfo.contact.email"),
      ).toBe(true);
      expect(result.errors.some((e) => e.field === "education")).toBe(true);
    });
  });

  // Property 1: Validation detects missing required fields
  describe("Property 1: Validation detects missing required fields", () => {
    it("should detect missing name in generated data", () => {
      // Feature: resume-generator-refactor, Property 1: Validation detects missing required fields
      fc.assert(
        fc.property(
          fc.record({
            personalInfo: fc.record({
              name: fc.constant(""), // Missing name
              title: fc.string(),
              subtitle: fc.string(),
              bio: fc.string(),
              contact: fc.record({
                email: fc.emailAddress(),
                phone: fc.string({ minLength: 1 }),
                linkedin: fc.string(),
                github: fc.string(),
              }),
            }),
            education: fc.array(
              fc.record({
                id: fc.integer(),
                date: fc.string(),
                title: fc.string(),
                description: fc.string(),
              }),
              { minLength: 1 },
            ),
            projects: fc.array(
              fc.record({
                id: fc.integer(),
                date: fc.string(),
                title: fc.string(),
                description: fc.string(),
                tags: fc.array(fc.string()),
              }),
            ),
            skills: fc.record({
              languages: fc.array(fc.record({ name: fc.string() })),
              frameworks: fc.array(fc.record({ name: fc.string() })),
              tools: fc.array(fc.record({ name: fc.string() })),
            }),
          }),
          (data) => {
            const result = validateResumeData(data as ResumeData);
            return (
              result.isValid === false &&
              result.errors.some((e) => e.field === "personalInfo.name")
            );
          },
        ),
        { numRuns: 100 },
      );
    });

    it("should detect missing email in generated data", () => {
      // Feature: resume-generator-refactor, Property 1: Validation detects missing required fields
      fc.assert(
        fc.property(
          fc.record({
            personalInfo: fc.record({
              name: fc.string({ minLength: 1 }),
              title: fc.string(),
              subtitle: fc.string(),
              bio: fc.string(),
              contact: fc.record({
                email: fc.constant(""), // Missing email
                phone: fc.string({ minLength: 1 }),
                linkedin: fc.string(),
                github: fc.string(),
              }),
            }),
            education: fc.array(
              fc.record({
                id: fc.integer(),
                date: fc.string(),
                title: fc.string(),
                description: fc.string(),
              }),
              { minLength: 1 },
            ),
            projects: fc.array(
              fc.record({
                id: fc.integer(),
                date: fc.string(),
                title: fc.string(),
                description: fc.string(),
                tags: fc.array(fc.string()),
              }),
            ),
            skills: fc.record({
              languages: fc.array(fc.record({ name: fc.string() })),
              frameworks: fc.array(fc.record({ name: fc.string() })),
              tools: fc.array(fc.record({ name: fc.string() })),
            }),
          }),
          (data) => {
            const result = validateResumeData(data as ResumeData);
            return (
              result.isValid === false &&
              result.errors.some(
                (e) => e.field === "personalInfo.contact.email",
              )
            );
          },
        ),
        { numRuns: 100 },
      );
    });

    it("should detect missing education in generated data", () => {
      // Feature: resume-generator-refactor, Property 1: Validation detects missing required fields
      fc.assert(
        fc.property(
          fc.record({
            personalInfo: fc.record({
              name: fc.string({ minLength: 1 }),
              title: fc.string(),
              subtitle: fc.string(),
              bio: fc.string(),
              contact: fc.record({
                email: fc.emailAddress(),
                phone: fc.string({ minLength: 1 }),
                linkedin: fc.string(),
                github: fc.string(),
              }),
            }),
            education: fc.constant([]) as fc.Arbitrary<Education[]>, // Empty education
            projects: fc.array(
              fc.record({
                id: fc.integer(),
                date: fc.string(),
                title: fc.string(),
                description: fc.string(),
                tags: fc.array(fc.string()),
              }),
            ),
            skills: fc.record({
              languages: fc.array(fc.record({ name: fc.string() })),
              frameworks: fc.array(fc.record({ name: fc.string() })),
              tools: fc.array(fc.record({ name: fc.string() })),
            }),
          }),
          (data) => {
            const result = validateResumeData(data as ResumeData);
            return (
              result.isValid === false &&
              result.errors.some((e) => e.field === "education")
            );
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  // Property 2: Validation detects invalid data formats
  describe("Property 2: Validation detects invalid data formats", () => {
    it("should detect invalid email formats", () => {
      // Feature: resume-generator-refactor, Property 2: Validation detects invalid data formats
      const invalidEmailGenerator = fc.oneof(
        fc.constant("notanemail"),
        fc.constant("missing@domain"),
        fc.constant("@nodomain.com"),
        fc.constant("no@at."),
        fc.string().filter((s) => !s.includes("@") && s.length > 0),
      );

      fc.assert(
        fc.property(
          fc.record({
            personalInfo: fc.record({
              name: fc.string({ minLength: 1 }),
              title: fc.string(),
              subtitle: fc.string(),
              bio: fc.string(),
              contact: fc.record({
                email: invalidEmailGenerator,
                phone: fc.string({ minLength: 1 }),
                linkedin: fc.string(),
                github: fc.string(),
              }),
            }),
            education: fc.array(
              fc.record({
                id: fc.integer(),
                date: fc.string(),
                title: fc.string(),
                description: fc.string(),
              }),
              { minLength: 1 },
            ),
            projects: fc.array(
              fc.record({
                id: fc.integer(),
                date: fc.string(),
                title: fc.string(),
                description: fc.string(),
                tags: fc.array(fc.string()),
              }),
            ),
            skills: fc.record({
              languages: fc.array(fc.record({ name: fc.string() })),
              frameworks: fc.array(fc.record({ name: fc.string() })),
              tools: fc.array(fc.record({ name: fc.string() })),
            }),
          }),
          (data) => {
            const result = validateResumeData(data as ResumeData);
            return (
              result.isValid === false &&
              result.errors.some(
                (e) =>
                  e.field === "personalInfo.contact.email" &&
                  (e.message.includes("invalid") ||
                    e.message.includes("required")),
              )
            );
          },
        ),
        { numRuns: 100 },
      );
    });
  });
});
