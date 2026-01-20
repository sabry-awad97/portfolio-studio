import type { ResumeConfig } from "../configuration/config-types";

/**
 * Custom error class for configuration validation errors
 */
export class ConfigurationError extends Error {
  constructor(
    message: string,
    public field: string,
    public expectedFormat?: string,
  ) {
    super(message);
    this.name = "ConfigurationError";
  }
}

/**
 * Validates hex color format (6 characters, no # prefix)
 *
 * @param color - Color string to validate
 * @param fieldName - Name of the field being validated
 * @throws ConfigurationError if color is invalid
 */
export function validateColor(color: string, fieldName: string): void {
  const hexPattern = /^[0-9A-Fa-f]{6}$/;

  if (!hexPattern.test(color)) {
    throw new ConfigurationError(
      `Invalid color format in field '${fieldName}': '${color}'`,
      fieldName,
      "6-character hex string without # (e.g., '002ad2')",
    );
  }
}

/**
 * Validates spacing value (must be positive number)
 *
 * @param value - Spacing value to validate
 * @param fieldName - Name of the field being validated
 * @throws ConfigurationError if spacing is invalid
 */
export function validateSpacing(value: number, fieldName: string): void {
  if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
    throw new ConfigurationError(
      `Invalid spacing value in field '${fieldName}': ${value}`,
      fieldName,
      "positive number (twips)",
    );
  }
}

/**
 * Validates table column widths sum to 100
 *
 * @param widths - Array of column width percentages
 * @throws ConfigurationError if widths don't sum to 100
 */
export function validateColumnWidths(widths: number[]): void {
  const sum = widths.reduce((acc, width) => acc + width, 0);

  if (sum !== 100) {
    throw new ConfigurationError(
      `Column widths must sum to 100, got ${sum}`,
      "table_config.skills_column_widths",
      "array of numbers summing to 100 (e.g., [25, 75])",
    );
  }
}

/**
 * Calculates relative luminance for a color
 * Used in contrast ratio calculation per WCAG formula
 *
 * @param hex - 6-character hex color string
 * @returns Relative luminance value (0-1)
 */
function getRelativeLuminance(hex: string): number {
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Apply gamma correction
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Calculate relative luminance
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Validates color contrast ratio meets WCAG AA standards (4.5:1)
 *
 * @param foreground - Foreground color (6-character hex)
 * @param background - Background color (6-character hex)
 * @returns Object with passes boolean and calculated ratio
 */
export function validateContrast(
  foreground: string,
  background: string,
): { passes: boolean; ratio: number } {
  const l1 = getRelativeLuminance(foreground);
  const l2 = getRelativeLuminance(background);

  // Contrast ratio formula: (lighter + 0.05) / (darker + 0.05)
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    passes: ratio >= 4.5,
    ratio: Math.round(ratio * 100) / 100, // Round to 2 decimal places
  };
}

/**
 * Validates complete ResumeConfig structure
 * Checks all color, spacing, margin, font size, and template requirements
 *
 * @param config - Partial or complete resume configuration
 * @throws ConfigurationError if any validation fails
 */
export function validateConfig(config: Partial<ResumeConfig>): void {
  // Validate colors if present
  if (config.colors) {
    const colorFields = [
      "primary",
      "secondary",
      "accent",
      "text",
      "background",
    ] as const;

    for (const field of colorFields) {
      if (config.colors[field]) {
        validateColor(config.colors[field], `colors.${field}`);
      }
    }
  }

  // Validate spacing if present
  if (config.spacing) {
    const spacingFields = ["xs", "sm", "md", "lg", "xl"] as const;

    for (const field of spacingFields) {
      if (config.spacing[field] !== undefined) {
        validateSpacing(config.spacing[field], `spacing.${field}`);
      }
    }
  }

  // Validate margins if present
  if (config.margins) {
    const marginFields = ["top", "right", "bottom", "left"] as const;

    for (const field of marginFields) {
      if (config.margins[field] !== undefined) {
        const value = config.margins[field];
        if (typeof value !== "number" || value < 0) {
          throw new ConfigurationError(
            `Invalid margin value in field 'margins.${field}': ${value}`,
            `margins.${field}`,
            "positive number (inches)",
          );
        }
        // Validate margins are reasonable (between 0.5 and 2 inches)
        if (value < 0.5 || value > 2) {
          throw new ConfigurationError(
            `Margin value in field 'margins.${field}' must be between 0.5 and 2 inches, got ${value}`,
            `margins.${field}`,
            "number between 0.5 and 2.0 (inches)",
          );
        }
      }
    }
  }

  // Validate typography if present
  if (config.typography?.sizes) {
    if (
      config.typography.sizes.title !== undefined &&
      config.typography.sizes.title <= 0
    ) {
      throw new ConfigurationError(
        `Title font size must be positive, got ${config.typography.sizes.title}`,
        "typography.sizes.title",
        "positive number (half-points)",
      );
    }
    if (
      config.typography.sizes.body !== undefined &&
      config.typography.sizes.body <= 0
    ) {
      throw new ConfigurationError(
        `Body font size must be positive, got ${config.typography.sizes.body}`,
        "typography.sizes.body",
        "positive number (half-points)",
      );
    }
  }

  // Validate template type if present
  if (config.template) {
    if (config.template !== "professional" && config.template !== "modern") {
      throw new ConfigurationError(
        `Invalid template type: ${config.template}`,
        "template",
        '"professional" or "modern"',
      );
    }
  }
}
