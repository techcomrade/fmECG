import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  Legend,
  Brush
} from "recharts";

const StaticsData = [
  { time: 2, data1: -100, data2: 200, data3: 300 },
  { time: 3, data1: 150, data2: 250, data3: 350 },
  { time: 4, data1: 200, data2: -300, data3: 400 },
];


const StatsChart = () => {
  const [showData1, setShowData1] = useState(true);
  const [showData2, setShowData2] = useState(true);
  const [showData3, setShowData3] = useState(true);
  const [chartData, setChartData] = useState([]);

  const handleShowDataChange = (dataIndex) => {
    if (dataIndex === 1) setShowData1(!showData1);
    else if (dataIndex === 2) setShowData2(!showData2);
    else if (dataIndex === 3) setShowData3(!showData3);
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("/convert-excel-to-json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filePath: "upload/record-data/1/1-1684393630000/ECG/test.xlsx" }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }

        const { data } = await response.json();
        setChartData(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchChartData();
  }, []);

  const renderChart = () => {
    return (
      <React.Fragment>
        {/* Hộp kiểm để cho phép người dùng chọn đường */}
        <label>
          Đường 1
          <input
            type="checkbox"
            checked={showData1}
            onChange={() => handleShowDataChange(1)}
          />
        </label>
        <label>
          Đường 2
          <input
            type="checkbox"
            checked={showData2}
            onChange={() => handleShowDataChange(2)}
          />
        </label>
        <label>
          Đường 3
          <input
            type="checkbox"
            checked={showData3}
            onChange={() => handleShowDataChange(3)}
          />
        </label>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                {/* Define gradient colors */}
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                {/* Define gradient colors */}
              </linearGradient>
            </defs>
             <XAxis dataKey="time" tick={false} />
            <YAxis tick={false} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip wrapperClassName="tooltip__style" cursor={false} />
            <Legend />

            {showData1 && (
              <Area
                type="monotone"
                dataKey="data1"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            )}

            {showData2 && (
              <Area
                type="monotone"
                dataKey="data2"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            )}

            {showData3 && (
              <Area
                type="monotone"
                dataKey="data3"
                stroke="#ff0000"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            )}

            <Brush
              dataKey="time"
              height={30}
              stroke="#8884d8"
              startIndex={0}
              endIndex={20}
            />
          </AreaChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  };

  return <div>{renderChart()}</div>;
};


export default StatsChart;

