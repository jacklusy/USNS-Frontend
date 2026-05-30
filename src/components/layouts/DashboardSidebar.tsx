"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Inbox,
  FileText,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  ScrollText,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  DASHBOARD_NAV_GROUPS,
  type NavIconKey,
  type NavItem,
} from "@/constants/navigation.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { useUiStore } from "@/store/ui.slice";
import { isNavHrefActive, isNavItemActive } from "@/utils/nav-active";
import { filterNavGroups } from "@/utils/nav-visibility";

const NAV_ICON_MAP: Record<NavIconKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  settings: Settings,
  reports: FileText,
  users: Users,
  audit: ScrollText,
  bell: Bell,
  inbox: Inbox,
};

interface DashboardSidebarProps {
  variant: "desktop" | "mobile";
  showLabels: boolean;
}

function NavLinkRow({
  item,
  pathname,
  showLabels,
  indent = false,
}: {
  item: NavItem;
  pathname: string;
  showLabels: boolean;
  indent?: boolean;
}) {
  if (!item.href) {
    return null;
  }

  const Icon = NAV_ICON_MAP[item.icon];
  const isActive = isNavHrefActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      className={`flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        indent ? "pl-9" : ""
      } ${
        isActive
          ? "bg-usns-green-light text-brand"
          : "text-muted-fg hover:bg-usns-green-light/60 hover:text-foreground"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
      {showLabels ? (
        <span className="truncate">{item.label}</span>
      ) : (
        <span className="sr-only">{item.label}</span>
      )}
    </Link>
  );
}

function NavItemRow({
  item,
  pathname,
  showLabels,
}: {
  item: NavItem;
  pathname: string;
  showLabels: boolean;
}) {
  const hasChildren = Boolean(item.children?.length);
  const isActive = isNavItemActive(pathname, item);
  const [expanded, setExpanded] = useState(() => isActive);

  if (!hasChildren && item.href) {
    return <NavLinkRow item={item} pathname={pathname} showLabels={showLabels} />;
  }

  if (!hasChildren) {
    return null;
  }

  const Icon = NAV_ICON_MAP[item.icon];
  const groupId = `nav-group-${item.label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      <button
        type="button"
        id={`${groupId}-trigger`}
        aria-expanded={expanded}
        aria-controls={`${groupId}-panel`}
        className={`flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          isActive
            ? "bg-usns-green-light text-brand"
            : "text-muted-fg hover:bg-usns-green-light/60 hover:text-foreground"
        }`}
        onClick={() => setExpanded((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && expanded) {
            event.preventDefault();
            setExpanded(false);
          }
        }}
      >
        <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        {showLabels ? (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </>
        ) : (
          <span className="sr-only">{item.label}</span>
        )}
      </button>
      <div
        id={`${groupId}-panel`}
        role="region"
        aria-labelledby={`${groupId}-trigger`}
        className={`grid transition-[grid-template-rows] duration-200 ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 py-1">
            {item.children?.map((child) => (
              <NavLinkRow
                key={child.href ?? child.label}
                item={child}
                pathname={pathname}
                showLabels={showLabels}
                indent
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarNav({
  showLabels,
  navRef,
}: {
  showLabels: boolean;
  navRef?: RefObject<HTMLElement | null>;
}) {
  const pathname = usePathname();
  const { can, hasAnyRole } = usePermissions();
  const groups = filterNavGroups(DASHBOARD_NAV_GROUPS, can, hasAnyRole);

  return (
    <nav
      ref={navRef}
      className="flex flex-1 flex-col gap-4 overflow-y-auto p-2"
      aria-label="Main"
    >
      {groups.map((group) => (
        <div key={group.id}>
          {showLabels ? (
            <p className="mb-1 px-3 text-[12px] font-medium uppercase tracking-widest text-muted-fg">
              {group.label}
            </p>
          ) : (
            <span className="sr-only">{group.label}</span>
          )}
          <div className="flex flex-col gap-1">
            {group.items.map((item) => (
              <NavItemRow
                key={`${pathname}-${item.href ?? item.label}`}
                item={item}
                pathname={pathname}
                showLabels={showLabels}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function DashboardSidebar({
  variant,
  showLabels,
}: DashboardSidebarProps) {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const mobileSidebarOpen = useUiStore((s) => s.mobileSidebarOpen);
  const setMobileSidebarOpen = useUiStore((s) => s.setMobileSidebarOpen);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const closeMobile = useCallback(() => {
    setMobileSidebarOpen(false);
  }, [setMobileSidebarOpen]);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (variant !== "mobile" || !mobileSidebarOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobile();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const firstLink = navRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [variant, mobileSidebarOpen, closeMobile]);

  if (variant === "mobile") {
    if (!mobileSidebarOpen) {
      return null;
    }

    return (
      <>
        <button
          type="button"
          className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
          aria-label="Close navigation menu"
          onClick={closeMobile}
        />
        <aside
          className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-border bg-surface-elevated transition-transform duration-200 lg:hidden"
          aria-label="Main navigation"
        >
          <div className="flex h-14 items-center border-b border-border px-4">
            <span className="text-sm font-semibold text-foreground">USNS</span>
          </div>
          <SidebarNav showLabels navRef={navRef} />
        </aside>
      </>
    );
  }

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-border bg-surface-elevated transition-[width] duration-200 lg:flex ${
        sidebarOpen ? "w-60" : "w-16"
      }`}
      aria-label="Main navigation"
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-3">
        {showLabels ? (
          <span className="text-sm font-semibold text-foreground">USNS</span>
        ) : (
          <span className="sr-only">USNS</span>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </div>
      <SidebarNav showLabels={showLabels} />
    </aside>
  );
}
