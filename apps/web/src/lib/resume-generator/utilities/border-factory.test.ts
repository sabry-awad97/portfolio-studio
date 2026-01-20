import { describe, it, expect } from "vitest";
import { BorderStyle, convertInchesToTwip } from "docx";
import {
  createTableBorders,
  createSectionBorder,
  createCellMargins,
} from "./border-factory";
import { DEFAULT_CONFIG } from "../configuration/default-config";
import type { ResumeConfig } from "../configuration/config-types";

describe("Border Factory", () => {
  const mockConfig: ResumeConfig = DEFAULT_CONFIG;

  describe("createTableBorders", () => {
    it("should create table borders with default values", () => {
      const result = createTableBorders({}, mockConfig);

      expect(result).toBeDefined();
      expect(result.top).toBeDefined();
      expect(result.bottom).toBeDefined();
      expect(result.left).toBeDefined();
      expect(result.right).toBeDefined();
      expect(result.insideHorizontal).toBeDefined();
      expect(result.insideVertical).toBeDefined();
    });

    it("should use config colors for default borders", () => {
      const result = createTableBorders({}, mockConfig);

      expect(result.top?.color).toBe(mockConfig.colors.secondary);
      expect(result.bottom?.color).toBe(mockConfig.colors.secondary);
      expect(result.left?.color).toBe(mockConfig.colors.secondary);
      expect(result.right?.color).toBe(mockConfig.colors.secondary);
      expect(result.insideHorizontal?.color).toBe(mockConfig.colors.accent);
      expect(result.insideVertical?.color).toBe(mockConfig.colors.accent);
    });

    it("should apply custom outer border options", () => {
      const result = createTableBorders(
        {
          outer: {
            style: BorderStyle.DOUBLE,
            size: 2,
            color: "FF0000",
          },
        },
        mockConfig,
      );

      expect(result.top?.style).toBe(BorderStyle.DOUBLE);
      expect(result.top?.size).toBe(2);
      expect(result.top?.color).toBe("FF0000");
      expect(result.bottom?.style).toBe(BorderStyle.DOUBLE);
      expect(result.left?.style).toBe(BorderStyle.DOUBLE);
      expect(result.right?.style).toBe(BorderStyle.DOUBLE);
    });

    it("should apply custom inner border options", () => {
      const result = createTableBorders(
        {
          inner: {
            style: BorderStyle.DASHED,
            size: 3,
            color: "00FF00",
          },
        },
        mockConfig,
      );

      expect(result.insideHorizontal?.style).toBe(BorderStyle.DASHED);
      expect(result.insideHorizontal?.size).toBe(3);
      expect(result.insideHorizontal?.color).toBe("00FF00");
      expect(result.insideVertical?.style).toBe(BorderStyle.DASHED);
      expect(result.insideVertical?.size).toBe(3);
      expect(result.insideVertical?.color).toBe("00FF00");
    });

    it("should apply both outer and inner custom options", () => {
      const result = createTableBorders(
        {
          outer: {
            style: BorderStyle.THICK,
            size: 5,
            color: "000000",
          },
          inner: {
            style: BorderStyle.DOTTED,
            size: 1,
            color: "CCCCCC",
          },
        },
        mockConfig,
      );

      expect(result.top?.style).toBe(BorderStyle.THICK);
      expect(result.top?.color).toBe("000000");
      expect(result.insideHorizontal?.style).toBe(BorderStyle.DOTTED);
      expect(result.insideHorizontal?.color).toBe("CCCCCC");
    });

    it("should use default size of 1 for borders", () => {
      const result = createTableBorders({}, mockConfig);

      expect(result.top?.size).toBe(1);
      expect(result.insideHorizontal?.size).toBe(1);
    });
  });

  describe("createSectionBorder", () => {
    it("should create bottom border with default values", () => {
      const result = createSectionBorder("bottom", {}, mockConfig);

      expect(result).toBeDefined();
      expect(result.style).toBe(BorderStyle.SINGLE);
      expect(result.size).toBe(20);
      expect(result.color).toBe(mockConfig.colors.primary);
      expect(result.space).toBe(1);
    });

    it("should create top border with default values", () => {
      const result = createSectionBorder("top", {}, mockConfig);

      expect(result).toBeDefined();
      expect(result.style).toBe(BorderStyle.SINGLE);
      expect(result.size).toBe(20);
    });

    it("should create left border with default values", () => {
      const result = createSectionBorder("left", {}, mockConfig);

      expect(result).toBeDefined();
      expect(result.style).toBe(BorderStyle.SINGLE);
    });

    it("should create right border with default values", () => {
      const result = createSectionBorder("right", {}, mockConfig);

      expect(result).toBeDefined();
      expect(result.style).toBe(BorderStyle.SINGLE);
    });

    it("should apply custom border style", () => {
      const result = createSectionBorder(
        "bottom",
        { style: BorderStyle.DOUBLE },
        mockConfig,
      );

      expect(result.style).toBe(BorderStyle.DOUBLE);
    });

    it("should apply custom border size", () => {
      const result = createSectionBorder("bottom", { size: 30 }, mockConfig);

      expect(result.size).toBe(30);
    });

    it("should apply custom border color", () => {
      const result = createSectionBorder(
        "bottom",
        { color: "FF0000" },
        mockConfig,
      );

      expect(result.color).toBe("FF0000");
    });

    it("should apply all custom options", () => {
      const result = createSectionBorder(
        "bottom",
        {
          style: BorderStyle.THICK,
          size: 40,
          color: "0000FF",
        },
        mockConfig,
      );

      expect(result.style).toBe(BorderStyle.THICK);
      expect(result.size).toBe(40);
      expect(result.color).toBe("0000FF");
      expect(result.space).toBe(1);
    });
  });

  describe("createCellMargins", () => {
    it("should create margins with default padding", () => {
      const result = createCellMargins();

      expect(result).toBeDefined();
      expect(result.top).toBe(convertInchesToTwip(0.05));
      expect(result.bottom).toBe(convertInchesToTwip(0.05));
      expect(result.left).toBe(convertInchesToTwip(0.1));
      expect(result.right).toBe(convertInchesToTwip(0.1));
    });

    it("should apply custom top padding", () => {
      const result = createCellMargins({ top: 0.1 });

      expect(result.top).toBe(convertInchesToTwip(0.1));
      expect(result.bottom).toBe(convertInchesToTwip(0.05));
      expect(result.left).toBe(convertInchesToTwip(0.1));
      expect(result.right).toBe(convertInchesToTwip(0.1));
    });

    it("should apply custom bottom padding", () => {
      const result = createCellMargins({ bottom: 0.15 });

      expect(result.bottom).toBe(convertInchesToTwip(0.15));
    });

    it("should apply custom left padding", () => {
      const result = createCellMargins({ left: 0.2 });

      expect(result.left).toBe(convertInchesToTwip(0.2));
    });

    it("should apply custom right padding", () => {
      const result = createCellMargins({ right: 0.25 });

      expect(result.right).toBe(convertInchesToTwip(0.25));
    });

    it("should apply all custom padding values", () => {
      const result = createCellMargins({
        top: 0.08,
        bottom: 0.08,
        left: 0.15,
        right: 0.15,
      });

      expect(result.top).toBe(convertInchesToTwip(0.08));
      expect(result.bottom).toBe(convertInchesToTwip(0.08));
      expect(result.left).toBe(convertInchesToTwip(0.15));
      expect(result.right).toBe(convertInchesToTwip(0.15));
    });

    it("should handle zero padding", () => {
      const result = createCellMargins({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      });

      expect(result.top).toBe(0);
      expect(result.bottom).toBe(0);
      expect(result.left).toBe(0);
      expect(result.right).toBe(0);
    });
  });
});
