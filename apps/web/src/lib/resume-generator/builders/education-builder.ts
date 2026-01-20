import { Paragraph } from "docx";
import type { Education } from "../types";
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
 * Builds the education section
 * @param education - Array of education entries
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the education section
 */
export function buildEducation(
  education: Education[],
  config: ExtendedResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Use configurable section title
  const sectionTitle = config.section_titles.education;
  paragraphs.push(buildSectionHeader(sectionTitle, config));

  // Get configured date separator
  const dateSeparator = config.formatting.date_separator;

  // Education entries
  for (const edu of education) {
    // Format date if date formatting is configured
    const formattedDate = config.date_format
      ? formatDate(edu.date, config.date_format)
      : edu.date;

    // Title and date
    paragraphs.push(
      new Paragraph({
        spacing: {
          ...createParagraphSpacing("entryTitle", config),
          ...applyLineSpacing("body", config),
        },
        keepNext: true, // Keep title with description
        children: [
          createTextRun(
            {
              text: edu.title,
              bold: true,
              size: config.typography.sizes.heading2,
              color: config.colors.text,
            },
            config,
          ),
          createTextRun(
            {
              text: `${dateSeparator}${formattedDate}`,
              size: config.typography.sizes.body,
              color: config.colors.secondary,
              italics: true,
            },
            config,
          ),
        ],
      }),
    );

    // Description
    paragraphs.push(
      new Paragraph({
        spacing: {
          ...createParagraphSpacing("entryContent", config),
          ...applyLineSpacing("body", config),
        },
        children: [
          createTextRun(
            {
              text: edu.description,
              size: config.typography.sizes.body,
              color: config.colors.text,
            },
            config,
          ),
        ],
      }),
    );
  }

  return paragraphs;
}
