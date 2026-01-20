# Migration Guide

This guide helps existing users migrate to the enhanced resume generator with extended configuration options.

## Backward Compatibility

**Good News**: The enhanced system is **100% backward compatible** with existing code. All old configurations continue to work without any changes.

```typescript
// Old code - still works perfectly
const oldConfig = {
  template: "professional",
  colors: {
    primary: "002ad2",
    secondary: "666666",
  },
  spacing: {
    xs: 100,
    sm: 200,
    md: 300,
    lg: 400,
    xl: 600,
  },
};

await generateResume(resumeData, oldConfig);
```

## What's New

The enhanced system adds **optional** extended configuration properties:

1. **Section Titles** - Customize section headers (i18n support)
2. **Formatting Options** - Custom bullets, separators
3. **Table Configuration** - Adjustable column widths
4. **Page Controls** - Page numbers and headers
5. **Date Formatting** - Locale-aware date formatting
6. **Document Language** - Language attribute
7. **Accessibility** - Contrast validation warnings

## Migration Scenarios

### Scenario 1: No Changes Needed

If you're happy with the current output, **do nothing**. Your existing code will continue to work exactly as before.

```typescript
// This still works - no migration needed
await generateResume({
  personalInfo,
  education,
  projects,
  skills,
});
```

### Scenario 2: Adding Internationalization

If you want to support multiple languages, add section titles:

**Before**:

```typescript
await generateResume(resumeData, {
  template: "professional",
  colors: {
    primary: "002ad2",
  },
});
```

**After**:

```typescript
await generateResume(resumeData, {
  template: "professional",
  colors: {
    primary: "002ad2",
  },
  // Add section titles for German
  section_titles: {
    education: "AUSBILDUNG",
    projects: "PROJEKTE",
    skills: "FÄHIGKEITEN",
    experience: "BERUFSERFAHRUNG",
    certifications: "ZERTIFIKATE",
    summary: "ZUSAMMENFASSUNG",
  },
  // Add German date formatting
  date_format: {
    locale: "de-DE",
    format_pattern: "MM.YYYY",
  },
  document_language: "de-DE",
});
```

### Scenario 3: Customizing Formatting

If you want to customize bullets, separators, or other formatting:

**Before**:

```typescript
await generateResume(resumeData, {
  colors: {
    primary: "0066cc",
  },
});
```

**After**:

```typescript
await generateResume(resumeData, {
  colors: {
    primary: "0066cc",
  },
  // Add custom formatting
  formatting: {
    bullet_character: "→", // Arrow bullets
    date_separator: " | ", // Pipe separator
    tag_separator: " • ", // Dot separator
  },
});
```

### Scenario 4: Adding Page Controls

If you want page numbers or headers:

**Before**:

```typescript
await generateResume(resumeData);
```

**After**:

```typescript
await generateResume(resumeData, {
  page_config: {
    enable_page_numbers: true,
    enable_page_header: true,
    page_number_format: "Page {PAGE} of {NUMPAGES}",
    page_header_text: "{name}",
  },
});
```

### Scenario 5: Adjusting Skills Table

If you want different column widths for the skills table:

**Before**:

```typescript
await generateResume(resumeData);
// Skills table uses default [25, 75] split
```

**After**:

```typescript
await generateResume(resumeData, {
  table_config: {
    skills_column_widths: [30, 70], // Wider category column
  },
});
```

## Breaking Changes

**None!** There are no breaking changes. All existing code continues to work.

## New Validation Warnings

The enhanced system includes accessibility validation that logs warnings (not errors) for low-contrast color combinations:

```
Warning: Low contrast ratio (3.2:1) for text on background.
WCAG AA requires at least 4.5:1 for normal text.
Consider adjusting colors for better accessibility.
```

These are **warnings only** and don't prevent document generation. They help you create more accessible resumes.

To fix contrast warnings:

1. Use darker text colors on light backgrounds
2. Use lighter text colors on dark backgrounds
3. Test your colors at https://webaim.org/resources/contrastchecker/

## Configuration Validation

The enhanced system validates configuration values and provides helpful error messages:

**Invalid Color Format**:

```typescript
// ❌ Wrong - includes # prefix
colors: {
  primary: "#002ad2";
}

// ✅ Correct - no # prefix
colors: {
  primary: "002ad2";
}
```

**Invalid Column Widths**:

```typescript
// ❌ Wrong - doesn't sum to 100
table_config: {
  skills_column_widths: [30, 60]; // Sum is 90
}

// ✅ Correct - sums to 100
table_config: {
  skills_column_widths: [30, 70]; // Sum is 100
}
```

**Invalid Margins**:

```typescript
// ❌ Wrong - outside valid range
margins: {
  top: 3.0; // Too large (max is 2.0)
}

// ✅ Correct - within range
margins: {
  top: 1.0; // Between 0.5 and 2.0
}
```

## Gradual Migration Strategy

You can adopt new features gradually:

### Phase 1: Keep Everything As-Is

- No changes needed
- Existing code works perfectly

### Phase 2: Add Section Titles

- Add `section_titles` to your config
- Test with your language/preferences

### Phase 3: Customize Formatting

- Add `formatting` options
- Adjust bullets and separators

### Phase 4: Enable Page Controls

- Add `page_config` if needed
- Test page numbers and headers

### Phase 5: Fine-Tune Everything

- Adjust `table_config`
- Customize `date_format`
- Review contrast warnings

## Testing Your Migration

After making changes, verify:

1. **Document generates successfully**

   ```typescript
   await generateResume(resumeData, newConfig);
   ```

2. **No validation errors**
   - Check console for error messages
   - Fix any configuration issues

3. **Warnings are addressed**
   - Review contrast warnings
   - Adjust colors if needed

4. **Output looks correct**
   - Open generated .docx file
   - Verify all sections appear
   - Check formatting matches expectations

## Common Migration Patterns

### Pattern 1: Multi-Language Support

Create language-specific configs:

```typescript
const configs = {
  en: {
    section_titles: {
      education: "EDUCATION",
      projects: "PROJECTS",
      // ...
    },
    date_format: {
      locale: "en-US",
      format_pattern: "MMM YYYY",
    },
  },
  de: {
    section_titles: {
      education: "AUSBILDUNG",
      projects: "PROJEKTE",
      // ...
    },
    date_format: {
      locale: "de-DE",
      format_pattern: "MM.YYYY",
    },
  },
};

// Use based on user preference
await generateResume(resumeData, configs[userLanguage]);
```

### Pattern 2: Theme with Extended Options

Extend existing themes:

```typescript
import { THEME_PRESETS } from "@/lib/resume-generator/configuration/theme-presets";

const customTheme = {
  ...THEME_PRESETS.modern,
  section_titles: {
    education: "EDUCATION & TRAINING",
    projects: "KEY PROJECTS",
    // ...
  },
  formatting: {
    bullet_character: "▸",
    date_separator: " – ",
    tag_separator: " • ",
  },
};

await generateResume(resumeData, customTheme);
```

### Pattern 3: User Preferences

Store user preferences and merge with defaults:

```typescript
// User preferences from settings
const userPrefs = {
  enable_page_numbers: true,
  preferred_language: "en-US",
  bullet_style: "→",
};

// Build config from preferences
const config = {
  page_config: {
    enable_page_numbers: userPrefs.enable_page_numbers,
  },
  formatting: {
    bullet_character: userPrefs.bullet_style,
  },
  date_format: {
    locale: userPrefs.preferred_language,
  },
};

await generateResume(resumeData, config);
```

## Getting Help

If you encounter issues during migration:

1. **Check the README** - Comprehensive configuration documentation
2. **Review ARCHITECTURE.md** - Technical details and extension points
3. **Look at tests** - 359+ tests showing usage examples
4. **Check error messages** - Validation errors include field names and expected formats

## Summary

- ✅ **No breaking changes** - All existing code works
- ✅ **Gradual adoption** - Add features when you need them
- ✅ **Backward compatible** - Old configs work perfectly
- ✅ **Well-tested** - 359+ tests ensure reliability
- ✅ **Helpful errors** - Clear validation messages
- ✅ **Accessibility** - Automatic contrast validation

The enhanced system is designed to be adopted at your own pace. Start with what you have, add features as needed, and enjoy the improved flexibility!
