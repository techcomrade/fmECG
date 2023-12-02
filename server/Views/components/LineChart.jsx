import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const LineChartComponent = (props) => {
  return (
        <LineChart
          width={600} 
          height={300}
          data={props.data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <p>Đồ thị mẫu</p>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>
  )
}
