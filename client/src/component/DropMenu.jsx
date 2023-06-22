import React, { useRef, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function DropMenu({ user, handleLogout, menuRefC, SetActive }) {
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRefC.contains(e.target)) {
        SetActive();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div
      className={`absolute z-[999] top-12 right-[-5px] bg-[#0a1929] rounded-[8px] border-[1px] border-solid border-[#5f6368] w-[220px] box-border hover:cursor-default animate-appear" 
      `}
      ref={menuRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex flex-row items-center border-b-[1px] md mb-1 p-[2px]">
        <div
          className={`relative w-[37px] h-[37px] bg-white rounded-full m-1  bg-cover`}
          style={{ backgroundImage: `url(${user.photoURL})` }}
        ></div>

        <p className="text-white select-none">{user.displayName}</p>
      </div>

      {/* logout user */}
      <button
        className=" block rounded-2xl w-[100px] h-[50px] font-semibold text-sm text-[#f3d949]  bg-[#d33535] border-2 hover:bg-[#cf2525] m-auto mb-2 mt-2 select-none"
        onClick={handleLogout}
      >
        <LogoutIcon className="text-[#d1c630] animate-rotate" />
        Logout
      </button>
    </div>
  );
}
