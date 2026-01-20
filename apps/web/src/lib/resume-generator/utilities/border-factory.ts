import {
  BorderStyle,
  convertInchesToTwip,
  type IBorderOptions,
  type ITableBordersOptions,
} from "docx";
import type { ResumeConfig } from "../configuration/config-types";

/**
 * Options for configuring a single border
 */
export interface BorderOptions {
  style?: (typeof BorderStyle)[keyof typeof BorderStyle];
  size?: number;
  color?: string;
}

/**
 * Options for configuring table borders
 */
export interface TableBorderOptions {
  outer?: BorderOptions;
  inner?: BorderOptions;
}

/**
 * Creates standard table border configuration
 * Applies consistent border styling to all table edges
 *
 * @param options - Border options for outer and inner borders
 * @param config - Resume configuration for default colors
 * @returns Complete table borders configuration
 */
export function createTableBorders(
  options: TableBorderOptions,
  config: ResumeConfig,
): ITableBordersOptions {
  const outerStyle = options.outer?.style ?? BorderStyle.SINGLE;
  const outerSize = options.outer?.size ?? 1;
  const outerColor = options.outer?.color ?? config.colors.secondary;

  const innerStyle = options.inner?.style ?? BorderStyle.SINGLE;
  const innerSize = options.inner?.size ?? 1;
  const innerColor = options.inner?.color ?? config.colors.accent;

  return {
    top: {
      style: outerStyle,
      size: outerSize,
      color: outerColor,
    },
    bottom: {
      style: outerStyle,
      size: outerSize,
      color: outerColor,
    },
    left: {
      style: outerStyle,
      size: outerSize,
      color: outerColor,
    },
    right: {
      style: outerStyle,
      size: outerSize,
      color: outerColor,
    },
    insideHorizontal: {
      style: innerStyle,
      size: innerSize,
      color: innerColor,
    },
    insideVertical: {
      style: innerStyle,
      size: innerSize,
      color: innerColor,
    },
  };
}

/**
 * Creates section header border configuration
 * Used for adding borders to section headers (typically bottom border)
 *
 * @param position - Border position (top, bottom, left, right)
 * @param options - Border styling options
 * @param config - Resume configuration for default color
 * @returns Border configuration for the specified position
 */
export function createSectionBorder(
  position: "top" | "bottom" | "left" | "right",
  options: BorderOptions,
  config: ResumeConfig,
): IBorderOptions {
  return {
    style: options.style ?? BorderStyle.SINGLE,
    size: options.size ?? 20,
    color: options.color ?? config.colors.primary,
    space: 1,
  };
}

/**
 * Creates standard table cell margins
 * Provides consistent padding for table cells
 *
 * @param padding - Optional custom padding in inches (default: 0.05" top/bottom, 0.1" left/right)
 * @returns Table cell margins configuration
 */
export function createCellMargins(padding?: {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}): {
  top: number;
  bottom: number;
  left: number;
  right: number;
} {
  return {
    top: convertInchesToTwip(padding?.top ?? 0.05),
    bottom: convertInchesToTwip(padding?.bottom ?? 0.05),
    left: convertInchesToTwip(padding?.left ?? 0.1),
    right: convertInchesToTwip(padding?.right ?? 0.1),
  };
}
