import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  MoreVertical, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  PackageOpen,
  Plus
} from 'lucide-react';
import { Announcement, AnnouncementStatus } from '../../types';
import { cn } from '../../lib/utils';
import { Modal } from '../ui/Modal';
import { useNavigate } from 'react-router-dom';

interface AnnouncementTableProps {
  announcements: Announcement[];
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export const AnnouncementTable: React.FC<AnnouncementTableProps> = ({ 
  announcements, 
  onDelete,
  isLoading 
}) => {
  const navigate = useNavigate();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteModalId) return;
    setIsDeleting(true);
    try {
      await onDelete(deleteModalId);
      setIsDeleting(false);
      setDeleteModalId(null);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: AnnouncementStatus) => {
    switch (status) {
      case AnnouncementStatus.PUBLISHED:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Published
          </span>
        );
      case AnnouncementStatus.DRAFT:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  if (announcements.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <PackageOpen size={40} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No announcements found</h3>
        <p className="text-gray-500 max-w-sm mb-8 font-medium">It looks like you haven't broadcasted any updates yet or your filters are too restrictive.</p>
        <button 
          onClick={() => navigate('/dashboard/announcements/create')}
          className="flex items-center gap-2 bg-emerald-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-emerald-900/20 hover:scale-[1.02] transition-all"
        >
          <Plus size={18} />
          Create Your First Announcement
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title & Content</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sent / Modified</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Reach</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Read Rate</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-48 mb-2" /><div className="h-3 bg-gray-50 rounded w-64" /></td>
                  <td className="px-6 py-6"><div className="h-6 bg-gray-100 rounded-full w-20 mx-auto" /></td>
                  <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-32" /></td>
                  <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-16 mx-auto" /></td>
                  <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                  <td className="px-6 py-6"><div className="h-8 bg-gray-100 rounded w-8 ml-auto" /></td>
                </tr>
              ))
            ) : (
              announcements.map((ann) => {
                const readRate = ann.recipientCount > 0 ? (ann.readCount / ann.recipientCount) * 100 : 0;
                
                return (
                  <tr key={ann.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-6">
                      <div className="max-w-xs md:max-w-md">
                        <p className="font-bold text-gray-900 truncate" title={ann.title}>{ann.title}</p>
                        <p className="text-xs text-gray-400 font-medium truncate mt-1">
                          {ann.body.replace(/<[^>]*>/g, '').substring(0, 100)}...
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      {getStatusBadge(ann.status)}
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-xs font-bold text-gray-700">
                        {ann.publishedAt ? format(new Date(ann.publishedAt), 'MMM dd, HH:mm') : '—'}
                      </p>
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter mt-1">
                        Updated {format(new Date(ann.updatedAt), 'dd/MM/yyyy')}
                      </p>
                    </td>
                    <td className="px-6 py-6 text-center font-black text-gray-900 text-sm">
                      {ann.recipientCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-grow h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              readRate > 70 ? "bg-emerald-500" : readRate > 30 ? "bg-amber-500" : "bg-red-400"
                            )}
                            style={{ width: `${readRate}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-black text-gray-700">{Math.round(readRate)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {ann.status === AnnouncementStatus.DRAFT ? (
                          <button 
                            title="Edit Draft"
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            onClick={() => navigate(`/dashboard/announcements/create?id=${ann.id}`)}
                          >
                            <Edit3 size={18} />
                          </button>
                        ) : (
                          <button 
                            title="View Stats"
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                        <button 
                          title="Delete"
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          onClick={() => setDeleteModalId(ann.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <button className="p-2 text-gray-400 lg:hidden focus:ring-2 focus:ring-emerald-500 rounded-lg">
                         <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      <div className="px-6 py-4 bg-gray-50/50 border-t flex items-center justify-between">
        <p className="text-xs font-bold text-gray-400">
          Showing <span className="text-gray-900">1</span> to <span className="text-gray-900">{announcements.length}</span> of <span className="text-gray-900">{announcements.length}</span> entries
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-900 disabled:opacity-30" disabled>
            <ChevronLeft size={18} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-900 text-white font-bold text-xs">
            1
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-900 disabled:opacity-30" disabled>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Modal
        isOpen={!!deleteModalId}
        onClose={() => setDeleteModalId(null)}
        title="Delete Announcement"
        footer={
          <>
            <button
              onClick={() => setDeleteModalId(null)}
              className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/20"
            >
              {isDeleting && <Loader2 size={16} className="animate-spin" />}
              Delete Permanently
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mx-auto">
             <Trash2 size={24} />
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Are you absolutely sure?</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              This action cannot be undone. It will permanently delete the announcement from institutional records and remove it from student feeds.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Loader2 = ({ size, className }: { size: number, className?: string }) => (
  <div className={cn("border-2 border-current border-t-transparent rounded-full", className)} style={{ width: size, height: size }} />
);
