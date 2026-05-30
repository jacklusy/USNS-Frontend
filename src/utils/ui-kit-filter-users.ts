import type { FilterValues } from "@/types/filter.types";
import type { UiKitUserRow } from "@/types/ui-kit.types";

export function filterUiKitUsers(
  users: readonly UiKitUserRow[],
  values: FilterValues,
): UiKitUserRow[] {
  return users.filter((user) => {
    const query = values.query;
    if (typeof query === "string" && query.trim()) {
      const normalized = query.trim().toLowerCase();
      const matches =
        user.name.toLowerCase().includes(normalized) ||
        user.email.toLowerCase().includes(normalized);
      if (!matches) return false;
    }

    const roles = values.role;
    if (Array.isArray(roles) && roles.length > 0) {
      const roleMatch = roles.some(
        (role) => user.role.toLowerCase() === role.toLowerCase(),
      );
      if (!roleMatch) return false;
    }

    const status = values.status;
    if (typeof status === "string" && status) {
      if (user.status !== status) return false;
    }

    if (values.activeOnly === true && user.status !== "Active") {
      return false;
    }

    return true;
  });
}
