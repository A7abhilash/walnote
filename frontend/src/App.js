import React, { useEffect, useState } from "react";
import GuestSection from "./guestSection/GuestSection";
import AuthSectionApp from "./authSection/AuthSectionApp";

import firebase from "firebase";

function App() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    isAuthenticated: false,
    LOGGEDINUSER: {},
  });

  const signIn = async (event) => {
    event.preventDefault();
    //Providing Google Strategy
    const provider = new firebase.auth.GoogleAuthProvider();

    //Popups a 'sign in with google' window
    await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          alert(error.message);
        }, 1500);
      });
  };

  const signOut = async (event) => {
    event.preventDefault();
    await firebase.auth().signOut();
  };

  const deleteAccount = async (event) => {
    event.preventDefault();
    if (
      window.confirm(`Deleting your account will cause loss in your data permanantly and can't be retrived later if you sign in again.
    Are you sure to delete your account? `)
    ) {
      try {
        let res = await fetch(
          `http://localhost:7781/user/${state.LOGGEDINUSER.UID}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        let data = await res.json();
        if (data.msg == "success") {
          await firebase.auth().currentUser.delete();
          setTimeout(() => {
            alert(
              "Your account has been successfully deleted and all your data has been erased from Walnote app."
            );
          }, 1000);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setState({
          isAuthenticated: true,
          LOGGEDINUSER: {
            UID: user.providerData[0].uid,
            displayName: user.displayName,
            email: user.email,
            profileImage: user.photoURL,
          },
        });
        setLoading(false);
      } else {
        setState({
          isAuthenticated: false,
          LOGGEDINUSER: {},
        });
        setLoading(false);
      }
    });
  }, []);

  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  ) : state.isAuthenticated ? (
    <AuthSectionApp
      handleSignOutButton={signOut}
      handleAccountDelete={deleteAccount}
      LOGGEDINUSER={state.LOGGEDINUSER}
    />
  ) : (
    <GuestSection handleSignInButton={signIn} />
  );
}

export default App;
