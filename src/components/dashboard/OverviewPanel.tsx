import type React from "react";

interface FrameData {
    frame_no: number;
    current_date: string;
    current_time: string;
    avg_time_spent_minutes:any;
    current_customer_count:any;
    cam1_frame?: string; // Base64 encoded image data
    frame_info: {
      classes: string[];
      boxes: number[][];
      confidences: number[];
      heatmap_points: number[][];
    };
  }
  

interface OverviewPanelProps {
    frameData: FrameData | null;
    popularAreas: Array<{
      area: string;
      count: number;
    }>;
  }

const OverviewPanel: React.FC<OverviewPanelProps> = ({ frameData, popularAreas }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-base font-medium">Store Overview</h3>
        <div className="text-slate-400 cursor-pointer">•••</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
        <div className="relative">
          <div className="w-full h-auto bg-slate-900 rounded-lg aspect-video">
            {frameData && frameData.cam1_frame ? (
              <img 
                src={`data:image/jpeg;base64,${frameData.cam1_frame}`} 
                alt="Camera Feed" 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Camera Feed Unavailable
              </div>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4 bg-slate-900/70 backdrop-blur-md p-3 rounded-lg">
            <div className="text-xs text-slate-400 mb-1">
              {frameData ? frameData.current_time : 'Live Feed'}
            </div>
            <div className="text-sm">
              {frameData && frameData.frame_info ? 
                `${frameData.frame_info.classes.filter(cls => cls === 'customer').length} Customers, ` +
                `${frameData.frame_info.classes.filter(cls => cls === 'staff').length} Staff` : 
                'No data available'
              }
            </div>
          </div>
        </div>
        
        <div className="lg:border-l lg:border-slate-700 lg:pl-6">
          <h3 className="text-base font-medium mb-4">Popular Areas</h3>
          <div className="flex flex-col gap-3">
            {popularAreas.map((area, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-xs mr-3">
                  {index + 1}
                </div>
                <div className="text-sm mr-auto">{area.area}</div>
                <div className="text-xs text-slate-400">{area.count} visits</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel