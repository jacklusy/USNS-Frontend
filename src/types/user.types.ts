export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Suspended = "suspended",
}

export type UserRole =
  | "president"
  | "dean"
  | "dba"
  | "admin"
  | "faculty"
  | "staff";
