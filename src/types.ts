// types.ts
export interface FrameInfo {
    classes: string[];
    boxes: number[][];
    confidences: number[];
    heatmap_points: [number, number][];
  }
  
  export interface FrameData {
    frame_no: number;
    frame_info: FrameInfo;
    current_date: string;
    current_time: string;
  }