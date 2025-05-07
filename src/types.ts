// // types.ts
// export interface FrameData {
//   frame_no: number;
//   current_date: string;
//   current_time: string;
//   cam1_frame?: string; // Base64 encoded image data
//   frame_info: {
//     classes: string[];
//     boxes: number[][];
//     confidences: number[];
//     heatmap_points: number[][];
//   };
// }


// types.ts
export interface CameraData {
  frame_no: number;
  frame_image: string; // Base64 encoded image data
  frame_info?: {
    classes: string[];
    boxes: number[][];
    confidences: number[];
    heatmap_points: number[][];
  };
}

export interface FrameData {
  current_date: string;
  current_time: string;
  cam1?: CameraData;
  cam2?: CameraData;
  cam3?: CameraData;
  cam4?: CameraData;
  cam5?: CameraData;
  cam6?: CameraData;
  [key: string]: any; 
}