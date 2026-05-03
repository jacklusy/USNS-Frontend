import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell, User, Search, Menu } from 'lucide-react';

interface TopBarProps {
  onToggleMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleMobileMenu }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4 lg:hidden">
        <button 
          onClick={onToggleMobileMenu}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 w-96 border border-transparent focus-within:border-emerald-500 transition-all">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search records, accounts, documents..."
          className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {user?.role}
        </div>

        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold leading-none">{user?.username}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase font-medium tracking-wider">
              {user?.facultyName || 'University Ledger'}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-900 flex items-center justify-center text-white font-bold ring-2 ring-emerald-500 ring-offset-2">
            {user?.username?.[0]?.toUpperCase() || <User size={18} />}
          </div>
        </div>
      </div>
    </header>
  );
};
