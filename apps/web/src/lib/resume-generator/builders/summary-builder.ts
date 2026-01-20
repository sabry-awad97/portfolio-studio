import { Paragraph } from "docx";
import type { ExtendedResumeConfig } from "../configuration/extended-config-types";
import { DEFAULT_SECTION_TITLES } from "../configuration/extended-defaults";
import { buildSectionHeader } from "./section-header-builder";
import { createTextRun } from "../utilities/text-run-factory";
import { createParagraphSpacing } from "../utilities/spacing-patterns";
import { applyLineSpacing } from "../utilities/line-spacing";

/**
 * Builds the professional summary section
 * @param bio - Professional summary/bio text
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the summary section
 */
export function buildSummary(
  bio: string,
  config: ExtendedResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Use configurable section title
  const sectionTitle = config.section_titles.summary;
  paragraphs.push(buildSectionHeader(sectionTitle, config));

  // Bio text
  paragraphs.push(
    new Paragraph({
      spacing: {
        ...createParagraphSpacing("entryContent", config),
        ...applyLineSpacing("body", config),
      },
      children: [
        createTextRun(
          {
            text: bio,
            size: config.typography.sizes.body,
            color: config.colors.text,
          },
          config,
        ),
      ],
    }),
  );

  return paragraphs;
}
