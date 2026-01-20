import { TextRun, ExternalHyperlink } from "docx";
import type { ResumeConfig } from "../configuration/config-types";

/**
 * Options for creating a styled TextRun
 */
export interface TextRunOptions {
  text: string;
  size?: number;
  color?: string;
  font?: string;
  bold?: boolean;
  italics?: boolean;
}

/**
 * Options for creating a hyperlink TextRun
 */
export interface HyperlinkOptions extends TextRunOptions {
  url: string;
  style?: string;
}

/**
 * Creates a styled TextRun with common properties
 * Applies default font and size from config if not specified
 *
 * @param options - TextRun styling options
 * @param config - Resume configuration for defaults
 * @returns Configured TextRun instance
 */
export function createTextRun(
  options: TextRunOptions,
  config: ResumeConfig,
): TextRun {
  return new TextRun({
    text: options.text,
    size: options.size,
    color: options.color,
    font: options.font ?? config.typography.fonts.primary,
    bold: options.bold,
    italics: options.italics,
  });
}

/**
 * Creates a hyperlink TextRun with proper styling
 * Automatically adds "https://" prefix if URL doesn't start with "http"
 *
 * @param options - Hyperlink styling options including URL
 * @param config - Resume configuration for defaults
 * @returns Configured ExternalHyperlink instance
 */
export function createHyperlink(
  options: HyperlinkOptions,
  config: ResumeConfig,
): ExternalHyperlink {
  // Add https:// prefix if not present
  let url = options.url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  return new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({
        text: options.text,
        size: options.size,
        color: options.color,
        font: options.font ?? config.typography.fonts.primary,
        bold: options.bold,
        italics: options.italics,
        style: options.style,
      }),
    ],
  });
}

/**
 * Creates a bullet-separated text string from an array of items
 *
 * @param items - Array of strings to join
 * @param separator - Separator to use between items (default: " • ")
 * @returns Joined string with separators
 */
export function createBulletText(
  items: string[],
  separator: string = " • ",
): string {
  return items.join(separator);
}

/**
 * Creates a title-date combination with separator
 * Returns the formatted text with the separator between title and date
 *
 * @param title - The title text
 * @param date - The date text
 * @param separator - Separator to use between title and date (default: "  •  ")
 * @returns Formatted string with title, separator, and date
 */
export function createTitleDateText(
  title: string,
  date: string,
  separator: string = "  •  ",
): string {
  return `${title}${separator}${date}`;
}
