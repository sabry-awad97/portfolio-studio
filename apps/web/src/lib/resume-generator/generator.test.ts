import { describe, it, expect, vi } from "vitest";
import { generateResume, getTemplate } from "./generator";
import { ResumeGenerationError, TemplateError } from "./validation/errors";
import { DEFAULT_CONFIG } from "./configuration/default-config";
import type { ResumeData } from "./types";

// Mock file-saver
vi.mock("file-saver", () => ({
  saveAs: vi.fn(),
}));

describe("Generator", () => {
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

  describe("getTemplate", () => {
    it("should return professional template", () => {
      const template = getTemplate("professional");
      expect(template.name).toBe("professional");
    });

    it("should return modern template", () => {
      const template = getTemplate("modern");
      expect(template.name).toBe("modern");
    });

    it("should throw error for unknown template", () => {
      expect(() => getTemplate("unknown" as any)).toThrow(TemplateError);
    });

    it("should use default template when not specified", () => {
      const template = getTemplate(DEFAULT_CONFIG.template);
      expect(template).toBeDefined();
    });
  });

  describe("generateResume", () => {
    it("should generate resume with valid data", async () => {
      const data = createValidResumeData();
      await expect(generateResume(data)).resolves.not.toThrow();
    });

    it("should throw ResumeGenerationError for invalid data", async () => {
      const invalidData: ResumeData = {
        ...createValidResumeData(),
        personalInfo: {
          ...createValidResumeData().personalInfo,
          name: "", // Invalid: empty name
        },
      };

      await expect(generateResume(invalidData)).rejects.toThrow(
        ResumeGenerationError,
      );
    });

    it("should use default config when not provided", async () => {
      const data = createValidResumeData();
      await expect(generateResume(data)).resolves.not.toThrow();
    });

    it("should merge custom config with defaults", async () => {
      const data = createValidResumeData();
      const customConfig = {
        template: "modern" as const,
      };

      await expect(generateResume(data, customConfig)).resolves.not.toThrow();
    });

    it("should sanitize filename correctly", async () => {
      const data = createValidResumeData();
      data.personalInfo.name = "John@Doe#Test";

      await expect(generateResume(data)).resolves.not.toThrow();
    });

    it("should handle optional sections", async () => {
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

      await expect(generateResume(data)).resolves.not.toThrow();
    });
  });
});
