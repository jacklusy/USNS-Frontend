import type {
  LoginHistoryEntry,
  LoginHistoryListQueryParams,
} from "@/modules/audit/types/login-history.types";
import type { PaginatedResponse } from "@/types/api.types";

const SEED_LOGIN_HISTORY: LoginHistoryEntry[] = [
  {
    id: "login_001",
    timestamp: "2026-05-31T08:12:00.000Z",
    userId: "usr_dba",
    userName: "Omar Farouk",
    userEmail: "dba@usns.edu",
    ipAddress: "203.0.113.44",
    browser: "Chrome 124",
    device: "Windows desktop",
    locationCountry: "Egypt",
    locationCity: "Cairo",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_002",
    timestamp: "2026-05-31T07:45:00.000Z",
    userId: "usr_admin",
    userName: "James Okonkwo",
    userEmail: "admin@usns.edu",
    ipAddress: "192.168.1.24",
    browser: "Firefox 125",
    device: "macOS laptop",
    locationCountry: "Nigeria",
    locationCity: "Lagos",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_003",
    timestamp: "2026-05-31T06:30:00.000Z",
    userId: "usr_unknown",
    userName: "Unknown",
    userEmail: "intruder@external.net",
    ipAddress: "198.51.100.9",
    browser: "curl",
    device: "Unknown",
    locationCountry: "Russia",
    locationCity: "Moscow",
    result: "failed",
    suspiciousReasons: ["Unusual location", "Multiple failed attempts"],
  },
  {
    id: "login_004",
    timestamp: "2026-05-31T06:28:00.000Z",
    userId: "usr_unknown",
    userName: "Unknown",
    userEmail: "admin@usns.edu",
    ipAddress: "198.51.100.9",
    browser: "curl",
    device: "Unknown",
    locationCountry: "Russia",
    locationCity: "Moscow",
    result: "failed",
    suspiciousReasons: ["Multiple failed attempts"],
  },
  {
    id: "login_005",
    timestamp: "2026-05-31T06:25:00.000Z",
    userId: "usr_unknown",
    userName: "Unknown",
    userEmail: "admin@usns.edu",
    ipAddress: "198.51.100.9",
    browser: "curl",
    device: "Unknown",
    locationCountry: "Russia",
    locationCity: "Moscow",
    result: "blocked",
    suspiciousReasons: ["Brute force threshold exceeded", "Multiple failed attempts"],
  },
  {
    id: "login_006",
    timestamp: "2026-05-30T18:00:00.000Z",
    userId: "usr_president",
    userName: "Dr. Layla Hassan",
    userEmail: "president@usns.edu",
    ipAddress: "10.0.0.12",
    browser: "Safari 17",
    device: "iPad",
    locationCountry: "Egypt",
    locationCity: "Alexandria",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_007",
    timestamp: "2026-05-30T14:10:00.000Z",
    userId: "usr_dean",
    userName: "Sara Mitchell",
    userEmail: "dean@usns.edu",
    ipAddress: "192.168.2.88",
    browser: "Edge 124",
    device: "Windows desktop",
    locationCountry: "United States",
    locationCity: "Boston",
    result: "failed",
    suspiciousReasons: [],
  },
  {
    id: "login_008",
    timestamp: "2026-05-29T09:00:00.000Z",
    userId: "usr_faculty",
    userName: "Elena Vasquez",
    userEmail: "faculty@usns.edu",
    ipAddress: "192.168.4.51",
    browser: "Chrome 123",
    device: "Windows laptop",
    locationCountry: "Spain",
    locationCity: "Madrid",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_009",
    timestamp: "2026-05-28T22:30:00.000Z",
    userId: "usr_admin",
    userName: "James Okonkwo",
    userEmail: "admin@usns.edu",
    ipAddress: "45.33.32.101",
    browser: "Chrome 124",
    device: "Android phone",
    locationCountry: "Singapore",
    locationCity: "Singapore",
    result: "success",
    suspiciousReasons: ["Unusual location"],
  },
  {
    id: "login_010",
    timestamp: "2026-05-27T11:15:00.000Z",
    userId: "usr_dba",
    userName: "Omar Farouk",
    userEmail: "dba@usns.edu",
    ipAddress: "192.168.1.5",
    browser: "Chrome 124",
    device: "Linux workstation",
    locationCountry: "Egypt",
    locationCity: "Cairo",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_011",
    timestamp: "2026-05-26T08:00:00.000Z",
    userId: "usr_unknown",
    userName: "Unknown",
    userEmail: "dba@usns.edu",
    ipAddress: "203.0.113.99",
    browser: "Python requests",
    device: "Server",
    locationCountry: "Brazil",
    locationCity: "São Paulo",
    result: "failed",
    suspiciousReasons: ["Unusual location"],
  },
  {
    id: "login_012",
    timestamp: "2026-05-25T16:45:00.000Z",
    userId: "usr_president",
    userName: "Dr. Layla Hassan",
    userEmail: "president@usns.edu",
    ipAddress: "10.0.0.8",
    browser: "Chrome 124",
    device: "Windows desktop",
    locationCountry: "Egypt",
    locationCity: "Cairo",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_013",
    timestamp: "2026-05-24T13:20:00.000Z",
    userId: "usr_admin",
    userName: "James Okonkwo",
    userEmail: "admin@usns.edu",
    ipAddress: "192.168.1.24",
    browser: "Firefox 125",
    device: "macOS laptop",
    locationCountry: "Nigeria",
    locationCity: "Lagos",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_014",
    timestamp: "2026-05-23T07:55:00.000Z",
    userId: "usr_dean",
    userName: "Sara Mitchell",
    userEmail: "dean@usns.edu",
    ipAddress: "192.168.2.88",
    browser: "Safari 17",
    device: "macOS laptop",
    locationCountry: "United States",
    locationCity: "Boston",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_015",
    timestamp: "2026-05-22T19:10:00.000Z",
    userId: "usr_unknown",
    userName: "Unknown",
    userEmail: "president@usns.edu",
    ipAddress: "185.220.101.4",
    browser: "Tor Browser",
    device: "Unknown",
    locationCountry: "Germany",
    locationCity: "Berlin",
    result: "blocked",
    suspiciousReasons: ["Tor exit node", "Unusual location"],
  },
  {
    id: "login_016",
    timestamp: "2026-05-21T10:30:00.000Z",
    userId: "usr_dba",
    userName: "Omar Farouk",
    userEmail: "dba@usns.edu",
    ipAddress: "192.168.1.5",
    browser: "Chrome 124",
    device: "Linux workstation",
    locationCountry: "Egypt",
    locationCity: "Cairo",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_017",
    timestamp: "2026-05-20T15:00:00.000Z",
    userId: "usr_faculty",
    userName: "Elena Vasquez",
    userEmail: "faculty@usns.edu",
    ipAddress: "192.168.4.51",
    browser: "Chrome 123",
    device: "Windows laptop",
    locationCountry: "Spain",
    locationCity: "Madrid",
    result: "failed",
    suspiciousReasons: [],
  },
  {
    id: "login_018",
    timestamp: "2026-05-19T12:40:00.000Z",
    userId: "usr_admin",
    userName: "James Okonkwo",
    userEmail: "admin@usns.edu",
    ipAddress: "192.168.1.24",
    browser: "Chrome 124",
    device: "Windows desktop",
    locationCountry: "Nigeria",
    locationCity: "Lagos",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_019",
    timestamp: "2026-05-18T08:22:00.000Z",
    userId: "usr_president",
    userName: "Dr. Layla Hassan",
    userEmail: "president@usns.edu",
    ipAddress: "10.0.0.12",
    browser: "Safari 17",
    device: "iPad",
    locationCountry: "Egypt",
    locationCity: "Alexandria",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_020",
    timestamp: "2026-05-17T21:05:00.000Z",
    userId: "usr_unknown",
    userName: "Unknown",
    userEmail: "admin@usns.edu",
    ipAddress: "203.0.113.200",
    browser: "wget",
    device: "Server",
    locationCountry: "China",
    locationCity: "Shanghai",
    result: "failed",
    suspiciousReasons: ["Unusual location", "Multiple failed attempts"],
  },
  {
    id: "login_021",
    timestamp: "2026-05-16T14:18:00.000Z",
    userId: "usr_dba",
    userName: "Omar Farouk",
    userEmail: "dba@usns.edu",
    ipAddress: "203.0.113.44",
    browser: "Chrome 124",
    device: "Windows desktop",
    locationCountry: "Egypt",
    locationCity: "Cairo",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_022",
    timestamp: "2026-05-15T09:50:00.000Z",
    userId: "usr_dean",
    userName: "Sara Mitchell",
    userEmail: "dean@usns.edu",
    ipAddress: "192.168.2.88",
    browser: "Edge 124",
    device: "Windows desktop",
    locationCountry: "United States",
    locationCity: "Boston",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_023",
    timestamp: "2026-05-14T17:33:00.000Z",
    userId: "usr_admin",
    userName: "James Okonkwo",
    userEmail: "admin@usns.edu",
    ipAddress: "192.168.1.24",
    browser: "Firefox 125",
    device: "macOS laptop",
    locationCountry: "Nigeria",
    locationCity: "Lagos",
    result: "failed",
    suspiciousReasons: [],
  },
  {
    id: "login_024",
    timestamp: "2026-05-13T11:00:00.000Z",
    userId: "usr_president",
    userName: "Dr. Layla Hassan",
    userEmail: "president@usns.edu",
    ipAddress: "10.0.0.8",
    browser: "Chrome 124",
    device: "Windows desktop",
    locationCountry: "Egypt",
    locationCity: "Cairo",
    result: "success",
    suspiciousReasons: [],
  },
  {
    id: "login_025",
    timestamp: "2026-05-12T06:15:00.000Z",
    userId: "usr_faculty",
    userName: "Elena Vasquez",
    userEmail: "faculty@usns.edu",
    ipAddress: "192.168.4.51",
    browser: "Chrome 123",
    device: "Windows laptop",
    locationCountry: "Spain",
    locationCity: "Madrid",
    result: "success",
    suspiciousReasons: [],
  },
];

let loginHistoryStore: LoginHistoryEntry[] = structuredClone(SEED_LOGIN_HISTORY);

export function getLoginHistoryStoreCount(): number {
  return loginHistoryStore.length;
}

function matchesDate(
  timestamp: string,
  dateFrom?: string,
  dateTo?: string,
): boolean {
  const day = timestamp.slice(0, 10);
  if (dateFrom && day < dateFrom) return false;
  if (dateTo && day > dateTo) return false;
  return true;
}

function matchesSearch(entry: LoginHistoryEntry, search?: string): boolean {
  if (!search) return true;
  const q = search.toLowerCase();
  return (
    entry.userName.toLowerCase().includes(q) ||
    entry.userEmail.toLowerCase().includes(q)
  );
}

export function filterLoginHistory(
  items: LoginHistoryEntry[],
  params: Omit<LoginHistoryListQueryParams, "page" | "per_page">,
): LoginHistoryEntry[] {
  return items.filter((item) => {
    if (!matchesSearch(item, params.search)) return false;
    if (params.result && item.result !== params.result) return false;
    if (!matchesDate(item.timestamp, params.dateFrom, params.dateTo)) {
      return false;
    }
    return true;
  });
}

export function paginateLoginHistory(
  items: LoginHistoryEntry[],
  page: number,
  perPage: number,
): PaginatedResponse<LoginHistoryEntry> {
  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const start = (safePage - 1) * perPage;
  return {
    data: items.slice(start, start + perPage),
    meta: { total, page: safePage, per_page: perPage, last_page: lastPage },
  };
}

export function listLoginHistoryFromStore(
  params: LoginHistoryListQueryParams,
): PaginatedResponse<LoginHistoryEntry> {
  const filtered = filterLoginHistory(loginHistoryStore, params);
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  return paginateLoginHistory(sorted, params.page, params.per_page);
}

export function listAllLoginHistoryFromStore(
  params: Omit<LoginHistoryListQueryParams, "page" | "per_page">,
): LoginHistoryEntry[] {
  const filtered = filterLoginHistory(loginHistoryStore, params);
  return [...filtered].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}
