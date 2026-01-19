import { Paragraph, TextRun } from "docx";
import type { Certification } from "../types";
import type { ResumeConfig } from "../configuration/config-types";
import { buildSectionHeader } from "./section-header-builder";

/**
 * Builds the certifications section
 * @param certifications - Array of certification entries
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the certifications section
 */
export function buildCertifications(
  certifications: Certification[],
  config: ResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Section header
  paragraphs.push(buildSectionHeader("CERTIFICATIONS", config));

  // Certification entries
  for (const cert of certifications) {
    // Name and issuer
    paragraphs.push(
      new Paragraph({
        spacing: {
          before: config.spacing.sm,
          after: config.spacing.xs,
        },
        children: [
          new TextRun({
            text: cert.name,
            bold: true,
            size: config.typography.sizes.heading2,
            color: config.colors.text,
            font: config.typography.fonts.primary,
          }),
          new TextRun({
            text: `  •  ${cert.issuer}`,
            size: config.typography.sizes.body,
            color: config.colors.secondary,
            font: config.typography.fonts.primary,
          }),
        ],
      }),
    );

    // Date
    paragraphs.push(
      new Paragraph({
        spacing: { after: config.spacing.sm },
        children: [
          new TextRun({
            text: cert.date,
            size: config.typography.sizes.body,
            color: config.colors.secondary,
            italics: true,
            font: config.typography.fonts.primary,
          }),
        ],
      }),
    );
  }

  return paragraphs;
}
