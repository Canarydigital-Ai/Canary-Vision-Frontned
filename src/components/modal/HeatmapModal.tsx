
import React from 'react';


// Camera Modal Component
const HeatmapModal: React.FC<{
  camera: any;
  onClose: () => void;
}> = ({ camera, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1F242A] rounded-[25.29px] border-2 border-[#FFFFFF1A] overflow-hidden w-full max-w-5xl">
        {/* Modal Header */}
        <div className="flex items-center p-4 border-b border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-yellow-400">📷</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{camera.name}</h2>
              <div className="flex items-center">
                <span className="text-sm text-slate-400">Camera {camera.id.replace('CAM', '')}</span>
                <span className="inline-flex ml-2 items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-xs text-green-500">Live</span>
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="ml-auto bg-[#FFFFFF] p-2 rounded-full text-black font-bold hover:bg-[#797272] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-5 rounded-[12px]">
          {/* Heatmap Image */}
          <div className="relative">
            {camera.imageUrl ? (
              <img
                src={camera.imageUrl}
                alt={`Heatmap ${camera.name}`}
                className="w-full h-[550px] object-cover rounded-[12px]"
              />
            ) : (
              <div className="w-full h-96 bg-slate-800 flex items-center justify-center text-slate-400">
                No heatmap available
              </div>
            )}
            
           
          </div>
          
          {/* Metrics/Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 ">
            <div className="bg-[#FFFFFF0A] p-4 rounded-lg border border-[#FFFFFF33]">
              <h3 className="text-slate-400 text-sm mb-1">Total Customers</h3>
              <div className="text-2xl font-bold text-white">17</div>
              <div className="text-green-500 text-xs">+6%</div>
            </div>
            
            <div className="bg-[#FFFFFF0A] p-4 rounded-lg border border-[#FFFFFF33]">
              <h3 className="text-slate-400 text-sm mb-1">Avg Time Spent</h3>
              <div className="text-2xl font-bold text-white">14.5 Min</div>
              <div className="text-green-500 text-xs">+2%</div>
            </div>
            
            <div className="bg-[#FFFFFF0A] p-4 rounded-lg md:col-span-1 col-span-2 border border-[#FFFFFF33]">
              <h3 className="text-slate-400 text-sm mb-1">Insights</h3>
              <div className="text-white text-sm">
                Over the last week customer footfall has increased by 40%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeatmapModal;