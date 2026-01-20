import { describe, it, expect } from "vitest";
import { TextRun, ExternalHyperlink } from "docx";
import {
  createTextRun,
  createHyperlink,
  createBulletText,
  createTitleDateText,
} from "./text-run-factory";
import { DEFAULT_CONFIG } from "../configuration/default-config";
import type { ResumeConfig } from "../configuration/config-types";

describe("Text Run Factory", () => {
  const mockConfig: ResumeConfig = DEFAULT_CONFIG;

  describe("createTextRun", () => {
    it("should create TextRun with specified properties", () => {
      const result = createTextRun(
        {
          text: "Hello World",
          size: 24,
          color: "000000",
          bold: true,
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TextRun);
    });

    it("should apply default font from config when not specified", () => {
      const result = createTextRun(
        {
          text: "Hello",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TextRun);
    });

    it("should handle empty text", () => {
      const result = createTextRun(
        {
          text: "",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TextRun);
    });

    it("should use custom font when specified", () => {
      const result = createTextRun(
        {
          text: "Custom Font",
          font: "Arial",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TextRun);
    });

    it("should handle all styling options", () => {
      const result = createTextRun(
        {
          text: "Styled Text",
          size: 20,
          color: "FF0000",
          font: "Times New Roman",
          bold: true,
          italics: true,
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TextRun);
    });
  });

  describe("createHyperlink", () => {
    it("should create hyperlink with https:// prefix", () => {
      const result = createHyperlink(
        {
          text: "GitHub",
          url: "github.com/user",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(ExternalHyperlink);
    });

    it("should not add https:// if already present", () => {
      const result = createHyperlink(
        {
          text: "GitHub",
          url: "https://github.com/user",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(ExternalHyperlink);
    });

    it("should not add https:// if http:// is present", () => {
      const result = createHyperlink(
        {
          text: "Website",
          url: "http://example.com",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(ExternalHyperlink);
    });

    it("should handle hyperlink with styling options", () => {
      const result = createHyperlink(
        {
          text: "Styled Link",
          url: "example.com",
          size: 20,
          color: "0000FF",
          bold: true,
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(ExternalHyperlink);
    });

    it("should apply default font from config", () => {
      const result = createHyperlink(
        {
          text: "Link",
          url: "example.com",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(ExternalHyperlink);
    });
  });

  describe("createBulletText", () => {
    it("should join items with default separator", () => {
      const result = createBulletText(["Item 1", "Item 2", "Item 3"]);
      expect(result).toBe("Item 1 • Item 2 • Item 3");
    });

    it("should join items with custom separator", () => {
      const result = createBulletText(["Item 1", "Item 2", "Item 3"], " | ");
      expect(result).toBe("Item 1 | Item 2 | Item 3");
    });

    it("should handle single item", () => {
      const result = createBulletText(["Single Item"]);
      expect(result).toBe("Single Item");
    });

    it("should handle empty array", () => {
      const result = createBulletText([]);
      expect(result).toBe("");
    });

    it("should handle items with special characters", () => {
      const result = createBulletText(["C++", "C#", "F#"]);
      expect(result).toBe("C++ • C# • F#");
    });

    it("should handle comma separator", () => {
      const result = createBulletText(["React", "Vue", "Angular"], ", ");
      expect(result).toBe("React, Vue, Angular");
    });
  });

  describe("createTitleDateText", () => {
    it("should format title and date with default separator", () => {
      const result = createTitleDateText("Software Engineer", "2020-2023");
      expect(result).toBe("Software Engineer  •  2020-2023");
    });

    it("should format title and date with custom separator", () => {
      const result = createTitleDateText(
        "Software Engineer",
        "2020-2023",
        " - ",
      );
      expect(result).toBe("Software Engineer - 2020-2023");
    });

    it("should handle empty title", () => {
      const result = createTitleDateText("", "2020");
      expect(result).toBe("  •  2020");
    });

    it("should handle empty date", () => {
      const result = createTitleDateText("Software Engineer", "");
      expect(result).toBe("Software Engineer  •  ");
    });

    it("should handle both empty", () => {
      const result = createTitleDateText("", "");
      expect(result).toBe("  •  ");
    });

    it("should handle pipe separator", () => {
      const result = createTitleDateText("Title", "Date", " | ");
      expect(result).toBe("Title | Date");
    });
  });
});
