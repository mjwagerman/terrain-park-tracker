import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { getResorts } from "../services/getResorts";
import PopupComponent from "./PopupComponent";

import snowflake from '../assets/snowflake.png';


const MapComponent = ( { searchSelectedResort }) => {

    const mapRef = useRef(null);

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
    if (searchSelectedResort && mapRef.current) {
        mapRef.current.flyTo({
            center: [searchSelectedResort.location.longitude, searchSelectedResort.location.latitude - 0.09],
            zoom: 10,
            essential: true // This makes sure the animation is always shown
        });
        setSelectedPopupResort(searchSelectedResort);
        setIsOverlayVisible(false);
    }
}, [searchSelectedResort]);

  const handleOverlayClick = () => {
    setIsOverlayVisible(false);
  };

  const handleMarkerClick = (resort) => {
    setSelectedPopupResort(resort);
    if (mapRef.current) {
        mapRef.current.flyTo({
            center: [resort.location.longitude, resort.location.latitude - 0.09],
            zoom: 10,
            essential: true
        });
    }
    setIsOverlayVisible(false);
};

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOverlayVisible(true);
      setSelectedPopupResort(null);
    }, 300);
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
        ref={mapRef}
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
                // setSelectedPopupResort(resort);
                handleMarkerClick(resort);
              }}
            >
                <img src={resort.favicon} alt = "Logo"/>
            </button>
          </Marker>
          ))}


            {selectedPopupResort && !isOverlayVisible && ( 
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