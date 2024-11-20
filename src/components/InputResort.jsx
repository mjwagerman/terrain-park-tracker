import { useEffect, useState } from 'react';
import { addDoc, GeoPoint } from "firebase/firestore";
import { getResorts } from "../services/getResorts";
import { resortsCollectionRef } from '../services/getResortsCollection';
import Axios from 'axios';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";



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
    const [typedResortInput, setTypedResortInput] = useState("");

    const functionUrl = 'https://scrapetitle-yifhgot6ma-uc.a.run.app/';


    useEffect(() => {
        const savedInput = localStorage.getItem('savedResortInput');
        console.log("use effect", savedInput);
        if (savedInput) {
            setNewResortWebsite(savedInput);
        }
    }, []);

    useEffect(() => {
        if (newResortWebsite && localStorage.getItem('savedResortInput')) {
            console.log("Calling onSubmitResort with:", newResortWebsite);
            onSubmitResort();
        }
    }, [newResortWebsite]);


    const onSubmitResort = async () => {
        try {
            localStorage.setItem('savedResortInput', typedResortInput); 
            // setNewResortWebsite(typedResortInput);
            //call the backend to puppeteer the url and return the info i want
        // const response = await Axios.get(`http://127.0.0.1:5001/terrain-park-tracker/us-central1/api/scrape?siteUrl=${newResortWebsite}`)

        const inputWebsite = typedResortInput;
        console.log("input website", inputWebsite)
        const domain = new URL(inputWebsite).hostname.split('.').filter(part => part !== 'www')[0];
        setNewResortWebsite("");


        const response = await Axios.get(functionUrl, {
            params: {
              url: inputWebsite,
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
            location: new GeoPoint(location.latitude, location.longitude),
            domain: domain
        });
        } catch (err) {
            console.error(err);
        }
        localStorage.removeItem('savedResortInput');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists, otherwise false
        });
        return unsubscribe;
    }, []);


    return (
        <div className = "input-resort">
            {!isLoggedIn ? (
                <p>Is your local mountain missing? Log in to get it on the map!</p>
            ) : (
                <div>
                    <p>Is your local mountain missing? Just paste a link to their website here.</p>
                <div>
                    <input 
                        placeholder = "Resort Website"
                        value={typedResortInput}
                        onChange={(e) => setTypedResortInput(e.target.value)}
                    />
                    <button onClick={onSubmitResort}>Submit</button>
                </div>
                </div>
            )}
            
        </div>
    );
}


export default InputResort;