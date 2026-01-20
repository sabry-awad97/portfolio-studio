/**
 * Options for date formatting
 */
export interface DateFormatOptions {
  locale?: string;
  formatPattern?: string;
}

/**
 * Special date strings that should not be parsed
 */
const SPECIAL_DATES = [
  "Present",
  "Current",
  "Now",
  "present",
  "current",
  "now",
];

/**
 * Parses common date formats into a Date object
 * Supports: YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY, YYYY-MM, MM/YYYY
 *
 * @param dateString - Date string to parse
 * @returns Date object or null if parsing fails
 */
export function parseDate(dateString: string): Date | null {
  // Check for special dates
  if (SPECIAL_DATES.includes(dateString)) {
    return null;
  }

  // Try ISO format (YYYY-MM-DD or YYYY-MM)
  const isoMatch = dateString.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1; // JS months are 0-indexed
    const day = isoMatch[3] ? parseInt(isoMatch[3], 10) : 1;
    return new Date(year, month, day);
  }

  // Try MM/DD/YYYY format
  const usMatch = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usMatch) {
    const month = parseInt(usMatch[1], 10);
    const day = parseInt(usMatch[2], 10);
    const year = parseInt(usMatch[3], 10);

    // Validate month and day ranges
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return null;
    }

    const date = new Date(year, month - 1, day);

    // Check if the date is valid (e.g., Feb 30 would be invalid)
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  }

  // Try DD/MM/YYYY format
  const euMatch = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (euMatch) {
    const day = parseInt(euMatch[1], 10);
    const month = parseInt(euMatch[2], 10) - 1;
    const year = parseInt(euMatch[3], 10);
    return new Date(year, month, day);
  }

  // Try MM/YYYY format
  const monthYearMatch = dateString.match(/^(\d{1,2})\/(\d{4})$/);
  if (monthYearMatch) {
    const month = parseInt(monthYearMatch[1], 10) - 1;
    const year = parseInt(monthYearMatch[2], 10);
    return new Date(year, month, 1);
  }

  // Try just year (YYYY)
  const yearMatch = dateString.match(/^(\d{4})$/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10);
    return new Date(year, 0, 1);
  }

  return null;
}

/**
 * Formats a Date object according to pattern and locale
 * Supports patterns: "MMM YYYY", "MM/YYYY", "YYYY-MM-DD", "DD/MM/YYYY"
 *
 * @param date - Date object to format
 * @param pattern - Format pattern
 * @param locale - Locale for formatting (e.g., 'en-US', 'de-DE')
 * @returns Formatted date string
 */
export function formatDateObject(
  date: Date,
  pattern: string,
  locale: string,
): string {
  try {
    // Handle "MMM YYYY" pattern (e.g., "Jan 2024")
    if (pattern === "MMM YYYY") {
      const formatter = new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "numeric",
      });
      return formatter.format(date);
    }

    // Handle "MMMM YYYY" pattern (e.g., "January 2024")
    if (pattern === "MMMM YYYY") {
      const formatter = new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      });
      return formatter.format(date);
    }

    // Handle "MM/YYYY" pattern
    if (pattern === "MM/YYYY") {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${year}`;
    }

    // Handle "YYYY-MM-DD" pattern
    if (pattern === "YYYY-MM-DD") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    // Handle "DD/MM/YYYY" pattern
    if (pattern === "DD/MM/YYYY") {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Handle "MM/DD/YYYY" pattern
    if (pattern === "MM/DD/YYYY") {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }

    // Default to "MMM YYYY" if pattern not recognized
    const formatter = new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
    });
    return formatter.format(date);
  } catch (error) {
    // Fallback if Intl.DateTimeFormat fails
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  }
}

/**
 * Formats a date string according to locale and pattern
 * Returns original string unchanged if parsing fails (graceful degradation)
 *
 * @param dateString - Date string to format
 * @param options - Formatting options (locale and pattern)
 * @returns Formatted date string or original string if parsing fails
 */
export function formatDate(
  dateString: string,
  options: DateFormatOptions = {},
): string {
  const { locale = "en-US", formatPattern = "MMM YYYY" } = options;

  // Return special dates unchanged
  if (SPECIAL_DATES.includes(dateString)) {
    return dateString;
  }

  // Try to parse the date
  const date = parseDate(dateString);

  // If parsing fails, return original string
  if (!date || isNaN(date.getTime())) {
    return dateString;
  }

  // Format the date
  return formatDateObject(date, formatPattern, locale);
}
