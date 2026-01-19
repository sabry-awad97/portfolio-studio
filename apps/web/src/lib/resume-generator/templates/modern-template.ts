import { Document, Paragraph, Table, convertInchesToTwip } from "docx";
import type { ResumeData } from "../types";
import type { ResumeConfig, TemplateType } from "../configuration/config-types";
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

/**
 * Modern template with alternative section ordering
 */
export class ModernTemplate implements Template {
  name: TemplateType = "modern";

  buildDocument(data: ResumeData, config: ResumeConfig): Document {
    const children: (Paragraph | Table)[] = [];

    // Header section
    children.push(...buildHeader(data.personalInfo, config));

    // Professional summary
    if (data.personalInfo.bio) {
      children.push(...buildSummary(data.personalInfo.bio, config));
    }

    // Skills section (moved up for modern layout)
    if (data.skills) {
      children.push(...buildSkills(data.skills, config));
    }

    // Work experience section (optional)
    if (data.experience && data.experience.length > 0) {
      children.push(...buildExperience(data.experience, config));
    }

    // Projects section
    if (data.projects && data.projects.length > 0) {
      children.push(...buildProjects(data.projects, config));
    }

    // Education section
    if (data.education && data.education.length > 0) {
      children.push(...buildEducation(data.education, config));
    }

    // Certifications section (optional)
    if (data.certifications && data.certifications.length > 0) {
      children.push(...buildCertifications(data.certifications, config));
    }

    return new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(config.margins.top),
                right: convertInchesToTwip(config.margins.right),
                bottom: convertInchesToTwip(config.margins.bottom),
                left: convertInchesToTwip(config.margins.left),
              },
            },
          },
          children,
        },
      ],
    });
  }
}
