# Addeep Monorepo

This is a Turborepo monorepo containing the Addeep web platform and admin dashboard.

## 🏗️ Project Structure

```
addeep/
├── apps/
│   ├── web/          # Main website (Next.js)
│   └── admin/        # Admin dashboard (Next.js)
├── doc/              # Documentation
├── infra/            # Infrastructure (Terraform)
└── package.json      # Root package.json (workspace configuration)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn 4.9.2+

### Installation

```bash
# Install dependencies
yarn install
```

### Development

```bash
# Run all apps in dev mode
yarn dev

# Run specific app
yarn dev:web      # Main website on http://localhost:3000
yarn dev:admin    # Admin dashboard on http://localhost:3001
```

### Build

```bash
# Build all apps
yarn build

# Build specific app
yarn build:web
yarn build:admin
```

### Start Production

```bash
# Start all apps in production mode
yarn start
```

## 📦 Apps

### Web (`apps/web`)

The main Addeep website built with Next.js, featuring:

- Landing pages
- Blog & News
- Events & Announcements
- Company information

**Tech Stack:**

- Next.js 15
- React 19
- TanStack Query
- Zustand
- Tailwind CSS
- GSAP

### Admin (`apps/admin`)

The admin dashboard for managing content, built with Next.js and Material-UI:

- Content management (News, Events, Announcements, Articles)
- Authentication with Supabase
- Material React Table
- E2E testing with Playwright

**Tech Stack:**

- Next.js 15
- React 19
- Material-UI
- TanStack Query
- Zustand
- Supabase

## 🔧 Tools & Technologies

- **Monorepo Management**: Turborepo
- **Package Manager**: Yarn 4 (with workspaces)
- **Backend**: Supabase
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Testing**: Playwright (E2E)

## 📝 Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `yarn dev`         | Run all apps in development mode |
| `yarn dev:web`     | Run web app only                 |
| `yarn dev:admin`   | Run admin app only               |
| `yarn build`       | Build all apps                   |
| `yarn build:web`   | Build web app only               |
| `yarn build:admin` | Build admin app only             |
| `yarn start`       | Start all apps in production     |
| `yarn lint`        | Lint all apps                    |

## 🚢 Deployment

### Vercel

**Web App:**

- Root Directory: `apps/web`
- Build Command: `cd ../.. && yarn build:web`
- Output Directory: `apps/web/.next`
- Install Command: `yarn install`

**Admin App:**

- Root Directory: `apps/admin`
- Build Command: `cd ../.. && yarn build:admin`
- Output Directory: `apps/admin/.next`
- Install Command: `yarn install`

### Docker

Each app has its own Dockerfile for containerized deployment.

```bash
# Build web app
docker build -f apps/web/Dockerfile -t addeep-web .

# Build admin app
docker build -f apps/admin/Dockerfile -t addeep-admin .
```

## 📚 Documentation

- [E2E Testing Guide](apps/admin/README_E2E.md)
- [Admin Deployment Guide](apps/admin/DEPLOYMENT.md)
- [Figma MCP Setup](FIGMA_MCP_SETUP.md)
- [Maintenance Setup](MAINTENANCE_SETUP.md)

## 🔐 Environment Variables

Each app requires its own environment variables. See:

- `apps/web/.env.local.example`
- `apps/admin/.env.local.example`

## 📄 License

Private - Addeep Inc.
