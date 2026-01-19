// Main entry point for resume generator

// Core function
export { generateResume, getTemplate } from "./generator";

// Types
export type {
  ResumeData,
  PersonalInfo,
  ContactInfo,
  Education,
  Project,
  Skills,
  Skill,
  WorkExperience,
  Certification,
  ValidationResult,
  ValidationError,
} from "./types";

export type {
  ResumeConfig,
  TypographyConfig,
  SpacingConfig,
  MarginsConfig,
  TemplateType,
} from "./configuration/config-types";

// Configuration
export {
  DEFAULT_CONFIG,
  PROFESSIONAL_THEME,
  MODERN_THEME,
  MINIMAL_THEME,
  THEME_PRESETS,
  loadConfiguration,
  validateConfiguration,
} from "./configuration";

// Error classes
export {
  ResumeGenerationError,
  ConfigurationError,
  TemplateError,
} from "./validation/errors";

// Templates
export type { Template } from "./templates";
export { ProfessionalTemplate, ModernTemplate } from "./templates";

// Builders (for advanced usage)
export {
  buildHeader,
  buildSummary,
  buildEducation,
  buildProjects,
  buildSkills,
  buildExperience,
  buildCertifications,
  buildSectionHeader,
} from "./builders";
