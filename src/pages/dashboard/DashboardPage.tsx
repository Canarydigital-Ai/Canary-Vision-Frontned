import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/StatCard';
import CustomerInOutChart from '../../components/charts/CustomerInOutChart';
import AnalyticsChart from '../../components/charts/AnalyticsChart';
import AllCameraFeeds from '../../components/CameraFeed';
import Heatmap from '../../components/heatmap/Heatmap';
import SideNavigation from '../../components/SideNavigation';
// import Navbar from '../../components/home/Navbar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { useFrameData } from '../../context/ProductContext';


// Using the actual FrameData interface (unchanged from original)
//  interface FrameData {
//   frame_no: number;
//   current_date: string;
//   current_time: string;
//   avg_time_spent_minutes:any;
//   current_customer_count:any;
//   cam1_frame?: string; // Base64 encoded image data
//   frame_info: {
//     classes: string[];
//     boxes: number[][];
//     confidences: number[];
//     heatmap_points: number[][];
//   };
// }





// Main App component with improved navigation implementation
const DashboardPage: React.FC = () => {
  const { frames } = useFrameData();
console.log(frames,'aaaaaaaaaaaaaa')
  const [activeView, setActiveView] = useState<string>('Dashboard');
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [activeCameras, ] = useState<number>(6);
  const [frameData, setFrameData] = useState<any>(null);
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [, setStaffCount] = useState<number>(15);
  const [avgTimeSpent, setAvgTimeSpent] = useState<number>(15);
  const [popularArea, ] = useState<string>("Shelf 3");
  const [, setPopularAreas] = useState<Array<{area: string, count: number}>>([]);
  const [timeHistory, setTimeHistory] = useState<Array<{
    time: string;
    customers: number;
    avgTime: number;
    customersIn: number;
    customersOut: number;
  }>>([]);
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

      setFrameData(frames);


  //     // ✅ Use direct values from the API
      const currentCustomers = frames.current_customer_count || 0;
      const avgTime = frames.avg_time_spent_minutes || 0;
      const total = frames.total_customers_count || 0;
      setCustomerCount(total);
  
      setCurrentCustomers(currentCustomers);
      setAvgTimeSpent(avgTime);
  
      // If your API provides staff count (e.g., in cam3, cam6), you can extract and combine it like this:
      const billingStaff = frames.cam3?.billing_area_staff_count || 0;
      const kitchenStaff = frames.cam6?.kitchen_total_staff_count || 0;
      setStaffCount(billingStaff + kitchenStaff); // ✅ optional
  
  //     // ✅ Update timeHistory chart
      const newTimePoint = {
        time: new Date().toLocaleTimeString(),
        customers: currentCustomers,
        avgTime: avgTime,
        customersIn: frames.cam4?.customers_in_count || 0,
        customersOut: frames.cam4?.customers_out_count || 0,
      };
      
  
      setTimeHistory(prev => [...prev.slice(-20), newTimePoint]);
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
    // // Initial load
    fetchFrameData();
    
    // Setup periodic updates (every 5 seconds)
    const intervalId = setInterval(fetchFrameData, 3000);
    
    // // Mock data for demonstration
    const mockTimeHistory = Array.from({ length: 24 }, (_, i) => ({
      time: `${(9 + Math.floor(i / 6)).toString().padStart(2, '0')}:${((i % 6) * 10).toString().padStart(2, '0')}`,
      customers: 1200 + Math.floor(Math.random() * 300),
      avgTime: 12 + Math.floor(Math.random() * 8),
      customersIn: Math.floor(Math.random() * 10),   // ✅ mock for cam4 customers_in_count
      customersOut: Math.floor(Math.random() * 5)    // ✅ mock for cam4 customers_out_count
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
    <div className="flex min-h-screen bg-[#080F17] text-slate-100">
      {/* Navigation Toggle Button (Mobile Only) */}
      <button
        className="fixed bottom-4 right-4 z-50 p-4 bg-yellow-400 text-slate-900 rounded-full shadow-lg md:hidden"
        onClick={toggleNav}
      >
        {navCollapsed ? '☰' : '✕'}
      </button>
      
      {/* Side Navigation */}
      <div className={`fixed inset-y-0 left-0 transform overflow-hidden ${
    navCollapsed ? '-translate-x-full' : 'translate-x-0'
  } transition-transform duration-300 ease-in-out z-40 h-screen overflow-y-auto 
    bg-[#0A1623] border-r border-slate-800 w-[320px] md:block`}>
    <SideNavigation
      activeView={activeView}
      setActiveView={setActiveView}
      recentReports={recentReports}
      collapsed={navCollapsed}
    />
  </div>    
      
      {/* Main Content */}
      <div className="flex-1 md:ml-80 p-6 md:p-4 overflow-x-hidden">
        <DashboardNavbar />
        <DashboardHeader 
          activeCameras={activeCameras} 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-700 mb-6 overflow-x-auto whitespace-nowrap">
          <div
            className={`px-6 py-3 text-[15px] cursor-pointer relative font-semibold ${activeTab === 'Overview' ? 'text-[#F1EF7E]  after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-[#F1EF7E]' : 'text-slate-400'}`}
            onClick={() => setActiveTab('Overview')}
          >
            Overview
          </div>
          <div
            className={`px-6 py-3 text-[15px] cursor-pointer relative font-semibold ${activeTab === 'All Camera Feeds' ? 'text-[#F1EF7E]  after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-[#F1EF7E]' : 'text-slate-400'}`}
            onClick={() => setActiveTab('All Camera Feeds')}
          >
            All Camera Feeds
          </div>
          <div
            className={`px-6 py-3 text-[15px] cursor-pointer relative font-semibold ${activeTab === 'Heatmaps' ? 'text-[#F1EF7E]  after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-[#F1EF7E]' : 'text-slate-400'}`}
            onClick={() => setActiveTab('Heatmaps')}
          >
            Heatmaps
          </div>
          <div
            className={`px-6 py-3 text-[15px] cursor-pointer relative font-semibold ${activeTab === 'Analytics' ? 'text-[#F1EF7E]  after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-yellow-400' : 'text-slate-400'}`}
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
            
            <h2 className="text-[21px] font-bold text-[#D6DDE6] mt-2 mb-2">Customer Footfall and Average Time</h2>
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border-[#FFFFFF33] rounded-xl p-6 border-[1.5px] bg-[#FFFFFF0A]">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-bold text-[#D6DDE6]">Customer In/Out</h3>
                <div className="text-slate-400 cursor-pointer">•••</div>
              </div>
              <CustomerInOutChart data={timeHistory} />
            </div>
              
              <div className="border-[#FFFFFF33] rounded-xl p-6 border-[1.5px] bg-[#FFFFFF0A]">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#D6DDE6] ">Average Time Spent</h3>
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
          <Heatmap 
            frameData={frameData}
            activeCameras={activeCameras}
          />
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

export default DashboardPage;