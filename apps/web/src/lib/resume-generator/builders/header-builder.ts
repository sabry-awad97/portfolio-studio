import { Paragraph, AlignmentType, TextRun, ExternalHyperlink } from "docx";
import type { PersonalInfo } from "../types";
import type { ExtendedResumeConfig } from "../configuration/extended-config-types";
import { createTextRun, createHyperlink } from "../utilities/text-run-factory";
import { createParagraphSpacing } from "../utilities/spacing-patterns";
import { applyLineSpacing } from "../utilities/line-spacing";

/**
 * Builds the resume header with personal information
 * @param personalInfo - Personal information data
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the header section
 */
export function buildHeader(
  personalInfo: PersonalInfo,
  config: ExtendedResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Name
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        ...createParagraphSpacing("entryDescription", config),
        ...applyLineSpacing("title", config),
      },
      children: [
        createTextRun(
          {
            text: personalInfo.name,
            bold: true,
            size: config.typography.sizes.title,
            color: config.colors.primary,
          },
          config,
        ),
      ],
    }),
  );

  // Title and subtitle
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        ...createParagraphSpacing("entryContent", config),
        ...applyLineSpacing("body", config),
      },
      children: [
        createTextRun(
          {
            text: `${personalInfo.title} | ${personalInfo.subtitle}`,
            size: config.typography.sizes.heading2,
            color: config.colors.secondary,
          },
          config,
        ),
      ],
    }),
  );

  // Contact information (ATS-compatible, no emojis, with clickable links)
  const contactChildren: (TextRun | ExternalHyperlink)[] = [];

  // Email
  contactChildren.push(
    new TextRun({
      text: personalInfo.contact.email,
      size: config.typography.sizes.small,
      color: config.colors.text,
    }),
  );

  // Phone
  if (personalInfo.contact.phone) {
    contactChildren.push(
      new TextRun({
        text: " | ",
        size: config.typography.sizes.small,
      }),
    );
    contactChildren.push(
      new TextRun({
        text: personalInfo.contact.phone,
        size: config.typography.sizes.small,
        color: config.colors.text,
      }),
    );
  }

  // LinkedIn (with hyperlink)
  if (personalInfo.contact.linkedin) {
    contactChildren.push(
      new TextRun({
        text: " | ",
        size: config.typography.sizes.small,
      }),
    );

    contactChildren.push(
      createHyperlink(
        {
          text: personalInfo.contact.linkedin,
          url: `https://linkedin.com/in/${personalInfo.contact.linkedin}`,
          size: config.typography.sizes.small,
          color: config.colors.primary,
          style: "Hyperlink",
        },
        config,
      ),
    );
  }

  // GitHub (with hyperlink)
  if (personalInfo.contact.github) {
    contactChildren.push(
      new TextRun({
        text: " | ",
        size: config.typography.sizes.small,
      }),
    );

    contactChildren.push(
      createHyperlink(
        {
          text: personalInfo.contact.github,
          url: `https://github.com/${personalInfo.contact.github}`,
          size: config.typography.sizes.small,
          color: config.colors.primary,
          style: "Hyperlink",
        },
        config,
      ),
    );
  }

  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: config.spacing.md,
        ...applyLineSpacing("body", config),
      },
      children: contactChildren,
    }),
  );

  return paragraphs;
}
