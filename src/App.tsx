import React, { useState, useEffect } from 'react';
import SideNavigation from './components/SideNavigation'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AllCameraFeeds from './components/CameraFeed';

// Using the actual FrameData interface (unchanged from original)
interface FrameData {
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

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}

interface AnalyticsChartProps {
  data: Array<{
    time: string;
    customers: number;
    avgTime: number;
    [key: string]: any;
  }>;
  dataKey: string;
  color: string;
  yLabel: string;
}

interface DashboardHeaderProps {
  activeCameras: number;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

interface OverviewPanelProps {
  frameData: FrameData | null;
  popularAreas: Array<{
    area: string;
    count: number;
  }>;
}

// Keep existing components unchanged
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeCameras, selectedDate, setSelectedDate }) => {
  return (
    <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold mr-4">Analytics Dashboard</h1>
        <div className="bg-slate-800/80 px-3 py-1.5 rounded-full text-sm flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
          {activeCameras} Cameras Active
        </div>
      </div>
      <div className="flex items-center mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="flex bg-slate-800 rounded-lg mr-4 flex-grow sm:flex-grow-0">
          <button 
            className={`px-4 py-2 text-sm rounded-lg ${selectedDate === 'Today' ? 'bg-yellow-400 text-slate-900' : 'text-slate-400'}`}
            onClick={() => setSelectedDate('Today')}
          >
            Today
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-lg ${selectedDate === 'Week' ? 'bg-yellow-400 text-slate-900' : 'text-slate-400'}`}
            onClick={() => setSelectedDate('Week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-lg ${selectedDate === 'Month' ? 'bg-yellow-400 text-slate-900' : 'text-slate-400'}`}
            onClick={() => setSelectedDate('Month')}
          >
            Month
          </button>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-lg cursor-pointer">
          <span>⋮</span>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 relative overflow-hidden">
      <div className="flex justify-between mb-6">
        <div className="text-sm text-slate-400">{title}</div>
        <div className="text-slate-400 cursor-pointer">•••</div>
      </div>
      <div className="flex items-end">
        <div className="text-3xl font-semibold mr-3">{value}</div>
        <div className={`text-sm px-2 py-1 rounded ${change > 0 ? 'bg-green-400/20 text-green-400' : 'bg-orange-400/20 text-orange-400'}`}>
          {change > 0 ? '+' : ''}{change}%
        </div>
      </div>
      <div className="absolute top-6 right-6 text-2xl opacity-50">
        {icon}
      </div>
    </div>
  );
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, dataKey, color, yLabel }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#94a3b8' }} 
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis 
            tick={{ fill: '#94a3b8' }} 
            axisLine={{ stroke: '#334155' }}
            label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const OverviewPanel: React.FC<OverviewPanelProps> = ({ frameData, popularAreas }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-base font-medium">Store Overview</h3>
        <div className="text-slate-400 cursor-pointer">•••</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
        <div className="relative">
          <div className="w-full h-auto bg-slate-900 rounded-lg aspect-video">
            {frameData && frameData.cam1_frame ? (
              <img 
                src={`data:image/jpeg;base64,${frameData.cam1_frame}`} 
                alt="Camera Feed" 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Camera Feed Unavailable
              </div>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4 bg-slate-900/70 backdrop-blur-md p-3 rounded-lg">
            <div className="text-xs text-slate-400 mb-1">
              {frameData ? frameData.current_time : 'Live Feed'}
            </div>
            <div className="text-sm">
              {frameData && frameData.frame_info ? 
                `${frameData.frame_info.classes.filter(cls => cls === 'customer').length} Customers, ` +
                `${frameData.frame_info.classes.filter(cls => cls === 'staff').length} Staff` : 
                'No data available'
              }
            </div>
          </div>
        </div>
        
        <div className="lg:border-l lg:border-slate-700 lg:pl-6">
          <h3 className="text-base font-medium mb-4">Popular Areas</h3>
          <div className="flex flex-col gap-3">
            {popularAreas.map((area, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-xs mr-3">
                  {index + 1}
                </div>
                <div className="text-sm mr-auto">{area.area}</div>
                <div className="text-xs text-slate-400">{area.count} visits</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component with improved navigation implementation
const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('Dashboard');
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [activeCameras, setActiveCameras] = useState<number>(6);
  const [frameData, setFrameData] = useState<FrameData | null>(null);
  const [customerCount, setCustomerCount] = useState<number>(1234);
  const [staffCount, setStaffCount] = useState<number>(15);
  const [avgTimeSpent, setAvgTimeSpent] = useState<number>(15);
  const [productsCount, setProductsCount] = useState<number>(567);
  const [popularArea, setPopularArea] = useState<string>("Shelf 3");
  const [popularAreas, setPopularAreas] = useState<Array<{area: string, count: number}>>([]);
  const [timeHistory, setTimeHistory] = useState<Array<{time: string, customers: number, avgTime: number}>>([]);
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [navCollapsed, setNavCollapsed] = useState<boolean>(false);
  const [currentCustomers, setCurrentCustomers] = useState<number>(0);
  
  // Function to toggle navigation collapse state
  const toggleNav = () => {
    setNavCollapsed(!navCollapsed);
  };
  
  // Function to fetch data from your Python backend
  const fetchFrameData = async (): Promise<void> => {
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
        
        // Update current customers count in real-time
        setCurrentCustomers(customers);
        setStaffCount(staff);
        
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
  
  // Handle window resize to auto-collapse nav on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setNavCollapsed(true);
      } else {
        setNavCollapsed(false);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Simulate initial data load and periodic updates
  useEffect(() => {
    // Initial load
    fetchFrameData();
    
    // Setup periodic updates (every 5 seconds)
    const intervalId = setInterval(fetchFrameData, 1);
    
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
  }, [avgTimeSpent]);
  
  // Sample recent reports for the navigation
  const recentReports = [
    { title: "Store Traffic Report", views: 2400 },
    { title: "Customer Behavior", views: 1800 }
  ];
  
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation Toggle Button (Mobile Only) */}
      <button
        className="fixed bottom-4 right-4 z-50 p-4 bg-yellow-400 text-slate-900 rounded-full shadow-lg md:hidden"
        onClick={toggleNav}
      >
        {navCollapsed ? '☰' : '✕'}
      </button>
      
      {/* Side Navigation */}
      <div className={`fixed inset-y-0 left-0 transform ${
        navCollapsed ? '-translate-x-full' : 'translate-x-0'
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:z-0`}>
        <SideNavigation
          activeView={activeView}
          setActiveView={setActiveView}
          recentReports={recentReports}
          collapsed={navCollapsed}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-4 overflow-x-hidden">
        <DashboardHeader 
          activeCameras={activeCameras} 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-700 mb-6 overflow-x-auto whitespace-nowrap">
          <div
            className={`px-6 py-3 text-sm cursor-pointer relative ${activeTab === 'Overview' ? 'text-yellow-400 after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-yellow-400' : 'text-slate-400'}`}
            onClick={() => setActiveTab('Overview')}
          >
            Overview
          </div>
          <div
            className={`px-6 py-3 text-sm cursor-pointer relative ${activeTab === 'All Camera Feeds' ? 'text-yellow-400 after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-yellow-400' : 'text-slate-400'}`}
            onClick={() => setActiveTab('All Camera Feeds')}
          >
            All Camera Feeds
          </div>
          <div
            className={`px-6 py-3 text-sm cursor-pointer relative ${activeTab === 'Heatmaps' ? 'text-yellow-400 after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-yellow-400' : 'text-slate-400'}`}
            onClick={() => setActiveTab('Heatmaps')}
          >
            Heatmaps
          </div>
          <div
            className={`px-6 py-3 text-sm cursor-pointer relative ${activeTab === 'Analytics' ? 'text-yellow-400 after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-yellow-400' : 'text-slate-400'}`}
            onClick={() => setActiveTab('Analytics')}
          >
            Analytics
          </div>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'Overview' && (
          <div className="grid gap-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
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
                title="Current Customers"
                value={currentCustomers}
                change={+8}
                icon="🛒"
              />
              <StatCard 
                title="Popular Area"
                value={popularArea}
                change={+12}
                icon="📊"
              />
            </div>
            
            <h2 className="text-xl font-medium mt-2 mb-4">Customer Footfall and Average Time</h2>
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-base font-medium">Customer Footfall</h3>
                  <div className="text-slate-400 cursor-pointer">•••</div>
                </div>
                <AnalyticsChart 
                  data={timeHistory}
                  dataKey="customers"
                  color="#4CAF50"
                  yLabel="Count"
                />
              </div>
              
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-base font-medium">Average Time Spent</h3>
                  <div className="text-slate-400 cursor-pointer">•••</div>
                </div>
                <AnalyticsChart 
                  data={timeHistory}
                  dataKey="avgTime"
                  color="#2196F3"
                  yLabel="Minutes"
                />
              </div>
            </div>
            
            {/* Store Overview Panel has been removed from here */}
          </div>
        )}
        
        {/* All Camera Feeds Tab */}
        {activeTab === 'All Camera Feeds' && (
          <AllCameraFeeds 
            frameData={frameData}
            activeCameras={activeCameras}
          />
        )}
        
        {/* Heatmaps Tab (placeholder) */}
        {activeTab === 'Heatmaps' && (
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-medium mb-4">Customer Heatmaps</h2>
            <div className="h-96 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <div className="text-4xl mb-4">🔥</div>
                <p>Heatmap visualization coming soon</p>
                <p className="text-sm mt-2">This feature is under development</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Analytics Tab (placeholder) */}
        {activeTab === 'Analytics' && (
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-medium mb-4">Advanced Analytics</h2>
            <div className="h-96 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <p>Advanced analytics coming soon</p>
                <p className="text-sm mt-2">This feature is under development</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;