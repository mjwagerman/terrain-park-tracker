import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchResorts from '../hooks/useFetchResorts';
import InstagramEmbed from '../components/InstagramEmbed';
import Header from '../components/Header'
import ResortPageMainComponent from '../components/ResortPageMainComponent';
import YouTubeEmbed from '../components/YoutubeEmbed';
import ResortPagePhotoGallery from '../components/ResortPagePhotoGallery'

export default function ResortPage() {
  const [resort, setResort] = useState(null); // State to store the selected resort
  const params = useParams(); // Retrieve URL parameters
  const resortList = useFetchResorts(); // Fetch the list of resorts using the custom hook

  useEffect(() => {
    // Fetch and set the resort based on the URL parameter
    const fetchResorts = async () => {
      if (!resortList || resortList.length === 0) return; // Wait until resorts are loaded
      try {
        const selectedResort = resortList.find((r) => r.domain === params.resort);
        setResort(selectedResort || null); // If not found, set to null
      } catch (err) {
        console.error('Error fetching resorts:', err);
      }
    };

    fetchResorts();
  }, [params.resort, resortList]); // Dependencies ensure useEffect runs when these change

  // Handle loading state
  if (!resort) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <ResortPageMainComponent resort={resort} />
      <ResortPagePhotoGallery photoLinks={resort.photoLinks} />
      <YouTubeEmbed videoLinks={resort.youtubeLinks} />
      <InstagramEmbed instagramLink={resort.instagramLink}/>
    </div>
  );
}
