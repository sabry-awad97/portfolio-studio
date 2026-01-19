import type { ColorScheme } from "../design-system/colors";
import type { TypographySizes, LineSpacing } from "../design-system/typography";

/**
 * Template type for different resume layouts
 */
export type TemplateType = "professional" | "modern";

/**
 * Typography configuration
 */
export interface TypographyConfig {
  sizes: TypographySizes;
  fonts: {
    primary: string;
    secondary: string;
  };
  lineSpacing: LineSpacing;
}

/**
 * Spacing configuration
 */
export interface SpacingConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

/**
 * Page margins configuration (in inches)
 */
export interface MarginsConfig {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Complete resume configuration
 */
export interface ResumeConfig {
  colors: ColorScheme;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  margins: MarginsConfig;
  template: TemplateType;
}
