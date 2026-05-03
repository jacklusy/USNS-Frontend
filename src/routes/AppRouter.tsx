import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { UserRole } from '../types';
import UserLoginPage from '../pages/auth/UserLoginPage';
import { DashboardShell } from '../components/layout/DashboardShell';
import DashboardHomePage from '../pages/dashboard/DashboardHomePage';
import ManageAnnouncementsPage from '../pages/dashboard/ManageAnnouncementsPage';
import CreateAnnouncementPage from '../pages/dashboard/CreateAnnouncementPage';

// Placeholder Pages
const Statistics = () => <div className="p-8"><h1>Statistics</h1></div>;
const OrgOverview = () => <div className="p-8"><h1>Organization Overview</h1></div>;
const AccountManagement = () => <div className="p-8"><h1>Account Management</h1></div>;
const AuditLog = () => <div className="p-8"><h1>Audit Log</h1></div>;
const SystemAdmin = () => <div className="p-8"><h1>System Administration</h1></div>;
const ChangePassword = () => <div className="p-8"><h1>Force Change Password</h1></div>;
const Unauthorized = () => <div className="p-8"><h1>Access Denied</h1></div>;
const NotFound = () => <div className="p-8"><h1>404 - Not Found</h1></div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login/user',
    element: <UserLoginPage />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '/change-password',
    element: <ProtectedRoute />, // Just need isAuthenticated for this
    children: [
      { path: '', element: <ChangePassword /> }
    ]
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <DashboardShell />,
        children: [
          { path: '', element: <DashboardHomePage /> },
          { 
            path: 'announcements', 
            element: <ProtectedRoute allowedRoles={[UserRole.PRESIDENT, UserRole.DEAN, UserRole.HOD]} />,
            children: [
              { path: '', element: <ManageAnnouncementsPage /> },
              { path: 'create', element: <CreateAnnouncementPage /> }
            ]
          },
          { 
            path: 'stats', 
            element: <ProtectedRoute allowedRoles={[UserRole.PRESIDENT, UserRole.DEAN, UserRole.HOD]} />,
            children: [{ path: '', element: <Statistics /> }]
          },
          { 
            path: 'overview', 
            element: <ProtectedRoute allowedRoles={[UserRole.PRESIDENT, UserRole.DEAN, UserRole.HOD]} />,
            children: [{ path: '', element: <OrgOverview /> }]
          },
          { 
            path: 'accounts', 
            element: <ProtectedRoute allowedRoles={[UserRole.PRESIDENT, UserRole.DBA]} />,
            children: [{ path: '', element: <AccountManagement /> }]
          },
          { 
            path: 'audit-log', 
            element: <ProtectedRoute allowedRoles={[UserRole.PRESIDENT, UserRole.DBA]} />,
            children: [{ path: '', element: <AuditLog /> }]
          },
          { 
            path: 'system-admin', 
            element: <ProtectedRoute allowedRoles={[UserRole.DBA]} />,
            children: [{ path: '', element: <SystemAdmin /> }]
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
