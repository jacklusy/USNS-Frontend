# API integration guide (EPIC-16)

This document describes how to switch the USNS dashboard from mock services to the Laravel API, and how each module maps to DTOs, transformers, endpoints, and auth.

## Switch checklist

1. Set `NEXT_PUBLIC_MOCK_MODE=false` in `.env.local`.
2. Set `NEXT_PUBLIC_API_BASE_URL` to your Laravel API origin (no trailing slash).
3. Confirm Laravel returns JSON with ISO date strings and snake_case field names aligned with `src/types/dto/`.
4. Run `npm run typecheck` and `npm run build`.
5. Smoke-test critical flows: sign-in, users list, colleges, audit logs, notifications.
6. Use `/dev/mock-tools` only while mock mode is on (error simulation is mock-only).

Optional delay tuning (mock mode only):

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_MOCK_DELAY_MIN_MS` | `200` | Min simulated latency |
| `NEXT_PUBLIC_MOCK_DELAY_MAX_MS` | `500` | Max simulated latency |

## Data flow

```
Laravel JSON (DTO) → transformer → domain type → React Query hook → UI
Mock seed (DTO)    → transformer → domain type → mock service     → hook
```

Transformers live in `src/lib/transformers/`. DTOs live in `src/types/dto/`. **Do not** import `@/mock/` from `src/app/` or `src/components/`.

## Recommended integration order

1. `auth` — tokens and session
2. `users` / `roles` — RBAC and assignees
3. `academic` — colleges → departments → programs → courses → calendar
4. `faculty` / `staff`
5. `dashboard` / `notifications`
6. `audit`
7. `reports`
8. `settings` / `profile`
9. `search` (global)

## Per-module reference

| Module | Interface | Mock | Real | Mock data | Transformer(s) | Auth |
| --- | --- | --- | --- | --- | --- | --- |
| Auth | `IAuthService` | `auth.service.mock.ts` | `auth.service.real.ts` | `src/mock/auth/` | (session payloads) | Public + bearer after login |
| Users | `IUserService` | `user.service.mock.ts` | `user.service.real.ts` | `users.mock.ts` | `user.transformer.ts` | Bearer |
| Roles (users) | `IRolesService` | `roles.service.mock.ts` | `roles.service.real.ts` | `roles.mock.ts` | — | Bearer |
| Role management | `IRoleManagementService` | `role-management.service.mock.ts` | `role-management.service.real.ts` | `roles.mock.ts` | — | Bearer |
| Colleges | `ICollegeService` | `college.service.mock.ts` | `college.service.real.ts` | `colleges.mock.ts` | `academic.transformer.ts` | Bearer |
| Departments | `IDepartmentService` | `department.service.mock.ts` | `department.service.real.ts` | `departments.mock.ts` | `academic.transformer.ts` | Bearer |
| Programs | `IProgramService` | `program.service.mock.ts` | `program.service.real.ts` | `programs.mock.ts` | `academic.transformer.ts` | Bearer |
| Courses | `ICourseService` | `course.service.mock.ts` | `course.service.real.ts` | `courses.mock.ts` | `academic.transformer.ts` | Bearer |
| Calendar | `ICalendarService` | `calendar.service.mock.ts` | `calendar.service.real.ts` | `academic-years.mock.ts` | — | Bearer |
| Faculty | `IFacultyService` | `faculty.service.mock.ts` | `faculty.service.real.ts` | `faculty.mock.ts` | `faculty.transformer.ts` | Bearer |
| Staff | `IStaffService` | `staff.service.mock.ts` | `staff.service.real.ts` | `staff.mock.ts` | `staff.transformer.ts` | Bearer |
| Dashboard | `IDashboardService` | `dashboard.service.mock.ts` | `dashboard.service.real.ts` | `dashboard.mock.ts` | `dashboard.transformer.ts` | Bearer |
| Notifications | `INotificationService` | `notification.service.mock.ts` | `notification.service.real.ts` | `notifications.mock.ts` | `notification.transformer.ts` | Bearer |
| Audit logs | `IAuditLogService` | `audit-log.service.mock.ts` | `audit-log.service.real.ts` | `audit-logs.mock.ts` | `audit.transformer.ts` | Bearer |
| Login history | `ILoginHistoryService` | `login-history.service.mock.ts` | `login-history.service.real.ts` | `login-history.mock.ts` | — | Bearer |
| System events | `ISystemEventService` | `system-event.service.mock.ts` | `system-event.service.real.ts` | `system-events.mock.ts` | — | Bearer |
| Reports hub | `IReportsService` | `reports.service.mock.ts` | `reports.service.real.ts` | `src/mock/reports/` | `reports.transformer.ts` | Bearer |
| Enrollment report | `IEnrollmentReportService` | `enrollment-report.service.mock.ts` | `enrollment-report.service.real.ts` | enrollment mocks | — | Bearer |
| Usage report | `IUsageReportService` | `usage-report.service.mock.ts` | `usage-report.service.real.ts` | usage mocks | — | Bearer |
| Settings | `ISettingsService` | `settings.service.mock.ts` | `settings.service.real.ts` | `src/mock/settings/` | `settings.transformer.ts` | Bearer (DBA) |
| Email templates | `IEmailTemplateService` | `email-template.service.mock.ts` | `email-template.service.real.ts` | settings mocks | — | Bearer |
| Profile | `IProfileService` | `profile.service.mock.ts` | `profile.service.real.ts` | `profile.mock.ts` | `profile.transformer.ts` | Bearer |
| Global search | `IGlobalSearchService` | `global-search.service.mock.ts` | `global-search.service.real.ts` | `global-search.mock.ts` | — | Bearer |

Endpoint keys are defined in `src/services/endpoints.ts` (e.g. `ENDPOINTS.users.list`, `ENDPOINTS.colleges.byId(id)`).

## Service method patterns (real layer)

List (paginated):

```typescript
const response = await getPaginated<ManagedUserDto>(`${ENDPOINTS.users.list}?page=1&per_page=20`);
return { data: response.data.map(toManagedUser), meta: response.meta };
```

Single resource:

```typescript
const data = await get<CollegeDto>(ENDPOINTS.colleges.byId(id));
return { data: toCollege(data) };
```

Mutations return DTOs that are mapped before leaving the service.

## Mock layer utilities

| File | Purpose |
| --- | --- |
| `src/mock/lib/mock-query.ts` | `paginate`, `matchesSearch`, `sortByField` |
| `src/mock/lib/seed-stats.ts` | Record counts for `/dev/mock-tools` |
| `src/mock/index.ts` | `MOCK_MODULE_MAP` (documentation barrel; no app imports) |
| `src/store/mock-dev.slice.ts` | Simulated error code + delay override |
| `src/app/(dashboard)/dev/mock-tools/page.tsx` | Dev UI for mock error simulation |

`MockServiceBase.delay()` applies random 200–500ms delay (configurable) and honors simulated errors from the dev slice.

## Breaking differences (mock vs Laravel)

| Area | Mock behavior | API expectation |
| --- | --- | --- |
| Pagination | In-memory slice; meta computed locally | Laravel `meta` object (`total`, `page`, `per_page`, `last_page`) |
| Notifications list | `meta.unread_count` on mock paginated response | Confirm Laravel includes `unread_count` in list meta or fetch separately |
| Dates | Seeds use ISO strings; domain uses `Date` where transformed | API returns ISO strings; transformers call `parseApiDate` |
| Validation errors | Mock throws `AppError` with `VALIDATION_ERROR` | Laravel 422 → normalized in `api-client` → `applyLaravelErrorsToForm` |
| Writes | In-memory stores mutate immediately | Optimistic UI should invalidate React Query keys after success |
| Search | Client-side index in `global-search.mock.ts` | `GET /search?q=` when backend is ready |
| Status changes | Some academic mocks use local status helpers | Laravel may use dedicated `/status` routes (real services post `{ action }`) |

## DTO / domain phases

| Phase | Entities | Temporal fields |
| --- | --- | --- |
| A | User, college, department, audit log | `Date` in domain |
| B | Program, course, faculty, staff | `Date` in domain |
| C | Notification, dashboard activity/announcement, reports, settings backup, profile | Mixed: notifications use `Date`; dashboard/profile/reports keep display strings where UI already expects strings |

## Verification

```bash
npm run typecheck
npm run build
```

Manual QA (mock mode):

- `/dev/mock-tools` — toggle 403/422/500; next list fetch should fail with `AppError`
- Roles list — 20+ roles
- Users — multiple users per role
- Seed counts on mock-tools page match `seed-stats.ts`
