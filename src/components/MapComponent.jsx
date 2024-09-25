import React from "react";
import { useState } from "react";
import ReactMapGL from 'react-map-gl';

function MapComponent() {
    const [viewport, setViewport] = useState({
        latitude: 37.0,
        longitude: -100,
        zoom: 8,
        width: '100%',
        height: '100%'
    });
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
            markers here
        </ReactMapGL>
      </>
    );
}


export default MapComponent