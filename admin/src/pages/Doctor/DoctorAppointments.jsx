import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom"

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
    console.log(appointments)
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h[60vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Appointment Type</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-6 border-b hover:bg-gray-100"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-10 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "ONLINE" : "CASH"}
              </p>
            </div>
            <p className="max-sm:hidden">{calAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <Link to={`/video/${item.docData.fixedId}`}>
              <p className="border border-gray-400 text-center py-2 rounded-full mr-5 text-white bg-blue-500">{item.appointmentType}</p>
            </Link>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex text-green-100 gap-1">
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
        ))}
      </div>
    </div>
  );
};
