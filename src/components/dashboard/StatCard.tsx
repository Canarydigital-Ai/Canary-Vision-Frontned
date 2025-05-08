import type React from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    change: number;
    icon: string;
  }

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 relative overflow-hidden">
      <div className="flex justify-between mb-6">
        <div className="text-sm text-slate-400">{title}</div>
        <div className="text-slate-400 cursor-pointer">•••</div>
      </div>
      <div className="flex items-end">
        <div className="text-3xl font-semibold mr-3">{value}</div>
        <div className={`text-sm px-2 py-1 rounded ${change > 0 ? 'bg-green-400/20 text-green-400' : 'bg-orange-400/20 text-orange-400'}`}>
          {change > 0 ? '+' : ''}{change}%
        </div>
      </div>
      <div className="absolute top-6 right-6 text-2xl opacity-50">
        {icon}
      </div>
    </div>
  );
};

export default StatCard