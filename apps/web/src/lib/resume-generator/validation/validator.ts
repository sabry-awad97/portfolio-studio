import type { ResumeData, ValidationResult, ValidationError } from "../types";

/**
 * Validates resume data before document generation
 * @param data - Resume data to validate
 * @returns ValidationResult with isValid flag and any errors found
 */
export function validateResumeData(data: ResumeData): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate personal info exists
  if (!data.personalInfo) {
    errors.push({
      field: "personalInfo",
      message: "Personal information is required",
    });
    // Return early if personalInfo is missing entirely
    return { isValid: false, errors };
  }

  // Validate name
  if (!data.personalInfo.name || !data.personalInfo.name.trim()) {
    errors.push({
      field: "personalInfo.name",
      message: "Name is required",
    });
  }

  // Validate contact info exists
  if (!data.personalInfo.contact) {
    errors.push({
      field: "personalInfo.contact",
      message: "Contact information is required",
    });
  } else {
    // Validate email
    if (
      !data.personalInfo.contact.email ||
      !data.personalInfo.contact.email.trim()
    ) {
      errors.push({
        field: "personalInfo.contact.email",
        message: "Email is required",
      });
    } else if (!isValidEmail(data.personalInfo.contact.email)) {
      errors.push({
        field: "personalInfo.contact.email",
        message: "Email format is invalid",
      });
    }

    // Validate phone (if provided, must be non-empty)
    if (
      data.personalInfo.contact.phone !== undefined &&
      !data.personalInfo.contact.phone.trim()
    ) {
      errors.push({
        field: "personalInfo.contact.phone",
        message: "Phone number cannot be empty if provided",
      });
    }
  }

  // Validate education array exists and has at least one entry
  if (!data.education || !Array.isArray(data.education)) {
    errors.push({
      field: "education",
      message: "Education array is required",
    });
  } else if (data.education.length === 0) {
    errors.push({
      field: "education",
      message: "At least one education entry is required",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates email format using a standard regex pattern
 * @param email - Email address to validate
 * @returns true if email format is valid
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
