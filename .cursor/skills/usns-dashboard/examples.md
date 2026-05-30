# USNS Dashboard — Canonical Code Examples

## 1. Service Interface + Mock Implementation

```typescript
// modules/users/services/user.service.ts
import type { PaginatedResponse } from "@/types/api.types";
import type { User, UserFilters } from "../types/user.types";

export interface IUserService {
  getUsers(filters: UserFilters): Promise<PaginatedResponse<User>>;
  getUserById(id: string): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
```

```typescript
// modules/users/services/user.service.mock.ts
import type { IUserService } from "./user.service";
import type { PaginatedResponse } from "@/types/api.types";
import type { User, UserFilters } from "../types/user.types";
import { mockUsers } from "@/mock/users/users.mock";

export class MockUserService implements IUserService {
  async getUsers(_filters: UserFilters): Promise<PaginatedResponse<User>> {
    await new Promise((r) => setTimeout(r, 300));
    return mockUsers;
  }

  async getUserById(id: string): Promise<User> {
    await new Promise((r) => setTimeout(r, 200));
    const user = mockUsers.data.find((u) => u.id === id);
    if (!user)
      throw { code: "NOT_FOUND", message: "User not found", status: 404 };
    return user;
  }

  async deleteUser(_id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 250));
  }
}

export const userService: IUserService = new MockUserService();
```

---

## 2. React Query Hook

```typescript
// modules/users/hooks/useUserList.ts
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service.mock";
import type { UserFilters } from "../types/user.types";

export function useUserList(filters: UserFilters) {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => userService.getUsers(filters),
    staleTime: 1000 * 60 * 5,
  });
}
```

---

## 3. Mock Data File

```typescript
// mock/users/users.mock.ts
import type { PaginatedResponse } from "@/types/api.types";
import type { User } from "@/modules/users/types/user.types";
import { UserStatus } from "@/modules/users/types/user.types";

export const mockUsers: PaginatedResponse<User> = {
  data: [
    {
      id: "usr_001",
      name: "Ahmed Al-Rashidi",
      email: "ahmed@usns.edu",
      role: "dean",
      status: UserStatus.Active,
      createdAt: "2024-01-15T10:00:00Z",
    },
  ],
  meta: {
    total: 1,
    page: 1,
    per_page: 10,
    last_page: 1,
  },
};
```

---

## 4. Zod Schema + Form

```typescript
// modules/users/schemas/create-user.schema.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["president", "dean", "dba", "admin"]),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
```

```typescript
// modules/users/components/CreateUserForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, type CreateUserFormData } from "../schemas/create-user.schema";

interface CreateUserFormProps {
  onSubmit: (data: CreateUserFormData) => void;
  isLoading: boolean;
}

export function CreateUserForm({ onSubmit, isLoading }: CreateUserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
```

---

## 5. Zustand Store Slice

```typescript
// store/sidebar.slice.ts
import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));
```

---

## 6. API Client

```typescript
// services/api-client.ts
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { env } from "@/config/env";
import type { AppError } from "@/types/error.types";

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: env.apiBaseUrl,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      const appError: AppError = {
        code:
          error.response?.status === 401
            ? "UNAUTHORIZED"
            : error.response?.status === 403
              ? "FORBIDDEN"
              : error.response?.status >= 500
                ? "SERVER_ERROR"
                : "NETWORK_ERROR",
        message:
          error.response?.data?.message ?? "An unexpected error occurred",
        details: error.response?.data?.errors,
      };
      return Promise.reject(appError);
    },
  );

  return client;
}

export const apiClient = createApiClient();
```

---

## 7. Endpoints

```typescript
// services/endpoints.ts
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  users: {
    list: "/users",
    byId: (id: string) => `/users/${id}`,
    create: "/users",
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  dashboard: {
    stats: "/dashboard/stats",
    recentActivity: "/dashboard/activity",
  },
} as const;
```
