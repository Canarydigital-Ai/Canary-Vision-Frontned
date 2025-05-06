// types.ts
export interface FrameData {
  frame_no: number;
  current_date: string;
  current_time: string;
  cam1_frame?: string; // Base64 encoded image data
  frame_info: {
    classes: string[];
    boxes: number[][];
    confidences: number[];
    heatmap_points: number[][];
  };
}