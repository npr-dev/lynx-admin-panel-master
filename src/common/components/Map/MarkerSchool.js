import React from "react";
import "./Marker.css";
import { FaSchool } from "react-icons/fa";

const MarkerSchool = () => {
  return (
    <>
      <div className="overlay">
        <div className="roundMarker">
          <FaSchool size="100%" color="#000" />
        </div>
      </div>
    </>
  );
};

export default MarkerSchool;
