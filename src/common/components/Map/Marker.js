import React from 'react';
import './Marker.css';
import { FaBus } from 'react-icons/fa';

const Marker = (props) => {
    const { busNo } = props;
    return (
     <>
      <div className="overlay">
          <div className="roundMarker">
            <FaBus size='100%' color='#000'/>
          </div>
      </div>
      <div className="busNo">
          {busNo}
      </div>
     </>
      
    );
  };

  export default Marker;