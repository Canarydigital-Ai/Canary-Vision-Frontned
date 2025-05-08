import React, { useState } from 'react';
import HeatmapModal from '../modal/HeatmapModal';
import HeatMap1 from '../../assets/heatmap_overlay1.jpg'
import HeatMap2 from '../../assets/heatmap_overlay2.jpg'
import HeatMap3 from '../../assets/heatmap_overlay3.jpg'
import HeatMap4 from '../../assets/heatmap_overlay4.jpg'
import HeatMap5 from '../../assets/heatmap_overlay5.jpg'
import HeatMap6 from '../../assets/heatmap_overlay6.jpg'

interface HeatmapGalleryProps {
  frameData: any;
  activeCameras: number;
}

const Heatmap: React.FC<HeatmapGalleryProps> = ({ frameData, activeCameras }) => {
  console.log(frameData, activeCameras);
  const [selectedCamera, setSelectedCamera] = useState<any | null>(null);
  const cameras = [
    {
      id: "CAM001",
      name: "Indoor Camera 1",
      isActive: !!frameData?.cam1,
      imageUrl: HeatMap1,
      sidePanel: {
        type: "general",
        currentCustomers: frameData?.current_customer_count,
        avgTimeSpent: frameData?.avg_time_spent_minutes,
        totalCustomers: frameData?.total_customers_count
      }
    },
    {
      id: "CAM002",
      name: "Indoor Camera 2",
      isActive: !!frameData?.cam2,
      imageUrl: HeatMap2, 
      sidePanel: {
        type: "general",
        currentCustomers: frameData?.current_customer_count,
        avgTimeSpent: frameData?.avg_time_spent_minutes,
        totalCustomers: frameData?.total_customers_count
      }
    },
    {
      id: "CAM003",
      name: "Counter Camera",
      isActive: !!frameData?.cam3,
      imageUrl: HeatMap3, 
      sidePanel: {
        type: "billing",
        billingStaffCount: frameData?.cam3?.billing_area_staff_count
      }
    },
    {
      id: "CAM004",
      name: "Entrance Camera",
      isActive: !!frameData?.cam4,
      imageUrl: HeatMap4, 
      sidePanel: {
        type: "entryExit",
        inCount: frameData?.cam4?.customers_in_count,
        outCount: frameData?.cam4?.customers_out_count
      }
    },
    {
      id: "CAM005",
      name: "Restaurant Camera",
      isActive: !!frameData?.cam5,
      imageUrl: HeatMap5, 
      sidePanel: {
        type: "restaurant",
        total: frameData?.cam5?.restaurant_total_customers_count,
        tables: frameData?.cam5?.customer_count_per_table,
        noCap: frameData?.cam5?.restaurant_without_cap,
        alert: frameData?.cam5?.restaurant_no_cap_alert_detection_status
      }
    },
    {
      id: "CAM006",
      name: "Kitchen Camera",
      isActive: !!frameData?.cam6,
      imageUrl: HeatMap6, 
      sidePanel: {
        type: "kitchen",
        total: frameData?.cam6?.kitchen_total_staff_count,
        inKitchen: frameData?.cam6?.staff_in_kitchen,
        noCap: frameData?.cam6?.kitchen_without_cap,
        alert: frameData?.cam6?.kitchen_no_cap_alert_detection_status
      }
    },
  ];
  
  const handleCameraClick = (camera: any) => {
    setSelectedCamera(camera);
  };
  
  // Handler to close modal
  const handleCloseModal = () => {
    setSelectedCamera(null);
  };
  
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
    <h2 className="text-lg font-semibold mb-6 text-yellow-400">Click on a camera view to view its heatmap</h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cameras.map((camera) => (
        <div key={camera.id} className="relative"  onClick={() => handleCameraClick(camera)}>
          <div className="rounded-lg overflow-hidden">
            <img 
              src={camera.imageUrl} 
              alt={camera.name}
              className="w-full object-cover"
            />
          </div>
          <div className="mt-2 flex items-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs">📷</span>
            </div>
            <div>
              <h3 className="font-medium">{camera.name}</h3>
              <p className="text-sm text-gray-400">{camera.sidePanel?.type}</p>
              <p className="text-xs text-gray-500">Live</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    {selectedCamera && (
        <HeatmapModal 
          camera={selectedCamera} 
          onClose={handleCloseModal} 
        />
      )}
  </div>
  );
};

export default Heatmap;