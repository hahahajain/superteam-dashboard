
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { KPI } from '../types';

const KpiCard: React.FC<KPI> = ({ name, value, trend, status, target }) => {
  const statusColors = {
    good: 'bg-green-50 text-green-700 border-green-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    critical: 'bg-red-50 text-red-700 border-red-100',
  };

  const trendIcon = {
    up: <ArrowUpRight size={16} className="text-green-500" />,
    down: <ArrowDownRight size={16} className="text-red-500" />,
    neutral: <Minus size={16} className="text-slate-400" />,
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-slate-500 leading-tight pr-4">{name}</p>
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${statusColors[status]}`}>
          {status}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
          {target && (
            <p className="text-xs text-slate-400 mt-1">Target: {target}</p>
          )}
        </div>
        {trend && (
          <div className="bg-slate-50 p-1 rounded-lg">
            {trendIcon[trend]}
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
