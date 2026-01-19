import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { buildProjects } from "./projects-builder";
import { DEFAULT_CONFIG } from "../configuration/default-config";
import type { Project } from "../types";

describe("Projects Builder", () => {
  const createProjects = (): Project[] => [
    {
      id: 1,
      date: "2023",
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      date: "2022",
      title: "Mobile App",
      description: "Developed a mobile application",
      tags: ["React Native", "Firebase"],
    },
  ];

  it("should create projects section with header", () => {
    const projects = createProjects();
    const paragraphs = buildProjects(projects, DEFAULT_CONFIG);

    expect(paragraphs).toBeDefined();
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it("should include section header", () => {
    const projects = createProjects();
    const paragraphs = buildProjects(projects, DEFAULT_CONFIG);

    // Header + (title+date, description, technologies) * entries
    expect(paragraphs.length).toBe(1 + 3 * projects.length);
  });

  it("should format each project entry correctly", () => {
    const projects = createProjects();
    const paragraphs = buildProjects(projects, DEFAULT_CONFIG);

    // 1 header + 3 paragraphs per entry (title+date, description, technologies)
    expect(paragraphs.length).toBe(7);
  });

  it("should handle project without tags", () => {
    const projects: Project[] = [
      {
        id: 1,
        date: "2023",
        title: "Test Project",
        description: "A test project",
        tags: [],
      },
    ];

    const paragraphs = buildProjects(projects, DEFAULT_CONFIG);
    // Header + title+date + description (no technologies paragraph)
    expect(paragraphs.length).toBe(3);
  });

  it("should use plain text separator for technologies", () => {
    const projects: Project[] = [
      {
        id: 1,
        date: "2023",
        title: "Test Project",
        description: "A test project",
        tags: ["React", "TypeScript", "Node.js"],
      },
    ];

    const paragraphs = buildProjects(projects, DEFAULT_CONFIG);
    expect(paragraphs.length).toBe(4); // Header + title + description + technologies
  });

  it("should handle empty projects array", () => {
    const projects: Project[] = [];
    const paragraphs = buildProjects(projects, DEFAULT_CONFIG);

    expect(paragraphs.length).toBe(1); // Just header
  });

  // Property 11: All resume sections include required fields (partial)
  describe("Property 11: All resume sections include required fields", () => {
    it("should include title, date, description, and technologies", () => {
      // Feature: resume-generator-refactor, Property 11: All resume sections include required fields
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.integer(),
              date: fc.string({ minLength: 1 }),
              title: fc.string({ minLength: 1 }),
              description: fc.string({ minLength: 1 }),
              tags: fc.array(fc.string({ minLength: 1 }), {
                minLength: 1,
                maxLength: 5,
              }),
            }),
            { minLength: 1, maxLength: 5 },
          ),
          (projects) => {
            const paragraphs = buildProjects(
              projects as Project[],
              DEFAULT_CONFIG,
            );

            // Should have header + 3 paragraphs per entry (title+date, description, technologies)
            return paragraphs.length === 1 + 3 * projects.length;
          },
        ),
        { numRuns: 100 },
      );
    });
  });
});
