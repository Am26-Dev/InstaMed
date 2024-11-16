import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { BtwMap } from "../components/BtwMap";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, getDoctorsData, backendUrl, token } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("in-person");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    // console.log(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(22, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 15 ? 15 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 15);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/user/book-appo",
        { docId, slotDate, slotTime, appointmentType },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    // console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div className="min-h-screen bg-gray-100 py-12 px-6">

        <div className="bg-white shadow-lg rounded-lg max-w-screen-xl mx-auto p-8 flex flex-col md:flex-row gap-8">

          <div className="w-full md:w-1/3 h-96 rounded-lg overflow-hidden bg-primary">
            <img
              className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-all"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

{/*--------------------------------------------Doctor details--------------------------------------------------------------------*/}
          <div className="w-full md:w-2/3 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{docInfo.name}</h1>
            <p className="text-xl text-gray-600">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <p className="text-lg text-gray-500">
              {docInfo.experience} years of experience
            </p>

    
            <div className="space-y-4 mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">About</h3>
              <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xl font-semibold text-gray-900">
                  Appointment Fee:
                </p>
                <p className="text-2xl font-bold text-indigo-600">
                  {currencySymbol}
                  {docInfo.fees}
                </p>
              </div>

{/*--------------------------------------------Doctor Location--------------------------------------------------------------*/}
              <div className="text-gray-600">
                <p>
                  <strong>Location:📍</strong>
                  <span>
                    {docInfo.address.buildingnumber} {docInfo.address.locality},{" "}
                    {docInfo.address.district}
                    {" - "}
                    {docInfo.address.city}, {docInfo.address.state},{" "}
                    {docInfo.address.country}
                  </span>
                </p>
              </div>

  
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Contact:</strong> {docInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

{/*----------------------------------------------Booking slots section--------------------------------------------------------*/}
        <div className="mt-12 bg-white shadow-lg rounded-lg p-8 max-w-screen-xl mx-auto space-y-8">
          <p className="text-2xl font-semibold text-gray-700">
            Available Booking Slots
          </p>

{/*-----------------------------------------------------Slot date selection-----------------------------------------------------*/}
          <div className="flex gap-4 overflow-x-auto mt-5">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`w-20 py-4 px-3 text-center rounded-full cursor-pointer transition-all duration-300 ${
                    slotIndex === index
                      ? "bg-primary text-white "
                      : "border-2 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <p className="font-semibold text-sm">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-xs">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>

{/*------------------------------------------Slot timing selection----------------------------------------------*/}
          <div className="flex gap-4 mt-5 overflow-x-auto">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-medium px-6 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-500 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

{/*----------------------------------Appointment Type Selection---------------------------------------------------*/}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={() => setAppointmentType("in-person")}
              className={`py-3 px-6 rounded-full text-center transition-all duration-300 ${
                appointmentType === "in-person"
                  ? "bg-primary text-white transform scale-105"
                  : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              In-Person
            </button>

            <button
              onClick={() => setAppointmentType("online")}
              className={`py-3 px-6 rounded-full text-center transition-all duration-300 ${
                appointmentType === "online"
                  ? "bg-primary text-white transform scale-105"
                  : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Online
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-lg font-semibold px-16 py-4 rounded-full w-full sm:w-auto transition-all duration-300 hover:bg-indigo-700 hover:scale-105"
          >
            Book Appointment
          </button>
        </div>


        <div className="mt-12">
          <BtwMap />
        </div>
      </div>
    )
  );
};

export default Appointment;
