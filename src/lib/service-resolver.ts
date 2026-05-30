import { env } from "@/config/env";

export function resolveService<T>(mock: T, real: T): T {
  return env.isMockMode ? mock : real;
}
