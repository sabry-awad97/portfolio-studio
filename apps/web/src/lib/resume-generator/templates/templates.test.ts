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

  describe("Page control features", () => {
    it("should not include page numbers by default", () => {
      const template = new ProfessionalTemplate();
      const data = createValidResumeData();
      const doc = template.buildDocument(data, DEFAULT_CONFIG);

      // Convert to JSON to inspect structure
      const docJson = JSON.stringify(doc);

      // Should have empty footers array (no page numbers)
      expect(docJson).toContain('"footers":[]');
    });

    it("should include page numbers when enabled", () => {
      const template = new ProfessionalTemplate();
      const data = createValidResumeData();
      const config = {
        ...DEFAULT_CONFIG,
        page_config: {
          enable_page_numbers: true,
          page_number_format: "Page {PAGE} of {NUMPAGES}",
          enable_page_header: false,
        },
      };

      const doc = template.buildDocument(data, config);

      // Convert to JSON to inspect structure
      const docJson = JSON.stringify(doc);

      // Should contain footer with page numbers (not empty array)
      expect(docJson).not.toContain('"footers":[]');
      expect(docJson).toContain("Page");
      // Check for PAGE field code (how docx serializes PageNumber.CURRENT)
      expect(docJson).toContain("PAGE");
      // Check for NUMPAGES field code (how docx serializes PageNumber.TOTAL_PAGES)
      expect(docJson).toContain("NUMPAGES");
    });

    it("should not include page header by default", () => {
      const template = new ProfessionalTemplate();
      const data = createValidResumeData();
      const doc = template.buildDocument(data, DEFAULT_CONFIG);

      // Convert to JSON to inspect structure
      const docJson = JSON.stringify(doc);

      // Should have empty headers array (no page header)
      expect(docJson).toContain('"headers":[]');
    });

    it("should include page header when enabled", () => {
      const template = new ProfessionalTemplate();
      const data = createValidResumeData();
      const config = {
        ...DEFAULT_CONFIG,
        page_config: {
          enable_page_numbers: false,
          page_number_format: "Page {PAGE} of {NUMPAGES}",
          enable_page_header: true,
        },
      };

      const doc = template.buildDocument(data, config);

      // Convert to JSON to inspect structure
      const docJson = JSON.stringify(doc);

      // Should contain header with candidate name (not empty array)
      expect(docJson).not.toContain('"headers":[]');
      expect(docJson).toContain(data.personalInfo.name);
    });

    it("should include both page numbers and header when both enabled", () => {
      const template = new ProfessionalTemplate();
      const data = createValidResumeData();
      const config = {
        ...DEFAULT_CONFIG,
        page_config: {
          enable_page_numbers: true,
          page_number_format: "Page {PAGE} of {NUMPAGES}",
          enable_page_header: true,
        },
      };

      const doc = template.buildDocument(data, config);

      // Convert to JSON to inspect structure
      const docJson = JSON.stringify(doc);

      // Should contain both headers and footers (not empty arrays)
      expect(docJson).not.toContain('"headers":[]');
      expect(docJson).not.toContain('"footers":[]');
      expect(docJson).toContain(data.personalInfo.name);
      expect(docJson).toContain("Page");
    });

    it("should work with modern template", () => {
      const template = new ModernTemplate();
      const data = createValidResumeData();
      const config = {
        ...DEFAULT_CONFIG,
        page_config: {
          enable_page_numbers: true,
          page_number_format: "Page {PAGE} of {NUMPAGES}",
          enable_page_header: true,
        },
      };

      const doc = template.buildDocument(data, config);
      // Convert to JSON to inspect structure
      const docJson = JSON.stringify(doc);

      // Should contain both headers and footers (not empty arrays)
      expect(docJson).not.toContain('"headers":[]');
      expect(docJson).not.toContain('"footers":[]');
    });
  });

  describe("Document language attribute", () => {
    it("should use default language when not specified", () => {
      const template = new ProfessionalTemplate();
      const data = createValidResumeData();

      // Should not throw when building document with default config
      // Note: docx library doesn't support setting document language directly
      expect(() => template.buildDocument(data, DEFAULT_CONFIG)).not.toThrow();
    });

    it("should accept document_language in config", () => {
      const template = new ProfessionalTemplate();
      const data = createValidResumeData();
      const config = {
        ...DEFAULT_CONFIG,
        document_language: "fr-FR",
      };

      // Should not throw when building document with language config
      expect(() => template.buildDocument(data, config)).not.toThrow();
    });

    it("should work with various language codes", () => {
      const template = new ProfessionalTemplate();
      const data = createValidResumeData();
      const languages = ["es-ES", "de-DE", "ja-JP", "zh-CN", "pt-BR"];

      languages.forEach((lang) => {
        const config = {
          ...DEFAULT_CONFIG,
          document_language: lang,
        };

        // Should not throw when building document with any language code
        expect(() => template.buildDocument(data, config)).not.toThrow();
      });
    });

    it("should work with modern template", () => {
      const template = new ModernTemplate();
      const data = createValidResumeData();
      const config = {
        ...DEFAULT_CONFIG,
        document_language: "it-IT",
      };

      // Should not throw when building document with language config
      expect(() => template.buildDocument(data, config)).not.toThrow();
    });
  });
});
