import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../context/AuthProvider";

export default function Protected() {
  const { setMust } = useContext(Authcontext);

  if (localStorage.getItem("accessToken")) return <Outlet />;
  setMust(true);

  return <Navigate to={"/login"} />;
}
