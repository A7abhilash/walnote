import React, { useEffect, useState } from "react";
import GuestSection from "./guestSection/GuestSection";
import AuthSectionApp from "./authSection/AuthSectionApp";
import { useAuth } from "./contexts/AuthContext";
import Loader from "./Loader";

function App() {
  const { user, loading, error } = useAuth();
  console.log(user);
  const [LOGGEDINUSER, setLOGGEDINUSER] = useState({});

  useEffect(() => {
    user &&
      setLOGGEDINUSER({
        UID: user.googleId,
        displayName: user.displayName,
        profileImage: user.profileImage,
      });
  }, [user]);

  return loading && !error ? (
    <Loader height="100" />
  ) : user ? (
    <AuthSectionApp LOGGEDINUSER={LOGGEDINUSER} />
  ) : (
    <GuestSection />
  );
}

export default App;
