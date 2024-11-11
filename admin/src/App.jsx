import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/adminContext";
import { Navbar } from "./components/Navbar";
import { SideBar } from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Admin/Dashboard";
import { AllAppointments } from "./pages/Admin/AllAppointments";
import { AddDoctor } from "./pages/Admin/AddDoctor";
import { DoctorsList } from "./pages/Admin/DoctorsList";
import { Login } from "./pages/Doctor/Login";
import { DoctorContext } from "./context/doctorContext";
import { DoctorDashboard } from "./pages/Doctor/DoctorDashboard";
import { DoctorAppointments } from "./pages/Doctor/DoctorAppointments";
import { DoctorProfile } from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return atoken || dtoken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          {/*=======================Admin Routes================================================*/}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* =======================Doctor Routes============================================= */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />}/>
          <Route path="/doctor-profile" element={<DoctorProfile />}/>

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <div>
        <Login />
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
