import {
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TextRun,
  VerticalAlign,
  BorderStyle,
  convertInchesToTwip,
} from "docx";
import type { Skills } from "../types";
import type { ResumeConfig } from "../configuration/config-types";
import { buildSectionHeader } from "./section-header-builder";

/**
 * Builds the skills section with a simple table
 * @param skills - Skills object with categories
 * @param config - Resume configuration for styling
 * @returns Array containing section header and skills table
 */
export function buildSkills(
  skills: Skills,
  config: ResumeConfig,
): (Paragraph | Table)[] {
  const elements: (Paragraph | Table)[] = [];

  // Section header
  elements.push(buildSectionHeader("TECHNICAL SKILLS", config));

  // Create table rows
  const rows: TableRow[] = [];

  // Languages row
  if (skills.languages && skills.languages.length > 0) {
    const skillNames = skills.languages.map((s) => s.name).join(", ");
    rows.push(createSkillRow("Languages", skillNames, config));
  }

  // Frameworks row
  if (skills.frameworks && skills.frameworks.length > 0) {
    const skillNames = skills.frameworks.map((s) => s.name).join(", ");
    rows.push(createSkillRow("Frameworks", skillNames, config));
  }

  // Tools row
  if (skills.tools && skills.tools.length > 0) {
    const skillNames = skills.tools.map((s) => s.name).join(", ");
    rows.push(createSkillRow("Tools", skillNames, config));
  }

  // Only create table if there are rows
  if (rows.length > 0) {
    const table = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      borders: {
        top: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: config.colors.secondary,
        },
        bottom: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: config.colors.secondary,
        },
        left: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: config.colors.secondary,
        },
        right: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: config.colors.secondary,
        },
        insideHorizontal: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: config.colors.accent,
        },
        insideVertical: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: config.colors.accent,
        },
      },
      rows,
    });

    elements.push(table);
  }

  return elements;
}

/**
 * Creates a table row for a skill category
 */
function createSkillRow(
  category: string,
  skills: string,
  config: ResumeConfig,
): TableRow {
  return new TableRow({
    children: [
      // Category cell
      new TableCell({
        width: {
          size: 25,
          type: WidthType.PERCENTAGE,
        },
        verticalAlign: VerticalAlign.CENTER,
        margins: {
          top: convertInchesToTwip(0.05), // 0.05 inches = ~3.6pt padding
          bottom: convertInchesToTwip(0.05),
          left: convertInchesToTwip(0.1), // 0.1 inches = ~7.2pt padding
          right: convertInchesToTwip(0.1),
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: category,
                bold: true,
                size: config.typography.sizes.body,
                color: config.colors.text,
                font: config.typography.fonts.primary,
              }),
            ],
          }),
        ],
      }),
      // Skills cell
      new TableCell({
        width: {
          size: 75,
          type: WidthType.PERCENTAGE,
        },
        verticalAlign: VerticalAlign.CENTER,
        margins: {
          top: convertInchesToTwip(0.05),
          bottom: convertInchesToTwip(0.05),
          left: convertInchesToTwip(0.1),
          right: convertInchesToTwip(0.1),
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: skills,
                size: config.typography.sizes.body,
                color: config.colors.text,
                font: config.typography.fonts.primary,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
