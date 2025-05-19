import React, { useRef, useState } from "react";

export default function Inizia({ onAccedi }) {
  const videoRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  const handleVideoEnd = () => {
    setShowButton(true);
  };

  const handleAccedi = () => {
    onAccedi();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <video
        ref={videoRef}
        src="src/assets/NETFLIX intro 2023 (logo+logotype).mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 1,
        }}
      />
      {showButton && (
        <>
          <img
            src="src/assets/netflix_logo.png"
            alt="Netflix"
            style={{
              width: "400px",
              maxWidth: "80vw",
              zIndex: 2,
              marginBottom: "2rem",
              position: "relative",
            }}
          />
          <button
            onClick={handleAccedi}
            style={{
              position: "relative",
              zIndex: 2,
              padding: "1rem 2.5rem",
              fontSize: "clamp(1rem, 4vw, 1.5rem)",
              borderRadius: "0px",
              border: "none",
              background: "#e50914",
              color: "#fff",
              fontWeight: "bold",
              boxShadow: "8 2px 12px rgba(131, 2, 2, 0.86)",
              cursor: "pointer",
              transition: "background 0.2s",
              width: "clamp(140px, 40vw, 300px)",
              minWidth: "120px",
              maxWidth: "90vw",
            }}
          >
            ACCEDI
          </button>
        </>
      )}
    </div>
  );
}
