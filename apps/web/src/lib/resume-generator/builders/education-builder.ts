import { Paragraph, TextRun } from "docx";
import type { Education } from "../types";
import type { ResumeConfig } from "../configuration/config-types";
import { buildSectionHeader } from "./section-header-builder";

/**
 * Builds the education section
 * @param education - Array of education entries
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the education section
 */
export function buildEducation(
  education: Education[],
  config: ResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Section header
  paragraphs.push(buildSectionHeader("EDUCATION", config));

  // Education entries
  for (const edu of education) {
    // Title and date
    paragraphs.push(
      new Paragraph({
        spacing: {
          before: config.spacing.sm,
          after: config.spacing.xs,
        },
        children: [
          new TextRun({
            text: edu.title,
            bold: true,
            size: config.typography.sizes.heading2,
            color: config.colors.text,
            font: config.typography.fonts.primary,
          }),
          new TextRun({
            text: `  •  ${edu.date}`,
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
        spacing: { after: config.spacing.sm },
        children: [
          new TextRun({
            text: edu.description,
            size: config.typography.sizes.body,
            color: config.colors.text,
            font: config.typography.fonts.primary,
          }),
        ],
      }),
    );
  }

  return paragraphs;
}
