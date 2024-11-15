import { createContext, useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import {toast} from "react-toastify"


export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors ] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")
    const [userData, setUserData] = useState(false)

    const getDoctorsData = async ( ) => {
         
        try {

            const { data } = await axios.get(backendUrl + "/doctor/list")

            if(data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }

        } catch (e) {
            console.log(e)
            toast.error(e.message)
        }

    }


    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + "/user/get-profile", {headers: {token}})
            if (data.success) {
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }

        } catch (e) {
            console.log(e)
        }

    }



    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{

        if (token) {
            loadUserProfileData()
        }else{
            setUserData(false)
        }

    },[token])


    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        setUserData,
        userData,
        loadUserProfileData,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider