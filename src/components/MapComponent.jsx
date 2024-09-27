import React from "react";
import { useState, useEffect } from "react";
import ReactMapGL from 'react-map-gl';

import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function MapComponent() {
    const [viewport, setViewport] = useState({
        latitude: 37.0,
        longitude: -100,
        zoom: 8,
        width: '100%',
        height: '100%'
    });

    const[resortList, setResortList] = useState([]);
    
    const resortsCollectionRef = collection(db, "resorts");

    useEffect(() => {
      const getResortList = async () => {
        try {
        const data = await getDocs(resortsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id,
        }));
        console.log(filteredData);
        } catch(err) {
          console.error(err);
        }

      }
      getResortList();
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
            markers here
        </ReactMapGL>
      </>
    );
}


export default MapComponent