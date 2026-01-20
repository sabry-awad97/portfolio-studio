# Resume Generator

A modular, testable system for creating ATS-friendly Word documents from structured data with extensive customization options.

## Features

- ✅ **ATS-Friendly**: Generates clean, parseable Word documents
- ✅ **Type-Safe**: Full TypeScript support with strict typing
- ✅ **Customizable**: Extensive configuration options for colors, spacing, typography, and more
- ✅ **Internationalization**: Configurable section titles and date formats
- ✅ **Accessible**: WCAG AA contrast validation with warnings
- ✅ **Testable**: 359+ tests with 100% coverage of critical paths
- ✅ **Multiple Templates**: Professional and Modern layouts included

## Quick Start

```typescript
import { generateResume } from "@/lib/resume-generator";
import { personalInfo, education, projects, skills } from "@/lib/data";

// Generate with defaults
await generateResume({
  personalInfo,
  education,
  projects,
  skills,
});

// Generate with custom config
await generateResume(
  {
    personalInfo,
    education,
    projects,
    skills,
  },
  {
    template: "modern",
    colors: {
      primary: "0066cc",
    },
    section_titles: {
      education: "EDUCATION & TRAINING",
      projects: "KEY PROJECTS",
    },
  },
);
```

## Configuration Options

### Base Configuration

#### Template Selection

```typescript
{
  template: "professional" | "modern"; // Default: 'professional'
}
```

#### Colors

All colors are 6-character hex strings without the `#` prefix.

```typescript
{
  colors: {
    primary: '002ad2',      // Main accent color
    secondary: '666666',    // Secondary text color
    accent: 'ff6b6b',       // Highlight color
    text: '333333',         // Body text color
    background: 'ffffff'    // Background color
  }
}
```

**Accessibility Note**: The system validates color contrast ratios and logs warnings if they don't meet WCAG AA standards (4.5:1 for normal text).

#### Typography

Font sizes are in half-points (e.g., 22 = 11pt).

```typescript
{
  typography: {
    sizes: {
      title: 32,          // Name/title size
      heading1: 24,       // Section headers
      heading2: 22,       // Entry titles
      body: 20,           // Body text
      small: 18           // Small text
    },
    fonts: {
      primary: 'Calibri',   // Main font
      secondary: 'Arial'    // Fallback font
    },
    lineSpacing: {
      body: 1.15,         // Body text line spacing
      heading: 1.0,       // Heading line spacing
      title: 1.0          // Title line spacing
    }
  }
}
```

#### Spacing

Spacing values are in twips (1/20th of a point, 1440 twips = 1 inch).

```typescript
{
  spacing: {
    xs: 100,    // Extra small (0.07 inches)
    sm: 200,    // Small (0.14 inches)
    md: 300,    // Medium (0.21 inches)
    lg: 400,    // Large (0.28 inches)
    xl: 600     // Extra large (0.42 inches)
  }
}
```

#### Margins

Margins are in inches.

```typescript
{
  margins: {
    top: 0.75,
    right: 0.75,
    bottom: 0.75,
    left: 0.75
  }
}
```

### Extended Configuration

#### Section Titles (i18n Support)

Customize section headers for different languages or preferences.

```typescript
{
  section_titles: {
    education: 'EDUCATION',
    projects: 'PROJECTS',
    skills: 'TECHNICAL SKILLS',
    experience: 'WORK EXPERIENCE',
    certifications: 'CERTIFICATIONS',
    summary: 'PROFESSIONAL SUMMARY'
  }
}
```

**Example - German**:

```typescript
{
  section_titles: {
    education: 'AUSBILDUNG',
    projects: 'PROJEKTE',
    skills: 'FÄHIGKEITEN',
    experience: 'BERUFSERFAHRUNG',
    certifications: 'ZERTIFIKATE',
    summary: 'ZUSAMMENFASSUNG'
  }
}
```

#### Formatting Options

```typescript
{
  formatting: {
    bullet_character: '•',    // Bullet point character
    date_separator: ' - ',    // Separator between start and end dates
    tag_separator: ', '       // Separator for technology tags
  }
}
```

**Examples**:

```typescript
// Arrow bullets
{
  bullet_character: "→";
}

// Pipe separator for dates
{
  date_separator: " | ";
}

// Dot separator for tags
{
  tag_separator: " • ";
}
```

#### Table Configuration

```typescript
{
  table_config: {
    skills_column_widths: [25, 75]; // Percentages, must sum to 100
  }
}
```

**Examples**:

```typescript
// Wider category column
{
  skills_column_widths: [30, 70];
}

// Narrower category column
{
  skills_column_widths: [20, 80];
}
```

#### Page Controls

```typescript
{
  page_config: {
    enable_page_numbers: false,           // Show page numbers
    enable_page_header: false,            // Show header on pages 2+
    page_number_format: 'Page {PAGE}',    // Page number format
    page_header_text: '{name}'            // Header text (supports {name})
  }
}
```

**Examples**:

```typescript
// Enable page numbers
{
  page_config: {
    enable_page_numbers: true,
    page_number_format: 'Page {PAGE} of {NUMPAGES}'
  }
}

// Enable header with name on subsequent pages
{
  page_config: {
    enable_page_header: true,
    page_header_text: '{name} - Resume'
  }
}
```

#### Date Formatting

```typescript
{
  date_format: {
    locale: 'en-US',              // Locale for date formatting
    format_pattern: 'MMM YYYY'    // Date format pattern
  }
}
```

**Supported Locales**: Any valid BCP 47 language tag (e.g., `en-US`, `de-DE`, `fr-FR`, `es-ES`, `ja-JP`)

**Format Patterns**:

- `MMM YYYY` → "Jan 2023"
- `MM/YYYY` → "01/2023"
- `MMMM YYYY` → "January 2023"
- `MM.YYYY` → "01.2023" (German style)

**Examples**:

```typescript
// German format
{
  date_format: {
    locale: 'de-DE',
    format_pattern: 'MM.YYYY'
  }
}

// French format
{
  date_format: {
    locale: 'fr-FR',
    format_pattern: 'MMMM YYYY'
  }
}
```

#### Document Language

```typescript
{
  document_language: "en-US"; // Document language attribute
}
```

**Note**: The underlying docx library doesn't currently support setting the document language attribute directly, but this configuration is in place for future compatibility.

## Complete Configuration Example

```typescript
const customConfig = {
  // Base configuration
  template: "professional",
  colors: {
    primary: "0066cc",
    secondary: "555555",
    accent: "ff6b6b",
    text: "333333",
    background: "ffffff",
  },
  typography: {
    sizes: {
      title: 36,
      heading1: 26,
      heading2: 22,
      body: 20,
      small: 18,
    },
    fonts: {
      primary: "Calibri",
      secondary: "Arial",
    },
    lineSpacing: {
      body: 1.2,
      heading: 1.0,
      title: 1.0,
    },
  },
  spacing: {
    xs: 100,
    sm: 200,
    md: 300,
    lg: 400,
    xl: 600,
  },
  margins: {
    top: 1.0,
    right: 1.0,
    bottom: 1.0,
    left: 1.0,
  },

  // Extended configuration
  section_titles: {
    education: "EDUCATION & TRAINING",
    projects: "KEY PROJECTS",
    skills: "TECHNICAL SKILLS",
    experience: "PROFESSIONAL EXPERIENCE",
    certifications: "CERTIFICATIONS & AWARDS",
    summary: "EXECUTIVE SUMMARY",
  },
  formatting: {
    bullet_character: "▸",
    date_separator: " – ",
    tag_separator: " • ",
  },
  table_config: {
    skills_column_widths: [30, 70],
  },
  page_config: {
    enable_page_numbers: true,
    enable_page_header: true,
    page_number_format: "Page {PAGE} of {NUMPAGES}",
    page_header_text: "{name}",
  },
  date_format: {
    locale: "en-US",
    format_pattern: "MMM YYYY",
  },
  document_language: "en-US",
};

await generateResume(resumeData, customConfig);
```

## Theme Presets

Pre-configured themes are available for quick customization:

```typescript
import { THEME_PRESETS } from "@/lib/resume-generator/configuration/theme-presets";

// Use a preset theme
await generateResume(resumeData, THEME_PRESETS.modern);

// Customize a preset
await generateResume(resumeData, {
  ...THEME_PRESETS.minimal,
  section_titles: {
    education: "EDUCATION",
    // ... other custom titles
  },
});
```

**Available Presets**:

- `professional` - Traditional, conservative styling
- `modern` - Contemporary, clean design
- `minimal` - Simplified, minimalist approach

## Data Structure

### Required Fields

```typescript
interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  projects: Project[];
  skills: Skills;
  experience?: Experience[]; // Optional
  certifications?: Certification[]; // Optional
}
```

### PersonalInfo

```typescript
interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
}
```

### Education

```typescript
interface Education {
  id: number;
  date: string;
  title: string;
  description: string;
}
```

### Project

```typescript
interface Project {
  id: number;
  date: string;
  title: string;
  description: string;
  tags: string[];
}
```

### Skills

```typescript
interface Skills {
  languages: Array<{ name: string }>;
  frameworks: Array<{ name: string }>;
  tools: Array<{ name: string }>;
}
```

### Experience (Optional)

```typescript
interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}
```

### Certification (Optional)

```typescript
interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
}
```

## Common Customization Scenarios

### Multilingual Resume

```typescript
// German resume
const germanConfig = {
  section_titles: {
    education: "AUSBILDUNG",
    projects: "PROJEKTE",
    skills: "FÄHIGKEITEN",
    experience: "BERUFSERFAHRUNG",
    certifications: "ZERTIFIKATE",
    summary: "ZUSAMMENFASSUNG",
  },
  date_format: {
    locale: "de-DE",
    format_pattern: "MM.YYYY",
  },
  document_language: "de-DE",
};
```

### Academic Resume

```typescript
const academicConfig = {
  section_titles: {
    education: "EDUCATION",
    projects: "RESEARCH PROJECTS",
    skills: "TECHNICAL COMPETENCIES",
    experience: "TEACHING & RESEARCH EXPERIENCE",
    certifications: "PUBLICATIONS & AWARDS",
    summary: "RESEARCH INTERESTS",
  },
  page_config: {
    enable_page_numbers: true,
    enable_page_header: true,
  },
};
```

### Creative Resume

```typescript
const creativeConfig = {
  colors: {
    primary: "6c5ce7",
    secondary: "636e72",
    accent: "fd79a8",
    text: "2d3436",
    background: "ffffff",
  },
  formatting: {
    bullet_character: "→",
    date_separator: " | ",
    tag_separator: " • ",
  },
  typography: {
    sizes: {
      title: 40,
      heading1: 28,
      heading2: 24,
      body: 20,
      small: 18,
    },
  },
};
```

## Validation and Error Handling

The system performs comprehensive validation:

### Data Validation

- Required fields presence
- Email format validation
- Array structure validation
- Text sanitization

### Configuration Validation

- Color format validation (6-character hex)
- Spacing value validation (positive numbers)
- Column width validation (must sum to 100)
- Margin range validation (0.5 to 2 inches)
- Contrast ratio validation (WCAG AA compliance)

### Error Messages

All validation errors include:

- Field name that caused the error
- Expected format
- Actual value received

Example:

```
ConfigurationError: Invalid color format in field 'colors.primary': '#002ad2'
Expected: 6-character hex string without # (e.g., '002ad2')
```

## Accessibility

The system includes built-in accessibility features:

### Contrast Validation

- Automatically checks color contrast ratios
- Logs warnings for combinations below WCAG AA standards (4.5:1)
- Includes actual contrast ratio in warning message

### ATS Compatibility

- No images or icons (parseable by ATS systems)
- Clean document structure
- Semantic heading hierarchy
- Plain text formatting

## Performance

- **Generation Time**: 100-200ms for typical resume
- **File Size**: 15-25KB for standard resume
- **Client-Side**: No server required, runs entirely in browser

## Testing

The system includes 359+ tests covering:

- Unit tests for all builders and utilities
- Property-based tests for universal correctness
- Integration tests for end-to-end scenarios
- Backward compatibility tests

Run tests:

```bash
npm test
```

## Architecture

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Migration from Old Config Format

The system maintains backward compatibility with the old configuration format:

```typescript
// Old format (still works)
const oldConfig = {
  template: "professional",
  colors: {
    primary: "002ad2",
    secondary: "666666",
  },
};

// New format (with extended options)
const newConfig = {
  ...oldConfig,
  section_titles: {
    education: "EDUCATION",
  },
  formatting: {
    bullet_character: "•",
  },
};
```

All missing properties are automatically filled with sensible defaults.

## Contributing

See [ARCHITECTURE.md](./ARCHITECTURE.md) for contribution guidelines and extension points.

## License

Part of the portfolio project. See root LICENSE file.
