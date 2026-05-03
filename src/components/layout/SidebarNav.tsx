import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getNavItems } from '../../utils/navConfig';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

interface SidebarNavProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navItems = user ? getNavItems(user.role) : [];
  
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-gray-50 text-gray-900 transition-all duration-300 z-50 flex flex-col border-r border-gray-200 shadow-sm",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Section from Image */}
      <div className="p-8 pb-10">
        {!collapsed && (
          <div className="space-y-4">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
               {/* Minimal Logo representation */}
               <div className="w-8 h-8 rounded-full border-2 border-emerald-800 flex items-center justify-center font-black text-xs text-emerald-900">Z</div>
             </div>
             <div className="space-y-1">
               <h1 className="text-lg font-black text-gray-900 leading-tight">The Academic <br/> Ledger</h1>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Portal</p>
             </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm mx-auto">
             <div className="w-6 h-6 border-2 border-emerald-800 rounded-full flex items-center justify-center font-black text-[10px] text-emerald-900">Z</div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-grow py-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => cn(
              "flex items-center px-8 py-3 transition-all relative group",
              isActive ? "bg-white text-emerald-700" : "text-gray-500 hover:text-emerald-700 hover:bg-gray-100/50"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={cn("min-w-[20px]", isActive ? "text-emerald-700" : "group-hover:text-emerald-700")} />
                {!collapsed && (
                  <span className={cn("ml-4 text-sm font-bold tracking-tight", isActive ? "text-gray-900" : "")}>
                    {item.label}
                  </span>
                )}
                {isActive && (
                  <div className="absolute right-0 top-2 bottom-2 w-1 bg-emerald-700 rounded-l-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Controls */}
      <div className="p-4 mt-auto">
        {!collapsed && (
          <div className="mb-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
             <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               System Integrity
             </p>
             <p className="text-[9px] text-emerald-600 mt-1 font-bold italic">All nodes verified</p>
          </div>
        )}
        <button 
          onClick={logout}
          className={cn(
            "flex items-center w-full px-4 py-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-4 text-sm font-bold">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
