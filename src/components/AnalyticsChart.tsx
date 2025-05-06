import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsChartProps {
  data: any[];
  dataKey: string;
  color: string;
  yLabel: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, dataKey, color, yLabel }) => {
  return (
    <div className="analytics-chart">
      <div className="chart-tabs">
        <button className="chart-tab active">Time</button>
        <button className="chart-tab">Days</button>
        <button className="chart-tab">Weeks</button>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: '#94a3b8' }} 
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis 
            label={{ value: yLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94a3b8' } }}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              borderColor: '#334155',
              borderRadius: '8px',
              color: '#e2e8f0'
            }} 
            labelStyle={{ color: '#94a3b8' }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            fill="url(#colorGradient)"
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;