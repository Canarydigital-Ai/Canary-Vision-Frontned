import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  return (
    <div className="stat-card border-[1.5px] border-[#FFFFFF33] rounded-2xl bg-[#FFFFFF0A]  p-6">
      <div className="stat-header flex justify-between mb-3">
        <div className="stat-title text-[16.48px] font-bold">{title}</div>
        <div className="stat-options">•••</div>
      </div>
      <div className="stat-content">
        <div className="stat-value text-4xl mb-2">{value}</div>
        <div className={`stat-change text-[#C1F17E] text-xs ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
      {/* <div className="stat-icon">{icon}</div> */}
    </div>
  );
};

export default StatCard;