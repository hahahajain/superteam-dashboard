
import React from 'react';
import { REVIEW_CADENCE } from '../constants';
// Added Target to the imports
import { Clock, CheckSquare, Zap, Target } from 'lucide-react';

const CadenceView: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Review Cadence</h2>
        <p className="text-slate-500 max-w-2xl">Standard review rhythm and standard operational tracking for Hygiene, Execution, and Outcomes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
           <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
              <Zap size={24} />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-2">Daily Metrics</h3>
           <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-6">Hygiene & Control</p>
           <ul className="space-y-4">
              {REVIEW_CADENCE.daily.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
           </ul>
        </div>

        {/* Weekly */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
              <Clock size={24} />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-2">Weekly Metrics</h3>
           <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-6">Execution & Output</p>
           <ul className="space-y-4">
              {REVIEW_CADENCE.weekly.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
           </ul>
           <div className="mt-8 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold">
                <CheckSquare size={14} />
                <span>Next Review: Thursday 10:00 AM</span>
              </div>
           </div>
        </div>

        {/* Monthly */}
        <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
           <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
              <Target size={24} />
           </div>
           <h3 className="text-xl font-bold mb-2">Monthly Metrics</h3>
           <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-6">Outcomes & Impact</p>
           <ul className="space-y-4">
              {REVIEW_CADENCE.monthly.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
           </ul>
           {/* Decorative circles */}
           <div className="absolute bottom-[-20px] right-[-20px] w-24 h-24 bg-white/5 rounded-full"></div>
           <div className="absolute top-[20px] right-[20px] w-12 h-12 bg-white/5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CadenceView;
