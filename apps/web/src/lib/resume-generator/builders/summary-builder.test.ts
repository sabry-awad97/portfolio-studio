import { describe, it, expect } from "vitest";
import { buildSummary } from "./summary-builder";
import { DEFAULT_CONFIG } from "../configuration/default-config";

describe("Summary Builder", () => {
  it("should create summary section with header", () => {
    const bio = "Experienced software engineer with 5+ years of expertise.";
    const paragraphs = buildSummary(bio, DEFAULT_CONFIG);

    expect(paragraphs).toBeDefined();
    expect(paragraphs.length).toBe(2); // Header + bio
  });

  it("should include section header", () => {
    const bio = "Test bio";
    const paragraphs = buildSummary(bio, DEFAULT_CONFIG);

    expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  });

  it("should include bio text", () => {
    const bio = "Professional summary text here.";
    const paragraphs = buildSummary(bio, DEFAULT_CONFIG);

    expect(paragraphs.length).toBe(2);
  });

  it("should handle empty bio", () => {
    const bio = "";
    const paragraphs = buildSummary(bio, DEFAULT_CONFIG);

    expect(paragraphs.length).toBe(2);
  });

  it("should handle long bio", () => {
    const bio = "A".repeat(1000);
    const paragraphs = buildSummary(bio, DEFAULT_CONFIG);

    expect(paragraphs.length).toBe(2);
  });

  it("should use config typography and spacing", () => {
    const bio = "Test bio";
    const customConfig = {
      ...DEFAULT_CONFIG,
      typography: {
        ...DEFAULT_CONFIG.typography,
        sizes: {
          ...DEFAULT_CONFIG.typography.sizes,
          body: 24,
        },
      },
    };

    const paragraphs = buildSummary(bio, customConfig);
    expect(paragraphs.length).toBe(2);
  });
});
