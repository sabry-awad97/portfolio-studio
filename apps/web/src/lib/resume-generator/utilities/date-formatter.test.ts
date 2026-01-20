import { describe, it, expect } from "vitest";
import { parseDate, formatDateObject, formatDate } from "./date-formatter";

describe("Date Formatter", () => {
  describe("parseDate", () => {
    it("should parse YYYY-MM-DD format", () => {
      const result = parseDate("2024-01-15");
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0); // January is 0
      expect(result?.getDate()).toBe(15);
    });

    it("should parse YYYY-MM format", () => {
      const result = parseDate("2024-01");
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
    });

    it("should parse MM/DD/YYYY format", () => {
      const result = parseDate("01/15/2024");
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
      expect(result?.getDate()).toBe(15);
    });

    it("should parse MM/YYYY format", () => {
      const result = parseDate("01/2024");
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
    });

    it("should parse YYYY format", () => {
      const result = parseDate("2024");
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
    });

    it("should return null for special dates", () => {
      expect(parseDate("Present")).toBeNull();
      expect(parseDate("Current")).toBeNull();
      expect(parseDate("Now")).toBeNull();
      expect(parseDate("present")).toBeNull();
      expect(parseDate("current")).toBeNull();
      expect(parseDate("now")).toBeNull();
    });

    it("should return null for invalid date strings", () => {
      expect(parseDate("Invalid Date")).toBeNull();
      expect(parseDate("not-a-date")).toBeNull();
      expect(parseDate("")).toBeNull();
      expect(parseDate("13/45/2024")).toBeNull();
    });

    it("should handle single-digit months and days", () => {
      const result = parseDate("1/5/2024");
      expect(result).toBeInstanceOf(Date);
      expect(result?.getMonth()).toBe(0);
      expect(result?.getDate()).toBe(5);
    });
  });

  describe("formatDateObject", () => {
    const testDate = new Date(2024, 0, 15); // January 15, 2024

    it("should format with MMM YYYY pattern", () => {
      const result = formatDateObject(testDate, "MMM YYYY", "en-US");
      expect(result).toMatch(/Jan 2024/);
    });

    it("should format with MMMM YYYY pattern", () => {
      const result = formatDateObject(testDate, "MMMM YYYY", "en-US");
      expect(result).toMatch(/January 2024/);
    });

    it("should format with MM/YYYY pattern", () => {
      const result = formatDateObject(testDate, "MM/YYYY", "en-US");
      expect(result).toBe("01/2024");
    });

    it("should format with YYYY-MM-DD pattern", () => {
      const result = formatDateObject(testDate, "YYYY-MM-DD", "en-US");
      expect(result).toBe("2024-01-15");
    });

    it("should format with DD/MM/YYYY pattern", () => {
      const result = formatDateObject(testDate, "DD/MM/YYYY", "en-US");
      expect(result).toBe("15/01/2024");
    });

    it("should format with MM/DD/YYYY pattern", () => {
      const result = formatDateObject(testDate, "MM/DD/YYYY", "en-US");
      expect(result).toBe("01/15/2024");
    });

    it("should use different locales", () => {
      const result = formatDateObject(testDate, "MMM YYYY", "de-DE");
      // German locale should show different month abbreviation
      expect(result).toBeDefined();
      expect(result).toContain("2024");
    });

    it("should fallback to MMM YYYY for unknown patterns", () => {
      const result = formatDateObject(testDate, "UNKNOWN", "en-US");
      expect(result).toBeDefined();
      expect(result).toContain("2024");
    });

    it("should handle edge case dates", () => {
      const dec31 = new Date(2024, 11, 31); // December 31, 2024
      const result = formatDateObject(dec31, "YYYY-MM-DD", "en-US");
      expect(result).toBe("2024-12-31");
    });
  });

  describe("formatDate", () => {
    it("should format date with default options", () => {
      const result = formatDate("2024-01-15");
      expect(result).toMatch(/Jan 2024/);
    });

    it("should format date with custom locale", () => {
      const result = formatDate("2024-01-15", { locale: "de-DE" });
      expect(result).toBeDefined();
      expect(result).toContain("2024");
    });

    it("should format date with custom pattern", () => {
      const result = formatDate("2024-01-15", { formatPattern: "MM/YYYY" });
      expect(result).toBe("01/2024");
    });

    it("should format date with both custom locale and pattern", () => {
      const result = formatDate("2024-01-15", {
        locale: "en-US",
        formatPattern: "YYYY-MM-DD",
      });
      expect(result).toBe("2024-01-15");
    });

    it("should return original string for special dates", () => {
      expect(formatDate("Present")).toBe("Present");
      expect(formatDate("Current")).toBe("Current");
      expect(formatDate("Now")).toBe("Now");
      expect(formatDate("present")).toBe("present");
    });

    it("should return original string for unparseable dates", () => {
      expect(formatDate("Invalid Date")).toBe("Invalid Date");
      expect(formatDate("not-a-date")).toBe("not-a-date");
      expect(formatDate("")).toBe("");
    });

    it("should handle various input formats", () => {
      expect(formatDate("2024-01")).toMatch(/Jan 2024/);
      expect(formatDate("01/2024")).toMatch(/Jan 2024/);
      expect(formatDate("2024")).toMatch(/Jan 2024/);
    });

    it("should gracefully degrade on parsing failure", () => {
      const invalidDate = "13/45/2024";
      const result = formatDate(invalidDate);
      expect(result).toBe(invalidDate);
    });

    it("should handle empty options", () => {
      const result = formatDate("2024-01-15", {});
      expect(result).toMatch(/Jan 2024/);
    });

    it("should format MM/DD/YYYY input correctly", () => {
      const result = formatDate("01/15/2024", { formatPattern: "MMM YYYY" });
      expect(result).toMatch(/Jan 2024/);
    });

    it("should preserve case of special dates", () => {
      expect(formatDate("Present")).toBe("Present");
      expect(formatDate("present")).toBe("present");
      expect(formatDate("PRESENT")).toBe("PRESENT");
    });
  });
});
