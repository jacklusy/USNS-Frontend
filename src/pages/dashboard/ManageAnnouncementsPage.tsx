import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { AnnouncementTable } from '../../components/dashboard/AnnouncementTable';
import { Announcement, AnnouncementStatus } from '../../types';
import { announcementService } from '../../services/announcementService';

const ManageAnnouncementsPage: React.FC = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | AnnouncementStatus>('ALL');

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const data = await announcementService.getAnnouncements();
      setAnnouncements(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDelete = async (id: string) => {
    // Optimistic UI update
    const previousAnnouncements = [...announcements];
    setAnnouncements(announcements.filter(a => a.id !== id));
    
    try {
      await announcementService.deleteAnnouncement(id);
    } catch (error) {
      // Rollback
      setAnnouncements(previousAnnouncements);
    }
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || ann.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Announcement Management</h1>
          <p className="text-gray-500 font-medium tracking-tight mt-1">Institutional broadcasting control and delivery oversight.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/announcements/create')}
          className="flex items-center justify-center gap-3 bg-emerald-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-900/20 hover:bg-emerald-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={20} strokeWidth={3} />
          Create New
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col xl:flex-row gap-4 items-stretch">
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by announcement title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-semibold"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 xl:pb-0 no-scrollbar">
          <div className="flex bg-white p-1 rounded-xl border shadow-sm">
            {(['ALL', AnnouncementStatus.PUBLISHED, AnnouncementStatus.DRAFT] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                  statusFilter === status 
                    ? "bg-emerald-900 text-white shadow-lg shadow-emerald-900/20" 
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                {status}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-400 hover:text-emerald-900 transition-all font-black text-[10px] uppercase tracking-widest">
            <Calendar size={16} />
            Date Range
          </button>
          
          <button className="flex items-center gap-2 px-4 py-3.5 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-400 hover:text-emerald-900 transition-all font-black">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AnnouncementTable 
          announcements={filteredAnnouncements} 
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Secondary Stats/Info Section */}
      {!isLoading && announcements.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.2em] mb-1">Average Open Rate</p>
                <h4 className="text-3xl font-black text-emerald-900">84.2%</h4>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                <ArrowRight size={20} className="-rotate-45" />
              </div>
           </div>
           
           <div className="bg-white p-6 rounded-3xl border flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Active Drafts</p>
                <h4 className="text-3xl font-black text-gray-900">
                  {announcements.filter(a => a.status === AnnouncementStatus.DRAFT).length}
                </h4>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                <Layers size={20} />
              </div>
           </div>

           <div className="bg-white p-6 rounded-3xl border flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Institutional Reach</p>
                <h4 className="text-3xl font-black text-gray-900">12.5k</h4>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                <Megaphone size={20} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ManageAnnouncementsPage;
