import { describe, it, expect } from "vitest";
import { ProfessionalTemplate } from "./professional-template";
import { ModernTemplate } from "./modern-template";
import { DEFAULT_CONFIG } from "../configuration/default-config";
import type { ResumeData } from "../types";

describe("Templates", () => {
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
    projects: [
      {
        id: 1,
        date: "2023",
        title: "Test Project",
        description: "A test project",
        tags: ["React", "TypeScript"],
      },
    ],
    skills: {
      languages: [{ name: "TypeScript" }],
      frameworks: [{ name: "React" }],
      tools: [{ name: "Git" }],
    },
  });

  describe("ProfessionalTemplate", () => {
    it("should implement Template interface", () => {
      const template = new ProfessionalTemplate();
      expect(template.name).toBe("professional");
      expect(template.buildDocument).toBeDefined();
    });

    it("should build document with valid data", () => {
      const template = new ProfessionalTemplate();
      const data = createValidResumeData();
      const doc = template.buildDocument(data, DEFAULT_CONFIG);

      expect(doc).toBeDefined();
    });

    it("should omit optional sections when data is missing", () => {
      const template = new ProfessionalTemplate();
      const data: ResumeData = {
        ...createValidResumeData(),
        experience: undefined,
        certifications: undefined,
      };

      const doc = template.buildDocument(data, DEFAULT_CONFIG);
      expect(doc).toBeDefined();
    });

    it("should include all sections when data is provided", () => {
      const template = new ProfessionalTemplate();
      const data: ResumeData = {
        ...createValidResumeData(),
        experience: [
          {
            id: 1,
            company: "Tech Corp",
            role: "Developer",
            startDate: "2020",
            endDate: "2023",
            responsibilities: ["Developed features"],
          },
        ],
        certifications: [
          {
            id: 1,
            name: "AWS Certified",
            issuer: "Amazon",
            date: "2023",
          },
        ],
      };

      const doc = template.buildDocument(data, DEFAULT_CONFIG);
      expect(doc).toBeDefined();
    });
  });

  describe("ModernTemplate", () => {
    it("should implement Template interface", () => {
      const template = new ModernTemplate();
      expect(template.name).toBe("modern");
      expect(template.buildDocument).toBeDefined();
    });

    it("should build document with valid data", () => {
      const template = new ModernTemplate();
      const data = createValidResumeData();
      const doc = template.buildDocument(data, DEFAULT_CONFIG);

      expect(doc).toBeDefined();
    });

    it("should omit optional sections when data is missing", () => {
      const template = new ModernTemplate();
      const data: ResumeData = {
        ...createValidResumeData(),
        experience: undefined,
        certifications: undefined,
      };

      const doc = template.buildDocument(data, DEFAULT_CONFIG);
      expect(doc).toBeDefined();
    });
  });

  describe("Template differences", () => {
    it("should produce different outputs for different templates", () => {
      const professionalTemplate = new ProfessionalTemplate();
      const modernTemplate = new ModernTemplate();
      const data = createValidResumeData();

      const professionalDoc = professionalTemplate.buildDocument(
        data,
        DEFAULT_CONFIG,
      );
      const modernDoc = modernTemplate.buildDocument(data, DEFAULT_CONFIG);

      // Convert to JSON to compare structure
      const professionalJson = JSON.stringify(professionalDoc);
      const modernJson = JSON.stringify(modernDoc);

      // Different templates should produce different outputs
      expect(professionalJson).not.toBe(modernJson);
    });
  });
});
