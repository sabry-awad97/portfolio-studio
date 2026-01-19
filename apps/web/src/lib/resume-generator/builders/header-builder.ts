import { Paragraph, TextRun, AlignmentType, UnderlineType } from "docx";
import type { PersonalInfo } from "../types";
import type { ResumeConfig } from "../configuration/config-types";

/**
 * Builds the resume header with personal information
 * @param personalInfo - Personal information data
 * @param config - Resume configuration for styling
 * @returns Array of paragraphs for the header section
 */
export function buildHeader(
  personalInfo: PersonalInfo,
  config: ResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Name
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: config.spacing.xs },
      children: [
        new TextRun({
          text: personalInfo.name,
          bold: true,
          size: config.typography.sizes.title,
          color: config.colors.primary,
          font: config.typography.fonts.primary,
        }),
      ],
    }),
  );

  // Title and subtitle
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: config.spacing.sm },
      children: [
        new TextRun({
          text: `${personalInfo.title} | ${personalInfo.subtitle}`,
          size: config.typography.sizes.heading2,
          color: config.colors.secondary,
          font: config.typography.fonts.primary,
        }),
      ],
    }),
  );

  // Contact information (ATS-compatible, no emojis)
  const contactParts: TextRun[] = [];

  // Email
  contactParts.push(
    new TextRun({
      text: personalInfo.contact.email,
      size: config.typography.sizes.small,
      color: config.colors.text,
    }),
  );

  // Phone
  if (personalInfo.contact.phone) {
    contactParts.push(
      new TextRun({
        text: " | ",
        size: config.typography.sizes.small,
      }),
    );
    contactParts.push(
      new TextRun({
        text: personalInfo.contact.phone,
        size: config.typography.sizes.small,
        color: config.colors.text,
      }),
    );
  }

  // LinkedIn
  if (personalInfo.contact.linkedin) {
    contactParts.push(
      new TextRun({
        text: " | ",
        size: config.typography.sizes.small,
      }),
    );
    contactParts.push(
      new TextRun({
        text: personalInfo.contact.linkedin,
        size: config.typography.sizes.small,
        color: config.colors.primary,
        underline: { type: UnderlineType.SINGLE },
      }),
    );
  }

  // GitHub
  if (personalInfo.contact.github) {
    contactParts.push(
      new TextRun({
        text: " | ",
        size: config.typography.sizes.small,
      }),
    );
    contactParts.push(
      new TextRun({
        text: personalInfo.contact.github,
        size: config.typography.sizes.small,
        color: config.colors.primary,
        underline: { type: UnderlineType.SINGLE },
      }),
    );
  }

  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: config.spacing.md },
      children: contactParts,
    }),
  );

  return paragraphs;
}
