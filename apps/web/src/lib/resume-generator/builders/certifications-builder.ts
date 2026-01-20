import { Paragraph } from "docx";
import type { Certification } from "../types";
import type { ExtendedResumeConfig } from "../configuration/extended-config-types";
import {
  DEFAULT_SECTION_TITLES,
  DEFAULT_FORMATTING,
} from "../configuration/extended-defaults";
import { buildSectionHeader } from "./section-header-builder";
import { createTextRun } from "../utilities/text-run-factory";
import { createParagraphSpacing } from "../utilities/spacing-patterns";
import { formatDate } from "../utilities/date-formatter";
import { applyLineSpacing } from "../utilities/line-spacing";

/**
 * Builds the certifications section
 * @param certifications - Array of certification entries
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the certifications section
 */
export function buildCertifications(
  certifications: Certification[],
  config: ExtendedResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Use configurable section title
  const sectionTitle =
    config.section_titles?.certifications ??
    DEFAULT_SECTION_TITLES.certifications;
  paragraphs.push(buildSectionHeader(sectionTitle, config));

  // Get configured date separator
  const dateSeparator =
    config.formatting?.date_separator ?? DEFAULT_FORMATTING.date_separator;

  // Certification entries
  for (const cert of certifications) {
    // Format date if date formatting is configured
    const formattedDate = config.date_format
      ? formatDate(cert.date, config.date_format)
      : cert.date;

    // Name and issuer
    paragraphs.push(
      new Paragraph({
        spacing: {
          ...createParagraphSpacing("entryTitle", config),
          ...applyLineSpacing("body", config),
        },
        children: [
          createTextRun(
            {
              text: cert.name,
              bold: true,
              size: config.typography.sizes.heading2,
              color: config.colors.text,
            },
            config,
          ),
          createTextRun(
            {
              text: `${dateSeparator}${cert.issuer}`,
              size: config.typography.sizes.body,
              color: config.colors.secondary,
            },
            config,
          ),
        ],
      }),
    );

    // Date
    paragraphs.push(
      new Paragraph({
        spacing: {
          ...createParagraphSpacing("entryContent", config),
          ...applyLineSpacing("body", config),
        },
        children: [
          createTextRun(
            {
              text: formattedDate,
              size: config.typography.sizes.body,
              color: config.colors.secondary,
              italics: true,
            },
            config,
          ),
        ],
      }),
    );
  }

  return paragraphs;
}
