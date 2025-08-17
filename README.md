# 🚗 Parking Management System

A modern parking management application built with React, TypeScript, and Tailwind CSS. Demonstrates advanced frontend development skills with clean architecture and modern state management.

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
- **Atoms**: Basic UI components (Button, Input, Select, Label)
- **Molecules**: Composite components (FormRow, LabeledInput, LabeledSelect)
- **Organisms**: Complex components (ParkingAreaForm, ParkingAreaList)
- **Templates**: Page layouts (MainTemplate)
- **Pages**: Route components (ParkingManagementPage, PaymentPage)

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
│   ├── atoms/          # Basic UI components
│   ├── molecules/      # Composite components
│   ├── organisms/      # Complex components
│   └── templates/      # Page layouts
├── pages/              # Route components
└── main.tsx           # App entry point
```
