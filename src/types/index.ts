/**
 * Global TypeScript Types for USNS
 */

export enum UserRole {
  PRESIDENT = 'PRESIDENT',
  DEAN = 'DEAN',
  HOD = 'HOD',
  DBA = 'DBA',
  STUDENT = 'STUDENT',
}

export enum AnnouncementStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  DELETED = 'DELETED',
}

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  GRADUATED = 'GRADUATED',
  WITHDRAWN = 'WITHDRAWN',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  facultyId?: string;
  facultyName?: string;
  departmentId?: string;
  departmentName?: string;
  isFirstLogin: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  facultyId: string;
  activeStudentCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  status: AnnouncementStatus;
  senderRole: UserRole;
  senderId: string;
  targetFaculties?: string[];
  targetDepartments?: string[];
  targetAcademicYears?: string[];
  publishedAt?: string;
  recipientCount: number;
  readCount: number;
  updatedAt: string;
}

export interface DashboardStats {
  totalSent: number;
  activeStudentsInScope: number;
  overallReadRate: number;
  mostRecentActivity?: string;
}

export interface DBAStats {
  totalUsers: Record<UserRole, number>;
  systemUptime: number;
  lastBackup: string;
  pendingSync: boolean;
  lastSyncTime: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorUsername: string;
  actorRole: UserRole;
  action: string;
  targetDescription: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface StaffAccount {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  faculty?: string;
  department?: string;
  isActive: boolean;
  isFirstLogin: boolean;
}
