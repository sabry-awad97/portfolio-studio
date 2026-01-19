import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign,
  ShadingType,
  convertInchesToTwip,
} from "docx";
import { saveAs } from "file-saver";
import { personalInfo, education, projects, skills } from "./data";

// Color scheme matching your portfolio
const COLORS = {
  primary: "002ad2", // Your primary blue
  secondary: "4a5568", // Gray for secondary text
  accent: "e2e8f0", // Light gray for backgrounds
  text: "1a202c", // Dark text
};

export async function generateResume() {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.75),
              right: convertInchesToTwip(0.75),
              bottom: convertInchesToTwip(0.75),
              left: convertInchesToTwip(0.75),
            },
          },
        },
        children: [
          // Header - Name and Title
          new Paragraph({
            text: personalInfo.name,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            style: "Heading1",
            children: [
              new TextRun({
                text: personalInfo.name,
                bold: true,
                size: 36,
                color: COLORS.primary,
                font: "Calibri",
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `${personalInfo.title} | ${personalInfo.subtitle}`,
                size: 24,
                color: COLORS.secondary,
                font: "Calibri",
              }),
            ],
          }),

          // Contact Information
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "📧 ",
                size: 20,
              }),
              new TextRun({
                text: personalInfo.contact.email,
                size: 20,
                color: COLORS.text,
              }),
              new TextRun({
                text: "  |  📱 ",
                size: 20,
              }),
              new TextRun({
                text: personalInfo.contact.phone,
                size: 20,
                color: COLORS.text,
              }),
              new TextRun({
                text: "  |  💼 ",
                size: 20,
              }),
              new TextRun({
                text: personalInfo.contact.linkedin,
                size: 20,
                color: COLORS.primary,
                underline: {
                  type: UnderlineType.SINGLE,
                },
              }),
            ],
          }),

          // Professional Summary
          new Paragraph({
            text: "PROFESSIONAL SUMMARY",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
            border: {
              bottom: {
                color: COLORS.primary,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 20,
              },
            },
            children: [
              new TextRun({
                text: "PROFESSIONAL SUMMARY",
                bold: true,
                size: 28,
                color: COLORS.primary,
                font: "Calibri",
              }),
            ],
          }),

          new Paragraph({
            text: personalInfo.bio,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: personalInfo.bio,
                size: 22,
                color: COLORS.text,
                font: "Calibri",
              }),
            ],
          }),

          // Education Section
          new Paragraph({
            text: "EDUCATION",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
            border: {
              bottom: {
                color: COLORS.primary,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 20,
              },
            },
            children: [
              new TextRun({
                text: "EDUCATION",
                bold: true,
                size: 28,
                color: COLORS.primary,
                font: "Calibri",
              }),
            ],
          }),

          ...education.flatMap((edu) => [
            new Paragraph({
              spacing: { before: 150, after: 100 },
              children: [
                new TextRun({
                  text: edu.title,
                  bold: true,
                  size: 24,
                  color: COLORS.text,
                  font: "Calibri",
                }),
                new TextRun({
                  text: `  •  ${edu.date}`,
                  size: 22,
                  color: COLORS.secondary,
                  italics: true,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              text: edu.description,
              spacing: { after: 150 },
              children: [
                new TextRun({
                  text: edu.description,
                  size: 22,
                  color: COLORS.text,
                  font: "Calibri",
                }),
              ],
            }),
          ]),

          // Projects Section
          new Paragraph({
            text: "PROJECTS",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 200 },
            border: {
              bottom: {
                color: COLORS.primary,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 20,
              },
            },
            children: [
              new TextRun({
                text: "PROJECTS",
                bold: true,
                size: 28,
                color: COLORS.primary,
                font: "Calibri",
              }),
            ],
          }),

          ...projects.flatMap((project) => [
            new Paragraph({
              spacing: { before: 150, after: 100 },
              children: [
                new TextRun({
                  text: project.title,
                  bold: true,
                  size: 24,
                  color: COLORS.text,
                  font: "Calibri",
                }),
                new TextRun({
                  text: `  •  ${project.date}`,
                  size: 22,
                  color: COLORS.secondary,
                  italics: true,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              text: project.description,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: project.description,
                  size: 22,
                  color: COLORS.text,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 150 },
              children: [
                new TextRun({
                  text: "Technologies: ",
                  bold: true,
                  size: 20,
                  color: COLORS.secondary,
                  font: "Calibri",
                }),
                new TextRun({
                  text: project.tags.join(" • "),
                  size: 20,
                  color: COLORS.primary,
                  font: "Calibri",
                }),
              ],
            }),
          ]),

          // Skills Section
          new Paragraph({
            text: "TECHNICAL SKILLS",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 200 },
            border: {
              bottom: {
                color: COLORS.primary,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 20,
              },
            },
            children: [
              new TextRun({
                text: "TECHNICAL SKILLS",
                bold: true,
                size: 28,
                color: COLORS.primary,
                font: "Calibri",
              }),
            ],
          }),

          // Skills Table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 30,
                      type: WidthType.PERCENTAGE,
                    },
                    shading: {
                      fill: COLORS.accent,
                      type: ShadingType.CLEAR,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Programming Languages",
                            bold: true,
                            size: 22,
                            color: COLORS.text,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 70,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: skills.languages
                              .map((s) => s.name)
                              .join(", "),
                            size: 22,
                            color: COLORS.text,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: {
                      fill: COLORS.accent,
                      type: ShadingType.CLEAR,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Frameworks",
                            bold: true,
                            size: 22,
                            color: COLORS.text,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: skills.frameworks
                              .map((s) => s.name)
                              .join(", "),
                            size: 22,
                            color: COLORS.text,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: {
                      fill: COLORS.accent,
                      type: ShadingType.CLEAR,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Tools & Technologies",
                            bold: true,
                            size: 22,
                            color: COLORS.text,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: skills.tools.map((s) => s.name).join(", "),
                            size: 22,
                            color: COLORS.text,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Footer
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400 },
            children: [
              new TextRun({
                text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                size: 16,
                color: COLORS.accent,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100 },
            children: [
              new TextRun({
                text: "GitHub: ",
                size: 18,
                color: COLORS.secondary,
                font: "Calibri",
              }),
              new TextRun({
                text: personalInfo.contact.github,
                size: 18,
                color: COLORS.primary,
                underline: {
                  type: UnderlineType.SINGLE,
                },
                font: "Calibri",
              }),
              new TextRun({
                text: "  |  Twitter: ",
                size: 18,
                color: COLORS.secondary,
                font: "Calibri",
              }),
              new TextRun({
                text: personalInfo.contact.twitter,
                size: 18,
                color: COLORS.primary,
                underline: {
                  type: UnderlineType.SINGLE,
                },
                font: "Calibri",
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Generate and download the document
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${personalInfo.name.replace(/\s+/g, "_")}_Resume.docx`);
}
