import React, { useContext } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Authcontext } from "../context/AuthProvider";
import BoxUser from "../component/BoxUser";
import Folder from "../component/Folder";

export default function Home() {
  const { user } = useContext(Authcontext);
  const dataFolder = useLoaderData();

  return (
    <div className="flex flex-col w-full bg-[#202124] h-screen ">
      {/* Header */}
      <div className=" relative box-border h-[80px] flex items-center flex-col p-3 m-b-3 mt-3 border-b-2">
        <h1 className="text-2xl text-white"> Home</h1>

        {/* user */}
        <BoxUser user={user} />
      </div>

      <div className="grid grid-cols-[230px,1fr] grid-row-[520px] bg-white">
        {/* Content */}
        <Folder Folders={dataFolder} />

        {/* outlet */}
        <Outlet />
      </div>
    </div>
  );
}
