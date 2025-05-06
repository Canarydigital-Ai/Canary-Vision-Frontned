// apiService.ts
import type { FrameData } from '../types';

const API_BASE_URL = 'http://localhost:5000'; // Change this to your Python backend URL

export const ApiService = {
  /**
   * Fetch real-time frame data from the backend
   */
  async getFrameData(): Promise<FrameData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/frame-data`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: FrameData = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching frame data:', error);
      throw error;
    }
  },
  
  /**
   * Fetch historical frame data for a specific date range
   */
  async getHistoricalData(startDate: string, endDate: string): Promise<FrameData[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/historical-data?start=${startDate}&end=${endDate}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: FrameData[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  },
  
  /**
   * Fetch analytics data (customer counts, avg time spent, etc.)
   */
  async getAnalytics(date: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/analytics?date=${date}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      throw error;
    }
  },
  
  /**
   * Fetch popular area statistics
   */
  async getPopularAreas(date: string): Promise<{area: string, count: number}[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/popular-areas?date=${date}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching popular areas data:', error);
      throw error;
    }
  }
};

export default ApiService;