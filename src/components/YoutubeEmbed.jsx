import React from 'react';

const YouTubeEmbed = ({ videoLinks }) => {
  if (!videoLinks || videoLinks.length === 0) {
    return <p>No videos available.</p>;
  }

  // Helper to extract YouTube video ID from URL
  const getYouTubeID = (url) => {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  return (
    <div className="youtube-embed-container">
      <h2>Video Gallery</h2>
      <div className="youtube-videos">
        {videoLinks.map((link, index) => {
          const videoId = getYouTubeID(link);
          return videoId ? (
            <iframe
              key={index}
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="youtube-video"
            ></iframe>
          ) : (
            <p key={index} className="youtube-video-error">
              Invalid YouTube URL: {link}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default YouTubeEmbed;
