import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/adminContext";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { AppContext } from "../../context/appContext";

export const Dashboard = () => {
  const { atoken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  return (
    dashData && (
      <div className="w-full max-w-6xl m-5">
        <p className="text-xl font-medium mb-5">Dashboard Overview</p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 bg-white p-4 min-w-[220px] rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:scale-105 transition-all">
            <i className="fa-solid fa-user-doctor text-3xl text-blue-500" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.doctors}
              </p>
              <p className="text-gray-500 text-sm">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 min-w-[220px] rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:scale-105 transition-all">
            <i className="fa-solid fa-calendar-check text-3xl text-green-500" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 text-sm">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 min-w-[220px] rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:scale-105 transition-all">
            <i className="fa-solid fa-users text-3xl text-orange-500" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.patients}
              </p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white mt-8 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
            <img src="" alt="" />
            <p className="font-semibold text-lg">Latest Bookings</p>
          </div>

          <div className="px-6 py-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-3 border-b hover:bg-gray-50"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={item.docData.image}
                  alt=""
                />
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold text-sm">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-400 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <IconButton onClick={() => cancelAppointment(item._id)}>
                    <CloseIcon
                      style={{ cursor: "pointer", color: "#f87171" }}
                    />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};
