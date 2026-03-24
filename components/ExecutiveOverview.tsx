
import React, { useState } from 'react';
import { PillarType, LeadData } from '../types';
import { Target, BarChart3, Users, Trophy, HeartPulse, ShieldCheck, UserCheck, Briefcase, GraduationCap, Cpu, Award, Medal, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ExecutiveOverviewProps {
  onSelectPillar: (pillar: PillarType) => void;
  leads: LeadData[];
}

type TimePeriod = string;

interface LeaderboardTableProps {
  leads: LeadData[];
  roleLabel: string;
  isQ3: boolean;
  period: TimePeriod;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ leads, roleLabel, isQ3, period }) => {
  if (leads.length === 0) return null;

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy size={14} className="text-amber-500" />;
    if (index === 1) return <Award size={14} className="text-slate-500" />;
    if (index === 2) return <Medal size={14} className="text-amber-700" />;
    return <span className="text-xs font-bold">{index + 1}</span>;
  };

  const getRankBg = (index: number) => {
    if (index === 0) return 'bg-amber-100 text-amber-700';
    if (index === 1) return 'bg-slate-200 text-slate-600';
    if (index === 2) return 'bg-amber-200/50 text-amber-800';
    return 'bg-slate-100 text-slate-500';
  };

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">{roleLabel}</h4>
        <div className="h-px bg-slate-100 flex-1"></div>
      </div>
      <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="py-3 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank & Lead</th>
              <th className="py-3 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Team</th>
              {roleLabel === 'Consultants' ? (
                <>
                  <th className="py-3 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Advisors (Crit/Total)</th>
                  <th className="py-3 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total Score</th>
                </>
              ) : (
                <>
                  <th className="py-3 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Target</th>
                  <th className="py-3 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Achieved</th>
                  <th className="py-3 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ach %</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead, index) => {
              const stats = lead.monthlyStats.filter(s => isQ3 ? ['October', 'November', 'December'].includes(s.month) : s.month === period);
              const isSpecialized = lead.roleType === 'cx_manager' || lead.roleType === 'ops_manager';
              
              const t = stats.reduce((acc, s) => acc + (s.categories.total?.target || 0), 0);
              const a = stats.reduce((acc, s) => acc + (s.categories.total?.achieved || 0), 0);
              
              const perc = t > 0 ? (a/t)*100 : (stats[0]?.categories.total?.percentage || 0);

              return (
                <tr key={lead.id} className="group hover:bg-slate-50/80 transition-all">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black ${getRankBg(index)}`}>
                        {getRankIcon(index)}
                      </span>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{lead.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{lead.teamName}</span>
                  </td>
                  {roleLabel === 'Consultants' ? (
                    <>
                      <td className="py-4 px-6 text-right text-xs font-bold text-slate-600">
                        {lead.advisors?.critical ?? 0} / {lead.advisors?.total ?? 0}
                      </td>
                      <td className="py-4 px-6 text-right text-xs font-bold text-indigo-600">
                        {isQ3 ? stats.reduce((acc, s) => acc + s.totalScore, 0) : (stats[0]?.totalScore || 0)}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-6 text-right text-xs font-bold text-slate-600">
                        {isSpecialized ? '100%' : `${t.toFixed(2)} Cr`}
                      </td>
                      <td className="py-4 px-6 text-right text-xs font-bold text-slate-800">
                        {isSpecialized ? `${a}%` : `${a.toFixed(3)} Cr`}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`inline-block px-2 py-1 rounded-lg text-[10px] font-black ${perc >= 90 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {perc.toFixed(1)}%
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({ leads }) => {
  const MONTH_ORDER = ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
  
  const availableMonths: string[] = Array.from(new Set(leads.flatMap(l => l.monthlyStats.map(s => s.month))))
    .sort((a, b) => MONTH_ORDER.indexOf(a as string) - MONTH_ORDER.indexOf(b as string)) as string[];
  
  const hasQ3 = availableMonths.includes('October') && availableMonths.includes('November') && availableMonths.includes('December');
  const availablePeriods = [...availableMonths];
  if (hasQ3) availablePeriods.push('Q3');

  const [period, setPeriod] = useState<string>(availableMonths.length > 0 ? availableMonths[availableMonths.length - 1] : 'January');
  const isQ3 = period === 'Q3';

  const getAggregatedData = () => {
    let totalTarget = 0;
    let totalAchieved = 0;
    let healthTarget = 0;
    let healthAchieved = 0;
    let termTarget = 0;
    let termAchieved = 0;
    let totalAdvisors = 0;
    let totalCritical = 0;

    const crContributors = leads.filter(l => l.roleType !== 'cx_manager' && l.roleType !== 'ops_manager');

    crContributors.forEach(lead => {
      const stats = lead.monthlyStats.filter(s => 
        isQ3 ? ['October', 'November', 'December'].includes(s.month) : s.month === period
      );

      stats.forEach(s => {
        totalTarget += (s.categories.total?.target || 0);
        totalAchieved += (s.categories.total?.achieved || 0);
        healthTarget += (s.categories.health?.target || 0);
        healthAchieved += (s.categories.health?.achieved || 0);
        termTarget += (s.categories.term?.target || 0);
        termAchieved += (s.categories.term?.achieved || 0);
        
        if (s.advisors && lead.roleType === 'consultant') {
          totalAdvisors += s.advisors.total;
          totalCritical += s.advisors.critical;
        }
      });
    });

    return {
      totalTarget,
      totalAchieved,
      healthTarget,
      healthAchieved,
      termTarget,
      termAchieved,
      totalPercentage: totalTarget > 0 ? (totalAchieved / totalTarget) * 100 : 0,
      healthPercentage: healthTarget > 0 ? (healthAchieved / healthTarget) * 100 : (totalTarget > 0 ? (healthAchieved / totalTarget) * 100 : 0),
      termPercentage: termTarget > 0 ? (termAchieved / termTarget) * 100 : (totalTarget > 0 ? (termAchieved / totalTarget) * 100 : 0),
      totalAdvisors,
      totalCritical
    };
  };

  const data = getAggregatedData();

  // Generate dynamic chart data for the AreaChart
  const getChartData = () => {
    return availableMonths.map(m => {
      let mTarget = 0;
      let mAchieved = 0;
      
      const crContributors = leads.filter(l => l.roleType !== 'cx_manager' && l.roleType !== 'ops_manager');
      crContributors.forEach(lead => {
        const stat = lead.monthlyStats.find(s => s.month === m);
        if (stat && stat.categories.total) {
          mTarget += stat.categories.total.target || 0;
          mAchieved += stat.categories.total.achieved || 0;
        }
      });

      return {
        month: m,
        Target: parseFloat(mTarget.toFixed(2)),
        Achieved: parseFloat(mAchieved.toFixed(2))
      };
    });
  };

  const chartData = getChartData();

  const getLeadsByRole = (role: 'consultant' | 'spm' | 'pm' | 'apm' | 'cx_manager' | 'ops_manager') => {
    return leads.filter(l => l.roleType === role && l.monthlyStats.some(s => isQ3 ? ['October', 'November', 'December'].includes(s.month) : s.month === period))
      .sort((a, b) => {
        const aStats = a.monthlyStats.filter(s => isQ3 ? ['October', 'November', 'December'].includes(s.month) : s.month === period);
        const bStats = b.monthlyStats.filter(s => isQ3 ? ['October', 'November', 'December'].includes(s.month) : s.month === period);
        const aScore = isQ3 ? aStats.reduce((acc, s) => acc + s.totalScore, 0) : (aStats[0]?.totalScore || 0);
        const bScore = isQ3 ? bStats.reduce((acc, s) => acc + s.totalScore, 0) : (bStats[0]?.totalScore || 0);
        return bScore - aScore;
      });
  };

  const roleSections = [
    { type: 'spm' as const, label: 'Senior Program Managers (Owners)', icon: <Briefcase size={18} className="text-indigo-600" /> },
    { type: 'pm' as const, label: 'Program Managers', icon: <UserCheck size={18} className="text-emerald-600" /> },
    { type: 'apm' as const, label: 'Associate Program Managers', icon: <GraduationCap size={18} className="text-blue-600" /> },
    { type: 'consultant' as const, label: 'Consultants', icon: <Target size={18} className="text-slate-400" /> },
    { type: 'cx_manager' as const, label: 'CX Quality Domain', icon: <ShieldCheck size={18} className="text-rose-600" /> },
    { type: 'ops_manager' as const, label: 'Growth Ops Domain', icon: <Cpu size={18} className="text-violet-600" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Executive Overview</h2>
          <p className="text-slate-500 max-w-2xl text-sm">Revenue and health benchmarks aggregated across all active performance tiers.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm max-w-full">
          {availablePeriods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                period === p ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {p === 'Q3' ? 'Q3' : p.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-40">
           <div className="flex justify-between items-start">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Target size={20} /></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Overall Achievement</span>
           </div>
           <div>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">{data.totalPercentage.toFixed(1)}%</h3>
              <p className="text-[10px] text-slate-400 mt-1 font-black uppercase">{data.totalAchieved.toFixed(2)} / {data.totalTarget.toFixed(2)} Cr</p>
           </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl flex flex-col justify-between h-40">
           <div className="flex justify-between items-start">
              <div className="p-2 bg-white/10 rounded-xl text-indigo-400"><Users size={20} /></div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Network Risk</span>
           </div>
           <div>
              <h3 className="text-3xl font-black tracking-tight">{data.totalCritical} <span className="text-lg text-white/30 font-medium">/ {data.totalAdvisors}</span></h3>
              <p className="text-[10px] text-indigo-400 font-black uppercase mt-1">Total Critical Advisors</p>
           </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Activity size={18} className="text-indigo-600" />
              Network Performance Trend
           </h3>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">All Months</span>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAchieved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <Tooltip 
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`${value} Cr`, undefined]}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 600 }} />
              <Area type="monotone" dataKey="Target" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorTarget)" />
              <Area type="monotone" dataKey="Achieved" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorAchieved)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <BarChart3 size={20} className="text-indigo-600" />
            Performance Leaderboard: {period}
          </h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
            Tiered Hierarchy
          </span>
        </div>

        {roleSections.map(section => (
          <LeaderboardTable 
            key={section.type} 
            leads={getLeadsByRole(section.type as any)} 
            roleLabel={section.label}
            isQ3={isQ3}
            period={period}
          />
        ))}
      </div>
    </div>
  );
};

export default ExecutiveOverview;