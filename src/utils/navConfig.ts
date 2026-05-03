import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  GraduationCap, 
  Megaphone, 
  FileBarChart2, 
  Settings
} from 'lucide-react';
import { UserRole } from '../types';

export interface NavItem {
  label: string;
  icon: any;
  path: string;
  allowedRoles: UserRole[];
}

const ALL_STAFF = [UserRole.PRESIDENT, UserRole.DEAN, UserRole.HOD, UserRole.DBA];

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    allowedRoles: ALL_STAFF,
  },
  {
    label: 'Users',
    icon: Users,
    path: '/dashboard/users',
    allowedRoles: ALL_STAFF,
  },
  {
    label: 'Faculties',
    icon: Building2,
    path: '/dashboard/faculties',
    allowedRoles: ALL_STAFF,
  },
  {
    label: 'Department',
    icon: GraduationCap,
    path: '/dashboard/departments',
    allowedRoles: ALL_STAFF,
  },
  {
    label: 'Announcements',
    icon: Megaphone,
    path: '/dashboard/announcements',
    allowedRoles: ALL_STAFF,
  },
  {
    label: 'Reports',
    icon: FileBarChart2,
    path: '/dashboard/reports',
    allowedRoles: ALL_STAFF,
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/dashboard/settings',
    allowedRoles: ALL_STAFF,
  },
];

export function getNavItems(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter(item => item.allowedRoles.includes(role));
}
