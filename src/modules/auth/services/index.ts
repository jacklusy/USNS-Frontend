import { resolveService } from "@/lib/service-resolver";
import { mockAuthService } from "./auth.service.mock";
import { realAuthService } from "./auth.service.real";

export const authService = resolveService(mockAuthService, realAuthService);

export type { IAuthService } from "./auth.service";
