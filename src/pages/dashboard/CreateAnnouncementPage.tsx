import React from 'react';
import { motion } from 'motion/react';
import { Megaphone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnnouncementForm } from '../../components/dashboard/AnnouncementForm';

const CreateAnnouncementPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/dashboard/announcements')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm mb-6 transition-colors group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Announcements
      </motion.button>

      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-emerald-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
            <Megaphone size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Announcement</h1>
            <p className="text-gray-500 font-medium tracking-tight">Draft and broadcast notifications to your institutional audience.</p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AnnouncementForm />
      </motion.div>
    </div>
  );
};

export default CreateAnnouncementPage;
