
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import PillarDashboard from './components/PillarDashboard';
import ExecutiveOverview from './components/ExecutiveOverview';
import CadenceView from './components/CadenceView';
import LeadDashboard from './components/LeadDashboard';
import { PillarType, ViewType, UserRole, LeadData } from './types';
import { PILLARS, LEADS as initialLeads } from './constants';
import { Search, Bell, ChevronDown, UserCircle2, X, Users, Briefcase, Database, Loader2, LogOut } from 'lucide-react';
import DataImport from './components/DataImport';
import Login from './components/Login';
import { fetchLeadsFromAPI } from './services/apiService';

const MONTH_MAP_APP: Record<string, string> = {
  'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June',
  'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
};
const MONTH_ORDER_APP = ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];

const normalizeLeadMonths = (leads: LeadData[]): LeadData[] => {
  return leads.map(lead => {
    const monthMap = new Map<string, any>();
    (lead.monthlyStats || []).forEach((stat: any) => {
      const normalized = MONTH_MAP_APP[stat.month] || stat.month;
      stat.month = normalized;
      monthMap.set(normalized, stat);
    });
    lead.monthlyStats = Array.from(monthMap.values())
      .sort((a: any, b: any) => MONTH_ORDER_APP.indexOf(a.month) - MONTH_ORDER_APP.indexOf(b.month));
    return lead;
  });
};

const App: React.FC = () => {
  const [leadsState, setLeadsState] = useState<LeadData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState<UserRole>(localStorage.getItem('role') as UserRole || 'executive');
  const [userId, setUserId] = useState<string>(localStorage.getItem('userId') || 'executive');
  const [activePillar, setActivePillar] = useState<ViewType>('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleLoginSuccess = (token: string, role: string, id: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', id);
    setUserRole(role as UserRole);
    setUserId(id);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  const refreshLeadsFromDB = async () => {
    const data = await fetchLeadsFromAPI();
   if (data.length > 0) {
  const apiIds = new Set(data.map(l => l.id));
  const missingLeads = initialLeads.filter(l => !apiIds.has(l.id));
  const merged = [...data, ...missingLeads];
  setLeadsState(normalizeLeadMonths(merged));
    } else {
      setLeadsState(normalizeLeadMonths(initialLeads));
    }
  };

  // Fetch initial data from Backend
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadData = async () => {
      setIsLoading(true);
      await refreshLeadsFromDB();
      setIsLoading(false);
    };
    loadData();
  }, [isAuthenticated]);

  // Close search and user menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When user role changes, update the landing page
  useEffect(() => {
    if (userRole === 'executive') {
      setActivePillar('overview');
    } else {
      setActivePillar(userId as ViewType);
    }
  }, [userRole, userId]);

  const currentPillarData = PILLARS.find(p => String(p.id).toLowerCase() === String(activePillar).toLowerCase());
  const currentLeadData = leadsState.find(l => String(l.id) === String(activePillar));

  const activeUser = userRole === 'executive' || userRole === 'admin'
    ? { name: 'Admin User', role: 'Executive', avatar: 'https://picsum.photos/seed/admin/32/32' }
    : {
      name: leadsState.find(l => l.id === userId)?.name || 'User',
      role: leadsState.find(l => l.id === userId)?.role || 'Team Member',
      avatar: leadsState.find(l => l.id === userId)?.avatar || '',
    };

  const handlePillarSelection = (type: PillarType) => {
    setActivePillar(type as ViewType);
  };

  const handleUserSwitch = (role: UserRole) => {
    setUserRole(role);
    setShowUserMenu(false);
  };

  // Search Logic
  const filteredLeads = leadsState.filter(lead =>
    (lead.name?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.teamName?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPillars = PILLARS.filter(pillar =>
    pillar.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredLeads.length > 0 || filteredPillars.length > 0;

  const navigateTo = (view: ViewType) => {
    setActivePillar(view);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-indigo-600">
          <Loader2 size={48} className="animate-spin" />
          <p className="font-bold">Connecting to Database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar
        activePillar={activePillar}
        setActivePillar={setActivePillar}
        userRole={userRole}
        userId={userId}
        leads={leadsState}
      />

      <main className="flex-1 ml-72">
        {/* Global Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20 backdrop-blur-md bg-white/80">
          <div className="flex-1 max-w-md relative" ref={searchRef}>
            {userRole === 'executive' && (
              <div className="flex items-center gap-4 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder="Search teams, people, or pillars..."
                  className="bg-transparent border-none text-sm outline-none w-full"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                )}
              </div>
            )}

            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-[400px] overflow-y-auto p-2">
                  {!hasResults && (
                    <div className="p-4 text-center text-slate-400 text-sm">
                      No matching leads, teams, or pillars found.
                    </div>
                  )}

                  {filteredLeads.length > 0 && (
                    <div className="mb-2">
                      <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leads & Teams</p>
                      {filteredLeads.map(lead => (
                        <button
                          key={lead.id}
                          onClick={() => navigateTo(lead.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <img src={lead.avatar} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div>
                            <p className="font-semibold leading-none">{lead.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{lead.teamName}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredPillars.length > 0 && (
                    <div>
                      <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Functional Pillars</p>
                      {filteredPillars.map(pillar => (
                        <button
                          key={pillar.id}
                          onClick={() => navigateTo(pillar.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
                        >
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0">
                            <Briefcase size={16} />
                          </div>
                          <div>
                            <p className="font-semibold leading-none">{pillar.title}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{pillar.systemRole}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {userRole === 'executive' && (
              <button
                onClick={() => setShowImportDialog(true)}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl transition-colors font-bold text-xs flex items-center gap-2"
              >
                <Database size={14} />
                <span>Import Data</span>
              </button>
            )}

            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-1 pr-3 hover:bg-slate-50 rounded-full transition-all border border-transparent hover:border-slate-200"
              >
                <img
                  src={activeUser.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
                />
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-slate-800 leading-none">{activeUser.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{activeUser.role}</p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Details</p>
                  <div className="px-3 py-2 mb-2">
                    <p className="text-sm font-bold text-slate-800">{activeUser.name}</p>
                    <p className="text-xs text-slate-500">{activeUser.role}</p>
                  </div>
                  <div className="h-px bg-slate-100 my-1"></div>
                  
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-2">
                    <LogOut size={16} />
                    <span className="font-semibold">Sign Out Securely</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto pb-24">
          {(String(activePillar).toLowerCase() === 'overview') && (
            <ExecutiveOverview onSelectPillar={handlePillarSelection} leads={leadsState} />
          )}

          {(String(activePillar).toLowerCase() === 'cadence') && (
            <CadenceView />
          )}

          {currentPillarData && (
            <PillarDashboard pillar={currentPillarData} leads={leadsState} />
          )}

          {currentLeadData && (
            <LeadDashboard lead={currentLeadData} leads={leadsState} />
          )}
        </div>

        {showImportDialog && (
          <DataImport
            existingLeads={leadsState}
            onClose={() => setShowImportDialog(false)}
            onImportComplete={async () => {
              await refreshLeadsFromDB();
            }}
          />
        )}

        {/* Global Footer (Sticky Call to Action) */}
        <footer className="fixed bottom-6 right-8 z-30">
          <button
            className="flex items-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-200 font-bold hover:bg-indigo-700 hover:-translate-y-1 transition-all active:translate-y-0"
            onClick={() => alert(`Reviewing as ${activeUser.name}...`)}
          >
            <Zap size={18} fill="currentColor" />
            <span>Launch Sync Review</span>
          </button>
        </footer>
      </main>
    </div>
  );
};

const Zap: React.FC<{ size: number, fill: string }> = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

export default App;
