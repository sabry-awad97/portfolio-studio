import { Paragraph, TextRun } from "docx";
import type { WorkExperience } from "../types";
import type { ResumeConfig } from "../configuration/config-types";
import { buildSectionHeader } from "./section-header-builder";

/**
 * Builds the work experience section
 * @param experience - Array of work experience entries
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the experience section
 */
export function buildExperience(
  experience: WorkExperience[],
  config: ResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Section header
  paragraphs.push(buildSectionHeader("WORK EXPERIENCE", config));

  // Experience entries
  for (const exp of experience) {
    // Company and role
    paragraphs.push(
      new Paragraph({
        spacing: {
          before: config.spacing.sm,
          after: config.spacing.xs,
        },
        children: [
          new TextRun({
            text: `${exp.role} at ${exp.company}`,
            bold: true,
            size: config.typography.sizes.heading2,
            color: config.colors.text,
            font: config.typography.fonts.primary,
          }),
        ],
      }),
    );

    // Date range
    paragraphs.push(
      new Paragraph({
        spacing: { after: config.spacing.xs },
        children: [
          new TextRun({
            text: `${exp.startDate} - ${exp.endDate}`,
            size: config.typography.sizes.body,
            color: config.colors.secondary,
            italics: true,
            font: config.typography.fonts.primary,
          }),
        ],
      }),
    );

    // Responsibilities as bullet points
    for (let i = 0; i < exp.responsibilities.length; i++) {
      const responsibility = exp.responsibilities[i];
      const isLast = i === exp.responsibilities.length - 1;

      paragraphs.push(
        new Paragraph({
          spacing: { after: isLast ? config.spacing.sm : config.spacing.xs },
          bullet: {
            level: 0,
          },
          children: [
            new TextRun({
              text: responsibility,
              size: config.typography.sizes.body,
              color: config.colors.text,
              font: config.typography.fonts.primary,
            }),
          ],
        }),
      );
    }
  }

  return paragraphs;
}
