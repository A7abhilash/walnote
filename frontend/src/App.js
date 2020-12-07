import React, { useEffect, useState } from "react";
import GuestSection from "./guestSection/GuestSection";
import AuthSectionApp from "./authSection/AuthSectionApp";
import Loader from "./Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [LOGGEDINUSER, setLOGGEDINUSER] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch("/user")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          setLOGGEDINUSER({ ...data, UID: data.userId });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("505 Error");
        setLOGGEDINUSER(null);
        setLoading(false);
        setError(true);
      });
  }, []);

  return loading && !error ? (
    <Loader height="100" />
  ) : LOGGEDINUSER ? (
    <AuthSectionApp LOGGEDINUSER={LOGGEDINUSER} />
  ) : (
    <GuestSection />
  );
}

export default App;
