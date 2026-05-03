import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  Users, 
  GraduationCap, 
  ClipboardCheck, 
  TrendingUp, 
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Award,
  ShieldCheck,
  Building2,
  BarChart3,
  Search,
  Bell
} from 'lucide-react';
import { formatNumber, cn } from '../../utils';

const StatCard = ({ title, value, trend, trendValue, icon: Icon, colorClass, live, subtitle }: any) => (
  <div className={cn("bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative overflow-hidden group min-h-[160px] flex flex-col justify-between", colorClass)}>
    <div className="flex justify-between items-start">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 text-emerald-800")}>
        <Icon size={20} />
      </div>
      {live && (
        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
          <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
          Live
        </span>
      )}
    </div>
    
    <div>
      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-2xl font-black tracking-tight">{value}</h3>
      {subtitle && <p className="text-[9px] font-bold uppercase mt-1 opacity-50 tracking-tighter">{subtitle}</p>}
      
      {trend && (
        <div className="flex items-center gap-1 mt-3">
          {trend === 'up' ? (
            <ArrowUpRight size={12} className="opacity-70" />
          ) : (
            <ArrowDownRight size={12} className="opacity-70" />
          )}
          <span className="text-[10px] font-black uppercase">
            {trendValue}
          </span>
        </div>
      )}
    </div>
    
    {title === 'Faculty Retention' && (
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-emerald-900/10">
        <div className="h-full bg-emerald-800 w-[96.8%]" />
      </div>
    )}
  </div>
);

const CollegePerformanceTable = () => {
  const colleges = [
    { name: 'Information Technology', icon: Globe, enrollment: 4210, passRate: '89.2%', trend: 'up', status: 'EXCELLENT' },
    { name: 'Business & Economics', icon: Users, enrollment: 6120, passRate: '84.5%', trend: 'up', status: 'OPTIMAL' },
    { name: 'Pharmacy & Biomedical', icon: Award, enrollment: 2140, passRate: '87.6%', trend: 'up', status: 'EXCELLENT' },
    { name: 'Law & Political Science', icon: ShieldCheck, enrollment: 2890, passRate: '81.3%', trend: 'up', status: 'OPTIMAL' },
    { name: 'Engineering & Tech', icon: Building2, enrollment: 3890, passRate: '78.1%', trend: 'down', status: 'MONITORING' },
    { name: 'Arts & Humanities', icon: GraduationCap, enrollment: 3100, passRate: '76.2%', trend: 'down', status: 'MONITORING' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">College Performance Matrix</h3>
        <button className="text-emerald-700 font-bold text-xs hover:underline decoration-2 underline-offset-4">View Full Ledger</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest font-black text-gray-400">
              <th className="px-6 py-4">College Entity</th>
              <th className="px-6 py-4">Enrollment</th>
              <th className="px-6 py-4">Pass Rate</th>
              <th className="px-6 py-4">Trend</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {colleges.map((college, idx) => (
              <tr key={idx} className="hover:bg-gray-50/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center ring-1 ring-emerald-100">
                      {<college.icon size={16} />}
                    </div>
                    <span className="text-sm font-bold text-gray-800 tracking-tight">{college.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-600">{formatNumber(college.enrollment)}</td>
                <td className="px-6 py-4 text-sm font-black text-gray-900">{college.passRate}</td>
                <td className="px-6 py-4">
                  {college.trend === 'up' ? (
                    <ArrowUpRight size={14} className="text-emerald-600" />
                  ) : (
                    <ArrowDownRight size={14} className="text-red-500" />
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={cn(
                    "text-[9px] font-black px-2 py-1 rounded border shadow-sm inline-block tracking-tight",
                    college.status === 'EXCELLENT' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                    college.status === 'OPTIMAL' ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                    "bg-gray-50 text-gray-400 border-gray-100"
                  )}>
                    {college.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100/50 font-bold text-gray-900 border-t border-gray-100">
            <tr>
              <td className="px-6 py-4 text-sm uppercase tracking-wider font-black">Total</td>
              <td className="px-6 py-4 text-sm">{formatNumber(24812)}</td>
              <td className="px-6 py-4 text-sm">82.8%<br/><span className="text-[10px] text-gray-400 uppercase tracking-tighter">avg</span></td>
              <td className="px-6 py-4" colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default function DashboardHomePage() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-emerald-700/60 font-bold uppercase text-[9px] tracking-[0.3em]">Institutional Overview</p>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter">Dashboard</h1>
          <p className="text-gray-400 font-medium text-sm max-w-2xl mt-5 leading-snug">
            Consolidated academic performance, institutional growth metrics, and faculty distributions for the 2023/2024 academic cycle.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-50 text-blue-800 border border-blue-100 rounded-lg font-bold text-xs hover:bg-blue-100 transition-all active:scale-95">
             <FileText size={16} />
             Export Ledger
          </button>
          <button className="flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-900 text-white rounded-lg font-extrabold text-xs shadow-xl shadow-emerald-900/40 hover:bg-emerald-800 transition-all active:scale-95">
             <span className="text-lg leading-none">+</span>
             New Directive
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard 
          title="Total Students" 
          value={formatNumber(24812)} 
          trend="up" 
          trendValue="+ 4.2%" 
          icon={GraduationCap} 
          live 
          colorClass="text-emerald-900"
        />
        <StatCard 
          title="Faculty Retention" 
          value="96.8%" 
          icon={ClipboardCheck} 
          colorClass="text-emerald-900"
        />
        <StatCard 
          title="Research Grants" 
          value="JOD 4.2M" 
          icon={TrendingUp} 
          subtitle="Goal Met"
          colorClass="bg-emerald-900 text-white shadow-xl shadow-emerald-900/30"
        />
        <StatCard 
          title="Active Courses" 
          value="1,240" 
          subtitle="Core Curriculum"
          icon={FileText} 
          colorClass="text-blue-700 ring-2 ring-blue-500/10"
        />
        <StatCard 
          title="Graduation Rate" 
          value="91.4%" 
          subtitle="Exceeds Target"
          icon={Award} 
          colorClass="text-yellow-700 ring-2 ring-yellow-500/10"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-8">
          <CollegePerformanceTable />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-10">Monthly Enrollment Trend (Sep - Feb)</h4>
                <div className="flex-grow flex items-end justify-between gap-3 px-2">
                   {[40, 70, 60, 20, 50, 80, 85, 45, 90, 95, 80].map((h, i) => (
                     <div key={i} className="flex-grow flex flex-col items-center gap-1 group">
                        <div className="w-2.5 bg-emerald-900/10 rounded-t-sm h-full flex flex-col justify-end">
                           <div className="bg-emerald-800 rounded-t-sm transition-all duration-500 hover:brightness-110" style={{ height: `${h}%` }} />
                        </div>
                     </div>
                   ))}
                </div>
                <div className="flex justify-between mt-6 text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
                   <span>Sep</span>
                   <span>Oct</span>
                   <span>Nov</span>
                   <span>Dec</span>
                   <span>Jan</span>
                   <span>Feb</span>
                </div>
                <div className="flex gap-4 mt-8">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-800 rounded-sm" /><span className="text-[9px] font-bold uppercase text-gray-500 tracking-tighter">Current Year</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-100 rounded-sm" /><span className="text-[9px] font-bold uppercase text-gray-500 tracking-tighter">Last Year</span></div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-[400px] flex flex-col items-center">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-10 self-start">Students by College</h4>
                <div className="relative w-48 h-48 flex items-center justify-center">
                   <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#064E3B" strokeWidth="10" strokeDasharray="180 251.2" strokeLinecap="round" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="10" strokeDasharray="50 251.2" strokeDashoffset="-180" strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-3xl font-black text-gray-900 tracking-tighter -mb-1">24k+</p>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total</p>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-10">
                   {[
                     { label: 'Business (25%)', color: 'bg-emerald-900' },
                     { label: 'IT (17%)', color: 'bg-emerald-500' },
                     { label: 'Eng (18%)', color: 'bg-emerald-300' },
                     { label: 'Law (12%)', color: 'bg-emerald-100' }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-2">
                       <div className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
                       <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">{item.label}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-8">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Directives Queue</h4>
                <Zap size={16} className="text-emerald-500" />
             </div>
             <div className="space-y-6">
                {[
                  { title: 'Approve Faculty Tenure', priority: 'High', date: 'Due Apr 15', desc: 'Review 14 applications from Engineering' },
                  { title: 'Budget Allocation FY25', priority: 'Medium', date: 'Due Apr 22', desc: 'Final sign-off for research fund distribution' },
                  { title: 'Crisis Management', priority: 'Urgent', date: 'Due Apr 10', desc: 'Security protocol review for Sector D' },
                  { title: 'Accreditation Report', priority: 'High', date: 'Due Apr 30', desc: 'Annual quality assurance documentation' }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer relative pl-4">
                    <div className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 rounded-full",
                      item.priority === 'Urgent' ? 'bg-red-500' :
                      item.priority === 'High' ? 'bg-emerald-800' : 'bg-gray-300'
                    )} />
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-black text-gray-800 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{item.title}</span>
                      <span className={cn(
                        "text-[8px] font-black uppercase px-2 py-0.5 rounded italic",
                        item.priority === 'Urgent' ? "bg-red-50 text-red-600" : 
                        item.priority === 'High' ? "bg-emerald-50 text-emerald-800" : "bg-gray-100 text-gray-500"
                      )}>{item.priority}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium leading-tight mb-2 opacity-80">{item.desc}</p>
                    <div className="flex items-center gap-2 text-[9px] text-gray-300 font-black uppercase italic tracking-widest">
                      {item.date}
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-10 py-3 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-gray-100 transition-colors">View All (12)</button>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100">
             <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-8">Student Demographics</h4>
             <div className="space-y-6">
                {[
                  { label: 'Regional', val: '74%', count: '18,361', color: 'bg-emerald-800' },
                  { label: 'International', val: '18%', count: '4,466', color: 'bg-blue-800' },
                  { label: 'Exchange', val: '8%', count: '1,985', color: 'bg-gray-400' },
                  { label: 'Scholarship', val: '23%', count: '5,707', color: 'bg-yellow-600' }
                ].map((demo, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                         <Globe size={10} className="opacity-50" /> {demo.label}
                      </span>
                      <span className="text-[10px] font-black text-gray-900">{demo.val} — <span className="text-gray-400 font-medium italic">{demo.count}</span></span>
                    </div>
                    <div className="h-1 bg-gray-100 w-full rounded-full overflow-hidden">
                       <div className={cn("h-full rounded-full", demo.color)} style={{ width: demo.val }} />
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100">
             <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 px-1">Quick Actions</h4>
             <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center gap-3 p-5 bg-gray-50 hover:bg-emerald-50 rounded-2xl transition-all group active:scale-95">
                   <FileText size={20} className="text-gray-400 group-hover:text-emerald-700" />
                   <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Export Report</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-5 bg-[#1B4332] hover:bg-[#081C15] rounded-2xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
                   <Bell size={20} className="text-white" />
                   <span className="text-[9px] font-black text-white uppercase tracking-tighter">New Notice</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all active:scale-95">
                   <Users size={20} className="text-gray-400" />
                   <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Add User</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all active:scale-95">
                   <BarChart3 size={20} className="text-gray-400" />
                   <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Analytics</span>
                </button>
             </div>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-sm relative grayscale hover:grayscale-0 transition-all duration-500">
             <img src="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=800" alt="University" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
