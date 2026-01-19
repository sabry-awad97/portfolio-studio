import { cva, type VariantProps } from "class-variance-authority";

// Responsive padding variants
export const paddingVariants = cva("", {
  variants: {
    size: {
      none: "p-0",
      sm: "p-2 sm:p-3 md:p-4",
      md: "p-4 sm:p-6 md:p-8",
      lg: "p-4 sm:p-6 md:p-10",
      xl: "p-6 sm:p-8 md:p-12",
    },
    axis: {
      all: "",
      x: "px-4 sm:px-6 md:px-8",
      y: "py-4 sm:py-6 md:py-8",
    },
  },
  defaultVariants: {
    size: "md",
    axis: "all",
  },
});

// Typography variants
export const typographyVariants = cva("font-sans", {
  variants: {
    variant: {
      h1: "text-2xl sm:text-3xl md:text-4xl font-bold",
      h2: "text-xl sm:text-2xl md:text-3xl font-bold",
      h3: "text-lg sm:text-xl md:text-2xl font-bold",
      h4: "text-base sm:text-lg md:text-xl font-bold",
      body: "text-sm sm:text-base",
      small: "text-xs sm:text-sm",
      caption: "text-xs",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {
    variant: "body",
    weight: "normal",
  },
});

// Touch target variants (for accessibility)
export const touchTargetVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "min-h-[44px] min-w-[44px] p-2",
        md: "min-h-[48px] min-w-[48px] p-3",
        lg: "min-h-[52px] min-w-[52px] p-4",
      },
      shape: {
        square: "rounded-md",
        rounded: "rounded-lg",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "rounded",
    },
  },
);

// Card variants
export const cardVariants = cva("bg-white rounded-3xl overflow-hidden", {
  variants: {
    size: {
      sm: "min-h-[300px] md:min-h-[400px]",
      md: "min-h-[400px] md:min-h-[600px]", // Reduced from 600/800
      lg: "min-h-[600px] md:min-h-[800px]",
      auto: "min-h-0",
    },
    padding: {
      none: "p-0",
      sm: "p-4 sm:p-6",
      md: "p-4 sm:p-6 md:p-10",
      lg: "p-6 sm:p-8 md:p-12",
    },
  },
  defaultVariants: {
    size: "md",
    padding: "md",
  },
});

// Section spacing variants
export const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-4 md:py-6",
      md: "py-5 md:py-8",
      lg: "py-8 md:py-12",
      xl: "py-10 md:py-16",
    },
    container: {
      full: "w-full",
      constrained: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      narrow: "max-w-5xl mx-auto px-4 sm:px-6",
    },
  },
  defaultVariants: {
    spacing: "md",
    container: "constrained",
  },
});

// Button variants (extending shadcn)
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 min-h-[44px]",
        sm: "h-9 rounded-md px-3 min-h-[44px]",
        lg: "h-11 rounded-md px-8 min-h-[48px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Timeline variants
export const timelineVariants = cva("relative flex", {
  variants: {
    layout: {
      mobile: "flex-row gap-4 md:hidden",
      desktop: "hidden md:flex mb-2.5 min-h-[120px]",
    },
    alignment: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
  },
  defaultVariants: {
    layout: "desktop",
    alignment: "center",
  },
});

// Export types for TypeScript
export type PaddingVariants = VariantProps<typeof paddingVariants>;
export type TypographyVariants = VariantProps<typeof typographyVariants>;
export type TouchTargetVariants = VariantProps<typeof touchTargetVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type SectionVariants = VariantProps<typeof sectionVariants>;
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type TimelineVariants = VariantProps<typeof timelineVariants>;
