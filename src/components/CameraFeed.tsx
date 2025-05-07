import React from 'react';

interface CameraFeedProps {
  id: string;
  name: string;
  imageUrl?: string;
  isActive: boolean;
  customerCount?: number;
  staffCount?: number;
  totalCustomers?: number;
  avgTimeSpent?: number;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ 
  id, 
  name, 
  imageUrl, 
  isActive, 
  customerCount = 0, 
  staffCount = 0,
  totalCustomers = 1234,
  avgTimeSpent = 15
}) => {
  return (
    <div className="mb-10">
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          <div className="bg-slate-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <span className="text-yellow-400">📹</span>
          </div>
          <h2 className="text-lg font-medium">{name}</h2>
        </div>
        <div className="ml-3 flex items-center">
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'} mr-1`}></span>
          <span className="text-xs text-slate-400">{isActive ? 'Live' : 'Offline'}</span>
        </div>
        <div className="text-xs text-slate-400 ml-auto">Camera ID: {id}</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Camera feed */}
        <div className="flex-1">
          <div className="relative bg-slate-800 rounded-xl overflow-hidden">
            <div className="aspect-video bg-slate-900 flex items-center justify-center">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={`Camera ${name}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-500">No Feed Available</div>
              )}
            </div>
            
            {/* Status indicator */}
            <div className="absolute top-3 right-3 flex items-center bg-slate-900/70 backdrop-blur-sm rounded-full px-2 py-1">
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'} mr-1`}></span>
              <span className="text-xs">{isActive ? 'Live' : 'Offline'}</span>
            </div>
            
            {/* Customer/Staff count indicator */}
            <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="text-xs text-slate-400">Current Count</div>
              <div className="text-sm">
                <span className="text-white">{customerCount} Customers</span>, 
                <span className="text-white ml-1">{staffCount} Staff</span>
              </div>
            </div>

            {/* Shelf Indicators (Overlay) */}
            <div className="absolute top-1/3 left-10 border-2 border-yellow-400 bg-yellow-400/10 rounded w-24 h-32">
              <div className="bg-yellow-400/30 text-xs px-1 py-0.5 rounded text-black">Shelf 1</div>
            </div>
            
            <div className="absolute top-1/3 right-16 border-2 border-yellow-400 bg-yellow-400/10 rounded w-24 h-32">
              <div className="bg-yellow-400/30 text-xs px-1 py-0.5 rounded text-black">Shelf 2</div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2">
            <div className="text-sm text-slate-400">Current Time: 16:18:33</div>
            <button className="text-xs text-yellow-400 flex items-center">
              <span>Edit Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Right side - Stats */}
        <div className="lg:w-64">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-medium">Shelf 1</h3>
            <div className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-0.5 rounded">Popular Shelf</div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Total Customers</div>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-semibold">{totalCustomers}</div>
                <div className="text-xs px-2 py-1 rounded bg-green-400/20 text-green-400">+5%</div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Avg Time Spent</div>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-semibold">{avgTimeSpent} Mins</div>
                <div className="text-xs px-2 py-1 rounded bg-orange-400/20 text-orange-400">-2%</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-base font-medium mb-2">Shelf 2</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Total Customers</div>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-semibold">{totalCustomers}</div>
                  <div className="text-xs px-2 py-1 rounded bg-green-400/20 text-green-400">+5%</div>
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Avg Time Spent</div>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-semibold">{avgTimeSpent} Mins</div>
                  <div className="text-xs px-2 py-1 rounded bg-orange-400/20 text-orange-400">-2%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AllCameraFeedsProps {
  frameData: any;
  activeCameras: number;
}

const AllCameraFeeds: React.FC<AllCameraFeedsProps> = ({ frameData, activeCameras }) => {
  // Mock data for multiple cameras
  const cameras = [
    {
      id: "CAM001",
      name: "InDoor Camera 1",
      isActive: true,
      customerCount: frameData?.frame_info ? 
        frameData.frame_info.classes.filter((cls: string) => cls === 'customer').length : 0,
      staffCount: frameData?.frame_info ? 
        frameData.frame_info.classes.filter((cls: string) => cls === 'staff').length : 0,
      imageUrl: frameData?.cam1_frame ? 
        `data:image/jpeg;base64,${frameData.cam1_frame}` : undefined,
      totalCustomers: 1234,
      avgTimeSpent: 15
    },
    {
      id: "CAM002",
      name: "InDoor Camera 2",
      isActive: true,
      customerCount: 3,
      staffCount: 2,
      imageUrl: undefined, 
      totalCustomers: 1234,
      avgTimeSpent: 15
    },
    {
        id: "CAM003",
        name: "Counter Camera",
        isActive: true,
        customerCount: 3,
        staffCount: 2,
        imageUrl: undefined, 
        totalCustomers: 1234,
        avgTimeSpent: 15
      },
      {
        id: "CAM004",
        name: "Entrance Camera",
        isActive: true,
        customerCount: 3,
        staffCount: 2,
        imageUrl: undefined, 
        totalCustomers: 1234,
        avgTimeSpent: 15
      },
      {
        id: "CAM005",
        name: " Resturant Camera",
        isActive: true,
        customerCount: 3,
        staffCount: 2,
        imageUrl: undefined,
        totalCustomers: 1234,
        avgTimeSpent: 15
      },
      {
        id: "CAM006",
        name: "Kitchen Camera",
        isActive: true,
        customerCount: 3,
        staffCount: 2,
        imageUrl: undefined,           
        totalCustomers: 1234,
        avgTimeSpent: 15
      }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">All Camera Feeds</h2>
        <p className="text-slate-400 text-sm">{activeCameras} of {cameras.length} cameras active</p>
      </div>
      
      <div>
        {cameras.map(camera => (
          <CameraFeed 
            key={camera.id}
            id={camera.id}
            name={camera.name}
            imageUrl={camera.imageUrl}
            isActive={camera.isActive}
            customerCount={camera.customerCount}
            staffCount={camera.staffCount}
            totalCustomers={camera.totalCustomers}
            avgTimeSpent={camera.avgTimeSpent}
          />
        ))}
      </div>
      
      <div className="text-right text-xs text-slate-400 mt-8 pt-4 border-t border-slate-700">
        Built by Canary Digital
      </div>
    </div>
  );
};

export default AllCameraFeeds;