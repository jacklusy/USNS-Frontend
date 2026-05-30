export type GlobalSearchResultType = "user" | "page" | "action";

export interface GlobalSearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: GlobalSearchResultType;
  href: string;
}
