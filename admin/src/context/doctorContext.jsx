import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import {toast} from "react-toastify"

export const DoctorContext = createContext();



const DoctorContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dtoken, setDToken] = useState(localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : "");
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {

        try {

            const {data} = await axios.get(backendUrl + "/doctor/appointments", {headers:{dtoken}})

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }

        } catch (e) {
            console.log(e)
        }

    }

    const completeAppointment = async (appointmentId) => {

        try {
            
            const {data} = await axios.post(backendUrl + "/doctor/complete-appointment", {appointmentId}, {headers: {dtoken}})

            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }

        } catch (e) {
            console.log(e)
            toast.error(e.message)
        }

    }

    const cancelAppointment = async (appointmentId) => {

        try {
            
            const {data} = await axios.post(backendUrl + "/doctor/cancel-appointment", {appointmentId}, {headers: {dtoken}})

            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }

        } catch (e) {
            console.log(e)
            toast.error(e.message)
        }

    }

    const getDashData = async () => {

        try {
            
            const { data } = await axios.get(backendUrl + "/doctor/dashboard", {headers: {dtoken}})

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            }else{
                toast.error(data.message)
            }

        } catch (e) {
            console.log(e)
        }

    }

    const getProfileData = async () => {

        try {
            
            const { data } = await axios.get(backendUrl + "/doctor/profile", {headers: {dtoken}})

            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }

        } catch (e) {
            console.log(e)
        }

    }

    const value = {
        dtoken,
        setDToken,
        backendUrl,
        getAppointments,
        appointments,
        completeAppointment,
        cancelAppointment,
        getDashData,
        dashData,
        setDashData,
        profileData,
        setProfileData,
        getProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider