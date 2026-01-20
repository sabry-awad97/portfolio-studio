import { describe, it, expect, vi } from "vitest";
import { generateResume } from "./generator";
import { personalInfo, education, projects, skills } from "../data";
import type { ResumeData } from "./types";

// Mock file-saver
vi.mock("file-saver", () => ({
  saveAs: vi.fn(),
}));

describe("Integration Tests", () => {
  describe("Backward compatibility", () => {
    it("should work with existing data structure from data.ts", async () => {
      // Convert existing data to ResumeData format
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      // Should generate without errors
      await expect(generateResume(resumeData)).resolves.not.toThrow();
    });

    it("should generate with professional template", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      await expect(
        generateResume(resumeData, { template: "professional" }),
      ).resolves.not.toThrow();
    });

    it("should generate with modern template", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      await expect(
        generateResume(resumeData, { template: "modern" }),
      ).resolves.not.toThrow();
    });
  });

  describe("End-to-end generation", () => {
    it("should generate complete resume with all sections", async () => {
      const resumeData: ResumeData = {
        personalInfo: {
          name: "John Doe",
          title: "Software Engineer",
          subtitle: "Full Stack Developer",
          bio: "Experienced software engineer with expertise in modern web technologies.",
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
            title: "E-commerce Platform",
            description: "Built a full-stack e-commerce platform",
            tags: ["React", "Node.js", "MongoDB"],
          },
        ],
        skills: {
          languages: [{ name: "TypeScript" }, { name: "JavaScript" }],
          frameworks: [{ name: "React" }, { name: "Node.js" }],
          tools: [{ name: "Git" }, { name: "Docker" }],
        },
        experience: [
          {
            id: 1,
            company: "Tech Corp",
            role: "Senior Developer",
            startDate: "2020-01",
            endDate: "2023-12",
            responsibilities: [
              "Led team of 5 developers",
              "Developed key features",
              "Mentored junior developers",
            ],
          },
        ],
        certifications: [
          {
            id: 1,
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2023",
          },
        ],
      };

      await expect(generateResume(resumeData)).resolves.not.toThrow();
    });

    it("should handle minimal resume data", async () => {
      const resumeData: ResumeData = {
        personalInfo: {
          name: "Jane Doe",
          title: "Developer",
          subtitle: "Software Engineer",
          bio: "Passionate developer",
          contact: {
            email: "jane@example.com",
            phone: "+1-555-0100",
            linkedin: "",
            github: "",
          },
        },
        education: [
          {
            id: 1,
            date: "2022",
            title: "BS Computer Science",
            description: "State University",
          },
        ],
        projects: [],
        skills: {
          languages: [{ name: "Python" }],
          frameworks: [],
          tools: [],
        },
      };

      await expect(generateResume(resumeData)).resolves.not.toThrow();
    });
  });

  describe("Backward compatibility with old config format", () => {
    it("should work with old config format (without extended properties)", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      // Old config format - only base properties
      const oldConfig = {
        template: "professional" as const,
        colors: {
          primary: "002ad2",
          secondary: "666666",
          accent: "ff6b6b",
          text: "333333",
          background: "ffffff",
        },
        spacing: {
          xs: 100,
          sm: 200,
          md: 300,
          lg: 400,
          xl: 500,
        },
      };

      await expect(
        generateResume(resumeData, oldConfig),
      ).resolves.not.toThrow();
    });

    it("should apply defaults for missing extended properties", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      // Partial config - missing section_titles, formatting, etc.
      const partialConfig = {
        colors: {
          primary: "0066cc",
        },
      };

      await expect(
        generateResume(resumeData, partialConfig),
      ).resolves.not.toThrow();
    });

    it("should generate valid document structure with old config", async () => {
      const resumeData: ResumeData = {
        personalInfo: {
          name: "Test User",
          title: "Developer",
          subtitle: "Software Engineer",
          bio: "Test bio",
          contact: {
            email: "test@example.com",
            phone: "555-0100",
            linkedin: "",
            github: "",
          },
        },
        education: [
          {
            id: 1,
            date: "2020",
            title: "BS Computer Science",
            description: "Test University",
          },
        ],
        projects: [],
        skills: {
          languages: [{ name: "JavaScript" }],
          frameworks: [],
          tools: [],
        },
      };

      const oldConfig = {
        template: "modern" as const,
        colors: {
          primary: "1a73e8",
          secondary: "5f6368",
          accent: "ea4335",
          text: "202124",
          background: "ffffff",
        },
      };

      // Should generate successfully
      await expect(
        generateResume(resumeData, oldConfig),
      ).resolves.not.toThrow();
    });
  });

  describe("End-to-end with new features", () => {
    it("should generate with custom section titles", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      const config = {
        section_titles: {
          education: "EDUCATION & TRAINING",
          projects: "KEY PROJECTS",
          skills: "TECHNICAL SKILLS",
          experience: "WORK EXPERIENCE",
          certifications: "CERTIFICATIONS",
          summary: "PROFESSIONAL SUMMARY",
        },
      };

      await expect(generateResume(resumeData, config)).resolves.not.toThrow();
    });

    it("should generate with custom formatting options", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      const config = {
        formatting: {
          bullet_character: "→",
          date_separator: " | ",
          tag_separator: " • ",
        },
      };

      await expect(generateResume(resumeData, config)).resolves.not.toThrow();
    });

    it("should generate with custom table config", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      const config = {
        table_config: {
          skills_column_widths: [30, 70],
        },
      };

      await expect(generateResume(resumeData, config)).resolves.not.toThrow();
    });

    it("should generate with page controls enabled", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      const config = {
        page_config: {
          enable_page_numbers: true,
          enable_page_header: true,
          page_number_format: "Page {PAGE} of {NUMPAGES}",
          page_header_text: "{name}",
        },
      };

      await expect(generateResume(resumeData, config)).resolves.not.toThrow();
    });

    it("should generate with custom date format", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
      };

      const config = {
        date_format: {
          locale: "de-DE",
          format_pattern: "MM.YYYY",
        },
      };

      await expect(generateResume(resumeData, config)).resolves.not.toThrow();
    });

    it("should generate with all new features combined", async () => {
      const resumeData: ResumeData = {
        personalInfo,
        education,
        projects,
        skills,
        experience: [
          {
            id: 1,
            company: "Tech Company",
            role: "Developer",
            startDate: "2020-01",
            endDate: "2023-12",
            responsibilities: ["Developed features", "Fixed bugs"],
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

      const config = {
        template: "professional" as const,
        section_titles: {
          education: "AUSBILDUNG",
          projects: "PROJEKTE",
          skills: "FÄHIGKEITEN",
          experience: "BERUFSERFAHRUNG",
          certifications: "ZERTIFIKATE",
          summary: "ZUSAMMENFASSUNG",
        },
        formatting: {
          bullet_character: "▸",
          date_separator: " – ",
          tag_separator: " | ",
        },
        table_config: {
          skills_column_widths: [35, 65],
        },
        page_config: {
          enable_page_numbers: true,
          enable_page_header: true,
          page_number_format: "Seite {PAGE}",
          page_header_text: "{name}",
        },
        date_format: {
          locale: "de-DE",
          format_pattern: "MM.YYYY",
        },
        document_language: "de-DE",
      };

      await expect(generateResume(resumeData, config)).resolves.not.toThrow();
    });
  });
});
