import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend } from "recharts";

;

const MileChart = ({ mileStaticsDataWeek, mileStaticsDataMonth }) => {
  const [showBy, setShowBy] = useState("week");

  const selectedData = showBy === "month" ? mileStaticsDataMonth : mileStaticsDataWeek;

  const handleShowByChange = (event) => {
    setShowBy(event.target.value);
  };

  return (
    <div>
      <div>
        Show by
        <select value={showBy} onChange={handleShowByChange} style={{ marginLeft: "5px", appearance: "none", border: "none", background: "transparent" }}>
  <option value="week" style={{ fontWeight: "bold" }}>Week</option>
  <option value="month" style={{ fontWeight: "bold" }}>Month</option>
</select>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={selectedData}>
            <XAxis dataKey="name" stroke="#2884ff" />
            <Bar dataKey="patient" name="Patient" fill="#82ca9d" barSize={30} />
            <Bar dataKey="doctor" name="Doctor" fill="#8884d8" barSize={30} />
            <Tooltip wrapperClassName="tooltip__style" cursor={false} />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MileChart;


