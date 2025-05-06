import React, { useRef, useEffect } from 'react';
import type { FrameData } from '../types';

interface OverviewPanelProps {
  frameData: FrameData | null;
  popularAreas: { area: string; count: number }[];
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({ frameData, popularAreas }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!frameData || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bounding boxes
    if (frameData.frame_info.boxes && frameData.frame_info.classes) {
      frameData.frame_info.boxes.forEach((box, index) => {
        const [x1, y1, x2, y2] = box;
        const width = x2 - x1;
        const height = y2 - y1;
        const classType = frameData.frame_info.classes[index];
        const confidence = frameData.frame_info.confidences[index];
        
        // Set color based on class
        ctx.strokeStyle = classType === 'customer' ? '#4CAF50' : '#2196F3';
        ctx.lineWidth = 2;
        
        // Draw rectangle
        ctx.beginPath();
        // Scale the coordinates to fit the canvas
        const scaleX = canvas.width / 1000;
        const scaleY = canvas.height / 800;
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
    }
    
    // Draw heatmap points
    if (frameData.frame_info.heatmap_points) {
      frameData.frame_info.heatmap_points.forEach((point) => {
        const [x, y] = point;
        
        // Create radial gradient
        const scaleX = canvas.width / 1000;
        const scaleY = canvas.height / 800;
        const scaledX = x * scaleX;
        const scaledY = y * scaleY;
        
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
    }
  }, [frameData]);
  
  return (
    <div className="overview-panel">
      <div className="panel-header">
        <h3>Camera Feed Analysis</h3>
        <div>Frame #{frameData?.frame_no || 0}</div>
      </div>
      
      <div className="panel-content">
        <div className="camera-view">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={600}
            className="camera-canvas"
          />
          <div className="frame-info">
            <div className="frame-time">
              {frameData?.current_date} {frameData?.current_time}
            </div>
            <div className="frame-stats">
              {frameData?.frame_info.classes.filter(c => c === 'customer').length || 0} Customers
              &nbsp;•&nbsp;
              {frameData?.frame_info.classes.filter(c => c === 'staff').length || 0} Staff
            </div>
          </div>
        </div>
        
        <div className="popular-areas">
          <h3>Popular Areas</h3>
          <div className="areas-list">
            {popularAreas.map((area, index) => (
              <div key={area.area} className="area-item">
                <div className="area-rank">{index + 1}</div>
                <div className="area-name">{area.area}</div>
                <div className="area-count">{area.count} visits</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;