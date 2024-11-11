import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [currSate, setCurrState] = useState("Login");
  const { token , setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [password, setPassowrd] = useState("")
  const [email, setEmail] = useState("")


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      
      if (currSate==="Sign Up") {
        
        const {data} = await axios.post(backendUrl + "/user/register", {name, email, password});
        if (data.success) {
          setToken(data.token)
          localStorage.setItem("token", data.token);
        }else{
          toast.error(data.message)
        }

      }else{
        
        const {data} = await axios.post(backendUrl + "/user/login", {email, password})


        if (data.success) {
          setToken(data.token)
          localStorage.setItem("token", data.token);
        }else{
          toast.error(data.message)
        }


      }

    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }

  useEffect(()=>{
    if (token) {
      navigate("/")
    }
  },[token])

  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[100%] sm:w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currSate}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currSate === "Login" ? (
          <></>
        ) : (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            required
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="password"
          onChange={(e)=>setPassowrd(e.target.value)}
          value={password}
          required
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          {currSate === "Login" ? (
            <></>
          ) : (
            <p className="cursor-pointer">Forgot your password?</p>
          )}

          {currSate === "Login" ? (
            <p>
              Don't have an account?
              <span
                onClick={() => setCurrState("Sign Up")}
                className="text-blue-500 cursor-pointer"
              >
                Create Account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span
                onClick={() => setCurrState("Login")}
                className="text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
        </div>
        <button className="bg-black text-white font-light  px-8 py-2 mt-4">
          {currSate === "Login" ? "Login" : "Sing Up"}
        </button>
      </form>
    </>
  );
};

export default Login