// import React from 'react';
// import CameraFeed from './CameraFeed';
// import type { FrameData } from '../types'; 
// interface AllCameraFeedsProps {
//   frameData: FrameData | null;
//   activeCameras: number;
// }

// const AllCameraFeeds: React.FC<AllCameraFeedsProps> = ({ frameData, activeCameras }) => {
//   // Generate camera configs with the updated data structure
//   const cameras = [
//     {
//       id: "CAM001",
//       name: "InDoor Camera 1",
//       isActive: true,
//       customerCount: frameData?.cam1?.frame_info ? 
//         frameData.cam1.frame_info.classes.filter((cls: string) => cls === 'customer').length : 0,
//       staffCount: frameData?.cam1?.frame_info ? 
//         frameData.cam1.frame_info.classes.filter((cls: string) => cls === 'staff').length : 0,
//       cameraData: frameData?.cam1,
//       totalCustomers: 1234,
//       avgTimeSpent: 15
//     },
//     {
//       id: "CAM002",
//       name: "InDoor Camera 2",
//       isActive: true,
//       customerCount: frameData?.cam2?.frame_info ? 
//         frameData.cam2.frame_info.classes.filter((cls: string) => cls === 'customer').length : 3,
//       staffCount: frameData?.cam2?.frame_info ? 
//         frameData.cam2.frame_info.classes.filter((cls: string) => cls === 'staff').length : 2,
//       cameraData: frameData?.cam2,
//       totalCustomers: 1234,
//       avgTimeSpent: 15
//     },
//     {
//       id: "CAM003",
//       name: "Counter Camera",
//       isActive: true,
//       customerCount: frameData?.cam3?.frame_info ? 
//         frameData.cam3.frame_info.classes.filter((cls: string) => cls === 'customer').length : 3,
//       staffCount: frameData?.cam3?.frame_info ? 
//         frameData.cam3.frame_info.classes.filter((cls: string) => cls === 'staff').length : 2,
//       cameraData: frameData?.cam3,
//       totalCustomers: 1234,
//       avgTimeSpent: 15
//     },
//     {
//       id: "CAM004",
//       name: "Entrance Camera",
//       isActive: true,
//       customerCount: frameData?.cam4?.frame_info ? 
//         frameData.cam4.frame_info.classes.filter((cls: string) => cls === 'customer').length : 3,
//       staffCount: frameData?.cam4?.frame_info ? 
//         frameData.cam4.frame_info.classes.filter((cls: string) => cls === 'staff').length : 2,
//       cameraData: frameData?.cam4,
//       totalCustomers: 1234,
//       avgTimeSpent: 15
//     },
//     {
//       id: "CAM005",
//       name: "Restaurant Camera",
//       isActive: true,
//       customerCount: frameData?.cam5?.frame_info ? 
//         frameData.cam5.frame_info.classes.filter((cls: string) => cls === 'customer').length : 3,
//       staffCount: frameData?.cam5?.frame_info ? 
//         frameData.cam5.frame_info.classes.filter((cls: string) => cls === 'staff').length : 2,
//       cameraData: frameData?.cam5,
//       totalCustomers: 1234,
//       avgTimeSpent: 15
//     },
//     {
//       id: "CAM006",
//       name: "Kitchen Camera",
//       isActive: true,
//       customerCount: frameData?.cam6?.frame_info ? 
//         frameData.cam6.frame_info.classes.filter((cls: string) => cls === 'customer').length : 3,
//       staffCount: frameData?.cam6?.frame_info ? 
//         frameData.cam6.frame_info.classes.filter((cls: string) => cls === 'staff').length : 2,
//       cameraData: frameData?.cam6,
//       totalCustomers: 1234,
//       avgTimeSpent: 15
//     }
//   ];

//   return (
//     <div>
//       <div className="mb-6">
//         <h2 className="text-xl font-medium mb-2">All Camera Feeds</h2>
//         <p className="text-slate-400 text-sm">{activeCameras} of {cameras.length} cameras active</p>
//       </div>
      
//       <div>
//         {cameras.map(camera => (
//           <CameraFeed 
//             key={camera.id}
//             id={camera.id}
//             name={camera.name}
//             cameraData={camera.cameraData}
//             isActive={camera.isActive}
//             customerCount={camera.customerCount}
//             staffCount={camera.staffCount}
//             totalCustomers={camera.totalCustomers}
//             avgTimeSpent={camera.avgTimeSpent}
//           />
//         ))}
//       </div>
      
//       <div className="text-right text-xs text-slate-400 mt-8 pt-4 border-t border-slate-700">
//         Built by Canary Digital
//       </div>
//     </div>
//   );
// };

// export default AllCameraFeeds;