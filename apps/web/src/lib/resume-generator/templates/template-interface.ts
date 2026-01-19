import type { Document } from "docx";
import type { ResumeData } from "../types";
import type { ResumeConfig, TemplateType } from "../configuration/config-types";

/**
 * Template interface for different resume layouts
 */
export interface Template {
  name: TemplateType;
  buildDocument(data: ResumeData, config: ResumeConfig): Document;
}
