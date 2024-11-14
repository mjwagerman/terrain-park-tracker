import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { getResorts } from "../services/getResorts";
import PopupComponent from "./PopupComponent";

import snowflake from '../assets/snowflake.png';


const MapComponent = ( { searchSelectedResort }) => {


    const [viewport, setViewport] = useState({
        latitude: 40,
        longitude: -112.1332,
        zoom: 5,
        width: '100%',
        height: '100%',
    });


    const[resortList, setResortList] = useState([]);
    const [selectedPopupResort, setSelectedPopupResort] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    useEffect(() => {
      const fetchResorts = async() => {
        try {
          const resorts = await getResorts();
          setResortList(resorts);
        } catch (err) {
          console.error(err)
        }
      };
      fetchResorts();
    }, []);

    useEffect(() => {
      if (searchSelectedResort) {
        console.log("centering map");
          setViewport((prevViewport) => ({
              ...prevViewport,
              latitude: searchSelectedResort.location.latitude,
              longitude: searchSelectedResort.location.longitude,
              zoom: 10,
          }));
          // setSearchFocusedResort(searchSelectedResort);
          setSelectedPopupResort(searchSelectedResort); // Show popup if desired
      }
  }, [searchSelectedResort]);

  const handleOverlayClick = () => {
    setIsOverlayVisible(false);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setIsOverlayVisible(true), 300);
  }

    return (
      <div className = "map-container" onMouseLeave={handleMouseLeave}>
        <div className="map-content">

        {isOverlayVisible && (
                <button 
                    className="map-button-overlay" 
                    onClick={handleOverlayClick}
                >
                    Click to interact
                </button>
        )} 
        <ReactMapGL 
        {...viewport}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/standard"
        onMove={evt => { setViewport(evt.viewState);}} //update viewport on any movement
        scrollZoom={!isOverlayVisible}
        dragPan={!isOverlayVisible}
        dragRotate={!isOverlayVisible}
        doubleClickZoom={false}
        touchZoomRotate={!isOverlayVisible}
        projection="globe"
        >
        {/* add ID as marker key below */}
         {resortList.map((resort) => (
          <Marker 
          key = {resort.id}
          latitude={resort.location.latitude} 
          longitude={resort.location.longitude}>
            <button 
              className = "marker-btn" 
              onClick={() => {
                setSelectedPopupResort(resort);
              }}
            >
                <img src={resort.favicon} alt = "Logo"/>
            </button>
          </Marker>
          ))}


            {selectedPopupResort && ( 
              <PopupComponent 
                resort = {selectedPopupResort}
                onClose={() => setSelectedPopupResort(null)} 
              />
            )}
            
          
        </ReactMapGL>  
        </div>
      </div>
    );
}


export default MapComponent;