import React from "react";

export default function CardImageWithLogo({ src, alt, height = 300 }) {
  return (
    <div style={{ position: "relative" }}>
      <img src={src} alt={alt} style={{ width: "100%", height, objectFit: "cover", display: "block", borderRadius: 8 }} />
      <img
        src="src/assets/netflix-logo-icon.svg"
        alt="Netflix logo"
        style={{
          position: "absolute",
          left: 4,
          bottom: 240,
          width: 32,
          height: 32,
          borderRadius: 6,
          padding: 2,
        }}
      />
    </div>
  );
}
