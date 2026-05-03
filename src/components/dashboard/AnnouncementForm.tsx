import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
  Send, 
  Save, 
  Users, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole, AnnouncementStatus } from '../../types';
import { cn } from '../../lib/utils';
import { useRecipientCount } from '../../hooks/useRecipientCount';
import { FACULTIES, DEPARTMENTS, ACADEMIC_YEARS, announcementService } from '../../services/announcementService';
import { Modal } from '../ui/Modal';
import { useNavigate } from 'react-router-dom';

const announcementSchema = z.object({
  title: z.string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must not exceed 200 characters"),
  body: z.string()
    .min(20, "Content must be at least 20 characters (excluding HTML labels)"),
  targetFaculties: z.array(z.string()).optional(),
  targetDepartments: z.array(z.string()).optional(),
  targetAcademicYears: z.array(z.string()).min(1, "At least one academic year must be selected"),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

interface AnnouncementFormProps {
  initialData?: any;
}

export const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ initialData }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'audience'>('content');

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: initialData || {
      title: '',
      body: '',
      targetFaculties: user?.role === UserRole.PRESIDENT ? [] : (user?.facultyId ? [user.facultyId] : []),
      targetDepartments: user?.role === UserRole.HOD ? (user?.departmentId ? [user.departmentId] : []) : [],
      targetAcademicYears: ['2023', '2024'],
    }
  });

  const watchedFilters = watch();
  const { count: recipientCount, isLoading: isCountLoading } = useRecipientCount({
    faculties: watchedFilters.targetFaculties,
    departments: watchedFilters.targetDepartments,
    academicYears: watchedFilters.targetAcademicYears
  });

  const titleValue = watch('title');

  const handlePublish = (data: AnnouncementFormValues) => {
    setIsConfirmModalOpen(true);
  };

  const confirmPublish = async () => {
    const data = watch();
    setIsSubmitting(true);
    try {
      await announcementService.createAnnouncement({
        ...data,
        status: AnnouncementStatus.PUBLISHED,
        senderRole: user?.role,
        senderId: user?.id
      });
      setIsSubmitting(false);
      setIsConfirmModalOpen(false);
      navigate('/dashboard/announcements');
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    const data = watch();
    if (!data.title) return; // Simple check for draft
    setIsSubmitting(true);
    try {
      await announcementService.createAnnouncement({
        ...data,
        status: AnnouncementStatus.DRAFT,
        senderRole: user?.role,
        senderId: user?.id
      });
      setIsSubmitting(false);
      navigate('/dashboard/announcements');
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const availableDepts = useMemo(() => {
    if (user?.role === UserRole.PRESIDENT) {
      if (!watchedFilters.targetFaculties || watchedFilters.targetFaculties.length === 0) {
        return DEPARTMENTS;
      }
      return DEPARTMENTS.filter(d => watchedFilters.targetFaculties?.includes(d.facultyId));
    }
    if (user?.role === UserRole.DEAN) {
      return DEPARTMENTS.filter(d => d.facultyId === user.facultyId);
    }
    return DEPARTMENTS.filter(d => d.id === user?.departmentId);
  }, [user, watchedFilters.targetFaculties]);

  return (
    <form onSubmit={handleSubmit(handlePublish)} className="space-y-8 pb-20">
      {/* Header Tabs */}
      <div className="flex border-b">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={cn(
            "px-6 py-4 text-sm font-bold border-b-2 transition-all",
            activeTab === 'content' ? "border-emerald-600 text-emerald-900" : "border-transparent text-gray-500 hover:text-gray-700"
          )}
        >
          1. Announcement Content
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('audience')}
          className={cn(
            "px-6 py-4 text-sm font-bold border-b-2 transition-all",
            activeTab === 'audience' ? "border-emerald-600 text-emerald-900" : "border-transparent text-gray-500 hover:text-gray-700"
          )}
        >
          2. Audience Targeting
        </button>
      </div>

      <div className={cn("space-y-6", activeTab !== 'content' && "hidden")}>
        {/* Title Field */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Announcement Title</label>
            <span className={cn(
              "text-[10px] font-bold",
              titleValue.length > 190 ? "text-red-500" : "text-gray-400"
            )}>
              {titleValue.length}/200
            </span>
          </div>
          <input
            {...register('title')}
            placeholder="Enter a descriptive title for this announcement..."
            className={cn(
              "w-full px-6 py-4 bg-gray-50 border rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-semibold",
              errors.title && "border-red-300 bg-red-50"
            )}
          />
          {errors.title && <p className="mt-2 text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.title.message}</p>}
        </div>

        {/* Body Field */}
        <div>
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block mb-2">Announcement Body</label>
          <div className={cn(
            "rounded-xl overflow-hidden border",
            errors.body && "border-red-300"
          )}>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <ReactQuill 
                  theme="snow" 
                  value={field.value} 
                  onChange={field.onChange}
                  style={{ height: '300px', marginBottom: '42px' }}
                />
              )}
            />
          </div>
          {errors.body && <p className="mt-2 text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.body.message}</p>}
        </div>
      </div>

      <div className={cn("space-y-8", activeTab !== 'audience' && "hidden")}>
        {/* Audience Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Faculty Selector */}
          <div>
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block mb-4">Target Faculties</label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-xl border">
              {(user?.role === UserRole.PRESIDENT) ? (
                FACULTIES.map(f => (
                  <label key={f.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      value={f.id}
                      checked={watchedFilters.targetFaculties?.includes(f.id)}
                      onChange={(e) => {
                        const current = watchedFilters.targetFaculties || [];
                        if (e.target.checked) setValue('targetFaculties', [...current, f.id]);
                        else setValue('targetFaculties', current.filter(id => id !== f.id));
                      }}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">{f.name}</span>
                  </label>
                ))
              ) : (
                <div className="flex items-center gap-2 p-2 text-sm font-bold text-emerald-900 bg-emerald-50 rounded-lg">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {FACULTIES.find(f => f.id === user?.facultyId)?.name || 'Your Faculty'}
                </div>
              )}
            </div>
          </div>

          {/* Department Selector */}
          <div>
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block mb-4">Target Departments</label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-xl border">
              {(user?.role === UserRole.PRESIDENT || user?.role === UserRole.DEAN) ? (
                availableDepts.length > 0 ? (
                  availableDepts.map(d => (
                    <label key={d.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        value={d.id}
                        checked={watchedFilters.targetDepartments?.includes(d.id)}
                        onChange={(e) => {
                          const current = watchedFilters.targetDepartments || [];
                          if (e.target.checked) setValue('targetDepartments', [...current, d.id]);
                          else setValue('targetDepartments', current.filter(id => id !== d.id));
                        }}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">{d.name}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 p-2 italic">Select a faculty first</p>
                )
              ) : (
                <div className="flex items-center gap-2 p-2 text-sm font-bold text-emerald-900 bg-emerald-50 rounded-lg">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {DEPARTMENTS.find(d => d.id === user?.departmentId)?.name || 'Your Department'}
                </div>
              )}
            </div>
          </div>

          {/* Academic Year Selector */}
          <div>
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block mb-4">Target Intake Years</label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-xl border">
              {ACADEMIC_YEARS.map(year => (
                <label key={year} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    value={year}
                    checked={watchedFilters.targetAcademicYears?.includes(year)}
                    onChange={(e) => {
                      const current = watchedFilters.targetAcademicYears || [];
                      if (e.target.checked) setValue('targetAcademicYears', [...current, year]);
                      else setValue('targetAcademicYears', current.filter(y => y !== year));
                    }}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Class of {year}</span>
                </label>
              ))}
            </div>
            {errors.targetAcademicYears && <p className="mt-2 text-xs font-bold text-red-500">{errors.targetAcademicYears.message}</p>}
          </div>
        </div>

        {/* Live Recipient Count */}
        <div className="bg-gray-900 p-6 rounded-2xl text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Users size={24} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Estimated Reach</p>
              {isCountLoading ? (
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 mt-1">
                  <Loader2 size={14} className="animate-spin" />
                  Calculating...
                </div>
              ) : (
                <p className="text-xl font-black">
                  {recipientCount?.toLocaleString() || 0} <span className="text-gray-400 text-sm font-bold">Students</span>
                </p>
              )}
            </div>
          </div>
          <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-medium text-gray-400 max-w-[200px] text-right">
            Based on your active role filters and enrollment database.
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white/80 backdrop-blur-md border-t p-4 flex items-center justify-between z-10">
        <div className="hidden sm:block">
           <p className="text-xs font-bold text-gray-400 flex items-center gap-2">
             <Info size={14} />
             Review all details before publishing to students.
           </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSubmitting || !titleValue}
            className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            Save Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-8 py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            Publish Now
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Publication"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(false)}
              className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmPublish}
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
              Confirm & Publish
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            You are about to publish an announcement. This action will send notifications to all targeted students.
          </p>
          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
             <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Title</p>
               <p className="text-sm font-bold text-gray-900">{titleValue}</p>
             </div>
             <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Audience</p>
               <p className="text-sm font-bold text-emerald-900">{recipientCount?.toLocaleString() || 0} Recipients</p>
             </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg text-amber-800 text-xs font-medium">
             <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
             Once published, announcements cannot be edited. They can only be deleted.
          </div>
        </div>
      </Modal>
    </form>
  );
};
