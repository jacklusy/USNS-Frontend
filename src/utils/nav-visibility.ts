import type { NavGroup, NavItem } from "@/constants/navigation.constants";
import type { Permission } from "@/types/permission.types";
import type { UserRole } from "@/types/user.types";

export function isNavItemVisible(
  item: NavItem,
  can: (permission: Permission) => boolean,
  hasAnyRole: (roles: readonly UserRole[]) => boolean,
): boolean {
  if (item.requiredPermission && !can(item.requiredPermission)) {
    return false;
  }
  if (item.allowedRoles && !hasAnyRole(item.allowedRoles)) {
    return false;
  }
  return true;
}

function filterNavItem(
  item: NavItem,
  can: (permission: Permission) => boolean,
  hasAnyRole: (roles: readonly UserRole[]) => boolean,
): NavItem | null {
  if (!isNavItemVisible(item, can, hasAnyRole)) {
    return null;
  }

  if (!item.children?.length) {
    return item;
  }

  const children = item.children
    .map((child) => filterNavItem(child, can, hasAnyRole))
    .filter((child): child is NavItem => child !== null);

  if (children.length === 0) {
    return null;
  }

  return { ...item, children: children as readonly NavItem[] };
}

export function filterNavGroups(
  groups: readonly NavGroup[],
  can: (permission: Permission) => boolean,
  hasAnyRole: (roles: readonly UserRole[]) => boolean,
): NavGroup[] {
  const result: NavGroup[] = [];

  for (const group of groups) {
    const items = group.items
      .map((item) => filterNavItem(item, can, hasAnyRole))
      .filter((item): item is NavItem => item !== null);

    if (items.length > 0) {
      result.push({
        id: group.id,
        label: group.label,
        items,
      });
    }
  }

  return result;
}
