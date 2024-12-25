import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Nearby } from "./pages/Nearby";
import { VideoMeetComponent } from "./pages/videoMeet";
import { useLocation } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import SimpleLayout from "./components/SimpleLayout";

const App = () => {
  // const location = useLocation();

  // const shouldShowNavbarFooter = !location.pathname.startsWith('/video/');

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/doctors"
          element={
            <MainLayout>
              <Doctors />
            </MainLayout>
          }
        />
        <Route
          path="/doctors/:speciality"
          element={
            <MainLayout>
              <Doctors />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/my-profile"
          element={
            <MainLayout>
              <MyProfile />
            </MainLayout>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <MainLayout>
              <MyAppointments />
            </MainLayout>
          }
        />
        <Route
          path="/appointment/:docId"
          element={
            <MainLayout>
              <Appointment />
            </MainLayout>
          }
        />
        <Route
          path="/nearby"
          element={
            <MainLayout>
              <Nearby />
            </MainLayout>
          }
        />
        <Route
          path="/meet/:url"
          element={
            <SimpleLayout>
              <VideoMeetComponent />
            </SimpleLayout>
          }
        />
      </Routes>
    </>
  );
};


export default App;
