import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export const DoctorDashboard = () => {
  const { dtoken, dashData, setDashData, getDashData, cancelAppointment, completeAppointment } =
    useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <i className="fa-solid fa-user-doctor w-14"></i>
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency}
                {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <i className="fa-solid fa-user-doctor w-14"></i>
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <i className="fa-solid fa-user w-14"></i>
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div
            className="flex items-center gap2.5
         px-4 mt-10 rounded-t border"
          >
            <img src="" alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
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
      </div>
    )
  );
};
