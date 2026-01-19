// Color palette for consistent theming
// Colors are 6-character hex strings (without # prefix for docx compatibility)

export const COLORS = {
  primary: "002ad2", // Primary brand color
  secondary: "4a5568", // Secondary text color
  accent: "e2e8f0", // Accent/highlight color
  text: "1a202c", // Main text color
  background: "ffffff", // Background color
} as const;

// ColorScheme allows any valid 6-character hex string for each color
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

export type ColorKey = keyof ColorScheme;
