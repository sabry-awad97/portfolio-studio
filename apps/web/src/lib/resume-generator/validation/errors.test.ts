import { describe, it, expect } from "vitest";
import {
  ResumeGenerationError,
  ConfigurationError,
  TemplateError,
} from "./errors";

describe("Validation Errors", () => {
  describe("ResumeGenerationError", () => {
    it("should create error with message and validation errors", () => {
      const validationErrors = [
        { field: "personalInfo.name", message: "Name is required" },
        { field: "personalInfo.contact.email", message: "Email is required" },
      ];

      const error = new ResumeGenerationError(
        "Validation failed",
        validationErrors,
      );

      expect(error.message).toBe("Validation failed");
      expect(error.validationErrors).toEqual(validationErrors);
      expect(error.name).toBe("ResumeGenerationError");
    });

    it("should format validation errors in toString()", () => {
      const validationErrors = [
        { field: "personalInfo.name", message: "Name is required" },
        {
          field: "education",
          message: "At least one education entry is required",
        },
      ];

      const error = new ResumeGenerationError(
        "Validation failed",
        validationErrors,
      );
      const errorString = error.toString();

      expect(errorString).toContain("Validation failed");
      expect(errorString).toContain("personalInfo.name: Name is required");
      expect(errorString).toContain(
        "education: At least one education entry is required",
      );
    });

    it("should return just message when no validation errors", () => {
      const error = new ResumeGenerationError("Something went wrong", []);
      const errorString = error.toString();

      expect(errorString).toBe("Something went wrong");
    });
  });

  describe("ConfigurationError", () => {
    it("should create configuration error", () => {
      const error = new ConfigurationError("Invalid configuration");

      expect(error.message).toBe("Invalid configuration");
      expect(error.name).toBe("ConfigurationError");
    });
  });

  describe("TemplateError", () => {
    it("should create template error", () => {
      const error = new TemplateError("Template not found");

      expect(error.message).toBe("Template not found");
      expect(error.name).toBe("TemplateError");
    });
  });
});
