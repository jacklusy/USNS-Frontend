import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "@/modules/users/constants/users.query-keys";
import { userService } from "@/modules/users/services";
import type { UserRole } from "@/types/user.types";

export function useUserAssigneeOptions(roles?: readonly UserRole[]) {
  return useQuery({
    queryKey: [...usersQueryKeys.assignees, roles ?? "all"],
    queryFn: () => userService.listAssigneeOptions({ roles }),
    staleTime: 60_000,
  });
}
