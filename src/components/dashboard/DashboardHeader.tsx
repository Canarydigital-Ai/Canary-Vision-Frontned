import type React from "react";


interface DashboardHeaderProps {
    activeCameras: number;
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  }
  

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeCameras, selectedDate, setSelectedDate }) => {
  return (
    <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
      <div className="flex items-center">
        <h1 className="text-[34px]  font-bold mr-4">Dashboard</h1>
        <div className="bg-[#FFFFFF0A] px-3 py-1.5 rounded-full text-sm flex items-center border-[1.5px] border-[#FFFFFF33]">
          <span className="w-2 h-2 bg-[#0DC44A] rounded-full mr-2 "></span>
          {activeCameras} Cameras Active
        </div>
      </div>
      <div className="flex items-center mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="flex  rounded-lg mr-4 flex-grow sm:flex-grow-0 gap-4 ">
          <button 
            className={`px-4 py-2 text-[15px] font-semibold rounded-lg ${selectedDate === 'Today' ? 'bg-[#F1EF7E] text-slate-900' : 'text-slate-400'}`}
            onClick={() => setSelectedDate('Today')}
          >
            Today
          </button>
          <button 
            className={`px-4 py-2 text-[15px] text-[#F1EF7E] rounded-lg border-[1.5px] border-[#D6DDE633] ${selectedDate === 'Week' ? 'bg-yellow-400 text-slate-900' : 'text-slate-400'}`}
            onClick={() => setSelectedDate('Week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-2 text-[15px] text-[#F1EF7E] rounded-lg border-[1.5px] border-[#D6DDE633] ${selectedDate === 'Month' ? 'bg-yellow-400 text-slate-900' : 'text-slate-400'}`}
            onClick={() => setSelectedDate('Month')}
          >
            Month
          </button>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-[#080F17] rounded-lg cursor-pointer">
          <span>⋮</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader