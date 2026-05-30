export function isNavHrefActive(pathname: string, href: string): boolean {
  if (pathname === href) {
    return true;
  }
  return pathname.startsWith(`${href}/`);
}

export function isNavItemActive(
  pathname: string,
  item: { href?: string; children?: readonly { href?: string }[] },
): boolean {
  if (item.href && isNavHrefActive(pathname, item.href)) {
    return true;
  }
  if (item.children) {
    return item.children.some(
      (child) => child.href && isNavHrefActive(pathname, child.href),
    );
  }
  return false;
}
