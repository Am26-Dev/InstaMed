import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
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

  // return (
  //   docInfo && (
  //     <div className="flex flex-col ">
  //       <div className="flex flex-col sm:flex-row gap-4">
  //         <div>
  //           <img
  //             className="bg-primary w-full sm:max-w-72 rounded-lg"
  //             src={docInfo.image}
  //             alt=""
  //           />
  //         </div>
  //         <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
  //           <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
  //             {docInfo.name}
  //             <img className="w-5" src={assets.verified_icon} alt="" />
  //           </p>
  //           <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
  //             <p>
  //               {docInfo.degree} - {docInfo.speciality}
  //             </p>
  //             <button className="py-0.5 px-2 border text-xs rounded-full">
  //               {docInfo.experience}
  //             </button>
  //           </div>
  //           <div>
  //             <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
  //               About <img src={assets.info_icon} alt="" />
  //             </p>
  //             <p className="text-sm text-gray-500 max-w-[700px] mt-1">
  //               {docInfo.about}
  //             </p>
  //           </div>
  //           <p className="text-gray-500 font-medium mt-4">
  //             Appintment fee:{" "}
  //             <span className="text-gray-600">
  //               {" "}
  //               {currencySymbol}
  //               {docInfo.fees}{" "}
  //             </span>
  //           </p>
  //         </div>
  //       </div>

  //       <div className="sm:ml-72 sm:pl-4 mt-4 font-mediu text-gray-700">
  //         <p>Booking Slots</p>
  //         <div className="flex gap-3 tems-center w-full overflow-x-scroll mt-4">
  //           {docSlots.length &&
  //             docSlots.map((item, index) => (
  //               <div
  //                 onClick={() => setSlotIndex(index)}
  //                 className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
  //                   slotIndex === index
  //                     ? "bg-primary text-white "
  //                     : "border border-gray-200"
  //                 }`}
  //                 key={index}
  //               >
  //                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]} </p>
  //                 <p>{item[0] && item[0].datetime.getDate()}</p>
  //               </div>
  //             ))}
  //         </div>

  //         <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
  //           {docSlots.length &&
  //             docSlots[slotIndex].map((item, index) => (
  //               <p
  //                 onClick={() => setSlotTime(item.time)}
  //                 className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
  //                   item.time === slotTime
  //                     ? "bg-primary text-white"
  //                     : "text-gray-400 border border-gray-300"
  //                 }`}
  //                 key={index}
  //               >
  //                 {item.time.toLowerCase()}
  //               </p>
  //             ))}
  //         </div>

  //         <div className="flex gap-5 mt-5">
  //           <button
  //             onClick={() => setAppointmentType("in-person")}
  //             className={`px-5 py-2 rounded-full border border-gray-300 ${
  //               appointmentType === "in-person"
  //                 ? "bg-primary text-white"
  //                 : "bg-white text-gray-900"
  //             }`}
  //           >
  //             In-Person
  //           </button>

  //           <button
  //             onClick={() => setAppointmentType("online")}
  //             className={`px-5 py-2 rounded-full border border-gray-300 ${
  //               appointmentType === "online" ? "bg-primary text-white" : "bg-white text-gray-900"
  //             }`}
  //           >
  //             Online
  //           </button>
  //         </div>

  //         <button
  //           onClick={bookAppointment}
  //           className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-5"
  //         >
  //           Book an appointment
  //         </button>
  //       </div>

  //       <BtwMap />
  //     </div>
  //   )
  // );
  return (
    docInfo && (
      <div className="flex flex-col px-6 py-8 bg-gray-50 space-y-10">
        {/* Doctor's Info Section */}
        <div className="flex flex-col sm:flex-row bg-white shadow-2xl rounded-lg p-8 max-w-screen-xl mx-auto space-y-8 sm:space-y-0 sm:space-x-8">
          {/* Doctor Image */}
          <div className="w-full sm:w-1/3 h-96 overflow-hidden rounded-xl bg-primary shadow-md transform transition-all hover:scale-105 duration-300 ease-in-out">
            <img
              className="w-full h-full object-cover"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          {/* Doctor Details */}
          <div className="sm:w-2/3 space-y-6">
            {/* Name and Specialization */}
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                {docInfo.name}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <p className="text-base text-gray-500 mt-1">
                {docInfo.experience} years of experience
              </p>
            </div>

            {/* About Doctor */}
            <div>
              <h3 className="text-2xl font-medium text-gray-800">About</h3>
              <p className="text-gray-600 mt-2">{docInfo.about}</p>
            </div>

            {/* Appointment Fee */}
            <div>
              <p className="text-xl font-semibold text-gray-900">
                Appointment Fee:
              </p>
              <p className="text-2xl font-bold text-indigo-600">
                {currencySymbol}
                {docInfo.fees}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center space-x-3">
                <span className="text-base">{docInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-base">{docInfo.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Slots Section */}
        <div className="space-y-5">
          <p className="text-2xl font-semibold text-gray-700">
            Available Booking Slots
          </p>

          {/* Slot Date Selection */}
          <div className="flex gap-5 overflow-x-auto mt-5">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`w-24 py-5 text-center rounded-lg cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-300"
                  }`}
                >
                  <p className="font-medium">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="font-light">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* Slot Time Selection */}
          <div className="flex gap-4 mt-5 overflow-x-auto">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-medium px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-500 border border-gray-300"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Appointment Type Selection */}
          <div className="flex gap-6 mt-6">
            <button
              onClick={() => setAppointmentType("in-person")}
              className={`px-6 py-3 rounded-full border border-gray-300 w-1/2 text-center ${
                appointmentType === "in-person"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              In-Person
            </button>

            <button
              onClick={() => setAppointmentType("online")}
              className={`px-6 py-3 rounded-full border border-gray-300 w-1/2 text-center ${
                appointmentType === "online"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              Online
            </button>
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-lg font-semibold px-16 py-4 rounded-full w-full sm:w-auto"
          >
            Book Appointment
          </button>
        </div>

        {/* Map Component */}
        <div className="mt-10">
          <BtwMap />
        </div>
      </div>
    )
  );
};

export default Appointment;
