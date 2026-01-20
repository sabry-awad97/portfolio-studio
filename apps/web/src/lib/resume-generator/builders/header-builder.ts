import { Paragraph, TextRun, AlignmentType, ExternalHyperlink } from "docx";
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

    // Add https:// if not present
    const linkedinUrl = personalInfo.contact.linkedin.startsWith("http")
      ? personalInfo.contact.linkedin
      : `https://${personalInfo.contact.linkedin}`;

    contactChildren.push(
      new ExternalHyperlink({
        link: linkedinUrl,
        children: [
          new TextRun({
            text: personalInfo.contact.linkedin,
            size: config.typography.sizes.small,
            color: config.colors.primary,
            style: "Hyperlink",
          }),
        ],
      }),
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

    // Add https:// if not present
    const githubUrl = personalInfo.contact.github.startsWith("http")
      ? personalInfo.contact.github
      : `https://${personalInfo.contact.github}`;

    contactChildren.push(
      new ExternalHyperlink({
        link: githubUrl,
        children: [
          new TextRun({
            text: personalInfo.contact.github,
            size: config.typography.sizes.small,
            color: config.colors.primary,
            style: "Hyperlink",
          }),
        ],
      }),
    );
  }

  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: config.spacing.md },
      children: contactChildren,
    }),
  );

  return paragraphs;
}
