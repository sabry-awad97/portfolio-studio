# Portfolio Web Application

A modern, professional portfolio website built with React, TypeScript, TanStack Router, and shadcn/ui components.

## Features

- **Modern Design**: Clean, professional UI with shadcn/ui components
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark/Light Mode**: Theme switching support
- **Smooth Navigation**: Sticky header with smooth scroll to sections
- **Professional Sections**:
  - Hero section with profile and contact information
  - Education timeline
  - Projects showcase with tags
  - Skills organized by category
  - Call-to-action for freelance work
  - Social media links

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - Type-safe routing
- **shadcn/ui** - High-quality UI components
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## Getting Started

### Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The application will be available at `http://localhost:3001`

### Build

```bash
# Build for production
bun run build

# Preview production build
bun run serve
```

## Project Structure

```
apps/web/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── cta-section.tsx
│   │   ├── education-section.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── hero-section.tsx
│   │   ├── projects-section.tsx
│   │   └── skills-section.tsx
│   ├── lib/
│   │   ├── data.ts          # Portfolio data
│   │   └── utils.ts
│   ├── routes/
│   │   ├── __root.tsx
│   │   └── index.tsx
│   └── main.tsx
└── package.json
```

## Customization

### Update Personal Information

Edit `src/lib/data.ts` to update:

- Personal information
- Contact details
- Education history
- Projects
- Skills
- Social media links

### Styling

The application uses Tailwind CSS with custom theme variables defined in `src/index.css`. You can customize:

- Colors
- Typography
- Spacing
- Border radius

### Components

All components are built with shadcn/ui and can be customized by editing the component files in `src/components/`.

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly

## Performance

- Code splitting with TanStack Router
- Optimized images
- Minimal bundle size
- Fast page loads

## License

Private - All rights reserved
