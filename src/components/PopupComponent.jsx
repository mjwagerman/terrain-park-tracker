import React from "react";
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
          </div>
      </Popup>
    )
}
  
  export default PopupComponent;