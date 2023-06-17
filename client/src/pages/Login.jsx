import React, { useContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { Authcontext } from "../context/AuthProvider";
import { Alert } from "@mui/material";

export default function Login() {
  const auth = getAuth();
  const { user, must, setMust } = useContext(Authcontext);

  function handleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {});
    setMust(false);
  }

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;

    //  ko cần thiết vì auth_provider đã làm hết rồi
    // auth
    //   .verifyIdToken(localStorage.getItem("accessToken"))
    //   .then(() => {
    //     return <Navigate to="/" />;
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     return <Navigate to="/" />;
    //   });
  }

  return (
    <div className="flex flex-col w-full  justify-center items-center ">
      <div className="mt-10 m-5">
        {must ? (
          <Alert severity="warning">
            This is a warning alert — <strong>You must login first !</strong>
          </Alert>
        ) : (
          <Alert severity="info">
            This is a warning alert — <strong>Login in here !</strong>
          </Alert>
        )}
      </div>

      <button
        className=" block rounded-2xl w-[100px] h-[50px] border-2  bg-[#0046d5] text-white font-bold mt-3   "
        onClick={handleLogin}
      >
        login
      </button>
    </div>
  );
}
