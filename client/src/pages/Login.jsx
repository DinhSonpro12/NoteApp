import React, { useContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { Authcontext } from "../context/AuthProvider";
import { Alert } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function Login() {
  const auth = getAuth();
  const { user, must, setMust } = useContext(Authcontext);
  console.log("must", must);

  function handleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      setMust(false);
    });
  }

  var sub = () => {
    if (must == 1) {
      return (
        <Alert severity="warning">
          This is a warning alert — <strong>You must login first !</strong>
        </Alert>
      );
    } else if (!must) {
      return (
        <Alert severity="info">
          This is a info alert — <strong>Login in here !</strong>
        </Alert>
      );
    } else {
      return (
        <Alert severity="error">
          Your session has expired — <strong>Please log in again !</strong>
        </Alert>
      );
    }
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col w-full h-screen justify-start items-center bg-[#001e3c]">
      <div className="mt-[7rem] ">{sub()}</div>

      <button
        className="group block rounded-2xl w-[100px] h-[50px] border-2  bg-[#0046d5] text-[#d1c630]  hover:bg-[#1f61e6] font-bold mt-3   "
        onClick={handleLogin}
      >
        <LoginIcon className="text-[#d1c630] mr-1 group-hover:rotate-[0deg] rotate-[-30deg]" />
        Login
      </button>
    </div>
  );
}
