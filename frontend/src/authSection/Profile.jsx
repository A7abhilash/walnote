import React from "react";

function Profile({ handleSignOutButton, handleAccountDelete, LOGGEDINUSER }) {
  return (
    <div className="row mx-2">
      <div className="col-md-4 card mx-auto my-2 text-center p-0">
        <div className="card-header">
          <h3 className="text-secondary">User Profile</h3>
        </div>
        <div className="card-content p-2 align-items-center">
          <div>
            <img
              src={LOGGEDINUSER.profileImage}
              width="100"
              alt="UserProfile"
              className="rounded"
            />
          </div>
          <div className="m-auto mt-md-4">
            <h4>{LOGGEDINUSER.displayName}</h4>
            <h6>Email: {LOGGEDINUSER.email}</h6>
          </div>
          <button
            onClick={handleSignOutButton}
            className="btn btn-danger btn-block"
          >
            <strong>Logout</strong>
          </button>
        </div>
      </div>
      <div className="col-md-12 text-center my-2">
        <button
          onClick={handleAccountDelete}
          className="btn btn-sm btn-outline-dark"
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}

export default Profile;
