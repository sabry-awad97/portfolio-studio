import { ConfigurationError } from "../validation/errors";
import { DEFAULT_CONFIG } from "./default-config";
import type { ResumeConfig } from "./config-types";

/**
 * Deep partial type for nested configuration objects
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Loads and merges custom configuration with defaults
 * @param customConfig - Partial configuration to merge with defaults
 * @returns Complete configuration object
 * @throws ConfigurationError if configuration is invalid
 */
export function loadConfiguration(
  customConfig?: DeepPartial<ResumeConfig>,
): ResumeConfig {
  const config: ResumeConfig = {
    ...DEFAULT_CONFIG,
    ...customConfig,
    // Deep merge nested objects
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
    },
    spacing: {
      ...DEFAULT_CONFIG.spacing,
      ...customConfig?.spacing,
    },
    margins: {
      ...DEFAULT_CONFIG.margins,
      ...customConfig?.margins,
    },
  };

  validateConfiguration(config);

  return config;
}

/**
 * Validates configuration values
 * @param config - Configuration to validate
 * @throws ConfigurationError if configuration is invalid
 */
export function validateConfiguration(config: ResumeConfig): void {
  // Validate colors are valid hex
  const hexRegex = /^[0-9A-Fa-f]{6}$/;

  if (!hexRegex.test(config.colors.primary)) {
    throw new ConfigurationError(
      "Primary color must be a valid 6-character hex color",
    );
  }
  if (!hexRegex.test(config.colors.secondary)) {
    throw new ConfigurationError(
      "Secondary color must be a valid 6-character hex color",
    );
  }
  if (!hexRegex.test(config.colors.accent)) {
    throw new ConfigurationError(
      "Accent color must be a valid 6-character hex color",
    );
  }
  if (!hexRegex.test(config.colors.text)) {
    throw new ConfigurationError(
      "Text color must be a valid 6-character hex color",
    );
  }
  if (!hexRegex.test(config.colors.background)) {
    throw new ConfigurationError(
      "Background color must be a valid 6-character hex color",
    );
  }

  // Validate spacing values are positive
  if (config.spacing.xs <= 0) {
    throw new ConfigurationError("Spacing xs must be positive");
  }
  if (config.spacing.sm <= 0) {
    throw new ConfigurationError("Spacing sm must be positive");
  }
  if (config.spacing.md <= 0) {
    throw new ConfigurationError("Spacing md must be positive");
  }
  if (config.spacing.lg <= 0) {
    throw new ConfigurationError("Spacing lg must be positive");
  }
  if (config.spacing.xl <= 0) {
    throw new ConfigurationError("Spacing xl must be positive");
  }

  // Validate margins are reasonable (between 0.5 and 2 inches)
  if (config.margins.top < 0.5 || config.margins.top > 2) {
    throw new ConfigurationError("Top margin must be between 0.5 and 2 inches");
  }
  if (config.margins.right < 0.5 || config.margins.right > 2) {
    throw new ConfigurationError(
      "Right margin must be between 0.5 and 2 inches",
    );
  }
  if (config.margins.bottom < 0.5 || config.margins.bottom > 2) {
    throw new ConfigurationError(
      "Bottom margin must be between 0.5 and 2 inches",
    );
  }
  if (config.margins.left < 0.5 || config.margins.left > 2) {
    throw new ConfigurationError(
      "Left margin must be between 0.5 and 2 inches",
    );
  }

  // Validate font sizes are positive
  if (config.typography.sizes.title <= 0) {
    throw new ConfigurationError("Title font size must be positive");
  }
  if (config.typography.sizes.body <= 0) {
    throw new ConfigurationError("Body font size must be positive");
  }

  // Validate template type
  if (config.template !== "professional" && config.template !== "modern") {
    throw new ConfigurationError(
      'Template must be either "professional" or "modern"',
    );
  }
}
