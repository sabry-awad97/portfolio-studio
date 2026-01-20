import { Paragraph, HeadingLevel } from "docx";
import type { ResumeConfig } from "../configuration/config-types";
import { createTextRun } from "../utilities/text-run-factory";
import { createParagraphSpacing } from "../utilities/spacing-patterns";
import { createSectionBorder } from "../utilities/border-factory";
import { applyLineSpacing } from "../utilities/line-spacing";

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
    heading: HeadingLevel.HEADING_1, // Proper heading level for document outline
    spacing: {
      ...createParagraphSpacing("sectionHeader", config),
      ...applyLineSpacing("heading", config),
    },
    border: {
      bottom: createSectionBorder("bottom", {}, config),
    },
    keepNext: true, // Keep section header with next paragraph
    keepLines: true, // Prevent section header from splitting across pages
    children: [
      createTextRun(
        {
          text: title,
          bold: true,
          size: config.typography.sizes.heading1,
          color: config.colors.primary,
        },
        config,
      ),
    ],
  });
}
