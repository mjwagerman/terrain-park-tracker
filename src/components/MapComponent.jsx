import React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, {Marker} from 'react-map-gl';

import { getResorts } from "../services/getResorts";


function MapComponent() {
    const [viewport, setViewport] = useState({
        latitude: 39.2647,
        longitude: -120.1332,
        zoom: 8,
        width: '100%',
        height: '100%'
    });

    const[resortList, setResortList] = useState([ ]);

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

    return (
      <>
        <ReactMapGL {...viewport}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={evt => { setViewport(evt.viewState);}} //update viewport on any movement
        scrollZoom={true}
        dragPan={true}
        dragRotate={true}
        doubleClickZoom={true}
        touchZoomRotate={true}

        >
        {/* add ID as marker key below */}
         {resortList.map((resort) => (
          <Marker 
          latitude={resort.location.latitude} 
          longitude={resort.location.longitude}>
            <button className="big-button">
                {resort.name}
            </button>
          </Marker>
          ))}
        </ReactMapGL>  
      </>
    );
}


export default MapComponent