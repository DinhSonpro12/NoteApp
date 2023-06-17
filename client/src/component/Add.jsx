import React, { useState, useContext } from "react";
import { Authcontext } from "../context/AuthProvider";
import { useSubmit } from "react-router-dom";

export default function Add({ closeF, setActiveId }) {
  const { user } = useContext(Authcontext);
  const submit = useSubmit();

  const [input, setInput] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleAddNewFolder = () => {
    if (input) {
      setActiveId();

      submit(
        {
          name: input,
          authorId: user.uid,
        },
        { method: "post", action: `/` }
      );
      closeF();
    } else {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-[9999] ">
      <div className="fixed flex flex-col items-center w-[200px] h-[100px] opacity-100 z-[2] ">
        <input
          className={` focus:outline-none rounded-md p-1 border-[2px]  ${
            isShaking ? "animate-shake border-[#ff000d]" : "border-[#25c0e3] "
          }`}
          type="text"
          autoFocus
          placeholder="cc Vui lòng nhập text nha"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsShaking(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddNewFolder();
            } else if (e.key === "Escape") {
              closeF();
            }
          }}
        />
        <div className="flex flex-rows mt-2">
          <button
            className=" rounded-md p-1  bg-[#d61d1d] text-white font-medium mr-2 w-[54px] text-[14px]"
            onClick={() => {
              closeF();
            }}
          >
            Cancel
          </button>
          <button
            className="rounded-md p-1  bg-[#2cd65f] text-white font-medium w-[54px] text-[14px]"
            onClick={handleAddNewFolder}
          >
            Save
          </button>
        </div>
      </div>
      <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#0f0f0f] opacity-[0.3] z-[1]" />
    </div>
  );
}
