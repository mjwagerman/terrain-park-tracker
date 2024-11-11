import React, { useEffect, useState } from "react";
import { Popup } from 'react-map-gl';
import { Link } from "react-router-dom";


const PopupComponent = ({ resort, onClose }) => {
    return (
      <Popup
        anchor="top"
        latitude={resort.location.latitude}
        longitude={resort.location.longitude}
        closeOnClick={false}
        onClose={onClose}
      >
          <div>
            <Link to={`/resorts/${resort.domain}`}><h2>{resort.name}</h2></Link>
            <p>site: {resort.website}</p>
            <img src={resort.photo} alt="image" className="popup-img"></img>
          </div>
      </Popup>
    )
}
  
export default PopupComponent;