import React from 'react';
import { Link } from 'react-router-dom';

const SingleCard = (props) => {
    const { title, totalNumber, icon, link } = props.item;
  
    const cardStyles = {
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "5px",
      cursor: "pointer",
      background: getCardBackground(),
    };
  
    const cardContentStyles = {
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "400",
    };
  
    const spanStyles = {
      color: "#fff",
      fontSize: "2rem",
    };
  
    const cardIconStyles = {
      fontSize: "2rem",
      fontWeight: "400",
      color: "rgba(255, 255, 255, 0.845)",
    };
  
    function getCardBackground() {
      if (title === "Total Doctors") {
        return "linear-gradient(#ef621c, #e1424e)";
      } else if (title === "Total Patients") {
        return "linear-gradient(#01d293, #56c57a)";
      } else if (title === "Total News") {
        return "#725cff";
      } else if (title === "Total ECG Records") {
        return "#2884ff";
      } else {
        return "none";
      }
    }
  
    return (
      <Link to= {link} style={{ textDecoration: "none" }}>
        <div style={cardStyles} className="single__card">
          <div style={cardContentStyles} className="card__content">
            <h4 style={{ marginBottom: "10px" }}>{title}</h4>
            <span style={spanStyles}>{totalNumber}+</span>
          </div>
          <span style={cardIconStyles}>
            {icon}
          </span>
        </div>
      </Link>
    );
  
  };

  export default SingleCard;