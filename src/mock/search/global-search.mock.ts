import type { LucideIcon } from "lucide-react";
import { FileText, User, Zap } from "lucide-react";
import type {
  GlobalSearchResult,
  GlobalSearchResultType,
} from "@/types/global-search.types";

const MOCK_RESULTS: GlobalSearchResult[] = [
  {
    id: "gs_1",
    title: "Ahmed Al-Rashidi",
    subtitle: "president@usns.edu · President",
    type: "user",
    href: "/dashboard",
  },
  {
    id: "gs_2",
    title: "Sara Mitchell",
    subtitle: "sara@usns.edu · Dean",
    type: "user",
    href: "/dashboard",
  },
  {
    id: "gs_3",
    title: "Users management",
    subtitle: "Manage accounts and roles",
    type: "page",
    href: "/dashboard",
  },
  {
    id: "gs_4",
    title: "Announcements",
    subtitle: "View and publish announcements",
    type: "page",
    href: "/announcements",
  },
  {
    id: "gs_5",
    title: "Create announcement",
    subtitle: "Quick action",
    type: "action",
    href: "/announcements",
  },
  {
    id: "gs_6",
    title: "Settings",
    subtitle: "System configuration",
    type: "page",
    href: "/settings",
  },
  {
    id: "gs_7",
    title: "James Okonkwo",
    subtitle: "james@usns.edu · DBA",
    type: "user",
    href: "/dashboard",
  },
  {
    id: "gs_8",
    title: "Export selected users",
    subtitle: "Bulk action",
    type: "action",
    href: "/dashboard",
  },
];

const TYPE_ICONS: Record<GlobalSearchResultType, LucideIcon> = {
  user: User,
  page: FileText,
  action: Zap,
};

export function getGlobalSearchTypeIcon(
  type: GlobalSearchResultType,
): LucideIcon {
  return TYPE_ICONS[type];
}

export async function searchGlobalMock(
  query: string,
): Promise<GlobalSearchResult[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, 120);
  });
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return MOCK_RESULTS.slice(0, 5);
  }
  return MOCK_RESULTS.filter(
    (item) =>
      item.title.toLowerCase().includes(normalized) ||
      item.subtitle.toLowerCase().includes(normalized),
  );
}
