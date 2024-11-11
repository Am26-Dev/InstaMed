import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/adminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export const AllAppointments = () => {
  const {
    atoken,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
  } = useContext(AdminContext);
  const { calAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    getAllAppointments();
  }, [atoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            className={`flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b ${
              item.cancelled ? "bg-red-100" : "hover:bg-green-50"
            }`}
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>

            <p className="max-sm:hidden">{calAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 bg-gray-200 rounded-full"
                src={item.docData.image}
                alt=""
              />{" "}
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>

            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? <p className="text-green-400 text-xs font-medium">Completed</p> : (
              <IconButton onClick={() => cancelAppointment(item._id)}>
                <CloseIcon style={{ cursor: "pointer" }} />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
