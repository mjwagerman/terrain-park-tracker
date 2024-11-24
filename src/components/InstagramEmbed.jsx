import React, { useEffect } from "react";

const InstagramEmbed = ({instagramLink}) => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={instagramLink}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: "540px",
          minWidth: "326px",
          padding: "0",
          width: "99.375%",
          WebkitCalc: "100% - 2px",
          calc: "100% - 2px",
        }}
      >
        <a
          href={instagramLink}
          style={{
            background: "#FFFFFF",
            lineHeight: "0",
            padding: "0 0",
            textAlign: "center",
            textDecoration: "none",
            width: "100%",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          View this profile on Instagram
        </a>
      </blockquote>
    </div>
  );
};

export default InstagramEmbed;
