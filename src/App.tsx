import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure to import the CSS file we created
import DashboardHeader from './components/DashboardHeader';
import SideNavigation from './components/SideNavigation';
import OverviewPanel from './components/OverviewPanel';
import StatCard from './components/StatCard';
import AnalyticsChart from './components/AnalyticsChart';
import type { FrameData } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('Dashboard');
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [activeCameras, setActiveCameras] = useState<number>(4);
  const [frameData, setFrameData] = useState<FrameData | null>(null);
  const [customerCount, setCustomerCount] = useState<number>(1234);
  const [staffCount, setStaffCount] = useState<number>(15);
  const [avgTimeSpent, setAvgTimeSpent] = useState<number>(15);
  const [productsCount, setProductsCount] = useState<number>(567);
  const [popularArea, setPopularArea] = useState<string>("Shelf 3");
  const [popularAreas, setPopularAreas] = useState<{area: string, count: number}[]>([]);
  const [timeHistory, setTimeHistory] = useState<{time: string, customers: number, avgTime: number}[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('Today');

  // Function to fetch data from your Python backend
  const fetchFrameData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/frame-data');
      const data: FrameData = await response.json();
      
      setFrameData(data);
      
      // Process the data
      if (data && data.frame_info) {
        // Count customers and staff
        const customers = data.frame_info.classes.filter(cls => cls === 'customer').length;
        const staff = data.frame_info.classes.filter(cls => cls === 'staff').length;
        
        // We're not updating these values to keep the values from the screenshot
        // setCustomerCount(customers);
        // setStaffCount(staff);
        
        // Update time history chart data
        const newTimePoint = {
          time: data.current_time,
          customers: customers,
          avgTime: avgTimeSpent
        };
        
        setTimeHistory(prev => [...prev.slice(-20), newTimePoint]);
      }
    } catch (error) {
      console.error('Error fetching frame data:', error);
    }
  };

  // Simulate initial data load and periodic updates
  useEffect(() => {
    // Initial load
    fetchFrameData();
    
    // Setup periodic updates (every 5 seconds)
    const intervalId = setInterval(fetchFrameData, 5000);
    
    // Mock data for demonstration
    const mockTimeHistory = Array.from({ length: 24 }, (_, i) => ({
      time: `${(9 + Math.floor(i / 6)).toString().padStart(2, '0')}:${((i % 6) * 10).toString().padStart(2, '0')}`,
      customers: 1200 + Math.floor(Math.random() * 300),
      avgTime: 12 + Math.floor(Math.random() * 8)
    }));
    
    setTimeHistory(mockTimeHistory);
    
    // Popular areas mock data
    setPopularAreas([
      { area: "Shelf 3", count: 124 },
      { area: "Entrance", count: 98 },
      { area: "Cashier", count: 87 },
      { area: "Electronics", count: 65 }
    ]);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app-container">
      <div className="side-nav">
        <div className="logo">
          <h2>Canary Vision</h2>
          <p>Dashboard</p>
        </div>
        <SideNavigation activeView={activeView} setActiveView={setActiveView} />
      </div>
      
      <div className="main-content">
        <DashboardHeader 
          activeCameras={activeCameras} 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        
        <div className="tab-navigation">
          <div
            className={`tab ${activeTab === 'Overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('Overview')}
          >
            Overview
          </div>
          <div
            className={`tab ${activeTab === 'All Camera Feeds' ? 'active' : ''}`}
            onClick={() => setActiveTab('All Camera Feeds')}
          >
            All Camera Feeds
          </div>
          <div
            className={`tab ${activeTab === 'Heatmaps' ? 'active' : ''}`}
            onClick={() => setActiveTab('Heatmaps')}
          >
            Heatmaps
          </div>
          <div
            className={`tab ${activeTab === 'Analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('Analytics')}
          >
            Analytics
          </div>
        </div>
        
        <div className="dashboard-grid">
          <div className="stats-row">
            <StatCard 
              title="Total Customers"
              value={customerCount}
              change={+5}
              icon="👥"
            />
            <StatCard 
              title="Avg Time Spent"
              value={`${avgTimeSpent}m`}
              change={-2}
              icon="⏱️"
            />
            <StatCard 
              title="Products Bought"
              value={productsCount}
              change={+8}
              icon="🛒"
            />
            <StatCard 
              title="Popular Shelves"
              value={popularArea}
              change={+12}
              icon="📊"
            />
          </div>
          
          <h2 className="section-title">Customer Footfall and Average Time</h2>
          
          <div className="charts-row">
            <div className="chart-container">
              <div className="chart-header">
                <h3>Customer Footfall</h3>
                <div className="chart-options">•••</div>
              </div>
              <AnalyticsChart 
                data={timeHistory}
                dataKey="customers"
                color="#4CAF50"
                yLabel="Count"
              />
            </div>
            
            <div className="chart-container">
              <div className="chart-header">
                <h3>Average Time Spent</h3>
                <div className="chart-options">•••</div>
              </div>
              <AnalyticsChart 
                data={timeHistory}
                dataKey="avgTime"
                color="#2196F3"
                yLabel="Minutes"
              />
            </div>
          </div>
          
          {activeTab === 'Overview' && (
            <OverviewPanel 
              frameData={frameData} 
              popularAreas={popularAreas}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;