import type React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CustomerInOutChart: React.FC<{ data: any[] }> = ({ data }) => {
    return (
      <div className="h-72 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" tick={{ fill: '#94a3b8' }} axisLine={{ stroke: '#334155' }} />
            <YAxis tick={{ fill: '#94a3b8' }} axisLine={{ stroke: '#334155' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="customersIn" 
              name="Customers In" 
              stroke="#22c55e" 
              strokeWidth={2}
              dot={{ fill: "#22c55e", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#22c55e" }}
            />
            <Line 
              type="monotone" 
              dataKey="customersOut" 
              name="Customers Out" 
              stroke="#f87171" 
              strokeWidth={2}
              dot={{ fill: "#f87171", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#f87171" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default CustomerInOutChart