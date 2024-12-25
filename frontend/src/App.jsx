import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments"
import Appointment from "./pages/Appointment"
import Navbar from "./components/Navbar"
import Footer from "./components/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Nearby } from "./pages/Nearby"
import { VideoMeetComponent } from "./pages/videoMeet"
import { useLocation } from "react-router-dom"

const App = () => {

  const location = useLocation();

  const shouldShowNavbarFooter = !location.pathname.startsWith('/video/');


  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      {shouldShowNavbarFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/doctors' element={<Doctors />}/>
        <Route path='/doctors/:speciality' element={<Doctors />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/my-profile' element={<MyProfile />}/>
        <Route path='/my-appointments' element={<MyAppointments />}/>
        <Route path='/appointment/:docId' element={<Appointment />}/>
        <Route path="/nearby" element={<Nearby />} />
        <Route path="/meet/:url" element={<VideoMeetComponent />} />
      </Routes>
      {shouldShowNavbarFooter && <Footer />}
    </div>
  )
}

export default App
