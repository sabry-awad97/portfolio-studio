import { Paragraph, TextRun } from "docx";
import type { ResumeConfig } from "../configuration/config-types";
import { buildSectionHeader } from "./section-header-builder";

/**
 * Builds the professional summary section
 * @param bio - Professional summary/bio text
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the summary section
 */
export function buildSummary(bio: string, config: ResumeConfig): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Section header
  paragraphs.push(buildSectionHeader("PROFESSIONAL SUMMARY", config));

  // Bio text
  paragraphs.push(
    new Paragraph({
      spacing: { after: config.spacing.sm },
      children: [
        new TextRun({
          text: bio,
          size: config.typography.sizes.body,
          color: config.colors.text,
          font: config.typography.fonts.primary,
        }),
      ],
    }),
  );

  return paragraphs;
}
