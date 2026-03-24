
import React from 'react';
import { LayoutDashboard, CalendarDays, Users2, ShieldCheck, ChevronRight, BookmarkCheck, Clock } from 'lucide-react';
import { ViewType, UserRole, LeadData } from '../types';
import { PILLAR_ICONS, PILLARS, TEAM_ICONS } from '../constants';

interface SidebarProps {
  activePillar: ViewType;
  setActivePillar: (view: ViewType) => void;
  userRole: UserRole;
  leads: LeadData[];
}

const Sidebar: React.FC<SidebarProps> = ({ activePillar, setActivePillar, userRole, leads }) => {
  const isExecutive = userRole === 'executive';

  // Fixed team order: main Superteams first, then specialized teams
  const TEAM_ORDER = ['Elites', 'Rising Stars', 'Supremes', 'Underdogs', 'Rainmakers', 'Quality Guard', 'Growth Ops'];
  
  const allTeams: string[] = Array.from(new Set(leads.map(l => l.teamName)));
  const teams = TEAM_ORDER.filter(t => allTeams.includes(t)).concat(allTeams.filter(t => !TEAM_ORDER.includes(t)));
  
  const getTeamLeads = (teamName: string) => {
    return leads.filter(l => l.teamName === teamName && (isExecutive || l.id === userRole))
      .sort((a, b) => {
        // Ownership Hierarchy: SPM (0) -> PM (1) -> APM (2) -> CX/Ops (3) -> Consultant (4)
        const order: Record<string, number> = { spm: 0, pm: 1, apm: 2, cx_manager: 3, ops_manager: 3, consultant: 4 };
        return (order[a.roleType] || 99) - (order[b.roleType] || 99);
      });
  };

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 overflow-y-auto z-10">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 tracking-tight">Superteam Hub</h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Owner Dashboard</p>
          </div>
        </div>
        {/* Bookmark Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
          <BookmarkCheck size={14} className="text-emerald-600" />
          <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Certified Master Version</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-8">
        {/* Main Navigation */}
        <div className="space-y-1">
          <div className="px-3 mb-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Overview</p>
          </div>
          
          {isExecutive && (
            <button
              onClick={() => setActivePillar('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                activePillar === 'overview' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Executive Overview</span>
            </button>
          )}

          <button
            onClick={() => setActivePillar('cadence')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              activePillar === 'cadence' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <CalendarDays size={18} />
            <span>Review Cadence</span>
          </button>
        </div>

        {/* Superteams Breakdown */}
        <div className="space-y-6">
          <div className="px-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ownership Groups</p>
          </div>
          
          {teams.map(team => {
            const teamStaff = getTeamLeads(team);
            if (teamStaff.length === 0) return null;

            return (
              <div key={team} className="space-y-1">
                <div className="px-3 flex items-center gap-2 mb-2">
                  {TEAM_ICONS[team as keyof typeof TEAM_ICONS]}
                  <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{team}</span>
                </div>
                
                <div className="space-y-1">
                  {teamStaff.map((lead) => (
                    <button
                      key={lead.id}
                      onClick={() => setActivePillar(lead.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left group ${
                        activePillar === lead.id 
                          ? 'bg-slate-900 text-white' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-transform ${String(activePillar) === String(lead.id) ? 'border-indigo-400 scale-110' : 'border-slate-100'}`}>
                         <img src={lead.avatar} alt={lead.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col truncate flex-1">
                        <span className={`font-bold leading-none truncate ${String(activePillar) === String(lead.id) ? 'text-white' : 'text-slate-700'}`}>
                          {lead.name.split(' ')[0]}
                        </span>
                        <span className={`text-[9px] uppercase font-black mt-1 truncate ${String(activePillar) === String(lead.id) ? 'text-indigo-300' : 'text-slate-400'}`}>
                          {lead.roleType === 'spm' ? 'OWNER' : (lead.roleType === 'pm' ? 'PM' : (lead.roleType === 'apm' ? 'APM' : (lead.roleType === 'consultant' ? 'Consultant' : (lead.roleType === 'cx_manager' ? 'CX Quality' : (lead.roleType === 'ops_manager' ? 'Ops Lead' : (lead.roleType?.toString() || '').toUpperCase())))))}
                        </span>
                      </div>
                      {String(activePillar) === String(lead.id) && <ChevronRight size={14} className="text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Functional Pillars */}
        <div className="space-y-1">
          <div className="px-3 mb-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Functional Framework</p>
          </div>

          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(pillar.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                activePillar === pillar.id 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {PILLAR_ICONS[pillar.id]}
              <span className="truncate">{pillar.title.split('&')[0]}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-6 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-2 text-slate-400">
          <Users2 size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Logic: Ownership-First</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Clock size={12} />
          <span className="text-[8px] font-bold uppercase tracking-tighter">Last Sync: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;