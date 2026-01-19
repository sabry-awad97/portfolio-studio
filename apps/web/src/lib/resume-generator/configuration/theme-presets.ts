import type { ResumeConfig } from "./config-types";
import { DEFAULT_CONFIG } from "./default-config";

/**
 * Professional theme - Classic and conservative
 */
export const PROFESSIONAL_THEME: ResumeConfig = {
  ...DEFAULT_CONFIG,
  colors: {
    primary: "002ad2",
    secondary: "4a5568",
    accent: "e2e8f0",
    text: "1a202c",
    background: "ffffff",
  },
  template: "professional",
};

/**
 * Modern theme - Contemporary and bold
 */
export const MODERN_THEME: ResumeConfig = {
  ...DEFAULT_CONFIG,
  colors: {
    primary: "6366f1",
    secondary: "64748b",
    accent: "f1f5f9",
    text: "0f172a",
    background: "ffffff",
  },
  typography: {
    ...DEFAULT_CONFIG.typography,
    sizes: {
      title: 40,
      heading1: 30,
      heading2: 26,
      body: 22,
      small: 20,
      caption: 18,
    },
  },
  template: "modern",
};

/**
 * Minimal theme - Clean and simple
 */
export const MINIMAL_THEME: ResumeConfig = {
  ...DEFAULT_CONFIG,
  colors: {
    primary: "000000",
    secondary: "6b7280",
    accent: "f3f4f6",
    text: "111827",
    background: "ffffff",
  },
  spacing: {
    xs: 80,
    sm: 160,
    md: 240,
    lg: 320,
    xl: 480,
  },
  template: "professional",
};

/**
 * Map of theme names to theme configurations
 */
export const THEME_PRESETS = {
  professional: PROFESSIONAL_THEME,
  modern: MODERN_THEME,
  minimal: MINIMAL_THEME,
} as const;

export type ThemePresetName = keyof typeof THEME_PRESETS;
