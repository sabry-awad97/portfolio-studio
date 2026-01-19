import type { ValidationError } from "../types";

/**
 * Base error class for resume generation errors
 */
export class ResumeGenerationError extends Error {
  constructor(
    message: string,
    public validationErrors: ValidationError[],
  ) {
    super(message);
    this.name = "ResumeGenerationError";
  }

  /**
   * Format validation errors as a readable string
   */
  toString(): string {
    if (this.validationErrors.length === 0) {
      return this.message;
    }

    const errorList = this.validationErrors
      .map((e) => `  - ${e.field}: ${e.message}`)
      .join("\n");
    return `${this.message}\n${errorList}`;
  }
}

/**
 * Error thrown when configuration is invalid
 */
export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

/**
 * Error thrown when template is not found or invalid
 */
export class TemplateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TemplateError";
  }
}
