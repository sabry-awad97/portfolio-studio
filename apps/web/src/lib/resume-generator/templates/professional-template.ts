import {
  Document,
  Paragraph,
  Table,
  convertInchesToTwip,
  AlignmentType,
  Header,
  Footer,
  TextRun,
  PageNumber,
} from "docx";
import type { ResumeData } from "../types";
import type { ExtendedResumeConfig } from "../configuration/extended-config-types";
import type { TemplateType } from "../configuration/config-types";
import type { Template } from "./template-interface";
import {
  buildHeader,
  buildSummary,
  buildEducation,
  buildProjects,
  buildSkills,
  buildExperience,
  buildCertifications,
} from "../builders";
import {
  DEFAULT_PAGE_CONFIG,
  DEFAULT_DOCUMENT_LANGUAGE,
} from "../configuration/extended-defaults";

/**
 * Professional template with traditional layout
 */
export class ProfessionalTemplate implements Template {
  name: TemplateType = "professional";

  buildDocument(data: ResumeData, config: ExtendedResumeConfig): Document {
    const children: (Paragraph | Table)[] = [];

    // Header section
    children.push(...buildHeader(data.personalInfo, config));

    // Professional summary
    if (data.personalInfo.bio) {
      children.push(...buildSummary(data.personalInfo.bio, config));
    }

    // Education section
    if (data.education && data.education.length > 0) {
      children.push(...buildEducation(data.education, config));
    }

    // Work experience section (optional)
    if (data.experience && data.experience.length > 0) {
      children.push(...buildExperience(data.experience, config));
    }

    // Projects section
    if (data.projects && data.projects.length > 0) {
      children.push(...buildProjects(data.projects, config));
    }

    // Skills section
    if (data.skills) {
      children.push(...buildSkills(data.skills, config));
    }

    // Certifications section (optional)
    if (data.certifications && data.certifications.length > 0) {
      children.push(...buildCertifications(data.certifications, config));
    }

    // Get page config with defaults
    const pageConfig = config.page_config ?? DEFAULT_PAGE_CONFIG;

    // Build section properties
    const sectionProperties: any = {
      page: {
        margin: {
          top: convertInchesToTwip(config.margins.top),
          right: convertInchesToTwip(config.margins.right),
          bottom: convertInchesToTwip(config.margins.bottom),
          left: convertInchesToTwip(config.margins.left),
        },
      },
    };

    // Build section object
    const section: any = {
      properties: sectionProperties,
      children,
    };

    // Add page header if enabled (appears on pages 2+)
    if (pageConfig.enable_page_header) {
      section.headers = {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: data.personalInfo.name,
                  size: config.typography.sizes.small,
                  color: config.colors.secondary,
                  font: config.typography.fonts.primary,
                }),
              ],
            }),
          ],
        }),
      };
    }

    // Add page numbers if enabled
    if (pageConfig.enable_page_numbers) {
      section.footers = {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  children: [
                    "Page ",
                    PageNumber.CURRENT,
                    " of ",
                    PageNumber.TOTAL_PAGES,
                  ],
                  size: config.typography.sizes.small,
                  color: config.colors.secondary,
                  font: config.typography.fonts.primary,
                }),
              ],
            }),
          ],
        }),
      };
    }

    return new Document({
      creator: data.personalInfo.name,
      title: `${data.personalInfo.name} - Resume`,
      description: `Professional resume for ${data.personalInfo.name} - ${data.personalInfo.title}`,
      keywords: [
        data.personalInfo.name,
        data.personalInfo.title,
        data.personalInfo.subtitle,
        "resume",
        "cv",
        "curriculum vitae",
      ].join(", "),
      // Note: The docx library doesn't support setting document language directly
      // The document_language config is available for future use if the library adds support
      sections: [section],
    });
  }
}
