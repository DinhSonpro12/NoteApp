import React, { useReducer, useRef, useState } from "react";
import { useEffect } from "react";
import DropMenu from "./DropMenu";
import { getAuth } from "firebase/auth";

export default function BoxUser({ user }) {
  const auth = getAuth();

  const [active, SetActive] = useState(false);
  var img =
    "https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg";
  let menuRef = useRef();

  var handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="absolute top-2 right-2 w-[134px] h-[48px] flex rounded-[8px] border-[1px] border-solid border-[#5f6368]  ">
      {/* img */}
      <div
        className="flex-grow rounded-md bg-white m-1 bg-cover"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      {/* user */}
      <div
        className={`relative w-[37px] h-[37px] bg-white rounded-full m-1 hover:cursor-pointer bg-cover`}
        style={{ backgroundImage: `url(${user.photoURL})` }}
        onClick={() => {
          SetActive((x) => !x);
        }}
        ref={menuRef}
      >
        {/* drop menu */}
        {!active ? null : (
          <DropMenu
            user={user}
            handleLogout={handleLogout}
            menuRefC={menuRef.current}
            SetActive={() => {
              SetActive(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
