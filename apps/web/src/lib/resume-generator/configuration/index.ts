// Configuration exports
export { DEFAULT_CONFIG } from "./default-config";
export {
  PROFESSIONAL_THEME,
  MODERN_THEME,
  MINIMAL_THEME,
  THEME_PRESETS,
  type ThemePresetName,
} from "./theme-presets";
export type {
  ResumeConfig,
  TypographyConfig,
  SpacingConfig,
  MarginsConfig,
  TemplateType,
} from "./config-types";

// Extended configuration exports
export {
  DEFAULT_SECTION_TITLES,
  DEFAULT_FORMATTING,
  DEFAULT_TABLE_CONFIG,
  DEFAULT_PAGE_CONFIG,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DOCUMENT_LANGUAGE,
} from "./extended-defaults";
export { loadExtendedConfiguration } from "./extended-config-loader";
export type {
  ExtendedResumeConfig,
  SectionTitles,
  FormattingOptions,
  TableConfig,
  PageConfig,
  DateFormatConfig,
} from "./extended-config-types";
