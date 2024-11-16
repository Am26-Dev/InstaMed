import React, { useContext } from "react";
import { AdminContext } from "../context/adminContext";
import { NavLink } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DoctorContext } from "../context/doctorContext";

export const SideBar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-16 md:w-64 bg-white border-r shadow-lg transition-all duration-300 ease-in-out">
        {atoken && (
          <ul className="mt-5 space-y-4">
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer transition-all duration-300 ease-in-out ${
                  isActive ? "bg-[#F2F3FF] border-l-4 border-primary" : ""
                }`
              }
            >
              <DashboardIcon />
              <span className="hidden md:inline-block">Dashboard</span>
            </NavLink>

            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer transition-all duration-300 ease-in-out ${
                  isActive ? "bg-[#F2F3FF] border-l-4 border-primary" : ""
                }`
              }
            >
              <DateRangeIcon />
              <span className="hidden md:inline-block">Appointments</span>
            </NavLink>

            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer transition-all duration-300 ease-in-out ${
                  isActive ? "bg-[#F2F3FF] border-l-4 border-primary" : ""
                }`
              }
            >
              <AddCircleIcon />
              <span className="hidden md:inline-block">Add Doctor</span>
            </NavLink>

            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer transition-all duration-300 ease-in-out ${
                  isActive ? "bg-[#F2F3FF] border-l-4 border-primary" : ""
                }`
              }
            >
              <PeopleAltIcon />
              <span className="hidden md:inline-block">Doctors List</span>
            </NavLink>
          </ul>
        )}

        {dtoken && (
          <ul className="mt-5 space-y-4">
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer transition-all duration-300 ease-in-out ${
                  isActive ? "bg-[#F2F3FF] border-l-4 border-primary" : ""
                }`
              }
            >
              <DashboardIcon />
              <span className="hidden md:inline-block">Dashboard</span>
            </NavLink>

            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer transition-all duration-300 ease-in-out ${
                  isActive ? "bg-[#F2F3FF] border-l-4 border-primary" : ""
                }`
              }
            >
              <DateRangeIcon />
              <span className="hidden md:inline-block">Appointments</span>
            </NavLink>

            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer transition-all duration-300 ease-in-out ${
                  isActive ? "bg-[#F2F3FF] border-l-4 border-primary" : ""
                }`
              }
            >
              <PeopleAltIcon />
              <span className="hidden md:inline-block">Doctors Profile</span>
            </NavLink>
          </ul>
        )}
      </div>
    </div>
  );
};
