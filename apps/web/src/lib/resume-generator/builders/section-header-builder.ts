import { Paragraph, TextRun, HeadingLevel, BorderStyle } from "docx";
import type { ResumeConfig } from "../configuration/config-types";

/**
 * Builds a styled section header for resume sections
 * @param title - The section title text
 * @param config - Resume configuration for styling
 * @returns Paragraph with section header styling
 */
export function buildSectionHeader(
  title: string,
  config: ResumeConfig,
): Paragraph {
  return new Paragraph({
    spacing: {
      before: config.spacing.md,
      after: config.spacing.sm,
    },
    border: {
      bottom: {
        color: config.colors.primary,
        space: 1,
        style: BorderStyle.SINGLE,
        size: 20,
      },
    },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: config.typography.sizes.heading1,
        color: config.colors.primary,
        font: config.typography.fonts.primary,
      }),
    ],
  });
}
