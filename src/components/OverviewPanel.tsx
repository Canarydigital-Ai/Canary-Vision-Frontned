import React, { useRef, useEffect, useState } from 'react';
import type { FrameData } from '../types';
import { ApiService } from '../services/apiService';

interface OverviewPanelProps {
  popularAreas: { area: string; count: number }[];
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({ popularAreas }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameData, setFrameData] = useState<FrameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [frameImage, setFrameImage] = useState<string | null>(null);
  
  // Fetch frame data at regular intervals
  useEffect(() => {
    const fetchFrameData = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getFrameData();
        setFrameData(data);
        
        // Handle the camera frame image
        if (data.cam1_frame) {
          // Base64 image data is already in the response
          setFrameImage(`data:image/jpeg;base64,${data.cam1_frame}`);
        } else {
          // If image isn't included in frame data, fetch it separately
          try {
            const imageUrl = await ApiService.getFrameImage();
            setFrameImage(imageUrl);
          } catch (imageErr) {
            console.error('Error fetching frame image:', imageErr);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching frame data:', err);
        setError('Failed to fetch camera data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    // Initial fetch
    fetchFrameData();
    
    // Set up interval for real-time updates (every 2 seconds)
    const intervalId = setInterval(fetchFrameData, 1);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // Draw canvas when frameData changes
  useEffect(() => {
    if (!frameData || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // First draw the camera frame image if available
    if (frameImage) {
      const img = new Image();
      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the camera image as background
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Draw bounding boxes on top of the image
        drawBoundingBoxes();
        
        // Draw heatmap points on top of the image
        drawHeatmapPoints();
      };
      img.src = frameImage;
    } else {
      // If no image, just clear the canvas and draw the detection elements
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBoundingBoxes();
      drawHeatmapPoints();
    }
    
    // Function to draw bounding boxes
    function drawBoundingBoxes() {
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
          
          // Add label with background for better visibility
          ctx.fillStyle = classType === 'customer' ? '#4CAF50' : '#2196F3';
          ctx.font = '12px Arial';
          const label = `${classType} ${Math.round(confidence * 100)}%`;
          const labelWidth = ctx.measureText(label).width;
          
          // Draw label background
          ctx.fillRect(x1 * scaleX, y1 * scaleY - 16, labelWidth + 6, 16);
          
          // Draw label text
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(label, x1 * scaleX + 3, y1 * scaleY - 4);
        });
      }
    }
    
    // Function to draw heatmap points
    function drawHeatmapPoints() {
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
    }
  }, [frameData, frameImage]);
  
  // Calculate customer and staff counts
  const customerCount = frameData?.frame_info.classes.filter(c => c === 'customer').length || 0;
  const staffCount = frameData?.frame_info.classes.filter(c => c === 'staff').length || 0;
  
  return (
    <div className="overview-panel">
      <div className="panel-header">
        <h3>Camera Feed Analysis</h3>
        <div>Frame #{frameData?.frame_no || 0}</div>
      </div>
      
      <div className="panel-content">
        {loading && !frameData && (
          <div className="loading-state">Loading camera data...</div>
        )}
        
        {error && (
          <div className="error-state">{error}</div>
        )}
        
        <div className="camera-view">
          {/* Canvas to draw the frame image, bounding boxes, and heatmap */}
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={600}
            className="camera-canvas"
          />
          
          {/* Fallback if canvas drawing fails - show image directly */}
          {frameImage && !canvasRef.current && (
            <div className="fallback-image-container" style={{ position: 'relative' }}>
              <img 
                src={frameImage} 
                alt="Camera Feed" 
                className="camera-image" 
                style={{ width: '800px', height: '600px', objectFit: 'cover' }}
              />
            </div>
          )}
          
          <div className="frame-info">
            <div className="frame-time">
              {frameData?.current_date} {frameData?.current_time}
            </div>
            <div className="frame-stats">
              {customerCount} Customers
              &nbsp;•&nbsp;
              {staffCount} Staff
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
