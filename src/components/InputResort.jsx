import { useEffect, useState } from 'react';
import { addDoc, GeoPoint } from "firebase/firestore";
import { resortsCollectionRef } from '../services/getResortsCollection';
import Axios from 'axios';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const getLocation = async (title) => {
    try {
        const response = await Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(title)}.json`, {
            params: { access_token: import.meta.env.VITE_MAPBOX_TOKEN },
        });
        const features = response.data.features;
        if (features.length > 0) {
            const [longitude, latitude] = features[0].center;
            return { longitude, latitude };
        }
        throw new Error('No results found for the resort name');
    } catch (error) {
        console.error('Error fetching the location:', error);
        return null;
    }
};

const InputResort = () => {
    const [typedResortInput, setTypedResortInput] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [confirmationMessage, setConfirmationMessage] = useState(""); // Confirmation message
    const functionUrl = 'https://scrapetitle-yifhgot6ma-uc.a.run.app/';
    const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq9oti0CaTQLp_ED6NDDWqrfXwi0dtw2MmKg&s';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return unsubscribe;
    }, []);

    const handleSubmit = async () => {
        if (!typedResortInput) {
            alert('Please enter a valid website URL.');
            return;
        }

        setIsLoading(true); // Start loading
        setConfirmationMessage(""); // Clear any previous confirmation messages

        try {
            const domain = new URL(typedResortInput).hostname.split('.').filter(part => part !== 'www')[0];
            const response = await Axios.get(functionUrl, { params: { url: typedResortInput } });
            const { title, imageSrc, favicon, description } = response.data;
            const location = await getLocation(title);

            let imageSent = imageSrc.length === 0 ? defaultImg : imageSrc;
            await addDoc(resortsCollectionRef, {
                name: title,
                website: typedResortInput,
                photo: imageSent,
                favicon,
                location: new GeoPoint(location.latitude, location.longitude),
                domain,
                description,
            });

            setTypedResortInput("");
            setConfirmationMessage("Resort successfully added!"); // Set confirmation message
        } catch (err) {
            console.error(err);
            setConfirmationMessage("Failed to add resort. Please try again."); // Error message
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="input-resort">
            {!isLoggedIn ? (
                <p>Is your local mountain missing? Log in to get it on the map!</p>
            ) : (
                <div>
                    <p>Is your local mountain missing? Just paste a link to their website here.</p>
                    <div>
                        <input
                            placeholder="Paste the resort website URL here"
                            value={typedResortInput}
                            onChange={(e) => setTypedResortInput(e.target.value)}
                        />
                        <button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit"} {/* Show loading text */}
                        </button>
                    </div>
                    {isLoading && <p>Loading...</p>} {/* Loading indicator */}
                    {confirmationMessage && <p>{confirmationMessage}</p>} {/* Confirmation message */}
                </div>
            )}
        </div>
    );
};

export default InputResort;
