import type { ResumeConfig } from "./config-types";

/**
 * Customizable section titles for internationalization
 */
export interface SectionTitles {
  education: string;
  projects: string;
  skills: string;
  experience: string;
  certifications: string;
  summary: string;
}

/**
 * Formatting options for bullets, separators, and delimiters
 */
export interface FormattingOptions {
  bullet_character: string;
  date_separator: string;
  tag_separator: string;
}

/**
 * Table layout configuration
 */
export interface TableConfig {
  skills_column_widths: [number, number];
}

/**
 * Page control settings for multi-page resumes
 */
export interface PageConfig {
  enable_page_numbers: boolean;
  page_number_format: string;
  enable_page_header: boolean;
}

/**
 * Date formatting configuration
 */
export interface DateFormatConfig {
  locale: string;
  format_pattern: string;
}

/**
 * Extended resume configuration with new features
 * Extends base ResumeConfig with internationalization, formatting, and page control options
 */
export interface ExtendedResumeConfig extends ResumeConfig {
  section_titles: SectionTitles;
  document_language: string;
  formatting: FormattingOptions;
  table_config: TableConfig;
  page_config: PageConfig;
  date_format: DateFormatConfig;
}
