import { Paragraph, TextRun } from "docx";
import type { Project } from "../types";
import type { ResumeConfig } from "../configuration/config-types";
import { buildSectionHeader } from "./section-header-builder";

/**
 * Builds the projects section
 * @param projects - Array of project entries
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the projects section
 */
export function buildProjects(
  projects: Project[],
  config: ResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Section header
  paragraphs.push(buildSectionHeader("PROJECTS", config));

  // Project entries
  for (const project of projects) {
    // Title and date
    paragraphs.push(
      new Paragraph({
        spacing: {
          before: config.spacing.sm,
          after: config.spacing.xs,
        },
        children: [
          new TextRun({
            text: project.title,
            bold: true,
            size: config.typography.sizes.heading2,
            color: config.colors.text,
            font: config.typography.fonts.primary,
          }),
          new TextRun({
            text: `  •  ${project.date}`,
            size: config.typography.sizes.body,
            color: config.colors.secondary,
            italics: true,
            font: config.typography.fonts.primary,
          }),
        ],
      }),
    );

    // Description
    paragraphs.push(
      new Paragraph({
        spacing: { after: config.spacing.xs },
        children: [
          new TextRun({
            text: project.description,
            size: config.typography.sizes.body,
            color: config.colors.text,
            font: config.typography.fonts.primary,
          }),
        ],
      }),
    );

    // Technologies (plain text separator for ATS compatibility)
    if (project.tags && project.tags.length > 0) {
      const technologies = project.tags.join(" • ");
      paragraphs.push(
        new Paragraph({
          spacing: { after: config.spacing.sm },
          children: [
            new TextRun({
              text: `Technologies: ${technologies}`,
              size: config.typography.sizes.small,
              color: config.colors.secondary,
              italics: true,
              font: config.typography.fonts.primary,
            }),
          ],
        }),
      );
    }
  }

  return paragraphs;
}
