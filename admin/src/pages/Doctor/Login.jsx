import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/adminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/doctorContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [state, setState] = useState("Admin");
  const { backendUrl, setAToken } = useContext(AdminContext);
  const {  setDToken } = useContext(DoctorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHAndler = async (event) => {


    event.preventDefault();

    try {


      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
  

      } else {

        const { data } = await axios.post(backendUrl + "/doctor/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dtoken", data.token);
          setDToken(data.token);
          console.log(data.token)
        } else {
          toast.error(data.message);
        }

      }

     

    } catch (e) {
      console.log(e);
    }

  };

  return (
    <form onSubmit={onSubmitHAndler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5ESESE] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-gray-200 rounded w-full p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email"
            required
          />
        </div>
        <div className="w-full">
          <p>password</p>
          <input
            className="border border-gray-200 rounded w-full p-2 mt-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary cursor-pointer underline"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>{" "}
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary cursor-pointer underline"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};
