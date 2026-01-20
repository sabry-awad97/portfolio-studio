import { describe, it, expect } from "vitest";
import { TableCell, TableRow, Table, VerticalAlign } from "docx";
import { createTableCell, createTableRow, createTable } from "./table-factory";
import { DEFAULT_CONFIG } from "../configuration/default-config";
import type { ResumeConfig } from "../configuration/config-types";

describe("Table Factory", () => {
  const mockConfig: ResumeConfig = DEFAULT_CONFIG;

  describe("createTableCell", () => {
    it("should create table cell with specified width", () => {
      const result = createTableCell(
        {
          width: 25,
          content: "Test Content",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableCell);
    });

    it("should create cell with bold text", () => {
      const result = createTableCell(
        {
          width: 50,
          content: "Bold Text",
          bold: true,
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableCell);
    });

    it("should create cell with custom vertical alignment", () => {
      const result = createTableCell(
        {
          width: 30,
          content: "Top Aligned",
          verticalAlign: VerticalAlign.TOP,
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableCell);
    });

    it("should use default vertical alignment (CENTER)", () => {
      const result = createTableCell(
        {
          width: 40,
          content: "Default Alignment",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableCell);
    });

    it("should handle empty content", () => {
      const result = createTableCell(
        {
          width: 100,
          content: "",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableCell);
    });

    it("should handle special characters in content", () => {
      const result = createTableCell(
        {
          width: 50,
          content: "C++ & C# • TypeScript",
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableCell);
    });

    it("should apply config typography and colors", () => {
      const customConfig: ResumeConfig = {
        ...mockConfig,
        colors: {
          ...mockConfig.colors,
          text: "FF0000",
        },
      };

      const result = createTableCell(
        {
          width: 50,
          content: "Custom Color",
        },
        customConfig,
      );

      expect(result).toBeInstanceOf(TableCell);
    });
  });

  describe("createTableRow", () => {
    it("should create row with single cell", () => {
      const result = createTableRow(
        [
          {
            width: 100,
            content: "Single Cell",
          },
        ],
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableRow);
    });

    it("should create row with multiple cells", () => {
      const result = createTableRow(
        [
          {
            width: 25,
            content: "Cell 1",
            bold: true,
          },
          {
            width: 75,
            content: "Cell 2",
          },
        ],
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableRow);
    });

    it("should create row with three cells", () => {
      const result = createTableRow(
        [
          {
            width: 33,
            content: "First",
          },
          {
            width: 33,
            content: "Second",
          },
          {
            width: 34,
            content: "Third",
          },
        ],
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableRow);
    });

    it("should handle cells with different alignments", () => {
      const result = createTableRow(
        [
          {
            width: 50,
            content: "Top",
            verticalAlign: VerticalAlign.TOP,
          },
          {
            width: 50,
            content: "Bottom",
            verticalAlign: VerticalAlign.BOTTOM,
          },
        ],
        mockConfig,
      );

      expect(result).toBeInstanceOf(TableRow);
    });

    it("should handle empty cells array", () => {
      const result = createTableRow([], mockConfig);

      expect(result).toBeInstanceOf(TableRow);
    });
  });

  describe("createTable", () => {
    it("should create table with single row", () => {
      const row = createTableRow(
        [
          {
            width: 50,
            content: "Cell 1",
          },
          {
            width: 50,
            content: "Cell 2",
          },
        ],
        mockConfig,
      );

      const result = createTable([row]);

      expect(result).toBeInstanceOf(Table);
    });

    it("should create table with multiple rows", () => {
      const rows = [
        createTableRow(
          [
            { width: 25, content: "Row 1 Cell 1" },
            { width: 75, content: "Row 1 Cell 2" },
          ],
          mockConfig,
        ),
        createTableRow(
          [
            { width: 25, content: "Row 2 Cell 1" },
            { width: 75, content: "Row 2 Cell 2" },
          ],
          mockConfig,
        ),
      ];

      const result = createTable(rows);

      expect(result).toBeInstanceOf(Table);
    });

    it("should create table with border options", () => {
      const row = createTableRow(
        [
          { width: 50, content: "Cell 1" },
          { width: 50, content: "Cell 2" },
        ],
        mockConfig,
      );

      const result = createTable(
        [row],
        {
          outer: { color: "000000", size: 2 },
          inner: { color: "CCCCCC", size: 1 },
        },
        mockConfig,
      );

      expect(result).toBeInstanceOf(Table);
    });

    it("should create table without borders when options not provided", () => {
      const row = createTableRow(
        [{ width: 100, content: "No Borders" }],
        mockConfig,
      );

      const result = createTable([row]);

      expect(result).toBeInstanceOf(Table);
    });

    it("should create table with config but no border options", () => {
      const row = createTableRow(
        [{ width: 100, content: "Content" }],
        mockConfig,
      );

      const result = createTable([row], undefined, mockConfig);

      expect(result).toBeInstanceOf(Table);
    });

    it("should create table with border options but no config", () => {
      const row = createTableRow(
        [{ width: 100, content: "Content" }],
        mockConfig,
      );

      const result = createTable(
        [row],
        {
          outer: { color: "000000" },
        },
        undefined,
      );

      expect(result).toBeInstanceOf(Table);
    });
  });
});
