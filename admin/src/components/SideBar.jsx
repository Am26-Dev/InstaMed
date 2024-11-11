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
  const { dtoken } = useContext(DoctorContext)

  return (
    <div className="min-h-screen bg-white border-r">
      {atoken && (
        <ul className="mt-5 text-[#515151]">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:w-72 cursor-pointer ${
                isActive ? " bg-[#F2F3FF] border-r-4 border-primary" : ""
              } `
            }
          >
            <DashboardIcon />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:w-72 cursor-pointer ${
                isActive ? " bg-[#F2F3FF] border-r-4 border-primary" : ""
              } `
            }
          >
            <DateRangeIcon />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:w-72 cursor-pointer ${
                isActive ? " bg-[#F2F3FF] border-r-4 border-primary" : ""
              } `
            }
          >
            <AddCircleIcon />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:w-72 cursor-pointer ${
                isActive ? " bg-[#F2F3FF] border-r-4 border-primary" : ""
              } `
            }
          >
            <PeopleAltIcon />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

{dtoken && (
        <ul className="mt-5 text-[#515151]">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:w-72 cursor-pointer ${
                isActive ? " bg-[#F2F3FF] border-r-4 border-primary" : ""
              } `
            }
          >
            <DashboardIcon />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:w-72 cursor-pointer ${
                isActive ? " bg-[#F2F3FF] border-r-4 border-primary" : ""
              } `
            }
          >
            <DateRangeIcon />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:w-72 cursor-pointer ${
                isActive ? " bg-[#F2F3FF] border-r-4 border-primary" : ""
              } `
            }
          >
            <PeopleAltIcon />
            <p className="hidden md:block">Doctors Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};
