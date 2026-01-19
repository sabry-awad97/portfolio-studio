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
});
