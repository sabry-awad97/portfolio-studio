import type {
  SectionTitles,
  FormattingOptions,
  TableConfig,
  PageConfig,
  DateFormatConfig,
  ExtendedResumeConfig,
} from "./extended-config-types";
import { DEFAULT_CONFIG } from "./default-config";

/**
 * Default English section titles
 */
export const DEFAULT_SECTION_TITLES: SectionTitles = {
  education: "EDUCATION",
  projects: "PROJECTS",
  skills: "TECHNICAL SKILLS",
  experience: "EXPERIENCE",
  certifications: "CERTIFICATIONS",
  summary: "PROFESSIONAL SUMMARY",
};

/**
 * Default formatting options
 */
export const DEFAULT_FORMATTING: FormattingOptions = {
  bullet_character: "•",
  date_separator: "  •  ",
  tag_separator: " • ",
};

/**
 * Default table configuration
 */
export const DEFAULT_TABLE_CONFIG: TableConfig = {
  skills_column_widths: [25, 75],
};

/**
 * Default page control configuration
 */
export const DEFAULT_PAGE_CONFIG: PageConfig = {
  enable_page_numbers: false,
  page_number_format: "Page {PAGE} of {NUMPAGES}",
  enable_page_header: false,
};

/**
 * Default date formatting configuration
 */
export const DEFAULT_DATE_FORMAT: DateFormatConfig = {
  locale: "en-US",
  format_pattern: "MMM YYYY",
};

/**
 * Default document language
 */
export const DEFAULT_DOCUMENT_LANGUAGE = "en-US";

/**
 * Complete default extended configuration
 * Combines base config with extended properties
 */
export const DEFAULT_EXTENDED_CONFIG: ExtendedResumeConfig = {
  ...DEFAULT_CONFIG,
  section_titles: DEFAULT_SECTION_TITLES,
  document_language: DEFAULT_DOCUMENT_LANGUAGE,
  formatting: DEFAULT_FORMATTING,
  table_config: DEFAULT_TABLE_CONFIG,
  page_config: DEFAULT_PAGE_CONFIG,
  date_format: DEFAULT_DATE_FORMAT,
};
