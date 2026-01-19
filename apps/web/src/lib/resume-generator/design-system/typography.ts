// Typography system for consistent font sizing and families

export const TYPOGRAPHY = {
  sizes: {
    title: 36, // Main name/title
    heading1: 28, // Section headings
    heading2: 24, // Subsection headings
    body: 22, // Body text
    small: 20, // Small text
    caption: 18, // Caption text
  },
  fonts: {
    primary: "Calibri", // Primary font for most text
    secondary: "Arial", // Secondary/fallback font
  },
} as const;

// TypographySizes allows any positive number for font sizes
export interface TypographySizes {
  title: number;
  heading1: number;
  heading2: number;
  body: number;
  small: number;
  caption: number;
}

export type TypographySizeKey = keyof TypographySizes;
export type TypographyFontKey = keyof typeof TYPOGRAPHY.fonts;
