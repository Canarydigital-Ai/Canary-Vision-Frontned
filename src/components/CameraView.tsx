// components/CameraView.tsx
import React, { useRef, useEffect } from 'react';
import type { FrameData } from '../types';

interface CameraViewProps {
  frameData: FrameData | null;
  width?: number;
  height?: number;
}

const CameraView: React.FC<CameraViewProps> = ({ 
  frameData, 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Function to draw a placeholder background
  const drawPlaceholderBackground = (ctx: CanvasRenderingContext2D) => {
    // Add grid pattern for the background
    ctx.fillStyle = '#121b2e';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    
    // Draw grid
    const gridSize = 50;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Add a camera icon or placeholder text
    ctx.fillStyle = '#334155';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Camera Feed', width / 2, height / 2 - 10);
    ctx.fillText('AI Vision Analysis', width / 2, height / 2 + 15);
  };
  
  // Draw detection boxes
  const drawDetectionBoxes = (
    ctx: CanvasRenderingContext2D,
    boxes: number[][],
    classes: string[],
    confidences: number[]
  ) => {
    boxes.forEach((box, index) => {
      const [x1, y1, x2, y2] = box;
      const width = x2 - x1;
      const height = y2 - y1;
      const classType = classes[index];
      const confidence = confidences[index];
      
      // Set color based on class
      ctx.strokeStyle = classType === 'customer' ? '#4CAF50' : '#2196F3';
      ctx.lineWidth = 2;
      
      // Scale coordinates to fit canvas
      const scaleX = canvasRef.current!.width / 1000;
      const scaleY = canvasRef.current!.height / 800;
      
      // Draw rectangle
      ctx.beginPath();
      ctx.rect(x1 * scaleX, y1 * scaleY, width * scaleX, height * scaleY);
      ctx.stroke();
      
      // Add label
      ctx.fillStyle = classType === 'customer' ? '#4CAF50' : '#2196F3';
      ctx.font = '12px Arial';
      ctx.fillText(
        `${classType} ${Math.round(confidence * 100)}%`, 
        x1 * scaleX, 
        y1 * scaleY - 5
      );
    });
  };
  
  // Draw heatmap
  const drawHeatmap = (
    ctx: CanvasRenderingContext2D, 
    points: [number, number][]
  ) => {
    points.forEach((point) => {
      const [x, y] = point;
      
      // Scale coordinates
      const scaleX = canvasRef.current!.width / 1000;
      const scaleY = canvasRef.current!.height / 800;
      const scaledX = x * scaleX;
      const scaledY = y * scaleY;
      
      // Create radial gradient for heatmap effect
      const gradient = ctx.createRadialGradient(
        scaledX, scaledY, 0,
        scaledX, scaledY, 40
      );
      
      gradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(scaledX, scaledY, 40, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  // Main render function
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    drawPlaceholderBackground(ctx);
    
    // If we have frame data, draw the detections and heatmap
    if (frameData && frameData.frame_info) {
      const { boxes, classes, confidences, heatmap_points } = frameData.frame_info;
      
      // Draw boxes if available
      if (boxes && classes && boxes.length > 0) {
        drawDetectionBoxes(ctx, boxes, classes, confidences);
      }
      
      // Draw heatmap if available
      if (heatmap_points && heatmap_points.length > 0) {
        drawHeatmap(ctx, heatmap_points);
      }
    }
  }, [frameData, width, height]);
  
  return (
    <div className="camera-view-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="camera-canvas"
      />
      
      {frameData && (
        <div className="frame-info">
          <div className="frame-time">
            {frameData.current_date} {frameData.current_time}
          </div>
          <div className="frame-stats">
            {frameData.frame_info.classes.filter(c => c === 'customer').length} Customers
            &nbsp;•&nbsp;
            {frameData.frame_info.classes.filter(c => c === 'staff').length} Staff
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraView;