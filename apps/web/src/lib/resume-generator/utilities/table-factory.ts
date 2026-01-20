import {
  Table,
  TableRow,
  TableCell,
  Paragraph,
  TextRun,
  WidthType,
  VerticalAlign,
  type TableVerticalAlign,
} from "docx";
import type { ResumeConfig } from "../configuration/config-types";
import {
  createTableBorders,
  createCellMargins,
  type TableBorderOptions,
} from "./border-factory";
import { applyLineSpacing } from "./line-spacing";

/**
 * Options for creating a table cell
 */
export interface CellOptions {
  width: number; // percentage (0-100)
  content: string;
  bold?: boolean;
  verticalAlign?: TableVerticalAlign; // VerticalAlign enum value
}

/**
 * Creates a table cell with standard margins and styling
 *
 * @param options - Cell configuration options
 * @param config - Resume configuration for styling
 * @returns Configured TableCell instance
 */
export function createTableCell(
  options: CellOptions,
  config: ResumeConfig,
): TableCell {
  return new TableCell({
    width: {
      size: options.width,
      type: WidthType.PERCENTAGE,
    },
    verticalAlign: options.verticalAlign ?? VerticalAlign.CENTER,
    margins: createCellMargins(),
    children: [
      new Paragraph({
        spacing: applyLineSpacing("body", config),
        children: [
          new TextRun({
            text: options.content,
            bold: options.bold,
            size: config.typography.sizes.body,
            color: config.colors.text,
            font: config.typography.fonts.primary,
          }),
        ],
      }),
    ],
  });
}

/**
 * Creates a table row from cell options
 *
 * @param cells - Array of cell options
 * @param config - Resume configuration for styling
 * @returns Configured TableRow instance
 */
export function createTableRow(
  cells: CellOptions[],
  config: ResumeConfig,
): TableRow {
  return new TableRow({
    children: cells.map((cellOptions) => createTableCell(cellOptions, config)),
  });
}

/**
 * Creates a complete table with borders
 *
 * @param rows - Array of table rows
 * @param borderOptions - Optional border configuration
 * @param config - Optional resume configuration for border colors
 * @returns Configured Table instance
 */
export function createTable(
  rows: TableRow[],
  borderOptions?: TableBorderOptions,
  config?: ResumeConfig,
): Table {
  const tableConfig: any = {
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows,
  };

  // Add borders if options and config are provided
  if (borderOptions && config) {
    tableConfig.borders = createTableBorders(borderOptions, config);
  }

  return new Table(tableConfig);
}
