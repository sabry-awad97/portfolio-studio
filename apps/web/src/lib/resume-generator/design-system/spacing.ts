// Semantic spacing scale for consistent spacing throughout the resume
// Values are in twentieths of a point (twips)
// 1 point = 20 twips, so 100 twips = 5 points

export const SPACING = {
  xs: 100, // 5pt (100 twips) - Extra small spacing
  sm: 200, // 10pt (200 twips) - Small spacing
  md: 300, // 15pt (300 twips) - Medium spacing
  lg: 400, // 20pt (400 twips) - Large spacing
  xl: 600, // 30pt (600 twips) - Extra large spacing
} as const;

export type SpacingKey = keyof typeof SPACING;
