import React, { useState, useMemo } from 'react';
import { LeadData, MonthlyBreakdown, MetricCategory } from '../types';
import KpiCard from './KpiCard';
import { 
  Award,
  Users,
  Target,
  Activity,
  UserCircle,
  ShieldCheck,
  FileText,
  Cpu,
  Zap,
  History,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface LeadDashboardProps {
  lead: LeadData;
  leads: LeadData[];
}

const LeadDashboard: React.FC<LeadDashboardProps> = ({ lead, leads }) => {
  const normalizedRole = (lead.roleType?.toString() || '').toLowerCase().trim();
  const isConsultant = normalizedRole === 'consultant';
  const isCXRole = normalizedRole === 'cx_manager';
  const isOpsRole = normalizedRole === 'ops_manager';
  const isOwnerRole = ['spm', 'pm', 'apm'].includes(normalizedRole);
  const isSpecialized = isCXRole || isOpsRole;
  
  const [selectedMonth, setSelectedMonth] = useState<string>(lead.monthlyStats.length > 0 ? lead.monthlyStats[lead.monthlyStats.length - 1].month : '');

  const teamOwner = useMemo(() => {
    return leads.find(l => l.teamName === lead.teamName && (l.roleType === 'spm' || l.roleType === 'pm'));
  }, [lead.teamName, leads]);

  const q3AggregatedData = useMemo(() => {
    const q3Months = lead.monthlyStats.filter(s => ['October', 'November', 'December'].includes(s.month));
    if (q3Months.length === 0) return null;

    const aggregateCategory = (catName: 'total' | 'health' | 'term'): MetricCategory => {
      const monthsWithData = q3Months.filter(s => s.categories[catName]);
      const target = monthsWithData.reduce((acc, s) => acc + (s.categories[catName]?.target || 0), 0);
      const achieved = monthsWithData.reduce((acc, s) => acc + (s.categories[catName]?.achieved || 0), 0);
      const policiesSold = monthsWithData.reduce((acc, s) => acc + (s.categories[catName]?.policiesSold || 0), 0);
      const smc = monthsWithData.length > 0 ? monthsWithData.reduce((acc, s) => acc + (s.categories[catName]?.smc || 0), 0) / monthsWithData.length : 0;
      const mp = monthsWithData.length > 0 ? monthsWithData.reduce((acc, s) => acc + (s.categories[catName]?.mp || 0), 0) / monthsWithData.length : 0;
      const lp = monthsWithData.length > 0 ? monthsWithData.reduce((acc, s) => acc + (s.categories[catName]?.lp || 0), 0) / monthsWithData.length : 0;
      
      return {
        target: target,
        achieved: achieved,
        percentage: target > 0 ? (achieved / target) * 100 : 0,
        policiesSold,
        smc,
        mp,
        lp
      };
    };

    const sumScore = q3Months.reduce((acc, s) => acc + s.totalScore, 0);
    const advisorsAgg = {
      total: q3Months.reduce((acc, s) => acc + (s.advisors?.total || 0), 0),
      critical: q3Months.reduce((acc, s) => acc + (s.advisors?.critical || 0), 0),
      achieved: q3Months.reduce((acc, s) => acc + (s.advisors?.achieved || 0), 0),
    };

    return {
      month: 'Q3' as any,
      categories: {
        total: aggregateCategory('total'),
        health: aggregateCategory('health'),
        term: aggregateCategory('term')
      },
      advisors: {
        ...advisorsAgg,
        rate: advisorsAgg.total > 0 ? (advisorsAgg.critical / advisorsAgg.total) * 100 : 0
      },
      score: sumScore,
      totalScore: sumScore,
      weightedScore: q3Months.reduce((acc, s) => acc + s.weightedScore, 0),
    } as MonthlyBreakdown;
  }, [lead.monthlyStats]);

  const currentData = useMemo((): MonthlyBreakdown | undefined => {
    if (selectedMonth === 'Q3' && q3AggregatedData) {
      return q3AggregatedData;
    }
    return lead.monthlyStats.find(p => p.month === selectedMonth);
  }, [selectedMonth, lead.monthlyStats, q3AggregatedData]);

  if (!currentData) {
    return (
      <div className="text-center p-10 bg-white rounded-3xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-700">No performance data available.</h2>
        <p className="text-slate-500 mt-2">Please select a month with data or update the records.</p>
      </div>
    );
  }
  
  const kpiGridClass = isOwnerRole 
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6">
           <div className="relative">
              <div className="w-20 h-20 rounded-2xl border-2 border-slate-100 overflow-hidden shadow-sm">
                <img src={lead.avatar} alt={lead.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2 rounded-xl border-2 border-white shadow-sm">
                 {isCXRole ? <ShieldCheck size={14} /> : isOpsRole ? <Cpu size={14} /> : isOwnerRole ? <Award size={14} /> : <Target size={14} />}
              </div>
           </div>
           <div>
              <div className="flex items-center gap-2">
                 <h2 className="text-2xl font-black text-slate-800 tracking-tight">{lead.name}</h2>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-3">
                   <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-md ${isOwnerRole || isSpecialized ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                     {lead.role}
                   </span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     Team: {lead.teamName}
                   </span>
                </div>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
          {lead.monthlyStats.map((p) => (
            <button
              key={p.month}
              onClick={() => setSelectedMonth(p.month)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                selectedMonth === p.month ? 'bg-white text-indigo-600 shadow-sm scale-105' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {p.month}
            </button>
          ))}
          {isConsultant && q3AggregatedData && (
            <button
              onClick={() => setSelectedMonth('Q3')}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                selectedMonth === 'Q3' ? 'bg-slate-900 text-white shadow-lg scale-105' : 'text-indigo-600/50 hover:text-indigo-600'
              }`}
            >
              Q3 (Sum)
            </button>
          )}
        </div>
      </div>

      {lead.mandate && (
        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-lg flex items-start gap-4">
          <div className="bg-white/10 p-2 rounded-xl mt-1">
             <Activity size={20} className="text-indigo-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Operational Mandate</p>
            <p className="text-sm font-medium leading-relaxed text-slate-200">{lead.mandate}</p>
          </div>
        </div>
      )}

      <div className={`grid ${kpiGridClass}`}>
        <KpiCard 
          name="Total Achievement" 
          value={isSpecialized ? `${currentData.totalScore || 0}%` : `${currentData.categories.total?.achieved?.toFixed(2) || '0'} / ${currentData.categories.total?.target?.toFixed(2) || '0'} Cr`} 
          target={isSpecialized ? 'Target: 100%' : `${currentData.categories.total?.percentage?.toFixed(1) || '0'}% Completion`}
          status={(isSpecialized ? (currentData.totalScore || 0) >= 90 : (currentData.categories.total?.percentage || 0) >= 90) ? 'good' : 'warning'} 
        />
        
        {isSpecialized && (
          <KpiCard 
            name="Performance Rating" 
            value={isCXRole ? (currentData.categories.cx?.rating || 'Strong') : (currentData.categories.ops?.rating || 'Strong')} 
            target="Target: Strategic"
            status="good"
          />
        )}
        
        {isConsultant && (
          <>
            <KpiCard 
              name="Total Score" 
              value={`${currentData.totalScore || 0}`} 
              target="Performance Index"
              status={(currentData.totalScore || 0) >= 80 ? 'good' : 'warning'} 
            />
            <KpiCard 
              name="Health Achievement" 
              value={`${currentData.categories.health?.achieved?.toFixed(2) || '0'} / ${currentData.categories.health?.target?.toFixed(2) || '0'} Cr`} 
              target={`${(currentData.categories.health?.target ? ((currentData.categories.health.achieved || 0) / currentData.categories.health.target * 100) : 0).toFixed(1)}% Completion`}
              status={(currentData.categories.health?.target ? ((currentData.categories.health.achieved || 0) / currentData.categories.health.target * 100) : 0) >= 90 ? 'good' : 'warning'} 
            />
            <KpiCard 
              name="Term Achievement" 
              value={`${currentData.categories.term?.achieved?.toFixed(2) || '0'} / ${currentData.categories.term?.target?.toFixed(2) || '0'} Cr`} 
              target={`${(currentData.categories.term?.target ? ((currentData.categories.term.achieved || 0) / currentData.categories.term.target * 100) : 0).toFixed(1)}% Completion`}
              status={(currentData.categories.term?.target ? ((currentData.categories.term.achieved || 0) / currentData.categories.term.target * 100) : 0) >= 90 ? 'good' : 'warning'} 
            />
            <KpiCard 
              name="Advisors" 
              value={`${currentData.advisors?.critical ?? 0} / ${currentData.advisors?.total ?? 0}`} 
              target={`Critical / Total — ${(currentData.advisors?.rate || 0).toFixed(1)}% Risk`}
              status={(currentData.advisors?.rate || 0) <= 25 ? 'good' : 'warning'} 
            />
            <KpiCard 
              name="Policies Sold" 
              value={currentData.categories.total.policiesSold || 0} 
              target="This Month"
              status="good"
            />
            <KpiCard 
              name="Avg Ticket Size" 
              value={`${((currentData.categories.total.smc || 0) / 100).toFixed(2)} Cr`} 
              target="SMC (Crores)"
              status={(currentData.categories.total.smc || 0) >= 4 ? 'good' : 'warning'}
            />
          </>
        )}

        {isOwnerRole && (
          <>
            <KpiCard 
              name="Efficiency Score" 
              value={`${currentData.advisors?.achieved ?? 0} / ${currentData.advisors?.total ?? 0}`} 
              target="Advisors Achieved / Total"
              status={(currentData.advisors?.total || 0) > 0 && ((currentData.advisors?.achieved || 0) / (currentData.advisors?.total || 1)) >= 0.5 ? 'good' : 'warning'} 
            />
            {(currentData.categories.health?.achieved || 0) > 0 && (
              <KpiCard 
                name="Health Achievement" 
                value={(currentData.categories.health?.target || 0) > 0 ? `${currentData.categories.health?.percentage?.toFixed(1) || '0'}%` : `${currentData.categories.health?.achieved?.toFixed(2) || '0'} Cr`} 
                status={(currentData.categories.health?.percentage || 0) >= 90 || ((currentData.categories.health?.target || 0) === 0 && (currentData.categories.health?.achieved || 0) > 0) ? 'good' : 'warning'} 
              />
            )}
            {(currentData.categories.term?.achieved || 0) > 0 && (
              <KpiCard 
                name="Term Achievement" 
                value={(currentData.categories.term?.target || 0) > 0 ? `${currentData.categories.term?.percentage?.toFixed(1) || '0'}%` : `${currentData.categories.term?.achieved?.toFixed(2) || '0'} Cr`} 
                status={(currentData.categories.term?.percentage || 0) >= 90 || ((currentData.categories.term?.target || 0) === 0 && (currentData.categories.term?.achieved || 0) > 0) ? 'good' : 'warning'} 
              />
            )}
            <KpiCard 
              name="Policies Sold" 
              value={currentData.categories.total.policiesSold || 0} 
              status="good"
            />
            <KpiCard
              name="SMC %"
              value={`${currentData.categories.total.smc?.toFixed(1) || '0'}%`}
              status={(currentData.categories.total.smc || 0) >= 4 ? 'good' : 'warning'}
            />
            <KpiCard
              name="Multi Pay %"
              value={`${currentData.categories.total.mp?.toFixed(1) || '0'}%`}
              status={(currentData.categories.total.mp || 0) >= 30 ? 'good' : 'warning'}
            />
            <KpiCard
              name="Limited Pay %"
              value={`${currentData.categories.total.lp?.toFixed(1) || '0'}%`}
              status={(currentData.categories.total.lp || 0) >= 20 ? 'good' : 'warning'}
            />
          </>
        )}
      </div>



      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-10">
           <h3 className="font-bold text-slate-800 text-xl flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Activity size={20} className="text-indigo-600" />
              </div>
              {isSpecialized ? 'Specialized Domain Metrics' : 'Operational Yield Matrix'}
           </h3>
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Month: {selectedMonth}</span>
        </div>

        {((isCXRole && currentData.categories.cx) || (isOpsRole && currentData.categories.ops)) ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isCXRole ? currentData.categories.cx!.metrics : currentData.categories.ops!.metrics).map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 hover:bg-white hover:shadow-md transition-all duration-300">
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{m.name}</p>
                     <p className="text-lg font-black text-slate-800">{m.actual}</p>
                   </div>
                   <div className="text-right flex items-center gap-6">
                     <div className="px-4 border-r border-slate-200">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Target</p>
                        <p className="text-sm font-black text-slate-700">{m.target}</p>
                     </div>
                     {m.status === 'good' ? (
                       <div className="p-2 bg-emerald-50 rounded-full">
                         <CheckCircle2 className="text-emerald-500" size={24} />
                       </div>
                     ) : (
                       <div className="p-2 bg-amber-50 rounded-full">
                         <AlertCircle className="text-amber-500" size={24} />
                       </div>
                     )}
                   </div>
                </div>
              ))}
           </div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="pb-4">Metric Path</th>
                    <th className="pb-4 text-right">Target (Cr)</th>
                    <th className="pb-4 text-right">Ach (Cr)</th>
                    <th className="pb-4 text-right">Ach %</th>
                    <th className="pb-4 text-right border-l border-slate-100 pl-4">SMC %</th>
                    <th className="pb-4 text-right">MP %</th>
                    <th className="pb-4 text-right">LP %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {Object.entries(currentData.categories).map(([key, cat]: [string, any]) => {
                    if (!cat || cat.target === undefined || !['health', 'term', 'both', 'total'].includes(key)) return null;
                    const isTotalRow = key === 'total';
                    return (
                      <tr key={key} className={`hover:bg-slate-50 ${isTotalRow ? 'bg-slate-50' : ''}`}>
                       <td className={`py-4 font-bold capitalize ${isTotalRow ? 'text-indigo-600' : 'text-slate-700'}`}>{key} Contribution</td>
                       <td className="py-4 text-right text-xs font-medium">{cat.target?.toFixed(2)}</td>
                       <td className="py-4 text-right text-xs font-bold">{cat.achieved?.toFixed(3)}</td>
                       <td className="py-4 text-right">
                         <span className={`text-xs font-black px-2 py-0.5 rounded-md ${cat.percentage >= 90 ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                           {cat.percentage?.toFixed(2)}%
                         </span>
                       </td>
                       <td className="py-4 text-right text-xs font-medium border-l border-slate-100 pl-4">{isTotalRow ? `${cat.smc?.toFixed(1) || '0'}%` : '-'}</td>
                       <td className="py-4 text-right text-xs font-medium">{isTotalRow ? `${cat.mp?.toFixed(1) || '0'}%` : '-'}</td>
                       <td className="py-4 text-right text-xs font-medium">{isTotalRow ? `${cat.lp?.toFixed(1) || '0'}%` : '-'}</td>
                     </tr>
                    );
                  })}
                </tbody>
             </table>
          </div>
        )}
      </div>


       <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200">
           <h3 className="font-bold text-slate-800 text-lg mb-8 flex items-center gap-2">
              <History size={18} className="text-indigo-600" />
              Performance History
           </h3>
           <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="py-4 px-6">Month</th>
                    {isSpecialized ? (
                      <>
                        <th className="py-4 px-6 text-right">Score</th>
                        <th className="py-4 px-6 text-right">Rating</th>
                        <th className="py-4 px-6 text-right">Metrics</th>
                      </>
                    ) : (
                      <>
                        <th className="py-4 px-6 text-right">Target (Cr)</th>
                        <th className="py-4 px-6 text-right">Ach (Cr)</th>
                        <th className="py-4 px-6 text-right">Ach %</th>
                        {isConsultant && <th className="py-4 px-6 text-right">Score</th>}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isConsultant && (
                    <>
                      <tr className="hover:bg-slate-50 transition-colors bg-amber-50/30">
                        <td className="py-4 px-6 font-bold text-slate-700">Advisor Criticality</td>
                        <td className="py-4 px-6 font-black text-amber-600">{currentData.advisors?.critical ?? 0} Critical</td>
                        <td className="py-4 px-6 text-right font-medium text-slate-500">{currentData.advisors?.total ?? 0} Total Base</td>
                        <td className="py-4 px-6"></td>
                        <td className="py-4 px-6"></td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-700 relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-lg"></div>
                          Efficiency Score Translation
                        </td>
                        <td className="py-4 px-6 font-black text-indigo-600">{currentData.totalScore}%</td>
                        <td className="py-4 px-6 text-right font-medium text-slate-500">{currentData.advisors?.achieved ?? 0} / {currentData.advisors?.total ?? 0} Yield</td>
                        <td className="py-4 px-6"></td>
                        <td className="py-4 px-6"></td>
                      </tr>
                    </>
                  )}
                  {lead.monthlyStats.map((s) => (
                    <tr key={s.month} className="hover:bg-indigo-50/50 transition-colors">
                      <td className="py-4 px-6 font-black text-slate-700">{s.month}</td>
                      {isSpecialized ? (
                        <>
                          <td className="py-4 px-6 text-right text-sm font-black text-indigo-600">{s.totalScore}%</td>
                          <td className="py-4 px-6 text-right">
                            <span className="px-2 py-1 rounded-lg text-[10px] font-black bg-emerald-50 text-emerald-600">
                              {isCXRole ? (s.categories.cx?.rating || 'Strong') : (s.categories.ops?.rating || 'Strong')}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right text-sm text-slate-500">
                            {isCXRole ? (s.categories.cx?.metrics?.length || 0) : (s.categories.ops?.metrics?.length || 0)} tracked
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-4 px-6 text-right text-sm text-slate-500">{s.categories.total.target.toFixed(2)}</td>
                          <td className="py-4 px-6 text-right text-sm font-black text-slate-800">{s.categories.total.achieved.toFixed(3)}</td>
                          <td className="py-4 px-6 text-right text-xs font-black text-emerald-600">{s.categories.total.percentage.toFixed(1)}%</td>
                          {isConsultant && <td className="py-4 px-6 text-right text-sm font-black text-indigo-600">{s.totalScore}</td>}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>
    </div>
  );
};

export default LeadDashboard;