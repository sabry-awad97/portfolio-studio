import { describe, it, expect } from "vitest";
import {
  SPACING_PATTERNS,
  resolveSpacing,
  createParagraphSpacing,
} from "./spacing-patterns";
import { DEFAULT_CONFIG } from "../configuration/default-config";
import type { ResumeConfig } from "../configuration/config-types";

describe("Spacing Patterns", () => {
  const mockConfig: ResumeConfig = DEFAULT_CONFIG;

  describe("SPACING_PATTERNS constant", () => {
    it("should define sectionHeader pattern", () => {
      expect(SPACING_PATTERNS.sectionHeader).toBeDefined();
      expect(SPACING_PATTERNS.sectionHeader.before).toBe("md");
      expect(SPACING_PATTERNS.sectionHeader.after).toBe("sm");
    });

    it("should define entryTitle pattern", () => {
      expect(SPACING_PATTERNS.entryTitle).toBeDefined();
      expect(SPACING_PATTERNS.entryTitle.before).toBe("sm");
      expect(SPACING_PATTERNS.entryTitle.after).toBe("xs");
    });

    it("should define entryContent pattern", () => {
      expect(SPACING_PATTERNS.entryContent).toBeDefined();
      expect(SPACING_PATTERNS.entryContent.after).toBe("sm");
    });

    it("should define entryDescription pattern", () => {
      expect(SPACING_PATTERNS.entryDescription).toBeDefined();
      expect(SPACING_PATTERNS.entryDescription.after).toBe("xs");
    });

    it("should have all required patterns", () => {
      expect(SPACING_PATTERNS).toHaveProperty("sectionHeader");
      expect(SPACING_PATTERNS).toHaveProperty("entryTitle");
      expect(SPACING_PATTERNS).toHaveProperty("entryContent");
      expect(SPACING_PATTERNS).toHaveProperty("entryDescription");
    });
  });

  describe("resolveSpacing", () => {
    it("should resolve pattern with both before and after", () => {
      const pattern = { before: "md" as const, after: "sm" as const };
      const result = resolveSpacing(pattern, mockConfig);

      expect(result.before).toBe(mockConfig.spacing.md);
      expect(result.after).toBe(mockConfig.spacing.sm);
    });

    it("should resolve pattern with only before", () => {
      const pattern = { before: "lg" as const };
      const result = resolveSpacing(pattern, mockConfig);

      expect(result.before).toBe(mockConfig.spacing.lg);
      expect(result.after).toBeUndefined();
    });

    it("should resolve pattern with only after", () => {
      const pattern = { after: "xs" as const };
      const result = resolveSpacing(pattern, mockConfig);

      expect(result.before).toBeUndefined();
      expect(result.after).toBe(mockConfig.spacing.xs);
    });

    it("should resolve all spacing sizes", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

      for (const size of sizes) {
        const pattern = { before: size };
        const result = resolveSpacing(pattern, mockConfig);
        expect(result.before).toBe(mockConfig.spacing[size]);
      }
    });

    it("should handle empty pattern", () => {
      const pattern = {};
      const result = resolveSpacing(pattern, mockConfig);

      expect(result.before).toBeUndefined();
      expect(result.after).toBeUndefined();
    });

    it("should use custom config spacing values", () => {
      const customConfig: ResumeConfig = {
        ...mockConfig,
        spacing: {
          xs: 100,
          sm: 200,
          md: 300,
          lg: 400,
          xl: 500,
        },
      };

      const pattern = { before: "md" as const, after: "sm" as const };
      const result = resolveSpacing(pattern, customConfig);

      expect(result.before).toBe(300);
      expect(result.after).toBe(200);
    });
  });

  describe("createParagraphSpacing", () => {
    it("should create spacing for sectionHeader pattern", () => {
      const result = createParagraphSpacing("sectionHeader", mockConfig);

      expect(result.before).toBe(mockConfig.spacing.md);
      expect(result.after).toBe(mockConfig.spacing.sm);
    });

    it("should create spacing for entryTitle pattern", () => {
      const result = createParagraphSpacing("entryTitle", mockConfig);

      expect(result.before).toBe(mockConfig.spacing.sm);
      expect(result.after).toBe(mockConfig.spacing.xs);
    });

    it("should create spacing for entryContent pattern", () => {
      const result = createParagraphSpacing("entryContent", mockConfig);

      expect(result.before).toBeUndefined();
      expect(result.after).toBe(mockConfig.spacing.sm);
    });

    it("should create spacing for entryDescription pattern", () => {
      const result = createParagraphSpacing("entryDescription", mockConfig);

      expect(result.before).toBeUndefined();
      expect(result.after).toBe(mockConfig.spacing.xs);
    });

    it("should work with custom config", () => {
      const customConfig: ResumeConfig = {
        ...mockConfig,
        spacing: {
          xs: 50,
          sm: 100,
          md: 200,
          lg: 300,
          xl: 400,
        },
      };

      const result = createParagraphSpacing("sectionHeader", customConfig);

      expect(result.before).toBe(200);
      expect(result.after).toBe(100);
    });

    it("should return consistent results for same pattern", () => {
      const result1 = createParagraphSpacing("entryTitle", mockConfig);
      const result2 = createParagraphSpacing("entryTitle", mockConfig);

      expect(result1).toEqual(result2);
    });

    it("should handle all pattern names", () => {
      const patterns = [
        "sectionHeader",
        "entryTitle",
        "entryContent",
        "entryDescription",
      ] as const;

      for (const pattern of patterns) {
        const result = createParagraphSpacing(pattern, mockConfig);
        expect(result).toBeDefined();
      }
    });
  });
});
