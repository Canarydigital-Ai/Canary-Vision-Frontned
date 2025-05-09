import React from 'react';
import Img1 from '../assets/indoorcamera1.jpg'

// interface GeneralPanelProps {
//   currentCustomers: number;
//   avgTimeSpent: number;
//   totalCustomers: number;
// }

// interface BillingPanelProps {
//   billingStaffCount: number;
// }

// interface EntryExitPanelProps {
//   inCount: number;
//   outCount: number;
// }

// interface RestaurantPanelProps {
//   total: number;
//   tables: Record<string, number>;
//   noCap: { restaurant_without_cap_count: number; restaurant_without_cap_cropped_images: string[] };
//   alert: boolean;
// }

// interface KitchenPanelProps {
//   total: number;
//   inKitchen: number;
//   noCap: { kitchen_without_capcount: number; kitchen_without_cap_cropped_images: string[] };
//   alert: boolean;
// }

// type SidePanelType =
//   | { type: 'general'; currentCustomers: number; avgTimeSpent: number; totalCustomers: number }
//   | { type: 'billing'; billingStaffCount: number }
//   | { type: 'entryExit'; inCount: number; outCount: number }
//   | { type: 'restaurant'; total: number; tables: Record<string, number>; noCap: any; alert: boolean }
//   | { type: 'kitchen'; total: number; inKitchen: number; noCap: any; alert: boolean };

interface CameraFeedProps {
  id: string;
  name: string;
  imageUrl?: string;
  isActive: boolean;
  sidePanel: any;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ 
  id, 
  name, 
  imageUrl, 
  isActive, 
  sidePanel
}) => {

  console.log(sidePanel?.noCap,'2222222222222')
  return (
    <div className="mb-10">
      <div className="flex items-center mb-2 ">
        <div className="flex items-center mb-3">
          <div className="bg-slate-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <span className="text-yellow-400">📹</span>
          </div>
          <h2 className="text-[19.36px] font-bold ">{name}</h2>
        </div>
        <div className="ml-3 flex items-center">
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'} mr-1`}></span>
          <span className="text-xs text-slate-400">{isActive ? 'Live' : 'Offline'}</span>
        </div>
        <div className="text-sm font-bold text-slate-400 ml-auto">Camera ID: {id}</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Feed */}
        <div className="flex-1">
          <div className="relative bg-slate-800 rounded-xl overflow-hidden">
            <div className="aspect-video bg-slate-900 flex items-center justify-center">
              {imageUrl ? (
                <img src={imageUrl} alt={`Camera ${name}`} className="w-full h-full object-cover" />
              ) : (
                <div className="text-slate-500">No Feed Available</div>
              )}
            </div>
            <div className="absolute top-3 right-3 flex items-center bg-slate-900/70 backdrop-blur-sm rounded-full px-2 py-1">
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'} mr-1`}></span>
              <span className="text-xs">{isActive ? 'Live' : 'Offline'}</span>
            </div>
          </div>
        </div>

        {/* Right - Dynamic Side Panel */}
        <div className="lg:w-72 space-y-4">
          {sidePanel.type === 'general' && (
            <>
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Current Customers</div>
                <div className="text-2xl font-semibold">{sidePanel.currentCustomers}</div>
              </div>
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Avg Time Spent</div>
                <div className="text-2xl font-semibold">{sidePanel.avgTimeSpent} Mins</div>
              </div>
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Total Customers</div>
                <div className="text-2xl font-semibold">{sidePanel.totalCustomers}</div>
              </div>
            </>
          )}

          {sidePanel.type === 'billing' && (
            <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
              <div className="text-sm font-bold text-slate-400 mb-1">Billing Staff Count</div>
              <div className="text-2xl font-semibold">{sidePanel.billingStaffCount}</div>
            </div>
          )}

          {sidePanel.type === 'entryExit' && (
            <>
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Customers In</div>
                <div className="text-2xl font-semibold">{sidePanel.inCount}</div>
              </div>
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Customers Out</div>
                <div className="text-2xl font-semibold">{sidePanel.outCount}</div>
              </div>
            </>
          )}

          {sidePanel.type === 'restaurant' && (
            <>
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Total Customers</div>
                <div className="text-2xl font-semibold">{sidePanel.total}</div>
              </div>
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4 space-y-1">
                <div className="text-sm font-bold text-slate-400 mb-1">Table Counts</div>
                {Object.entries(sidePanel.tables).map(([table, count]:any) => (
                  <div key={table} className="text-sm font-bold text-white">{table}: {count}</div>
                ))}
              </div>
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Without Cap</div>
                <div className="text-white text-sm font-bold">{sidePanel.noCap.restaurant_without_cap_count} Staff</div>
              </div>
              <div className="rounded-xl p-4 space-y-2">
            {sidePanel.alert && (<div className="text-sm font-bold text-slate-400 mb-1">Cropped Staff Without Cap</div>)}
              {sidePanel.noCap.restaurant_without_cap_cropped_images?.map((img: string, index: number) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${img}`}
                  alt={`No Cap Staff ${index + 1}`}
                  className="w-full rounded shadow"
                />
              ))}
            </div>
              {sidePanel.alert && (
                <div className="text-sm font-bold text-red-500  animate-pulse">⚠️ No Cap Alert Active</div>
              )}
            </>
          )}

          {sidePanel.type === 'kitchen' && (
            <>
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Total Staff</div>
                <div className="text-2xl font-semibold">{sidePanel.total}</div>
              </div>
              {/* <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Staff In Kitchen</div>
                <div className="text-2xl font-semibold">{sidePanel.inKitchen}</div>
              </div> */}
              <div className="bg-[#FFFFFF0A] border-[1.5px] border-[#FFFFFF33] rounded-[12px] p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Without Cap</div>
                <div className="text-white text-sm font-bold">1 Staff</div>
              </div>
              <div className="bg-slate-700 rounded-xl p-4 space-y-2">
              <div className="text-sm font-bold text-slate-400 mb-1">Cropped Staff Without Cap</div>
           
               {sidePanel?.noCap?.kitchen_without_cap_cropped_images && (
  <img
    src={`data:image/jpeg;base64,${sidePanel.noCap.kitchen_without_cap_cropped_images}`}
    alt="No Cap Staff"
    className="w-full rounded shadow"
  />
)}
            </div>
              {sidePanel.alert && (
               <div className="text-xl font-bold text-red-500  animate-pulse">⚠️ No Cap Alert Active</div>
              )}
            </>
          )}
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
  console.log(frameData,'API CALL')
  const cameras = [
    {
      id: "CAM001",
      name: "Indoor Camera 1",
      isActive: !!frameData?.cam1,
      imageUrl: Img1,
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
      imageUrl: frameData?.cam2?.frame ? `data:image/jpeg;base64,${frameData.cam2?.frame}` : undefined, 
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
      imageUrl: frameData?.cam3?.frame ?  `data:image/jpeg;base64,${frameData.cam3?.frame}` : undefined, 
      sidePanel: {
        type: "billing",
        billingStaffCount: frameData?.cam3?.billing_area_staff_count
      }
    },
    {
      id: "CAM004",
      name: "Entrance Camera",
      isActive: !!frameData?.cam4,
      imageUrl: frameData?.cam4?.frame ? `data:image/jpeg;base64,${frameData.cam4?.frame}` : undefined, 
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
      imageUrl: frameData?.cam5?.frame ? `data:image/jpeg;base64,${frameData.cam5?.frame}` : undefined, 
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
      imageUrl: frameData?.cam6?.frame ?  `data:image/jpeg;base64,${frameData.cam6?.frame}` : undefined, 
      sidePanel: {
        type: "kitchen",
        total: frameData?.cam6?.kitchen_total_staff_count,
        inKitchen: frameData?.cam6?.staff_in_kitchen,
        noCap: frameData?.cam6?.kitchen_without_cap,
        alert: frameData?.cam6?.kitchen_no_cap_alert_detection_status
      }
    },
  ];

  return (
    <div>
      <div className="mb-6 ml-4">
        <h2 className="text-xl font-medium mb-2">All Camera Feeds</h2>
        <p className="text-slate-400 text-sm">{activeCameras} of {cameras.length} cameras active</p>
      </div>

      <div className='ml-4'>
        {cameras.map(camera => (
          <CameraFeed
            key={camera.id}
            id={camera.id}
            name={camera.name}
            imageUrl={camera.imageUrl}
            isActive={camera.isActive}
            sidePanel={camera.sidePanel}
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