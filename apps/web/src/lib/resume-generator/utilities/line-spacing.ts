import type { ResumeConfig } from "../configuration/config-types";

/**
 * Line spacing type for different paragraph categories
 */
export type LineSpacingType = "body" | "heading" | "title";

/**
 * Line spacing configuration for docx paragraphs
 */
export interface LineSpacingConfig {
  line?: number;
  rule?: "auto" | "atLeast" | "exact";
}

/**
 * Applies line spacing to a paragraph based on the paragraph type
 * Converts line spacing ratios from config to docx line spacing values
 *
 * Line spacing in docx is measured in 240ths of a line (twips).
 * For example:
 * - 1.0 line spacing = 240
 * - 1.5 line spacing = 360
 * - 2.0 line spacing = 480
 *
 * @param type - The type of paragraph (body, heading, or title)
 * @param config - Resume configuration containing line spacing ratios
 * @returns Line spacing configuration for docx paragraph
 */
export function applyLineSpacing(
  type: LineSpacingType,
  config: ResumeConfig,
): LineSpacingConfig {
  const ratio = config.typography.lineSpacing[type];

  // Convert ratio to docx line spacing value (240ths of a line)
  const lineSpacingValue = Math.round(ratio * 240);

  return {
    line: lineSpacingValue,
    rule: "auto",
  };
}
