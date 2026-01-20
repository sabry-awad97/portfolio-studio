# Resume Generator Architecture

## Overview

The resume generator is a modular, testable system for creating ATS-friendly Word documents from structured data. It follows a clean architecture with separation of concerns and dependency injection.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Public API (index.ts)                    │
│                    generateResume()                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Generator (generator.ts)                    │
│  1. Validate → 2. Sanitize → 3. Configure → 4. Build        │
└──┬────────────┬────────────┬────────────┬───────────────────┘
   │            │            │            │
   ▼            ▼            ▼            ▼
┌──────┐  ┌──────────┐  ┌────────┐  ┌──────────┐
│Valida│  │Sanitize  │  │Config  │  │Templates │
│tion  │  │Text      │  │Loader  │  │          │
└──────┘  └──────────┘  └────────┘  └─────┬────┘
                                           │
                        ┌──────────────────┼──────────────────┐
                        ▼                  ▼                  ▼
                   ┌─────────┐      ┌──────────┐      ┌──────────┐
                   │Professional│    │  Modern  │      │  Custom  │
                   │ Template   │    │ Template │      │ Template │
                   └─────┬──────┘    └────┬─────┘      └────┬─────┘
                         │                │                  │
                         └────────────────┼──────────────────┘
                                          │
                         ┌────────────────┴────────────────┐
                         ▼                                 ▼
                   ┌──────────┐                     ┌──────────┐
                   │ Builders │                     │  Design  │
                   │          │                     │  System  │
                   └──────────┘                     └──────────┘
```

## Module Structure

### 1. Core Modules

#### `types.ts`

- Defines all TypeScript interfaces
- `ResumeData`, `PersonalInfo`, `Education`, `Project`, `Skills`, etc.
- `ValidationResult`, `ValidationError`

#### `generator.ts`

- Main orchestrator
- Coordinates validation, sanitization, configuration, and document building
- Error handling and file saving

### 2. Design System

#### `design-system/colors.ts`

- Color palette with semantic names
- `COLORS` constant with primary, secondary, accent, text, background

#### `design-system/typography.ts`

- Font sizes (in half-points: 22 = 11pt)
- Font families (primary: Calibri, secondary: Arial)
- Line spacing configuration

#### `design-system/spacing.ts`

- Semantic spacing scale in twips
- xs (100), sm (200), md (300), lg (400), xl (600)

### 3. Configuration

#### `configuration/config-types.ts`

- Configuration interfaces
- `ResumeConfig`, `TypographyConfig`, `SpacingConfig`, `MarginsConfig`

#### `configuration/default-config.ts`

- Default configuration using design system constants
- Professional theme as default

#### `configuration/theme-presets.ts`

- Pre-built themes: professional, modern, minimal
- Easy to add new themes

#### `configuration/config-loader.ts`

- Merges custom config with defaults
- Validates configuration values

### 4. Validation

#### `validation/validator.ts`

- `validateResumeData()` - Validates all required fields and structures
- `sanitizeText()` - Removes unsafe characters
- `sanitizeResumeData()` - Sanitizes all text fields

#### `validation/errors.ts`

- Custom error classes
- `ResumeGenerationError`, `ConfigurationError`, `TemplateError`

### 5. Builders

Each builder is a pure function that accepts data and config, returns docx elements:

- `header-builder.ts` - Name, title, contact info with hyperlinks
- `summary-builder.ts` - Professional summary/bio
- `education-builder.ts` - Education entries
- `projects-builder.ts` - Project entries with technologies
- `skills-builder.ts` - Skills table with categories
- `experience-builder.ts` - Work experience with bullet points
- `certifications-builder.ts` - Certifications
- `section-header-builder.ts` - Reusable section headers

**Builder Pattern**:

```typescript
export function buildSection(
  data: SectionData,
  config: ResumeConfig,
): Paragraph[] {
  // Build and return paragraphs
}
```

### 6. Templates

#### `template-interface.ts`

- `Template` interface with `buildDocument()` method

#### `professional-template.ts`

- Traditional section order
- Education → Experience → Projects → Skills

#### `modern-template.ts`

- Alternative section order
- Skills → Experience → Projects → Education

## Extension Points

### ✅ Easy to Extend

#### 1. Adding New Templates

```typescript
// templates/creative-template.ts
import { Template } from "./template-interface";

export class CreativeTemplate implements Template {
  name: TemplateType = "creative";

  buildDocument(data: ResumeData, config: ResumeConfig): Document {
    // Custom layout logic
    return new Document({
      /* ... */
    });
  }
}

// Update generator.ts
export function getTemplate(templateType: TemplateType): Template {
  switch (templateType) {
    case "creative":
      return new CreativeTemplate();
    // ...
  }
}
```

#### 2. Adding New Sections

```typescript
// builders/awards-builder.ts
export function buildAwards(
  awards: Award[],
  config: ResumeConfig,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  paragraphs.push(buildSectionHeader("AWARDS", config));

  for (const award of awards) {
    // Build award entries
  }

  return paragraphs;
}

// Use in template
if (data.awards && data.awards.length > 0) {
  children.push(...buildAwards(data.awards, config));
}
```

#### 3. Customizing Themes

```typescript
// Create custom theme
const customTheme: ResumeConfig = {
  ...DEFAULT_CONFIG,
  colors: {
    primary: "ff6b6b",
    secondary: "4ecdc4",
    accent: "f7fff7",
    text: "2d3436",
    background: "ffffff",
  },
  typography: {
    ...DEFAULT_CONFIG.typography,
    sizes: {
      title: 40,
      heading1: 32,
      // ...
    },
  },
};

// Use custom theme
await generateResume(data, customTheme);
```

#### 4. Modifying Builders

All builders use dependency injection, making them easy to test and modify:

```typescript
// Custom header with different layout
export function buildCustomHeader(
  personalInfo: PersonalInfo,
  config: ResumeConfig,
): Paragraph[] {
  // Your custom implementation
}
```

### ⚠️ Current Limitations

#### 1. No Multi-Column Support

**Limitation**: docx library doesn't easily support multi-column layouts within sections.

**Workaround**: Use tables to simulate columns

```typescript
// Example: Two-column layout using table
new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: {
    /* no borders */
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          /* left column */
        }),
        new TableCell({
          /* right column */
        }),
      ],
    }),
  ],
});
```

**Future**: Could be added with custom table-based layouts

#### 2. No Conditional Formatting

**Limitation**: Can't dynamically style based on data values.

**Workaround**: Use template logic

```typescript
// In builder
const color = project.featured ? config.colors.primary : config.colors.text;
```

**Future**: Add formatting rules to config

```typescript
interface FormattingRules {
  highlightFeatured?: boolean;
  emphasizeRecent?: boolean;
}
```

#### 3. Hardcoded Section Titles

**Limitation**: Section titles like "EDUCATION", "PROJECTS" are hardcoded in English.

**Current State**:

```typescript
paragraphs.push(buildSectionHeader("EDUCATION", config));
```

**Recommended Solution**: Add i18n support

```typescript
// config-types.ts
interface SectionTitles {
  education: string;
  experience: string;
  projects: string;
  skills: string;
  certifications: string;
  summary: string;
}

interface ResumeConfig {
  // ... existing fields
  sectionTitles?: SectionTitles;
}

// default-config.ts
const DEFAULT_SECTION_TITLES: SectionTitles = {
  education: "EDUCATION",
  experience: "WORK EXPERIENCE",
  projects: "PROJECTS",
  skills: "TECHNICAL SKILLS",
  certifications: "CERTIFICATIONS",
  summary: "PROFESSIONAL SUMMARY",
};

// Usage in builders
paragraphs.push(
  buildSectionHeader(config.sectionTitles?.education || "EDUCATION", config),
);
```

#### 4. No Icon/Image Support

**Limitation**: Skill icons from data are intentionally ignored for ATS compatibility.

**Reason**:

- ATS systems can't parse images
- Icons add visual noise
- File size increases
- Accessibility concerns

**Alternative**: Use text-based indicators

```typescript
// Instead of icons, use text prefixes
const skillText = skill.level ? `${skill.name} (${skill.level})` : skill.name;
```

**Future**: Could add optional icon support for non-ATS versions

```typescript
interface ResumeConfig {
  includeIcons?: boolean; // Default: false for ATS
}
```

## Best Practices

### 1. Builder Functions

- Keep builders pure (no side effects)
- Accept config as parameter (dependency injection)
- Return arrays of Paragraph or Table elements
- Use design system constants, not magic numbers

### 2. Configuration

- Use semantic names (primary, secondary, not color1, color2)
- Provide sensible defaults
- Validate configuration values
- Document units (twips, half-points, inches)

### 3. Validation

- Validate early (before building)
- Provide specific error messages
- Sanitize all text input
- Check array structures

### 4. Testing

- Test builders in isolation
- Use property-based tests for universal properties
- Mock file-saver in tests
- Aim for >80% code coverage

### 5. Error Handling

- Use custom error classes
- Wrap unexpected errors with context
- Provide actionable error messages
- Don't swallow errors

## Performance Considerations

### Document Generation

- Typical generation time: 100-200ms
- File size: 15-25KB for standard resume
- No server required (client-side only)

### Optimization Tips

1. Minimize paragraph count (combine when possible)
2. Reuse TextRun styles
3. Avoid nested tables
4. Use percentage widths for tables
5. Keep images out (ATS compatibility)

## Testing Strategy

### Unit Tests

- Test each builder independently
- Test validation logic
- Test configuration merging
- Test error handling

### Property-Based Tests

- Test with random valid data
- Test determinism (same input → same output)
- Test validation catches invalid data
- Test configuration serialization

### Integration Tests

- Test end-to-end generation
- Test with actual data.ts
- Test both templates
- Test error scenarios

## Future Enhancements

### High Priority

1. ✅ Add section title configuration (i18n support)
2. Add multi-column layout support
3. Add conditional formatting rules
4. Add more template options

### Medium Priority

1. PDF export option
2. Custom section ordering
3. Dynamic section visibility
4. Profile photo support (optional)

### Low Priority

1. Icon support (non-ATS mode)
2. Custom fonts
3. Watermarks
4. Headers/footers

## Migration Guide

### From Monolithic to Modular

**Old API** (removed):

```typescript
import { generateResume } from "@/lib/resume-generator";
await generateResume(); // Used data.ts automatically
```

**New API** (current):

```typescript
import { generateResume } from "@/lib/resume-generator/index";
import { personalInfo, education, projects, skills } from "@/lib/data";

await generateResume({
  personalInfo,
  education,
  projects,
  skills,
});
```

### Benefits of New API

- Explicit data passing (no hidden dependencies)
- Type-safe (TypeScript validates structure)
- Testable (can pass mock data)
- Flexible (can use any data source)
- Configurable (can override any setting)

## Contributing

### Adding a New Feature

1. **Define types** in `types.ts`
2. **Create builder** in `builders/`
3. **Add tests** for the builder
4. **Update templates** to use the builder
5. **Update validation** if needed
6. **Document** in this file

### Code Style

- Use TypeScript strict mode
- Follow existing naming conventions
- Add JSDoc comments to public functions
- Keep functions small and focused
- Use semantic constants, not magic numbers

## Resources

- [docx library documentation](https://docx.js.org/)
- [ATS best practices](https://www.jobscan.co/blog/ats-resume/)
- [Word document structure](https://docs.microsoft.com/en-us/office/open-xml/word-processing)
- [Accessibility guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## License

Part of the portfolio project. See root LICENSE file.
