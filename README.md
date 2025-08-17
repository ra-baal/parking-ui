# parking-ui

## Features

- **Parking Area Management**
- **Payment Processing**
- **Responsive Design**
- **Real-time Updates**

## Tech Stack

- **React 18** - Latest React features with hooks
- **TypeScript** - Full type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **TanStack React Query** - Advanced state management with optimistic updates
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and dev server

## Architecture

### Atomic Design Structure
- **Atoms**: Basic UI components
- **Molecules**: Composite components
- **Organisms**: Complex components
- **Templates**: Page layouts
- **Pages**: Route components

### Key Patterns
- **Component Composition**: Reusable, composable UI components
- **State Management**: React Query for server state, hooks for local state
- **API Layer**: Axios with custom React Query hooks
- **Optimistic Updates**: Immediate UI feedback with error rollback

## Quick Start

```bash
npm install
npm run dev
```

## Structure

```
src/
├── api/                 # API layer and data fetching
├── components/          # Atomic design components
│   ├── atoms/           # Basic UI components
│   ├── molecules/       # Composite components
│   ├── organisms/       # Complex components
│   └── templates/       # Page layouts
├── pages/               # Route components
└── main.tsx             # App entry point
```
