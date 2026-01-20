import { Packer } from "docx";
import { saveAs } from "file-saver";
import { validateResumeData, sanitizeResumeData } from "./validation/validator";
import { ResumeGenerationError, TemplateError } from "./validation/errors";
import { loadExtendedConfiguration } from "./configuration/extended-config-loader";
import { ProfessionalTemplate } from "./templates/professional-template";
import { ModernTemplate } from "./templates/modern-template";
import type { Template } from "./templates/template-interface";
import type { ResumeData } from "./types";
import type { ExtendedResumeConfig } from "./configuration/extended-config-types";
import type { TemplateType } from "./configuration/config-types";

/**
 * Gets the appropriate template instance based on template type
 * @param templateType - Type of template to use
 * @returns Template instance
 * @throws TemplateError if template type is unknown
 */
export function getTemplate(templateType: TemplateType): Template {
  switch (templateType) {
    case "professional":
      return new ProfessionalTemplate();
    case "modern":
      return new ModernTemplate();
    default:
      throw new TemplateError(`Unknown template type: ${templateType}`);
  }
}

/**
 * Generates a resume document from data
 * @param resumeData - Resume data to generate document from
 * @param customConfiguration - Optional custom configuration (supports both old and new format)
 * @throws ResumeGenerationError if validation fails
 * @throws ConfigurationError if configuration is invalid
 * @throws TemplateError if template is not found
 */
export async function generateResume(
  resumeData: ResumeData,
  customConfiguration?: Partial<ExtendedResumeConfig>,
): Promise<void> {
  try {
    // Step 1: Validate data
    const validationResult = validateResumeData(resumeData);
    if (!validationResult.isValid) {
      throw new ResumeGenerationError(
        "Resume data validation failed",
        validationResult.errors,
      );
    }

    // Step 2: Sanitize data to remove unsafe characters
    const sanitizedData = sanitizeResumeData(resumeData);

    // Step 3: Load and merge configuration (supports extended config)
    const configuration = loadExtendedConfiguration(customConfiguration);

    // Step 4: Select template
    const template = getTemplate(configuration.template);

    // Step 5: Build document with sanitized data
    const document = template.buildDocument(sanitizedData, configuration);

    // Step 6: Generate blob
    const documentBlob = await Packer.toBlob(document);

    // Step 7: Save file with sanitized filename
    const filename = sanitizeFilename(resumeData.personalInfo.name);
    saveAs(documentBlob, filename);
  } catch (error) {
    if (
      error instanceof ResumeGenerationError ||
      error instanceof TemplateError
    ) {
      // Re-throw known errors
      throw error;
    }
    // Wrap unexpected errors
    throw new Error(
      `An unexpected error occurred while generating the resume: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Sanitizes a filename by removing invalid characters
 * @param name - Name to use in filename
 * @returns Sanitized filename
 */
function sanitizeFilename(name: string): string {
  const sanitized = name.replace(/[^a-zA-Z0-9]/g, "_");
  return `${sanitized}_Resume.docx`;
}
