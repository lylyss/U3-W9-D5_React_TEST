import React, { useEffect, useRef, useState } from "react";
import "../Inizia.css";

export default function Inizia({ onAccedi }) {
  const videoRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    console.log("Animazione logo attivata");
    setAnimateLogo(true);
  }, []);

  const handleVideoEnd = () => {
    setShowButton(true);
  };

  const handleAccedi = () => {
    onAccedi();
  };

  return (
    <div className="inizia-container">
      <video
        ref={videoRef}
        src="src/assets/NETFLIX intro 2023 (logo+logotype).mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="inizia-video"
      />
      {showButton && (
        <>
          <img src="src/assets/netflix_logo.png" alt="Netflix" className={`inizia-logo ${animateLogo ? "animate" : ""}`} />
          <div className="inizia-button-container">
            <button onClick={handleAccedi} className="inizia-button">
              ACCEDI
            </button>
          </div>
        </>
      )}
    </div>
  );
}
