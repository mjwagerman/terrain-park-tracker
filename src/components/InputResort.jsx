import { useEffect, useState } from 'react';
import { addDoc, GeoPoint } from "firebase/firestore";
import { getResorts } from "../services/getResorts";
import { resortsCollectionRef } from '../services/getResortsCollection';
import Axios from 'axios';


const getLocation = async (title) => {
    try {
        const response = await Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(title)}.json`, {
            params: {
                access_token: import.meta.env.VITE_MAPBOX_TOKEN,
            }
        });
        const features = response.data.features;
        if (features.length > 0) {
            const [longitude, latitude] = features[0].center;  // Extracting longitude and latitude
            console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);
            return { longitude, latitude };
        } else {
            throw new Error('No results found for the resort name');
        }
    } catch (error) {
        console.error('Error fetching the location:', error);
        return null;
    }
};



const InputResort = () => {
    
    
    const [newResortWebsite, setNewResortWebsite] = useState("");

    const functionUrl = 'https://scrapetitle-yifhgot6ma-uc.a.run.app/';


    const onSubmitResort = async () => {
        try {
            //call the backend to puppeteer the url and return the info i want
        // const response = await Axios.get(`http://127.0.0.1:5001/terrain-park-tracker/us-central1/api/scrape?siteUrl=${newResortWebsite}`)
        const response = await Axios.get(functionUrl, {
            params: {
              url: newResortWebsite,
            },
          });
       
        const {title, imageSrc, favicon} = response.data;
        console.log({ title, imageSrc, favicon });
        const location = await getLocation(title);


        

        await addDoc(resortsCollectionRef, {
            name: title,
            website: newResortWebsite,
            photo: imageSrc,
            favicon: favicon,
            location: new GeoPoint(location.latitude, location.longitude)
        });
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <>
            <p>Is your local mountain missing? Just paste a link to their website here.</p>
            <div>
                <input placeholder = "Resort Website" onChange={(e) => setNewResortWebsite(e.target.value)}/>
                <button onClick={onSubmitResort}>Submit</button>
            </div>
        </>

        
    )


}

export default InputResort;