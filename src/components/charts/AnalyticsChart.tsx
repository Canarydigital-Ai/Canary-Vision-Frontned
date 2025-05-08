import type React from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, dataKey, color, yLabel }) => {
  return (
    <div className="h-72">
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

export default AnalyticsChart
