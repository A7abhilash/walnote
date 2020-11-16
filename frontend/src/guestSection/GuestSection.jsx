import React from "react";
import remote from "./remote.svg";

function GuestSection({ handleSignInButton }) {
  return (
    <React.Fragment>
      <header className="bg-light pt-2 pb-1 text-center">
        <h1 id="header">
          <i className="fas fa-file-word"></i> Walnote
        </h1>
      </header>
      <div className="container">
        <div className="row mt-4 mb-3 mx-1">
          <div className="col-md-5 card text-center m-auto p-0 ">
            <div className="card-header text-primary">
              <h2>Welcome User!</h2>
            </div>
            <div className="card-content p-2 mb-2">
              <h4>All in one WORKSPACE</h4>
              <h6>One tool for organizing your work.</h6>
              <img
                src={remote}
                alt="Work"
                className="img-fluid"
                style={{ height: "30vh" }}
              />
              <div className="text-left my-1">
                <h5 className="text-warning mb-0">
                  <i className="fas fa-tasks"></i> Tasks
                </h5>
                <p>
                  Add different categories of lists and setup tasks for each.
                </p>
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
              <button
                onClick={handleSignInButton}
                className="btn btn-outline-primary rounded-0"
              >
                <i className="fab fa-google"></i> Login with Google
              </button>
            </div>
          </div>
        </div>
        <p style={{ fontSize: "0.8rem" }} className="text-muted text-center">
          A mobile app will be rolling out soon in 2021. Stay Tuned!
        </p>
      </div>
      <footer className="bg-light pt-2 pb-1 text-center bg-dark text-white">
        <h5 style={{ fontFamily: "cursive" }}>Made with ❤️ by A7</h5>
      </footer>
    </React.Fragment>
  );
}

export default GuestSection;
