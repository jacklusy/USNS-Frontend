import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { env } from "@/config/env";
import { mockAuthService } from "@/modules/auth/services/auth.service.mock";
import { triggerSessionExpired } from "@/lib/session-handler";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AppError, AppErrorCode } from "@/types/error.types";
import { tokenStorage } from "@/utils/token-storage";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface LaravelErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

interface RefreshTokenPayload {
  access_token: string;
  refresh_token?: string;
}

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

function mapStatusToCode(status: number | undefined): AppErrorCode {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 422) return "VALIDATION_ERROR";
  if (status !== undefined && status >= 500) return "SERVER_ERROR";
  return "NETWORK_ERROR";
}

function toAppError(error: AxiosError<LaravelErrorBody>): AppError {
  const status = error.response?.status;
  return {
    code: mapStatusToCode(status),
    message:
      error.response?.data?.message ??
      error.message ??
      "An unexpected error occurred",
    details: error.response?.data?.errors,
  };
}

function isRefreshRequest(url: string | undefined): boolean {
  if (!url) return false;
  return url.includes(ENDPOINTS.auth.refresh);
}

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: env.apiBaseUrl,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(async (config) => {
    if (env.isMockMode) {
      if (isRefreshRequest(config.url)) {
        const body =
          typeof config.data === "object" && config.data !== null
            ? (config.data as { refresh_token?: string })
            : undefined;
        const refreshToken =
          body?.refresh_token ?? tokenStorage.getRefreshToken() ?? "";

        try {
          const response = await mockAuthService.refreshTokens(refreshToken);
          const payload = response.data;
          config.adapter = () =>
            Promise.resolve({
              data: { data: payload },
              status: 200,
              statusText: "OK",
              headers: {},
              config,
              request: {},
            });
        } catch {
          tokenStorage.clearTokens();
          triggerSessionExpired();
          return Promise.reject({
            code: "UNAUTHORIZED",
            message: "Session expired. Please sign in again.",
          } satisfies AppError);
        }
        return config;
      }

      const mockError: AppError = {
        code: "NETWORK_ERROR",
        message:
          "API requests are disabled in mock mode. Use mock service implementations.",
      };
      return Promise.reject(mockError);
    }

    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: unknown) => {
      if (isAppError(error)) {
        return Promise.reject(error);
      }

      const axiosError = error as AxiosError<LaravelErrorBody>;
      const originalRequest = axiosError.config as
        | RetryableRequestConfig
        | undefined;

      if (
        axiosError.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !isRefreshRequest(originalRequest.url)
      ) {
        originalRequest._retry = true;
        const refreshToken = tokenStorage.getRefreshToken();

        if (refreshToken) {
          try {
            const refreshResponse = await client.post<
              ApiResponse<RefreshTokenPayload>
            >(ENDPOINTS.auth.refresh, { refresh_token: refreshToken });
            const payload = refreshResponse.data.data;

            tokenStorage.setTokens({
              accessToken: payload.access_token,
              refreshToken: payload.refresh_token ?? refreshToken,
            });

            originalRequest.headers.Authorization = `Bearer ${payload.access_token}`;
            return client(originalRequest);
          } catch {
            tokenStorage.clearTokens();
            triggerSessionExpired();
          }
        } else {
          tokenStorage.clearTokens();
          triggerSessionExpired();
        }
      }

      return Promise.reject(toAppError(axiosError));
    },
  );

  return client;
}

export const apiClient = createApiClient();

export async function get<T>(url: string): Promise<T> {
  const response = await apiClient.get<ApiResponse<T>>(url);
  return response.data.data;
}

export async function getPaginated<T>(
  url: string,
): Promise<PaginatedResponse<T>> {
  const response = await apiClient.get<PaginatedResponse<T>>(url);
  return response.data;
}

export async function post<T, B = unknown>(url: string, body?: B): Promise<T> {
  const response = await apiClient.post<ApiResponse<T>>(url, body);
  return response.data.data;
}

export async function put<T, B = unknown>(url: string, body?: B): Promise<T> {
  const response = await apiClient.put<ApiResponse<T>>(url, body);
  return response.data.data;
}

export async function patch<T, B = unknown>(url: string, body?: B): Promise<T> {
  const response = await apiClient.patch<ApiResponse<T>>(url, body);
  return response.data.data;
}

export async function del(url: string): Promise<void> {
  await apiClient.delete(url);
}
