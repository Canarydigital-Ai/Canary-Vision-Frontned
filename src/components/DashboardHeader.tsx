// components/DashboardHeader.tsx
import React from 'react';

interface DashboardHeaderProps {
  activeCameras: number;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  activeCameras, 
  selectedDate, 
  setSelectedDate 
}) => {
  return (
    <div className="dashboard-header">
      <div className="header-left">
        <h1>Dashboard</h1>
        <div className="active-cameras">
          {activeCameras} Cameras Active
        </div>
      </div>
      <div className="header-right">
        <div className="date-selector">
          <button 
            className={selectedDate === 'Today' ? 'active' : ''} 
            onClick={() => setSelectedDate('Today')}
          >
            Today
          </button>
          <button 
            className={selectedDate === 'Yesterday' ? 'active' : ''} 
            onClick={() => setSelectedDate('Yesterday')}
          >
            Yesterday
          </button>
          <button 
            className={selectedDate === 'Custom' ? 'active' : ''} 
            onClick={() => setSelectedDate('Custom')}
          >
            Choose date
          </button>
        </div>
        <div className="more-options">•••</div>
      </div>
    </div>
  );
};

export default DashboardHeader;

