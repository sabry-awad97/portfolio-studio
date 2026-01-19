// Configuration exports
export { DEFAULT_CONFIG } from "./default-config";
export {
  PROFESSIONAL_THEME,
  MODERN_THEME,
  MINIMAL_THEME,
  THEME_PRESETS,
  type ThemePresetName,
} from "./theme-presets";
export { loadConfiguration, validateConfiguration } from "./config-loader";
export type {
  ResumeConfig,
  TypographyConfig,
  SpacingConfig,
  MarginsConfig,
  TemplateType,
} from "./config-types";
