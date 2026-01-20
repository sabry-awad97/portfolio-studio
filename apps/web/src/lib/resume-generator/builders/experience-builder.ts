import { Paragraph } from "docx";
import type { WorkExperience } from "../types";
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
 * Builds the work experience section
 * @param experience - Array of work experience entries
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the experience section
 */
export function buildExperience(
  experience: WorkExperience[],
  config: ExtendedResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Use configurable section title
  const sectionTitle =
    config.section_titles?.experience ?? DEFAULT_SECTION_TITLES.experience;
  paragraphs.push(buildSectionHeader(sectionTitle, config));

  // Get configured bullet character
  const bulletChar =
    config.formatting?.bullet_character ?? DEFAULT_FORMATTING.bullet_character;

  // Experience entries
  for (const exp of experience) {
    // Format dates if date formatting is configured
    const formattedStartDate = config.date_format
      ? formatDate(exp.startDate, config.date_format)
      : exp.startDate;
    const formattedEndDate = config.date_format
      ? formatDate(exp.endDate, config.date_format)
      : exp.endDate;

    // Company and role
    paragraphs.push(
      new Paragraph({
        spacing: {
          ...createParagraphSpacing("entryTitle", config),
          ...applyLineSpacing("body", config),
        },
        children: [
          createTextRun(
            {
              text: `${exp.role} at ${exp.company}`,
              bold: true,
              size: config.typography.sizes.heading2,
              color: config.colors.text,
            },
            config,
          ),
        ],
      }),
    );

    // Date range
    paragraphs.push(
      new Paragraph({
        spacing: {
          ...createParagraphSpacing("entryDescription", config),
          ...applyLineSpacing("body", config),
        },
        children: [
          createTextRun(
            {
              text: `${formattedStartDate} - ${formattedEndDate}`,
              size: config.typography.sizes.body,
              color: config.colors.secondary,
              italics: true,
            },
            config,
          ),
        ],
      }),
    );

    // Responsibilities as bullet points
    for (let i = 0; i < exp.responsibilities.length; i++) {
      const responsibility = exp.responsibilities[i];
      const isLast = i === exp.responsibilities.length - 1;

      paragraphs.push(
        new Paragraph({
          spacing: {
            ...(isLast
              ? createParagraphSpacing("entryContent", config)
              : createParagraphSpacing("entryDescription", config)),
            ...applyLineSpacing("body", config),
          },
          bullet: {
            level: 0,
          },
          children: [
            createTextRun(
              {
                text: responsibility,
                size: config.typography.sizes.body,
                color: config.colors.text,
              },
              config,
            ),
          ],
        }),
      );
    }
  }

  return paragraphs;
}
