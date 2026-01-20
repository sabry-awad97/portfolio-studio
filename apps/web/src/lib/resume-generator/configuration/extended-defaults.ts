import type {
  SectionTitles,
  FormattingOptions,
  TableConfig,
  PageConfig,
  DateFormatConfig,
} from "./extended-config-types";

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
