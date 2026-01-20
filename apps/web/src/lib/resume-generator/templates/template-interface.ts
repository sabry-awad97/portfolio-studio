import type { Document } from "docx";
import type { ResumeData } from "../types";
import type { ExtendedResumeConfig } from "../configuration/extended-config-types";
import type { TemplateType } from "../configuration/config-types";

/**
 * Template interface for different resume layouts
 */
export interface Template {
  name: TemplateType;
  buildDocument(data: ResumeData, config: ExtendedResumeConfig): Document;
}
