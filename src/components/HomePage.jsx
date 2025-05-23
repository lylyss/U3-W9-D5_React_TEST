import React from "react";
import Top10Carousel from "./Top10Carousel";
import "../css/HomePage.css"; // Import the CSS file for styling

export default function HomePage() {
  return (
    <div className="page-container bg-intro">
      <div className="container py-5">
        <h1 className="text-white mb-4 text-center">Benvenuto su Netflix</h1>
        <hr className="my-5 border-secondary border-3" />

        <Top10Carousel />
      </div>
    </div>
  );
}
