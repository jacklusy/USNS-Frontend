import { MockServiceBase } from "@/lib/mock-service-base";
import { MOCK_DEPARTMENTS } from "@/mock/users/departments.mock";
import type { ApiResponse } from "@/types/api.types";
import type { IDepartmentsService } from "./departments.service";

export class MockDepartmentsService
  extends MockServiceBase
  implements IDepartmentsService
{
  async list(): Promise<ApiResponse<typeof MOCK_DEPARTMENTS>> {
    await this.delay(150);
    return { data: [...MOCK_DEPARTMENTS] };
  }
}

export const mockDepartmentsService = new MockDepartmentsService();
