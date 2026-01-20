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
  } else {
    // Validate each education entry
    data.education.forEach((edu, index) => {
      if (!edu.title || !edu.title.trim()) {
        errors.push({
          field: `education[${index}].title`,
          message: `Education entry ${index + 1} must have a title`,
        });
      }
      if (!edu.date || !edu.date.trim()) {
        errors.push({
          field: `education[${index}].date`,
          message: `Education entry ${index + 1} must have a date`,
        });
      }
      if (!edu.description || !edu.description.trim()) {
        errors.push({
          field: `education[${index}].description`,
          message: `Education entry ${index + 1} must have a description`,
        });
      }
    });
  }

  // Validate projects array structure (if provided)
  if (data.projects && Array.isArray(data.projects)) {
    data.projects.forEach((project, index) => {
      if (!project.title || !project.title.trim()) {
        errors.push({
          field: `projects[${index}].title`,
          message: `Project entry ${index + 1} must have a title`,
        });
      }
      if (!project.description || !project.description.trim()) {
        errors.push({
          field: `projects[${index}].description`,
          message: `Project entry ${index + 1} must have a description`,
        });
      }
    });
  }

  // Validate skills structure (if provided)
  if (data.skills) {
    if (
      !data.skills.languages &&
      !data.skills.frameworks &&
      !data.skills.tools
    ) {
      errors.push({
        field: "skills",
        message:
          "Skills must have at least one category (languages, frameworks, or tools)",
      });
    }
  }

  // Validate experience array structure (if provided)
  if (data.experience && Array.isArray(data.experience)) {
    data.experience.forEach((exp, index) => {
      if (!exp.company || !exp.company.trim()) {
        errors.push({
          field: `experience[${index}].company`,
          message: `Experience entry ${index + 1} must have a company name`,
        });
      }
      if (!exp.role || !exp.role.trim()) {
        errors.push({
          field: `experience[${index}].role`,
          message: `Experience entry ${index + 1} must have a role`,
        });
      }
      if (!exp.startDate || !exp.startDate.trim()) {
        errors.push({
          field: `experience[${index}].startDate`,
          message: `Experience entry ${index + 1} must have a start date`,
        });
      }
      if (
        !exp.responsibilities ||
        !Array.isArray(exp.responsibilities) ||
        exp.responsibilities.length === 0
      ) {
        errors.push({
          field: `experience[${index}].responsibilities`,
          message: `Experience entry ${index + 1} must have at least one responsibility`,
        });
      }
    });
  }

  // Validate certifications array structure (if provided)
  if (data.certifications && Array.isArray(data.certifications)) {
    data.certifications.forEach((cert, index) => {
      if (!cert.name || !cert.name.trim()) {
        errors.push({
          field: `certifications[${index}].name`,
          message: `Certification entry ${index + 1} must have a name`,
        });
      }
      if (!cert.issuer || !cert.issuer.trim()) {
        errors.push({
          field: `certifications[${index}].issuer`,
          message: `Certification entry ${index + 1} must have an issuer`,
        });
      }
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

/**
 * Sanitizes text for safe use in Word documents
 * Removes or replaces characters that could cause issues in docx
 * @param text - Text to sanitize
 * @returns Sanitized text safe for document use
 */
export function sanitizeText(text: string): string {
  if (!text) return "";

  return (
    text
      // Remove null bytes
      .replace(/\0/g, "")
      // Replace vertical tabs with spaces
      .replace(/\v/g, " ")
      // Replace form feeds with spaces
      .replace(/\f/g, " ")
      // Normalize line breaks to \n
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      // Remove control characters except tab and newline
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      // Trim excessive whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Sanitizes all text fields in resume data
 * @param data - Resume data to sanitize
 * @returns Sanitized resume data
 */
export function sanitizeResumeData(data: ResumeData): ResumeData {
  return {
    personalInfo: {
      name: sanitizeText(data.personalInfo.name),
      title: sanitizeText(data.personalInfo.title),
      subtitle: sanitizeText(data.personalInfo.subtitle),
      bio: sanitizeText(data.personalInfo.bio),
      contact: {
        email: sanitizeText(data.personalInfo.contact.email),
        phone: data.personalInfo.contact.phone
          ? sanitizeText(data.personalInfo.contact.phone)
          : "",
        linkedin: data.personalInfo.contact.linkedin
          ? sanitizeText(data.personalInfo.contact.linkedin)
          : "",
        github: data.personalInfo.contact.github
          ? sanitizeText(data.personalInfo.contact.github)
          : "",
        twitter: data.personalInfo.contact.twitter
          ? sanitizeText(data.personalInfo.contact.twitter)
          : undefined,
      },
    },
    education: data.education.map((edu) => ({
      ...edu,
      title: sanitizeText(edu.title),
      date: sanitizeText(edu.date),
      description: sanitizeText(edu.description),
    })),
    projects: data.projects?.map((project) => ({
      ...project,
      title: sanitizeText(project.title),
      date: sanitizeText(project.date),
      description: sanitizeText(project.description),
      tags: project.tags?.map(sanitizeText),
    })),
    skills: {
      languages: data.skills.languages?.map((skill) => ({
        ...skill,
        name: sanitizeText(skill.name),
      })),
      frameworks: data.skills.frameworks?.map((skill) => ({
        ...skill,
        name: sanitizeText(skill.name),
      })),
      tools: data.skills.tools?.map((skill) => ({
        ...skill,
        name: sanitizeText(skill.name),
      })),
    },
    experience: data.experience?.map((exp) => ({
      ...exp,
      company: sanitizeText(exp.company),
      role: sanitizeText(exp.role),
      startDate: sanitizeText(exp.startDate),
      endDate: sanitizeText(exp.endDate),
      responsibilities: exp.responsibilities.map(sanitizeText),
    })),
    certifications: data.certifications?.map((cert) => ({
      ...cert,
      name: sanitizeText(cert.name),
      issuer: sanitizeText(cert.issuer),
      date: sanitizeText(cert.date),
    })),
  };
}
