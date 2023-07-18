import React, { useState, useEffect } from "react";
import StatsChart from '../components/StatsChart';
import { Label  } from '@adminjs/design-system';



const staticsStyles = {
  display: "grid",
  columnGap: "2rem",
  marginTop: "2rem",
};
const statsTitleStyles = {
  color: "#1C2833",
  fontSize: "1.2rem",
  fontWeight: "500",
  marginBottom: "20px",
};
const statsStyles = {
  background: "#f2f2f2",
  padding: "30px",
  borderRadius: "5px",
  height: "450px",
  paddingBottom: "50px",
 
};

const ShowEcgRecord = (props) => {
  
  return (

    <div style={staticsStyles} className="statics">
      <Label htmlFor={'doctor_id'} required={true}>ECG Data</Label>
        <div style={statsStyles} className="stats">

          <h3 style={statsTitleStyles} className="stats__title">ECG Data</h3>
          <StatsChart/>
        </div>

      </div> 

  );

};

export default ShowEcgRecord;
