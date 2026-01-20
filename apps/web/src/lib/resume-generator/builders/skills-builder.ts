import { Paragraph, Table } from "docx";
import type { Skills } from "../types";
import type { ExtendedResumeConfig } from "../configuration/extended-config-types";
import { DEFAULT_SECTION_TITLES } from "../configuration/extended-defaults";
import { buildSectionHeader } from "./section-header-builder";
import { createTableRow, createTable } from "../utilities/table-factory";

/**
 * Builds the skills section with a simple table
 * @param skills - Skills object with categories
 * @param config - Resume configuration for styling
 * @returns Array containing section header and skills table
 */
export function buildSkills(
  skills: Skills,
  config: ExtendedResumeConfig,
): (Paragraph | Table)[] {
  const elements: (Paragraph | Table)[] = [];

  // Use configurable section title
  const sectionTitle =
    config.section_titles?.skills ?? DEFAULT_SECTION_TITLES.skills;
  elements.push(buildSectionHeader(sectionTitle, config));

  // Get column widths from config
  const [categoryWidth, skillsWidth] = config.table_config
    ?.skills_column_widths ?? [25, 75];

  // Create table rows
  const rows = [];

  // Languages row
  if (skills.languages && skills.languages.length > 0) {
    const skillNames = skills.languages.map((s) => s.name).join(", ");
    rows.push(
      createTableRow(
        [
          { width: categoryWidth, content: "Languages", bold: true },
          { width: skillsWidth, content: skillNames },
        ],
        config,
      ),
    );
  }

  // Frameworks row
  if (skills.frameworks && skills.frameworks.length > 0) {
    const skillNames = skills.frameworks.map((s) => s.name).join(", ");
    rows.push(
      createTableRow(
        [
          { width: categoryWidth, content: "Frameworks", bold: true },
          { width: skillsWidth, content: skillNames },
        ],
        config,
      ),
    );
  }

  // Tools row
  if (skills.tools && skills.tools.length > 0) {
    const skillNames = skills.tools.map((s) => s.name).join(", ");
    rows.push(
      createTableRow(
        [
          { width: categoryWidth, content: "Tools", bold: true },
          { width: skillsWidth, content: skillNames },
        ],
        config,
      ),
    );
  }

  // Only create table if there are rows
  if (rows.length > 0) {
    const table = createTable(
      rows,
      {
        outer: { color: config.colors.secondary, size: 1 },
        inner: { color: config.colors.accent, size: 1 },
      },
      config,
    );
    elements.push(table);
  }

  return elements;
}
