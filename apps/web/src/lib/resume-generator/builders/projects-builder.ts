import { Paragraph } from "docx";
import type { Project } from "../types";
import type { ExtendedResumeConfig } from "../configuration/extended-config-types";
import {
  DEFAULT_SECTION_TITLES,
  DEFAULT_FORMATTING,
} from "../configuration/extended-defaults";
import { buildSectionHeader } from "./section-header-builder";
import { createTextRun, createBulletText } from "../utilities/text-run-factory";
import { createParagraphSpacing } from "../utilities/spacing-patterns";
import { formatDate } from "../utilities/date-formatter";
import { applyLineSpacing } from "../utilities/line-spacing";

/**
 * Builds the projects section
 * @param projects - Array of project entries
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the projects section
 */
export function buildProjects(
  projects: Project[],
  config: ExtendedResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Use configurable section title
  const sectionTitle =
    config.section_titles?.projects ?? DEFAULT_SECTION_TITLES.projects;
  paragraphs.push(buildSectionHeader(sectionTitle, config));

  // Get configured separators
  const dateSeparator =
    config.formatting?.date_separator ?? DEFAULT_FORMATTING.date_separator;
  const tagSeparator =
    config.formatting?.tag_separator ?? DEFAULT_FORMATTING.tag_separator;

  // Project entries
  for (const project of projects) {
    // Format date if date formatting is configured
    const formattedDate = config.date_format
      ? formatDate(project.date, config.date_format)
      : project.date;

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
              text: project.title,
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
          ...createParagraphSpacing("entryDescription", config),
          ...applyLineSpacing("body", config),
        },
        keepNext: project.tags && project.tags.length > 0, // Keep with technologies if present
        children: [
          createTextRun(
            {
              text: project.description,
              size: config.typography.sizes.body,
              color: config.colors.text,
            },
            config,
          ),
        ],
      }),
    );

    // Technologies (plain text separator for ATS compatibility)
    if (project.tags && project.tags.length > 0) {
      const technologies = createBulletText(project.tags, tagSeparator);
      paragraphs.push(
        new Paragraph({
          spacing: {
            ...createParagraphSpacing("entryContent", config),
            ...applyLineSpacing("body", config),
          },
          children: [
            createTextRun(
              {
                text: `Technologies: ${technologies}`,
                size: config.typography.sizes.small,
                color: config.colors.secondary,
                italics: true,
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
