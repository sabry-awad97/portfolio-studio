import {
  validateConfig,
  validateColumnWidths,
  validateContrast,
} from "../utilities/validation-helpers";
import { DEFAULT_CONFIG } from "./default-config";
import {
  DEFAULT_SECTION_TITLES,
  DEFAULT_FORMATTING,
  DEFAULT_TABLE_CONFIG,
  DEFAULT_PAGE_CONFIG,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DOCUMENT_LANGUAGE,
} from "./extended-defaults";
import type { ExtendedResumeConfig } from "./extended-config-types";
import type { ResumeConfig } from "./config-types";

/**
 * Deep partial type for nested configuration objects
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Loads and merges custom extended configuration with defaults
 * Supports both old ResumeConfig format and new ExtendedResumeConfig format
 *
 * @param customConfig - Partial configuration to merge with defaults
 * @returns Complete extended configuration object
 * @throws ConfigurationError if configuration is invalid
 */
export function loadExtendedConfiguration(
  customConfig?: DeepPartial<ExtendedResumeConfig>,
): ExtendedResumeConfig {
  // Validate custom config before merging
  if (customConfig) {
    validateConfig(customConfig as Partial<ResumeConfig>);

    // Validate column widths if provided
    if (customConfig.table_config?.skills_column_widths) {
      validateColumnWidths(customConfig.table_config.skills_column_widths);
    }
  }

  // Deep merge configuration with defaults
  const config: ExtendedResumeConfig = {
    // Base config properties
    ...DEFAULT_CONFIG,
    ...customConfig,

    // Deep merge nested objects from base config
    colors: {
      ...DEFAULT_CONFIG.colors,
      ...customConfig?.colors,
    },
    typography: {
      ...DEFAULT_CONFIG.typography,
      ...customConfig?.typography,
      sizes: {
        ...DEFAULT_CONFIG.typography.sizes,
        ...customConfig?.typography?.sizes,
      },
      fonts: {
        ...DEFAULT_CONFIG.typography.fonts,
        ...customConfig?.typography?.fonts,
      },
      lineSpacing: {
        ...DEFAULT_CONFIG.typography.lineSpacing,
        ...customConfig?.typography?.lineSpacing,
      },
    },
    spacing: {
      ...DEFAULT_CONFIG.spacing,
      ...customConfig?.spacing,
    },
    margins: {
      ...DEFAULT_CONFIG.margins,
      ...customConfig?.margins,
    },

    // Deep merge extended config properties
    section_titles: {
      ...DEFAULT_SECTION_TITLES,
      ...customConfig?.section_titles,
    },
    document_language:
      customConfig?.document_language ?? DEFAULT_DOCUMENT_LANGUAGE,
    formatting: {
      ...DEFAULT_FORMATTING,
      ...customConfig?.formatting,
    },
    table_config: {
      ...DEFAULT_TABLE_CONFIG,
      ...customConfig?.table_config,
    },
    page_config: {
      ...DEFAULT_PAGE_CONFIG,
      ...customConfig?.page_config,
    },
    date_format: {
      ...DEFAULT_DATE_FORMAT,
      ...customConfig?.date_format,
    },
  };

  // Validate merged config
  validateMergedConfig(config);

  return config;
}

/**
 * Validates the merged configuration
 * Performs additional validation beyond the base validateConfig
 *
 * @param config - Complete configuration to validate
 * @throws ConfigurationError if configuration is invalid
 */
function validateMergedConfig(config: ExtendedResumeConfig): void {
  // Validate base config properties (colors, spacing, margins, font sizes)
  validateConfig(config);

  // Validate column widths sum to 100
  if (config.table_config?.skills_column_widths) {
    validateColumnWidths(config.table_config.skills_column_widths);
  }

  // Validate color contrast ratios (warning only, not error)
  const contrastChecks = [
    {
      foreground: config.colors.text,
      background: config.colors.background,
      name: "text on background",
    },
    {
      foreground: config.colors.primary,
      background: config.colors.background,
      name: "primary on background",
    },
    {
      foreground: config.colors.secondary,
      background: config.colors.background,
      name: "secondary on background",
    },
    {
      foreground: config.colors.accent,
      background: config.colors.background,
      name: "accent on background",
    },
  ];

  for (const check of contrastChecks) {
    const result = validateContrast(check.foreground, check.background);
    if (!result.passes) {
      console.warn(
        `Warning: Low contrast ratio (${result.ratio}:1) for ${check.name}. ` +
          `WCAG AA requires at least 4.5:1 for normal text. ` +
          `Consider adjusting colors for better accessibility.`,
      );
    }
  }
}
