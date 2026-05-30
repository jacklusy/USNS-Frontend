import { MockServiceBase } from "@/lib/mock-service-base";
import { MOCK_ROLE_OPTIONS } from "@/mock/users/roles.mock";
import type { ApiResponse } from "@/types/api.types";
import type { IRolesService } from "./roles.service";

export class MockRolesService extends MockServiceBase implements IRolesService {
  async list(): Promise<ApiResponse<typeof MOCK_ROLE_OPTIONS>> {
    await this.delay(150);
    return { data: [...MOCK_ROLE_OPTIONS] };
  }
}

export const mockRolesService = new MockRolesService();
