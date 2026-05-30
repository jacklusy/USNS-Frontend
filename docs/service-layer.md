# Service Layer

## Pattern overview

Each feature exposes a service interface (`IService`) implemented twice: mock (development) and real (Laravel API). A resolver picks the active implementation from `NEXT_PUBLIC_MOCK_MODE`.

## Interface per feature

```typescript
export interface IDashboardService {
  getStats(): Promise<ApiResponse<DashboardStats>>;
}
```

Define interfaces in `modules/[feature]/services/[feature].service.ts`.

## Mock implementation

1. Extend `MockServiceBase` from `@/lib/mock-service-base` for simulated latency.
2. Import fixtures only from `@/mock/[feature]/`.
3. Return responses shaped like Laravel envelopes (`ApiResponse`, `PaginatedResponse`).

```typescript
export class MockDashboardService extends MockServiceBase implements IDashboardService {
  async getStats() {
    await this.delay();
    return mockDashboardStats;
  }
}
```

## Real implementation

Use helpers from `@/services/api-client` and paths from `@/services/endpoints` only.

## Resolver

```typescript
import { resolveService } from "@/lib/service-resolver";

export const dashboardService = resolveService(mockDashboardService, realDashboardService);
```

When `NEXT_PUBLIC_MOCK_MODE=true`, mock is selected and the API client blocks outbound HTTP.

## Import rules

| Allowed | Forbidden |
| --- | --- |
| `@/mock/*` in `*.service.mock.ts` only | `@/mock/*` in pages, components, hooks |
| `apiClient` / `get` in `*.service.real.ts` | `apiClient` in pages, components |

Reference module: `src/modules/dashboard/`.
