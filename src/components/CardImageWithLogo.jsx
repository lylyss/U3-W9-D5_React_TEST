import React from "react";

export default function CardImageWithLogo({ src, alt }) {
  return (
    <div style={{ position: "relative" }}>
      <img src={src} alt={alt} style={{ width: "230px", height: "350px", objectFit: "cover", display: "block", borderRadius: 3 }} />
      <img
        src="src/assets/netflix-logo-icon.svg"
        alt="Netflix logo"
        style={{
          position: "absolute",
          left: 4,
          bottom: 310,
          width: 32,
          height: 32,
          borderRadius: 6,
          padding: 2,
        }}
      />
    </div>
  );
}
