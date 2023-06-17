import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  var error = useRouteError();
  const nav = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen ">
      <p
        style={{
          background: `center /cover url(https://colorlib.com/etc/404/colorlib-error-404-10/img/bg.jpg) `,
          WebkitBackgroundClip: "text",
        }}
        className="text-[112px] font-[montserrat,sans-serif] font-black text-transparent mb-[-15px]"
      >
        Oops!
      </p>
      <p className="text-[24px] font-bold uppercase text-black font-[montserrat,sans-serif] tracking-wider">
        {error.status} - {error.statusText}
      </p>
      <p className="text-[14px] font-normal text-[#5f5d60]">{error.data}</p>
      <button
        className="w-[180px] h-[48px] rounded-[48px] text-[14px] uppercase bg-[#0046d5] text-white font-bold mt-3"
        onClick={() => {
          nav("/");
        }}
      >
        Go to HomePage
      </button>
    </div>
  );
}
