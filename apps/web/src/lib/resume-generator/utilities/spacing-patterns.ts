import type { ResumeConfig } from "../configuration/config-types";

/**
 * Spacing pattern definition using config spacing keys
 */
export interface SpacingPattern {
  before?: keyof ResumeConfig["spacing"];
  after?: keyof ResumeConfig["spacing"];
}

/**
 * Standard spacing patterns for consistent visual rhythm
 * These patterns ensure all sections and entries use consistent spacing
 */
export const SPACING_PATTERNS = {
  /**
   * Section header spacing: medium space before, small space after
   * Used for all section headers (EDUCATION, PROJECTS, etc.)
   */
  sectionHeader: {
    before: "md",
    after: "sm",
  },
  /**
   * Entry title spacing: small space before, extra-small space after
   * Used for entry titles (degree names, job titles, project names)
   */
  entryTitle: {
    before: "sm",
    after: "xs",
  },
  /**
   * Entry content spacing: small space after
   * Used for entry descriptions and content paragraphs
   */
  entryContent: {
    after: "sm",
  },
  /**
   * Entry description spacing: extra-small space after
   * Used for secondary descriptions within entries
   */
  entryDescription: {
    after: "xs",
  },
} as const;

/**
 * Resolved spacing values with actual numbers
 */
export interface ResolvedSpacing {
  before?: number;
  after?: number;
}

/**
 * Resolves spacing pattern keys to actual values from config
 * Converts pattern keys like 'md', 'sm' to actual twip values
 *
 * @param pattern - Spacing pattern with config keys
 * @param config - Resume configuration containing spacing values
 * @returns Resolved spacing with actual numeric values
 */
export function resolveSpacing(
  pattern: SpacingPattern,
  config: ResumeConfig,
): ResolvedSpacing {
  const resolved: ResolvedSpacing = {};

  if (pattern.before) {
    resolved.before = config.spacing[pattern.before];
  }

  if (pattern.after) {
    resolved.after = config.spacing[pattern.after];
  }

  return resolved;
}

/**
 * Creates paragraph spacing configuration from a named pattern
 * Provides easy access to standard spacing patterns
 *
 * @param patternName - Name of the spacing pattern to use
 * @param config - Resume configuration containing spacing values
 * @returns Resolved spacing configuration ready for use in paragraphs
 */
export function createParagraphSpacing(
  patternName: keyof typeof SPACING_PATTERNS,
  config: ResumeConfig,
): ResolvedSpacing {
  const pattern = SPACING_PATTERNS[patternName];
  return resolveSpacing(pattern, config);
}
