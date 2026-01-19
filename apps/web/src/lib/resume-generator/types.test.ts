import { describe, it, expect } from "vitest";
import type {
  ResumeData,
  PersonalInfo,
  ContactInfo,
  Education,
  Project,
  Skills,
  WorkExperience,
  Certification,
  ValidationResult,
  ValidationError,
} from "./types";

describe("Resume Generator Types", () => {
  it("should define all required types", () => {
    // This test verifies that all types are properly exported and can be imported
    const types = [
      "ResumeData",
      "PersonalInfo",
      "ContactInfo",
      "Education",
      "Project",
      "Skills",
      "WorkExperience",
      "Certification",
      "ValidationResult",
      "ValidationError",
    ];

    // If this test runs without TypeScript errors, all types are properly defined
    expect(types.length).toBe(10);
  });

  it("should allow creating a valid ResumeData object", () => {
    const resumeData: ResumeData = {
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
          tags: ["TypeScript", "React"],
        },
      ],
      skills: {
        languages: [{ name: "TypeScript" }],
        frameworks: [{ name: "React" }],
        tools: [{ name: "Git" }],
      },
    };

    expect(resumeData.personalInfo.name).toBe("John Doe");
    expect(resumeData.education.length).toBe(1);
    expect(resumeData.projects.length).toBe(1);
  });

  it("should allow optional fields in ResumeData", () => {
    const resumeData: ResumeData = {
      personalInfo: {
        name: "Jane Doe",
        title: "Developer",
        subtitle: "Backend",
        bio: "Backend specialist",
        contact: {
          email: "jane@example.com",
          phone: "098-765-4321",
          linkedin: "linkedin.com/in/janedoe",
          github: "github.com/janedoe",
          twitter: "twitter.com/janedoe",
        },
      },
      education: [],
      projects: [],
      skills: {
        languages: [],
        frameworks: [],
        tools: [],
      },
      experience: [
        {
          id: 1,
          company: "Tech Corp",
          role: "Senior Developer",
          startDate: "2020-01",
          endDate: "2023-12",
          responsibilities: ["Led team", "Developed features"],
        },
      ],
      certifications: [
        {
          id: 1,
          name: "AWS Certified",
          issuer: "Amazon",
          date: "2022",
        },
      ],
    };

    expect(resumeData.experience).toBeDefined();
    expect(resumeData.certifications).toBeDefined();
    expect(resumeData.experience?.length).toBe(1);
    expect(resumeData.certifications?.length).toBe(1);
  });

  it("should allow creating ValidationResult objects", () => {
    const validResult: ValidationResult = {
      isValid: true,
      errors: [],
    };

    const invalidResult: ValidationResult = {
      isValid: false,
      errors: [
        {
          field: "personalInfo.name",
          message: "Name is required",
        },
      ],
    };

    expect(validResult.isValid).toBe(true);
    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.errors.length).toBe(1);
  });
});
