import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {

    const dateArray = slotDate.split("_")
    return dateArray[0]+ " " + months[Number(dateArray[1])]+ " " + dateArray[2]

  }

  const getUserAppointments = async () => {
 
    try {
      
      const { data } = await axios.get(backendUrl + "/user/all-appo" , {headers: {token}})

      if(data.success){
        setAppointments(data.appointments.reverse())
        // console.log(data.appointments)
      }

    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }

  }

  const cancelAppointment = async (appointmentId) => {

    try {

      const {data} = await axios.post(backendUrl + "/user/cancel-appo", {appointmentId}, {headers: {token}})

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }


    } catch (e) {
      console.log(e)
    }

  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
      console.log(appointments.cancelled)
    }
  },[token])


  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.slice(0, 10).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {slotDateFormat(item.slotDate)}| {item.slotTime}
              </p>
              <button className="px-4 py-2 bg-purple-200 text-gray-500 rounded-full">{item.appointmentType} Appointment</button>
                <Link to={`/video/${item.docData.fixedId}`}>
                  {
                    item.appointmentType === "online" ? <div className="bg-primary text-white inline-block px-5 py-2 rounded-full ml-5">
                      <p>Video callID:-<span>{item.docData.fixedId}</span></p>
                    </div> : ""
                  }
                </Link>
            </div>

            <div>
            </div>

            <div className="flex flex-col gap-2 justify-end">
              {
                !item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>
              }
              {
                !item.cancelled && !item.payment && !item.isCompleted && <button className="text-sm text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-200">
                Pay online
              </button>
              }
              
              {
                !item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className="text-sm text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-200">
                Cancel apointment
              </button>
              }
              { 
                item.cancelled && !item.isCompleted && <button className="sm:minw-48 py-2 px-4 border border-red-500 text-red-500">Appointment cancelled</button>
              }{
                item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
