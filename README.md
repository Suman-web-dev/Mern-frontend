# ARCC Abstract Submission - Frontend

Next.js frontend for the ARCC Abstract Submission System.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## Features

- Multi-step abstract submission form
- Real-time form validation
- File upload with drag & drop
- Rich text editor for abstract content
- Dynamic co-author management
- Responsive design for all screen sizes
- Progress stepper navigation
- Draft saving functionality

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
front-end/
├── app/                 # Next.js app directory
├── components/          # Reusable components
│   ├── layout/         # Layout components (Navbar, Hero, Footer)
│   ├── sidebar/        # Sidebar components
│   └── ui/            # UI components (Button, Input, etc.)
├── features/           # Feature-specific components
│   └── submission/    # Submission form
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── services/           # API services
├── types/              # TypeScript types
├── utils/              # Helper functions
├── validations/        # Zod schemas
└── public/             # Static assets
```

## Components

### Layout Components
- **Navbar** - Sticky navigation with mobile menu
- **Hero** - Hero section with statistics
- **Footer** - Footer with links and contact info

### UI Components
- **Button** - Reusable button with variants
- **Input** - Form input with error handling
- **Select** - Dropdown select component
- **Textarea** - Multi-line text input
- **Label** - Form label with required indicator
- **Card** - Base card component
- **ProgressStepper** - Multi-step progress indicator
- **FormCard** - Form section card
- **UploadCard** - File upload with drag & drop
- **RichTextEditor** - WYSIWYG text editor
- **CoAuthorTable** - Dynamic co-author management

### Sidebar Components
- **PublishCard** - Call-to-action card
- **ChecklistCard** - Submission checklist
- **FeaturedEventCard** - Event information
- **HelpCard** - Support options

## Form Sections

1. **Abstract Information** - Journal, presentation type, research area, keywords
2. **Presenter Details** - Name, email, phone, institution, country, ORCID
3. **Co-Authors** - Dynamic co-author management
4. **Abstract** - Rich text editor with word count
5. **Uploads** - File upload for abstract, full paper, supplementary materials
6. **Declaration** - Consent checkboxes

## Validation

- React Hook Form for form state management
- Zod for schema validation
- Real-time error display
- Required field indicators

## Responsive Breakpoints

- 1920px, 1600px, 1440px, 1280px, 1024px, 768px, 640px, 480px, 390px, 360px

## API Integration

The frontend connects to the backend API at:
- Development: `http://localhost:5000`
- Production: Configured via environment variables

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
