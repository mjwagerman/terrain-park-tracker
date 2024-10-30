import React, { useEffect, useState } from "react";
import { Popup } from 'react-map-gl';


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
            <h2>{resort.name}</h2>
            <p>site: {resort.website}</p>
            <img src={resort.photo} alt="image" className="popup-img"></img>
          </div>
      </Popup>
    )
}
  
export default PopupComponent;