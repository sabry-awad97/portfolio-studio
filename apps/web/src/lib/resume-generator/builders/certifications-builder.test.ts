import { describe, it, expect } from "vitest";
import { buildCertifications } from "./certifications-builder";
import { DEFAULT_CONFIG } from "../configuration/default-config";
import type { Certification } from "../types";

describe("Certifications Builder", () => {
  const createCertifications = (): Certification[] => [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
  ];

  it("should create certifications section with header", () => {
    const certifications = createCertifications();
    const paragraphs = buildCertifications(certifications, DEFAULT_CONFIG);

    expect(paragraphs).toBeDefined();
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it("should format each certification correctly", () => {
    const certifications = createCertifications();
    const paragraphs = buildCertifications(certifications, DEFAULT_CONFIG);

    // Header + (name+issuer + date) per entry
    expect(paragraphs.length).toBe(3);
  });

  it("should handle empty certifications array", () => {
    const certifications: Certification[] = [];
    const paragraphs = buildCertifications(certifications, DEFAULT_CONFIG);

    expect(paragraphs.length).toBe(1); // Just header
  });
});
