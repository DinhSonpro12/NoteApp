import React, { useEffect, useState, createContext } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Authcontext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  var nav = useNavigate();
  const [must, setMust] = useState(false);
  const [activeFolder, setActiveFolder] = useState(0);

  const auth = getAuth();

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((userNow) => {
      if (userNow?.uid) {
        setUser(userNow);
        localStorage.setItem("accessToken", userNow.accessToken);
      } else {
        setUser({});
        localStorage.removeItem("accessToken");
        nav("/login");
      }
    });

    return () => {
      unsubcribed();
    };
  }, [auth]);

  return (
    <Authcontext.Provider
      value={{ user, setUser, must, setMust, activeFolder, setActiveFolder }}
    >
      {children}
    </Authcontext.Provider>
  );
}
