# ApxDenta Project Overview

## Table of Contents
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Monorepo Layout](#monorepo-layout)
- [Apps & Packages](#apps--packages)
- [How to Run Each App](#how-to-run-each-app)
- [Development Workflow](#development-workflow)
- [Key Features](#key-features)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Project Structure

ApxDenta is a modern dental management platform built as a monorepo using cutting-edge web technologies. It is organized into multiple apps and packages for scalability and maintainability.

```
├── apps/
│   ├── webapp/        # Frontend application (React + Vite)
│   └── server/        # Backend API server (Node.js + Hono)
├── packages/
│   ├── domain/        # Shared business logic, API clients, types
│   ├── email/         # Email templates and rendering
│   ├── error/         # Error handling utilities
│   ├── schemas/       # Zod schemas for validation
│   ├── transactional/ # Transactional email logic
│   └── ui/            # Shared UI components (React + Tailwind)
├── tools/             # Tooling (tsconfig, tailwind, etc.)
├── README.md
├── overview.md        # Project documentation (this file)
└── ...
```

## Technologies Used

### Core Technologies
- **React**: UI library for building interactive user interfaces (webapp, ui)
- **TypeScript**: Type-safe development across all apps and packages
- **Vite**: Fast frontend build tool for the webapp
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development
- **Node.js**: Backend runtime for the server app
- **Hono**: Lightweight, modern web framework for building APIs
- **Kysely**: Type-safe SQL query builder for database operations
- **MySQL**: Relational database for persistent storage
- **Zod**: TypeScript-first schema validation (used in schemas package)
- **React Hook Form**: Form state management and validation
- **React Query**: Data fetching and caching for React apps
- **Sonner**: Toast notification library for user feedback
- **Lucide React**: Icon library for UI consistency
- **Immer**: Immutable state management for complex updates
- **Framer Motion**: Animation library for smooth UI transitions
- **TanStack Router**: Type-safe routing for React apps
- **Bun**: Fast JavaScript runtime and package manager (optional)

### Importance
- **Monorepo**: Enables code sharing, atomic commits, and unified tooling
- **TypeScript & Zod**: Ensures type safety and runtime validation across all layers
- **Tailwind CSS**: Rapid prototyping and consistent design system
- **React Query & TanStack Router**: Modern data and navigation management
- **Kysely & MySQL**: Reliable, scalable backend data layer
- **Hono**: Fast, minimal API server with modern DX
- **UI Package**: Centralized, reusable UI components for all apps
- **Email Package**: Consistent, branded transactional emails

## Monorepo Layout

- **apps/**: Contains runnable applications (frontend, backend)
- **packages/**: Contains shared code, business logic, UI, schemas, and emails
- **tools/**: Configuration and tooling for linting, formatting, etc.

## Apps & Packages

### apps/webapp
- **Purpose**: Main frontend application for users and staff
- **Tech**: React, Vite, Tailwind, TanStack Router, React Query
- **Entry Point**: `apps/webapp/src/main.tsx`

### apps/server
- **Purpose**: Backend API server
- **Tech**: Node.js, Hono, Kysely, MySQL
- **Entry Point**: `apps/server/src/index.ts`

### packages/domain
- **Purpose**: Shared business logic, API clients, types
- **Tech**: TypeScript

### packages/ui
- **Purpose**: Shared React UI components, Tailwind CSS
- **Tech**: React, Tailwind

### packages/email
- **Purpose**: Transactional email templates and rendering
- **Tech**: TypeScript, HTML, CSS

### packages/schemas
- **Purpose**: Zod schemas for validation
- **Tech**: Zod, TypeScript

### packages/error
- **Purpose**: Error handling utilities
- **Tech**: TypeScript

## How to Run Each App

### Prerequisites
- Node.js (v18+ recommended)
- Bun (optional, for faster installs)
- PostgreSQL database (local or remote)
- Install dependencies: `bun install` or `npm install`

### 1. Webapp (Frontend)
```sh
cd apps/webapp
bun install # or npm install
bun run dev # or npm run dev
```
- Access at: `http://localhost:8085` (default)

### 2. Server (Backend)
```sh
cd apps/server
bun install # or npm install
bun run dev # or npm run dev
```
- API runs at: `http://localhost:3035` (default)

## Development Workflow
- Use feature branches for new features
- Commit changes with clear messages
- Run tests before pushing
- Use monorepo scripts for linting, formatting, and building
- Environment variables are managed per app (see `.env` files)

## Key Features
- **Authentication**: Email/password, Google OAuth
- **Staff Management**: Add, filter, and manage staff
- **Company Management**: Create and manage companies
- **Email Templates**: Branded transactional emails
- **Responsive UI**: Mobile-first, accessible design
- **Form Validation**: Zod + React Hook Form for robust forms
- **Error Handling**: Centralized error utilities
- **Animations**: Framer Motion for smooth transitions
- **Notifications**: Sonner for user feedback

## Environment Variables
- `VITE_PUBLIC_WEB_URL`: Public URL for frontend
- `VITE_PUBLIC_SERVER_URL`: API server URL
- `DATABASE_URL`: MySQL connection string (server)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: OAuth credentials
- See `.env.example` in each app for full list

## Testing
- **Unit Tests**: Vitest for fast, type-safe tests
- **Integration Tests**: Can be added in apps/server and apps/webapp
- **Run tests**:
  ```sh
  bun run test # or npm run test
  ```

## Deployment
- **Frontend**: Deploy via Vercel, Netlify, or similar
- **Backend**: Deploy via Node.js host (Railway, Render, etc.)
- **Database**: PostgreSQL (managed or self-hosted)
- **Environment**: Set production `.env` variables

## Contributing
- Fork the repo and create a feature branch
- Follow code style and commit guidelines
- Submit a pull request with a clear description
- Review and address feedback

---

For more details, see individual README files in each app and package.
