// Semantic spacing scale for consistent spacing throughout the resume
// Values are in twentieths of a point (twips / 20)

export const SPACING = {
  xs: 100, // 5pt - Extra small spacing
  sm: 200, // 10pt - Small spacing
  md: 300, // 15pt - Medium spacing
  lg: 400, // 20pt - Large spacing
  xl: 600, // 30pt - Extra large spacing
} as const;

export type SpacingKey = keyof typeof SPACING;
