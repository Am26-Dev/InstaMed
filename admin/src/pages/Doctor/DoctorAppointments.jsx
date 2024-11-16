import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";

export const DoctorAppointments = () => {
  const {
    dtoken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { calAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    getAppointments();
    console.log(appointments);
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl m-6">
      <p className="text-2xl font-semibold mb-6">All Appointments</p>

      <div className="bg-white rounded-xl shadow-lg p-5 overflow-y-auto max-h-[80vh]">
        <div className="hidden sm:flex items-center justify-between py-3 px-6 bg-gray-100 border-b text-gray-600 text-sm font-semibold">
          <p className="w-[4%]">#</p>
          <p className="w-[20%]">Patient</p>
          <p className="w-[12%]">Payment</p>
          <p className="w-[8%]">Age</p>
          <p className="w-[18%]">Date & Time</p>
          <p className="w-[10%]">Appointment Type</p>
          <p className="w-[8%]">Fees</p>
          <p className="w-[10%]">Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap sm:flex-nowrap justify-between gap-4 p-4 mb-4 border-b bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all"
          >
            <p className="sm:w-[4%] hidden sm:block">{index + 1}</p>

            <div className="flex sm:w-[20%] items-center gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src={item.userData.image}
                alt={item.userData.name}
              />
              <p className="font-medium text-gray-700 truncate">
                {item.userData.name}
              </p>
            </div>

            <div className="sm:w-[12%] text-xs">
              <p
                className={`inline border px-2 py-1 rounded-full ${
                  item.payment
                    ? "border-primary bg-primary text-white"
                    : "border-gray-400"
                }`}
              >
                {item.payment ? "ONLINE" : "CASH"}
              </p>
            </div>

            <p className="sm:w-[8%] hidden sm:block">
              {calAge(item.userData.dob)}
            </p>

            <p className="sm:w-[18%] text-sm text-gray-600">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <Link
              to={`/video/${item.docData.fixedId}`}
              className="sm:w-[10%] py-2 px-4 border border-gray-400 rounded-full text-white bg-blue-500 text-center"
            >
              {item.appointmentType}
            </Link>

            <p className="sm:w-[8%] text-sm text-gray-700">
              {currency}
              {item.amount}
            </p>

            <div className="sm:w-[10%] flex gap-3 items-center">
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-400 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <IconButton
                    style={{ backgroundColor: "#fee2e2" }}
                    onClick={() => cancelAppointment(item._id)}
                  >
                    <CloseIcon />
                  </IconButton>

                  <IconButton
                    style={{ backgroundColor: "#dcefe7" }}
                    onClick={() => completeAppointment(item._id)}
                  >
                    <CheckIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
