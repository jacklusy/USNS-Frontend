import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { TopBar } from './TopBar';
import { cn } from '../../utils';

export const DashboardShell: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem('usns_sidebar_collapsed');
    return stored ? JSON.parse(stored) : false;
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('usns_sidebar_collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block transition-all duration-300">
        <SidebarNav collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      </div>

      {/* Mobile Drawer (Overlay) */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-64 h-full bg-gray-50"
            onClick={e => e.stopPropagation()}
          >
            <SidebarNav collapsed={false} setCollapsed={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div 
        className={cn(
          "flex-grow flex flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        <TopBar onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        
        <main className="flex-grow p-6 md:p-10 animate-fade-in">
          <Outlet />
        </main>

        <footer className="py-6 px-10 border-t border-gray-200 text-xs text-gray-500 bg-white">
          <div className="flex justify-between items-center">
            <p>&copy; 2026 Al-Zaytoonah University of Jordan. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
