import React, { useEffect, useRef, useState } from "react";
import "../Inizia.css";

export default function Inizia({ onAccedi }) {
  const videoRef = useRef(null);
  const [showIntro, setShowIntro] = useState(true); // Stato per mostrare l'intro
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
    setShowIntro(false); // Nascondi l'intro
    onAccedi();
  };

  if (showIntro) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          background: "#000",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <video
          src="src/assets/Netflix Intro 1080p (Highest Quality)_1080p.mp4"
          autoPlay
          muted
          playsInline
          onEnded={() => setShowIntro(false)}
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    );
  }

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
