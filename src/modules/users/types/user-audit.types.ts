export type UserAuditActionType =
  | "status_changed"
  | "created"
  | "updated"
  | "login"
  | "viewed";

export interface UserAuditEntry {
  id: string;
  userId: string;
  actorName: string;
  action: string;
  actionType: UserAuditActionType;
  description: string;
  createdAt: string;
}

export interface UserActivityQueryParams {
  page?: number;
  per_page?: number;
}
