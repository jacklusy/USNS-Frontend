# USNS Administration Dashboard

Next.js (TypeScript) administration dashboard for USNS. Mock-data driven during UI development; Laravel API integration planned for a later phase.

## Prerequisites

- Node.js 20+
- npm 9+

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Adjust `.env.local` if needed:

| Variable                   | Description                                                                |
| -------------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Laravel API base URL (used when mock mode is off)                          |
| `NEXT_PUBLIC_MOCK_MODE`    | Set to `true` to use mock services and block real HTTP from the API client |

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description                 |
| ---------------------- | --------------------------- |
| `npm run dev`          | Start development server    |
| `npm run build`        | Production build            |
| `npm run start`        | Start production server     |
| `npm run lint`         | Run ESLint                  |
| `npm run typecheck`    | Run TypeScript without emit |
| `npm run format`       | Format with Prettier        |
| `npm run format:check` | Check Prettier formatting   |

## Project structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # UI, shared, layouts, features
├── modules/          # Feature modules
├── services/         # API client and feature services
├── types/            # Global TypeScript types
├── constants/        # App-wide constants
├── mock/             # Mock data (service layer only)
├── config/           # Environment accessors
└── ...
```

## Architecture notes

- All HTTP traffic goes through `src/services/api-client.ts` from the **service layer only** — not from pages or components.
- API paths are defined in `src/services/endpoints.ts` — no raw URL strings elsewhere.
- Environment variables are read only in `src/config/env.ts`.
- When `NEXT_PUBLIC_MOCK_MODE=true`, the API client rejects outbound requests; feature services use mock implementations.

## Tech stack

- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- Axios (HTTP client, prepared for Laravel)
