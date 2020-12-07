import React from "react";
import remote from "./remote.svg";

//Backend URL
const B_URL = `http://localhost:7781`;

function GuestSection() {
  return (
    <React.Fragment>
      <header className="bg-light pt-2 pb-1 text-center">
        <h1 id="header">
          <i className="fas fa-file-word"></i> Walnote
        </h1>
      </header>
      <div className="container">
        <div className="row mt-4 mb-3 mx-1 align-items-center">
          <div className="col-md-6 my-2 text-center order-md-last">
            <img src={remote} alt="Work" className="img-fluid" />
          </div>
          <div className="col-md-6 my-2 order-md-first">
            <h2>All in one WORKSPACE</h2>
            <h6>One tool for organizing your work.</h6>
            <div className="p-2 mt-4">
              <h5 className="text-warning mb-0">
                <i className="fas fa-tasks"></i> Tasks
              </h5>
              <p>Add different categories of lists and setup tasks for each.</p>
              <h5 className="text-info mb-0">
                <i className="fas fa-file-alt"></i> Notes
              </h5>
              <p> Keep notes organized and add any type of content.</p>
              <h5 className="text-success mb-0">
                <i className="fas fa-user"></i> User Security
              </h5>
              <p>
                This application ensures User Authentication, Authorization &
                Data Encryption.
              </p>
            </div>
            <a
              role="button"
              href={`${B_URL}/auth/google`}
              className="btn btn-outline-primary rounded-0 my-1"
            >
              <i className="fab fa-google"></i> Login with Google
            </a>
          </div>
        </div>
        <p style={{ fontSize: "0.8rem" }} className="text-muted text-center">
          A mobile app will be rolling out soon in 2021. Stay Tuned!
        </p>
      </div>
      <footer className="text-center">
        <h5 style={{ fontFamily: "cursive" }}>
          Made with <span role="img">❤️</span> by A7
        </h5>
      </footer>
    </React.Fragment>
  );
}

export default GuestSection;
