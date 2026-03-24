
import React, { useState, useMemo } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { PillarData, PillarType, LeadData } from '../types';
import KpiCard from './KpiCard';
import { CheckCircle2, Briefcase, TrendingUp, Users, Activity, Filter, AlertTriangle } from 'lucide-react';

interface PillarDashboardProps {
  pillar: PillarData;
  leads: LeadData[];
}

type CategoryType = 'total' | 'health' | 'term';

const PillarDashboard: React.FC<PillarDashboardProps> = ({ pillar, leads }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('total');

  // Extract available months dynamically from leads
  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>();
    leads.forEach(lead => {
      lead.monthlyStats.forEach(stat => monthsSet.add(stat.month));
    });
    // Optional: Sort months chronologically if needed, but assuming they are generally in order of insertion or we keep their natural appearance order
    return Array.from(monthsSet);
  }, [leads]);

  // Achievement Trend Data
  const dynamicChartData = useMemo(() => {
    return availableMonths.map(m => {
      const dataPoint: any = { name: m };
      leads.forEach(lead => {
        const monthStats = lead.monthlyStats.find(s => s.month === m);
        if (monthStats && monthStats.categories[selectedCategory]) {
          const keyMap: Record<string, string> = { ayush: 'el', srija: 'rs', parth: 'su' };
          const key = keyMap[lead.id];
          if (key) {
            dataPoint[key] = monthStats.categories[selectedCategory].percentage;
          }
        }
      });
      return dataPoint;
    });
  }, [selectedCategory, leads, availableMonths]);

  // Critical Advisor Rate Trend Data - Safety Filtered
  const criticalChartData = useMemo(() => {
    return availableMonths.map(m => {
      const dataPoint: any = { name: m };
      leads.forEach(lead => {
        const monthStats = lead.monthlyStats.find(s => s.month === m);
        // Safety check: Only process leads who actually have advisor data (Consultants)
        if (monthStats && monthStats.advisors) {
          const keyMap: Record<string, string> = { ayush: 'el', srija: 'rs', parth: 'su' };
          const key = keyMap[lead.id];
          if (key) {
            dataPoint[key] = monthStats.advisors.rate;
          }
        }
      });
      return dataPoint;
    });
  }, [leads, availableMonths]);

  const renderChart = () => {
    if (pillar.id !== PillarType.PERFORMANCE) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={pillar.chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" fill="#6366f1" stroke="#6366f1" />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={dynamicChartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} domain={[50, 120]} />
          <Tooltip 
            contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Achievement']}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 600 }} />
          <Line type="monotone" dataKey="el" name="Elites (Ayush)" stroke="#4f46e5" strokeWidth={4} dot={{ r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} />
          <Line type="monotone" dataKey="rs" name="Rising Stars (Srija)" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
          <Line type="monotone" dataKey="su" name="Supremes (Parth)" stroke="#f59e0b" strokeWidth={4} dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Activity size={18} />
            <span className="text-xs font-black uppercase tracking-widest">{pillar.systemRole} Analysis</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
            {pillar.title}
          </h2>
        </div>
      </div>

      {/* KPI Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillar.dailyKpis.map((kpi, idx) => (
          <KpiCard key={idx} {...kpi} />
        ))}
      </section>

      {/* Main Analysis Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Achievement Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg capitalize">{selectedCategory} Achievement Journey</h3>
                  <p className="text-xs text-slate-400 font-medium">Monthly benchmarks across Superteams</p>
                </div>
                
                {pillar.id === PillarType.PERFORMANCE && (
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
                    {(['total', 'health', 'term'] as CategoryType[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                          selectedCategory === cat 
                            ? 'bg-white text-indigo-600 shadow-sm scale-105' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
            </div>
            <div className="h-[380px]">
              {renderChart()}
            </div>
          </div>

          {/* Critical Rate Trend */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                   <AlertTriangle size={20} className="text-red-500" />
                   Team-wise Critical Advisor Rate
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Health risk percentage (Lower is better)</p>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Criticality Trend</span>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={criticalChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} unit="%" domain={[0, 45]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value?.toFixed(1) || '0'}%`, 'Critical Rate']}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 600 }} />
                  <Line type="monotone" dataKey="el" name="Elites (Ayush)" stroke="#4f46e5" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#4f46e5' }} />
                  <Line type="monotone" dataKey="rs" name="Rising Stars (Srija)" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#10b981' }} />
                  <Line type="monotone" dataKey="su" name="Supremes (Parth)" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#f59e0b' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Briefcase size={80} />
              </div>
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 relative z-10">
                 <CheckCircle2 size={20} className="text-indigo-400" />
                 Strategic Priorities
              </h3>
              <div className="space-y-4 relative z-10">
                {pillar.actionItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-black flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
              <h3 className="font-bold text-lg mb-4">Q3 Period Summary</h3>
              <div className="space-y-5">
                 <div className="pb-4 border-b border-white/10">
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Avg {selectedCategory} Achievement</p>
                    <p className="text-3xl font-black">
                      {selectedCategory === 'total' ? '88.4%' : selectedCategory === 'health' ? '91.2%' : '85.6%'}
                    </p>
                 </div>
                 <div className="pb-4 border-b border-white/10">
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Operational Variance</p>
                    <p className="text-3xl font-black">±4.2%</p>
                 </div>
                 <p className="text-[10px] text-white/40 leading-relaxed italic">
                    Aggregated benchmarks from the Q3 Oct-Dec performance cycle.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Jan Snapshot Table */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Filter size={20} className="text-indigo-600" />
              Jan Category Performance Matrix
            </h3>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Real-time</span>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
                     <th className="pb-4">Superteam Name</th>
                     <th className="pb-4">Operational Lead</th>
                     <th className="pb-4 text-right">Target (Cr.)</th>
                     <th className="pb-4 text-right">Achieved (Cr.)</th>
                     <th className="pb-4 text-right">Achievement %</th>
                     <th className="pb-4 text-right">Trend</th>
                  </tr>
               </thead>
               <tbody>
                  {leads.map(lead => {
                    const jan = lead.monthlyStats.find(s => s.month === 'Jan');
                    if (!jan) return null;
                    const catData = jan.categories[selectedCategory] || { target: 0, achieved: 0, percentage: 0 };
                    return (
                      <tr key={lead.id} className="group hover:bg-slate-50 transition-all duration-200">
                        <td className="py-5 font-black text-slate-800">{lead.teamName}</td>
                        <td className="py-5 text-sm text-slate-600 font-medium">{lead.name}</td>
                        <td className="py-5 text-right text-sm font-bold text-slate-700">{catData.target.toFixed(2)}</td>
                        <td className="py-5 text-right text-sm font-bold text-slate-700">{catData.achieved.toFixed(2)}</td>
                        <td className="py-5 text-right">
                           <span className={`text-sm font-black px-4 py-1.5 rounded-xl ${catData.percentage >= 90 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                             {catData.percentage.toFixed(1)}%
                           </span>
                        </td>
                        <td className="py-5 text-right">
                           <div className={`inline-flex items-center gap-1 font-black text-xs ${catData.percentage >= 90 ? 'text-green-500' : 'text-amber-500'}`}>
                             {catData.percentage >= 90 ? <TrendingUp size={16} /> : <TrendingUp size={16} className="rotate-180" />}
                           </div>
                        </td>
                      </tr>
                    )
                  })}
               </tbody>
            </table>
         </div>
      </section>
    </div>
  );
};

export default PillarDashboard;