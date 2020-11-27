import React from "react";

//Backend URL
const B_URL = `http://localhost:7781`;

function Profile({ LOGGEDINUSER }) {
  return (
    <div className="row mx-2">
      <div className="col-md-4 card mx-auto my-2 text-center p-0">
        <div className="card-header">
          <h3 className="text-secondary">User Profile</h3>
        </div>
        <div className="card-content p-2 align-items-center">
          <div>
            <img
              src={LOGGEDINUSER.image}
              width="100"
              alt="UserProfile"
              className="rounded"
            />
          </div>
          <div className="m-auto mt-md-4">
            <h4>{LOGGEDINUSER.displayName}</h4>
          </div>
          <a
            role="button"
            href={`${B_URL}/auth/logout`}
            className="btn btn-danger btn-block"
          >
            <strong>Logout</strong>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
