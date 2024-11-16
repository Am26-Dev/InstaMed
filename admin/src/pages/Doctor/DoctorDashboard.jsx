import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export const DoctorDashboard = () => {
  const {
    dtoken,
    dashData,
    setDashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken]);

  return (
    dashData && (
      <div className="m-6 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-xl hover:scale-105 transition-all border-t-4 border-t-primary">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-4 rounded-full">
                <i className="fa-solid fa-dollar-sign text-white text-3xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {currency}
                  {dashData.earnings}
                </p>
                <p className="text-gray-500">Earnings</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-xl hover:scale-105 transition-all border-t-4 border-t-primary">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-4 rounded-full">
                <i className="fa-solid fa-calendar-check text-white text-3xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {dashData.appointments}
                </p>
                <p className="text-gray-500">Appointments</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-xl hover:scale-105 transition-all border-t-4 border-t-primary">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-4 rounded-full">
                <i className="fa-solid fa-users text-white text-3xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {dashData.patients}
                </p>
                <p className="text-gray-500">Patients</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <img
              className="w-10 h-10 rounded-full"
              src={dashData?.latestAppointments[0]?.userData?.image || ""}
              alt="Patient"
            />
            <p className="text-xl font-semibold text-gray-700">
              Latest Bookings
            </p>
          </div>

          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item.userData.image}
                    alt="Patient"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">
                      {item.userData.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                <button className="px-4 py-2 text-xs font-semibold rounded-full bg-blue-500 text-white">
                  {item.appointmentType}
                </button>

                <div className="flex items-center space-x-3">
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-400 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <div className="flex space-x-3">
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
      </div>
    )
  );
};
