import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/all-appo", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        // console.log(data.appointments)
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/user/cancel-appo",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
      console.log(appointments.cancelled);
    }
  }, [token]);

  const deleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/user/delete-appo",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
      console.log(appointments);
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div className="space-y-6">
        {appointments.slice(0, 10).map((item, index) => (
          <div
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden border"
            key={index}
          >
{/*-------------------------------------------Doctor Info------------------------------------------------------*/}
            <div className="sm:w-1/3 p-5 bg-indigo-100 flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-3"
                src={item.docData.image}
                alt="Doctor"
              />
              <div className="text-center">
                <p className="text-lg font-semibold text-indigo-800">
                  {item.docData.name}
                </p>
                <p className="text-sm text-indigo-600 mt-1">
                  {item.docData.speciality}
                </p>
              </div>
              <div className="mt-4 text-sm text-indigo-700 space-y-1">
                <p className="flex items-center">
                  📍{" "}
                  <span className="ml-2">
                    {item.docData.address.locality}, {item.docData.address.city}
                  </span>
                </p>
                <p className="flex items-center">
                  🌍{" "}
                  <span className="ml-2">{item.docData.address.country}</span>
                </p>
              </div>
            </div>

{/*-------------------------------Appointment Info & Actions------------------------------------------------------------------*/}
            <div className="sm:w-2/3 p-5 flex flex-col justify-between relative">
              
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 opacity-50 z-0"></div>

              <div className="z-10">
        
                <div>
                  <p className="text-sm font-medium text-zinc-700">
                    Date & Time:{" "}
                    <span className="font-semibold">
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </span>
                  </p>
                  <span
                    className={`px-3 py-1 mt-2 text-xs rounded-full inline-block ${
                      item.appointmentType === "in-person"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.appointmentType} Appointment
                  </span>
                </div>

       
                {item.appointmentType === "online" && (
                  <Link
                    to={`/meet/${item.docData.fixedId}`}
                    className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow text-sm inline-block"
                  >
                    🔗 Join Video Call: {item.docData.fixedId}
                  </Link>
                )}

         
                <div className="mt-5 flex flex-wrap gap-3">
                  {!item.cancelled && item.payment && !item.isCompleted && (
                    <button className="py-2 px-4 bg-green-100 text-green-700 rounded border">
                      Paid
                    </button>
                  )}
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <button className="py-2 px-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded transition-all">
                      Pay Online
                    </button>
                  )}
                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="py-2 px-4 bg-red-100 text-red-700 hover:bg-red-200 rounded transition-all"
                    >
                      Cancel Appointment
                    </button>
                  )}
                  {item.cancelled && (
                    <button className="py-2 px-4 bg-gray-100 text-gray-600 rounded border">
                      Appointment Cancelled
                    </button>
                  )}
                  {item.isCompleted && (
                    <button className="py-2 px-4 bg-green-100 text-green-700 rounded border">
                      Completed
                    </button>
                  )}
                  {item.cancelled && (
                    <button
                      onClick={() => deleteAppointment(item._id)}
                      className="py-2 px-4 bg-red-100 text-red-700 rounded border"
                    >
                      Delete Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
