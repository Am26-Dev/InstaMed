import React, { useContext } from "react";
import { AdminContext } from "../context/adminContext";
import {useNavigate} from "react-router-dom"
import { DoctorContext } from "../context/doctorContext";

export const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext);
  const { dtoken, setDToken } = useContext(DoctorContext)

  const navigate = useNavigate();

  const logout = () => {
    navigate("/login")
    atoken && setAToken("")
    atoken && localStorage.removeItem("atoken")
    dtoken && setDToken("")
    dtoken && localStorage.removeItem("dtoken")
  }

  return (
    <>
      <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
        <div className="flex items-center gap-2 text-xs">
          <img className="w-12 sm:w-16 cursor-pointer" src="/logo.webp" alt="" />
          <p className="bprder px-2.5 py-0.5 rounded-full border-gray-500">{atoken ? "Admin" : "Doctor"}</p>
        </div>
        <button onClick={() => logout()} className="bg-primary text-white text-sm px-10 py-2 rounded-full">Logout</button>
      </div>
    </>
  );
};
