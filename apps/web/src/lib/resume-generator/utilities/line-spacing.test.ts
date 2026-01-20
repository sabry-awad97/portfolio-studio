import { describe, it, expect } from "vitest";
import { applyLineSpacing } from "./line-spacing";
import type { ResumeConfig } from "../configuration/config-types";
import { COLORS } from "../design-system/colors";
import { TYPOGRAPHY } from "../design-system/typography";
import { SPACING } from "../design-system/spacing";

const mockConfig: ResumeConfig = {
  colors: COLORS.professional,
  typography: {
    sizes: TYPOGRAPHY.sizes,
    fonts: TYPOGRAPHY.fonts,
    lineSpacing: TYPOGRAPHY.lineSpacing,
  },
  spacing: SPACING,
  margins: {
    top: 0.5,
    right: 0.5,
    bottom: 0.5,
    left: 0.5,
  },
  template: "professional",
};

describe("applyLineSpacing", () => {
  it("should convert body line spacing ratio to docx value", () => {
    const result = applyLineSpacing("body", mockConfig);

    // Body line spacing is 1.5, so 1.5 * 240 = 360
    expect(result.line).toBe(360);
    expect(result.rule).toBe("auto");
  });

  it("should convert heading line spacing ratio to docx value", () => {
    const result = applyLineSpacing("heading", mockConfig);

    // Heading line spacing is 1.15, so 1.15 * 240 = 276
    expect(result.line).toBe(276);
    expect(result.rule).toBe("auto");
  });

  it("should convert title line spacing ratio to docx value", () => {
    const result = applyLineSpacing("title", mockConfig);

    // Title line spacing is 1.2, so 1.2 * 240 = 288
    expect(result.line).toBe(288);
    expect(result.rule).toBe("auto");
  });

  it("should handle custom line spacing ratios", () => {
    const customConfig: ResumeConfig = {
      ...mockConfig,
      typography: {
        ...mockConfig.typography,
        lineSpacing: {
          body: 2.0,
          heading: 1.0,
          title: 1.8,
        },
      },
    };

    expect(applyLineSpacing("body", customConfig).line).toBe(480); // 2.0 * 240
    expect(applyLineSpacing("heading", customConfig).line).toBe(240); // 1.0 * 240
    expect(applyLineSpacing("title", customConfig).line).toBe(432); // 1.8 * 240
  });

  it("should round line spacing values to nearest integer", () => {
    const customConfig: ResumeConfig = {
      ...mockConfig,
      typography: {
        ...mockConfig.typography,
        lineSpacing: {
          body: 1.33, // 1.33 * 240 = 319.2, should round to 319
          heading: 1.67, // 1.67 * 240 = 400.8, should round to 401
          title: 1.25, // 1.25 * 240 = 300
        },
      },
    };

    expect(applyLineSpacing("body", customConfig).line).toBe(319);
    expect(applyLineSpacing("heading", customConfig).line).toBe(401);
    expect(applyLineSpacing("title", customConfig).line).toBe(300);
  });
});
