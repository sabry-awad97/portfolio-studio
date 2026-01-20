// Utility functions for resume generator

// Text run factory
export {
  createTextRun,
  createHyperlink,
  createBulletText,
  createTitleDateText,
} from "./text-run-factory";
export type { TextRunOptions, HyperlinkOptions } from "./text-run-factory";

// Border factory
export {
  createTableBorders,
  createSectionBorder,
  createCellMargins,
} from "./border-factory";
export type { BorderOptions, TableBorderOptions } from "./border-factory";

// Spacing patterns
export {
  SPACING_PATTERNS,
  resolveSpacing,
  createParagraphSpacing,
} from "./spacing-patterns";
export type { SpacingPattern, ResolvedSpacing } from "./spacing-patterns";

// Validation helpers
export {
  ConfigurationError,
  validateColor,
  validateSpacing,
  validateColumnWidths,
  validateContrast,
  validateConfig,
} from "./validation-helpers";

// Date formatter
export { parseDate, formatDateObject, formatDate } from "./date-formatter";
export type { DateFormatOptions } from "./date-formatter";

// Table factory
export { createTableCell, createTableRow, createTable } from "./table-factory";
export type { CellOptions } from "./table-factory";

// Line spacing
export { applyLineSpacing } from "./line-spacing";
export type { LineSpacingType, LineSpacingConfig } from "./line-spacing";
