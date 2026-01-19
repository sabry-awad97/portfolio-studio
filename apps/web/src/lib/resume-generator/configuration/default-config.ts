import { COLORS } from "../design-system/colors";
import { TYPOGRAPHY } from "../design-system/typography";
import { SPACING } from "../design-system/spacing";
import type { ResumeConfig } from "./config-types";

/**
 * Default configuration for resume generation
 * Uses design system constants for consistency
 */
export const DEFAULT_CONFIG: ResumeConfig = {
  colors: COLORS,
  typography: {
    sizes: TYPOGRAPHY.sizes,
    fonts: TYPOGRAPHY.fonts,
  },
  spacing: SPACING,
  margins: {
    top: 0.75,
    right: 0.75,
    bottom: 0.75,
    left: 0.75,
  },
  template: "professional",
};
