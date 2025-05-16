import React from "react";

export default function MainFooter() {
  return (
    <footer className="container-fluid text-secondary px-5 py-5">
      <div className="container">
        <div className="row text-left px-5">
          <div className="col-md-3">
            <div className="my-3">
              <a className="text-secondary mx-2" href="https://www.facebook.com">
                <i className="bi bi-facebook" style={{ fontSize: "1.5rem" }}></i>
              </a>
              <a className="text-secondary mx-2" href="https://www.instagram.com">
                <i className="bi bi-instagram" style={{ fontSize: "1.5rem" }}></i>
              </a>
              <a className="text-secondary mx-2" href="https://x.com">
                <i className="bi bi-twitter" style={{ fontSize: "1.5rem" }}></i>
              </a>
              <a className="text-secondary mx-2" href="https://www.youtube.com">
                <i className="bi bi-youtube" style={{ fontSize: "1.5rem" }}></i>
              </a>
            </div>
          </div>

          <div className="col-md-3">
            <p>Audio and Subtitles</p>
            <p>Media Center</p>
            <p>Privacy</p>
            <p>Contact Us</p>
          </div>

          <div className="col-md-3">
            <p>Audio Description</p>
            <p>Investor Relations</p>
            <p>Legal Notices</p>
          </div>

          <div className="col-md-3">
            <p>Help Center</p>
            <p>Jobs</p>
            <p>Cookie Preferences</p>
          </div>

          <div className="col-md-3">
            <p>Gift Cards</p>
            <p>Terms of Use</p>
            <p>Corporate Information</p>
          </div>

          <div className="container">
            <div>
              <p className="btn btn-outline-secondary w-auto">Service Code</p>
              <p className="p-0">&copy; 1997-2019 Netflix, Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
