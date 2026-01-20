import { describe, it, expect } from "vitest";
import { buildExperience } from "./experience-builder";
import { DEFAULT_EXTENDED_CONFIG } from "../configuration/extended-defaults";
import type { WorkExperience } from "../types";

describe("Experience Builder", () => {
  const createExperience = (): WorkExperience[] => [
    {
      id: 1,
      company: "Tech Corp",
      role: "Senior Developer",
      startDate: "2020-01",
      endDate: "2023-12",
      responsibilities: [
        "Led team of 5",
        "Developed features",
        "Mentored juniors",
      ],
    },
  ];

  it("should create experience section with header", () => {
    const experience = createExperience();
    const paragraphs = buildExperience(experience, DEFAULT_EXTENDED_CONFIG);

    expect(paragraphs).toBeDefined();
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it("should format responsibilities as bullet points", () => {
    const experience = createExperience();
    const paragraphs = buildExperience(experience, DEFAULT_EXTENDED_CONFIG);

    // Header + company/role + date + responsibilities
    expect(paragraphs.length).toBeGreaterThan(3);
  });

  it("should handle empty experience array", () => {
    const experience: WorkExperience[] = [];
    const paragraphs = buildExperience(experience, DEFAULT_EXTENDED_CONFIG);

    expect(paragraphs.length).toBe(1); // Just header
  });
});
