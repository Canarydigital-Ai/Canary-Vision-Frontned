import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-title">{title}</div>
        <div className="stat-options">•••</div>
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className={`stat-change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
};

export default StatCard;