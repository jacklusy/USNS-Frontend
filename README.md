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
| `NEXT_PUBLIC_API_BASE_URL`              | Laravel API base URL (used when mock mode is off)                          |
| `NEXT_PUBLIC_MOCK_MODE`               | Set to `true` to use mock services and block real HTTP from the API client |
| `NEXT_PUBLIC_ACTIVITY_POLL_INTERVAL_MS` | Activity feed polling interval in ms (default `60000`)                     |

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Mock authentication (when `NEXT_PUBLIC_MOCK_MODE=true`)

| Flow | Credentials / URL |
| --- | --- |
| Sign in | `president@usns.edu`, `admin@usns.edu`, `dean@usns.edu`, `dba@usns.edu`, or `faculty@usns.edu` — password `Password1!` |
| Settings (RBAC) | Sign in as `dba@usns.edu` or `admin@usns.edu`; visit `/settings` |
| Access denied demo | Sign in as `faculty@usns.edu` and open `/settings` |
| Reset password | `/reset-password?token=valid_reset_token` |
| Expired reset link | `/reset-password?token=expired_reset_token` |
| Session expired | Set access token to `mock_access_session_expired` in devtools, then reload a protected page |

### Dashboard shell (authenticated layout)

| Behavior | Notes |
| --- | --- |
| Mobile (&lt;1024px) | Hamburger opens a 280px navigation drawer; backdrop and Escape close it |
| Desktop (≥1024px) | Sidebar 240px expanded or 64px collapsed; preference persists in `localStorage` (`usns-ui`) |
| Navigation | Menu groups and items come from `src/constants/navigation.constants.ts`; items without permission are omitted |
| Top bar | Sticky header with breadcrumbs, notification unread badge (mock store), role badge, and user menu (profile, settings when allowed, sign out) |
| RBAC nav demo | `faculty@usns.edu` sees Dashboard only; `president@usns.edu` sees the full filtered menu |

### Dashboard overview (`/dashboard`)

| Feature | Notes |
| --- | --- |
| KPI cards | Trend indicators and per-section **Refresh** |
| Analytics | Line, bar, and donut charts (lazy-loaded Recharts) |
| Activity feed | Paginated recent events with action-type icons, **Load more**, and configurable polling |
| Quick actions | Typed config in `dashboard-quick-actions.constants.ts`; filtered by role permissions |
| Announcement banner | Critical unread banner on dashboard; dismiss persists for the browser session |
| Announcements center | `/announcements` list and `/announcements/[id]` detail; read state in session storage |

### User management (`/users`, EPIC-06)

Requires `users.view`. Mock data and services live under `src/mock/users/` and `src/modules/users/`.

| Account | User management capabilities |
| --- | --- |
| `admin@usns.edu` | List, detail, create, edit, activate/deactivate/suspend (with confirm); **no** delete |
| `president@usns.edu` | Full access including delete (row menu and bulk) |
| `dean@usns.edu` | View list and detail only (no create, edit, status, or delete) |
| `dba@usns.edu` | No user permissions (nav item hidden; direct URL hits access denied) |

| Feature | Notes |
| --- | --- |
| List | Server-side search, pagination, role/status filters (URL keys `role`, `status`) |
| Detail | `/users/[id]` — profile (initials avatar), permissions by category, account stats, activity tab (mock audit trail) |
| Create | Drawer with temporary password and force password change |
| Edit | Drawer from list or detail; save disabled until the form is dirty |
| Status | Activate, deactivate, and suspend require confirmation; optimistic badge updates with rollback on error; changes append to mock audit log |
| Bulk status | Activate, deactivate, or suspend selected rows from the list (with confirmation) |
| Self role demotion | Editing your own account to a lower role shows a confirmation step |
| Duplicate email | Create/edit surfaces a field-level validation error from the mock service |

Password for all mock accounts: `Password1!`

### Role management (`/roles`, EPIC-07)

Requires `roles.view`. Mock data in `src/mock/roles/`; services in `src/modules/roles/`.

| Account | Role management capabilities |
| --- | --- |
| `president@usns.edu` | Full list, create/edit/delete custom roles, permission matrix export |
| `admin@usns.edu` | View list, view drawers, permission matrix; **no** create/edit/delete |
| Others | No roles permissions (nav hidden) |

| Feature | Notes |
| --- | --- |
| List | `/roles` — search, system role badge, user counts, row actions |
| Create / edit | Drawer with permission matrix (group select-all); system roles: name locked, no delete |
| Matrix | `/roles?tab=matrix` — compare roles vs permissions, filter by group, export CSV |
| Auth note | Permission edits update the mock store only; sign-in RBAC still uses `ROLE_PERMISSIONS` until API wiring |

### Academic structure (EPIC-08)

Mock data in `src/mock/academic/`; services in `src/modules/academic/`.

| Account | Academic access |
| --- | --- |
| `president@usns.edu` | All colleges, departments, programs, courses, and academic calendar |
| `dean@usns.edu` | Same academic manage permissions as president for structure modules |
| `admin@usns.edu` | No academic nav (users/roles only) |

| Route | Feature |
| --- | --- |
| `/colleges` | List, create/edit drawers, detail with linked departments; deactivate with optional department cascade |
| `/departments` | List with college filter (`?collegeId=`), CRUD, detail with courses and staff count |
| `/courses` | CRUD with prerequisite multi-select; circular dependency validation in mock service |
| `/programs` | CRUD with program type, duration, curriculum courses; status confirmation |
| `/academic-years` | Year list with active indicator; year detail with semester activate/close warnings |

User create/edit department dropdown reads from the academic department store (not the legacy flat list).

### Faculty and staff (EPIC-09)

Mock data in `src/mock/faculty/` and `src/mock/staff/`; services in `src/modules/faculty/` and `src/modules/staff/`.

| Account | Faculty | Administrative staff |
| --- | --- | --- |
| `president@usns.edu` | view + manage | view + manage |
| `dean@usns.edu` | view + manage | view only |
| `admin@usns.edu` | no nav | no nav |

| Route | Feature |
| --- | --- |
| `/faculty` | List, create/edit drawer, filters (department, rank, status); detail with semester courses, publications, workload indicator |
| `/staff` | List, create/edit drawer with dashboard role; detail with permissions summary by role |

Department detail staff count includes dashboard users plus administrative staff assigned to that department.

### System settings (EPIC-10)

Mock data in `src/mock/settings/`; services in `src/modules/settings/`.

| Account | Settings access |
| --- | --- |
| `dba@usns.edu` | All tabs including **Operations** (backup, maintenance) |
| `admin@usns.edu` | General, Mail, Storage, Security, Features, Email templates — no Operations tab |
| `dean@usns.edu` | Access denied at `/settings` |

| Tab | Feature |
| --- | --- |
| General / Mail / Storage / Security / Features | Section forms with confirm-before-save; sensitive fields use masked `PasswordInput` |
| Operations (DBA only) | Backup schedule, manual backup with progress, history table, maintenance mode with double confirmation |
| Email templates | List, edit drawer (monospace body), variable reference, preview modal, reset to default |

When maintenance mode is enabled, a warning banner appears on all dashboard pages.

### Notifications center (EPIC-11)

Mock data in `src/mock/notifications/`; services in `src/modules/notifications/`.

| Account | Access |
| --- | --- |
| `president@usns.edu` | Full notification center, bell dropdown, preferences |
| `dba@usns.edu` | Same as president for notifications |
| `admin@usns.edu` / `dean@usns.edu` | No `notifications.view` — `/notifications` forbidden; no bell |

| Feature | Route / UI |
| --- | --- |
| Notification center (NOTIF-01) | `/notifications` — filter by category and read status, mark read/unread, mark all read, delete with confirmation |
| Preferences (NOTIF-02) | `/notifications?tab=preferences` — per-type in-app and email toggles, reset to defaults |
| Bell dropdown (NOTIF-03) | Top bar — up to 5 recent unread, mark-as-read per item, link to full center |

Unread count on the bell syncs from the notification store, hydrated on dashboard load and updated after mutations.

### Audit & monitoring (EPIC-12)

Mock data in `src/mock/audit/`; services in `src/modules/audit/`.

| Account | Access |
| --- | --- |
| `admin@usns.edu` | Full audit hub, CSV export |
| `dba@usns.edu` | Same |
| `president@usns.edu` | Same (all permissions) |
| `dean@usns.edu` | Forbidden at `/audit` |

| Tab | Feature |
| --- | --- |
| Audit logs (AUDIT-01) | `/audit?tab=logs` — DataTable with filters, read-only, detail at `/audit/logs/[id]` with payload diff, CSV export |
| Login history (AUDIT-02) | `/audit?tab=login-history` — auth events with failed/blocked styling and suspicious indicators, CSV export |
| System events (AUDIT-03) | `/audit?tab=system-events` — infrastructure events by category/severity, detail at `/audit/system-events/[id]`, CSV export |

### Reports & analytics (EPIC-13)

Mock data in `src/mock/reports/`; services in `src/modules/reports/`.

| Account | Access |
| --- | --- |
| `admin@usns.edu` | Full reports hub, CSV export |
| `dean@usns.edu` | Full reports hub, CSV export |
| `president@usns.edu` | Full access (all permissions) |
| `dba@usns.edu` | Forbidden at `/reports` |

| Ticket | Route | Feature |
| --- | --- | --- |
| Reports dashboard (RPT-01) | `/reports` — categorized catalog, async generate with loading, recent 10 downloads |
| Enrollment statistics (RPT-02) | `/reports/enrollment` — filters, summary metrics, bar chart, department table, CSV + print |
| System usage (RPT-03) | `/reports/usage` — date presets, DAU line chart, top users, feature usage, peak-hours heatmap |

### Profile & account settings (EPIC-14)

Mock data in `src/mock/profile/`; services in `src/modules/profile/`.

| Account | Access |
| --- | --- |
| All signed-in roles | `/profile` (faculty, staff, admin, dean, president, dba) |

| Tab | Route | Feature |
| --- | --- | --- |
| My profile (PROF-01) | `/profile` or `/profile?tab=profile` — avatar mock upload with crop preview, inline edit display name / phone / bio |
| Change password (PROF-02) | `/profile?tab=password` — current + new password, strength meter, wrong current password error; success redirects to profile with toast |
| Preferences (PROF-03) | `/profile?tab=preferences` — language, timezone, date format, theme (applies immediately via `ThemeSync`) |

Test password for mock accounts: `Password1!`

### UI component kit (EPIC-05)

Shared primitives live under `src/components/ui/` (inputs, selects, checkbox) and `src/components/shared/` (`DataTable`, `EmptyState`, `ErrorState`).

| Component | Path |
| --- | --- |
| FormField + TextInput, EmailInput, PasswordInput, NumberInput, TextareaInput | `src/components/ui/FormField.tsx`, `src/components/ui/inputs/` |
| SingleSelect, MultiSelect, Combobox | `src/components/ui/select/` |
| Button, Badge, StatusBadge | `src/components/ui/Button.tsx`, `Badge.tsx`, `StatusBadge.tsx` |
| Modal, Drawer, ConfirmationDialog | `src/components/ui/Modal.tsx`, `Drawer.tsx`, `ConfirmationDialog.tsx` |
| DatePicker, DateRangePicker | `src/components/ui/date-picker/` |
| DataTable, Pagination, EmptyState, ErrorState | `src/components/shared/DataTable/`, `Pagination.tsx`, `EmptyState.tsx`, `ErrorState.tsx` |
| Skeleton suite (base, text, card, table, form) | `src/components/ui/Skeleton.tsx`, `src/components/ui/loading-skeleton/` |
| Tabs (URL-synced, lazy panels) | `src/components/ui/Tabs.tsx` |
| GlobalSearch, FilterPanel | `src/components/shared/GlobalSearch/`, `FilterPanel/` |
| Toast (`useToast`) | `src/hooks/useToast.ts`, `src/components/shared/ToastContainer.tsx` |

Development showcase (authenticated): [http://localhost:3000/dev/ui-kit](http://localhost:3000/dev/ui-kit) — buttons, badges, skeletons, empty/error states, pagination, tabs, global search, filters, toasts, overlays, date pickers, forms, selects, and DataTable modes.

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
- When `NEXT_PUBLIC_MOCK_MODE=true`, the API client rejects outbound requests except `POST /auth/refresh`, which delegates to the mock auth service; other traffic uses mock service implementations.

## Service layer

Feature services use an interface + mock/real pair resolved by `resolveService()` from `src/lib/service-resolver.ts`. Mock data lives under `src/mock/` and is imported only in `*.service.mock.ts` files.

See [docs/service-layer.md](docs/service-layer.md) for the full pattern. Reference implementation: `src/modules/dashboard/`.

## Data fetching

Server/async data uses **TanStack Query** via hooks in `modules/[feature]/hooks/`. Do not fetch with `useEffect`. Global query defaults and error-toast handling are configured in `src/lib/query-client.ts` and `src/providers/`.

## Tech stack

- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- Axios (HTTP client, prepared for Laravel)
- Zustand (global UI/auth/notification state)
- TanStack Query (server/async data fetching)
