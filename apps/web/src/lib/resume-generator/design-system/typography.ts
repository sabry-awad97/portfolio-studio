// Typography system for consistent font sizing and families

export const TYPOGRAPHY = {
  sizes: {
    title: 36, // Main name/title (18pt)
    heading1: 28, // Section headings (14pt)
    heading2: 24, // Subsection headings (12pt)
    body: 22, // Body text (11pt)
    small: 20, // Small text (10pt)
    caption: 18, // Caption text (9pt)
  },
  fonts: {
    primary: "Calibri", // Primary font for most text
    secondary: "Arial", // Secondary/fallback font
  },
  lineSpacing: {
    title: 1.2, // 120% line height for titles
    heading: 1.15, // 115% line height for headings
    body: 1.5, // 150% line height for body text (better readability)
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

export interface LineSpacing {
  title: number;
  heading: number;
  body: number;
}

export type TypographySizeKey = keyof TypographySizes;
export type TypographyFontKey = keyof typeof TYPOGRAPHY.fonts;
export type LineSpacingKey = keyof LineSpacing;
