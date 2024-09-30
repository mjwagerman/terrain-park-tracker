import React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { getResorts } from "../services/getResorts";
import PopupComponent from "./PopupComponent";

import snowflake from '../assets/snowflake.png';


const MapComponent = () => {
    const [viewport, setViewport] = useState({
        latitude: 39.2647,
        longitude: -120.1332,
        zoom: 8,
        width: '100%',
        height: '100%',
    });


    const[resortList, setResortList] = useState([]);
    const [selectedResort, setSelectedResort] = useState(null);

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

    // const handleSelectMarker = resort => {
    //   setSelectedResort(resort);
    // }

    return (
      <>
        <ReactMapGL {...viewport}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/standard"
        onMove={evt => { setViewport(evt.viewState);}} //update viewport on any movement
        scrollZoom={true}
        dragPan={true}
        dragRotate={true}
        doubleClickZoom={false}
        touchZoomRotate={true}
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
                setSelectedResort(resort);
              }}
            >
                <img src={snowflake} alt = "Snowflake Icon"/>
            </button>
          </Marker>
          ))}


            {selectedResort && ( 
              <PopupComponent 
                resort = {selectedResort}
                onClose={() => setSelectedResort(null)} 
              />
            )}
            
          
        </ReactMapGL>  
      </>
    );
}


export default MapComponent