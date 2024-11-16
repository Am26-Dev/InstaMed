import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets, specialityData } from "../assets/assets.js";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        {/*============================== filter option===================================================== */}
        <div className="flex flex-col gap-10">
          <div
            className={`flex-row gap-8 text-sm text-gray-600 ${
              showFilter ? "flex" : "hidden sm:flex"
            }`}
          >
            <div
              style={{ width: "120px" }}
              className={`sm:w-auto  border flex flex-col items-center p-2 border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${
                speciality === "General Physician" ? "bg-indigo-100" : ""
              }`}
              onClick={() =>
                speciality === "General Physician"
                  ? navigate("/doctors")
                  : navigate("/doctors/General Physician")
              }
            >
              <img src="/General_physician.svg" style={{ width: "100px" }} />
              <p>General physician</p>
            </div>

            <div
              style={{ width: "120px" }}
              className={`sm:w-auto  border flex flex-col items-center p-2 border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${
                speciality === "Gynecologist" ? "bg-indigo-100" : ""
              }`}
              onClick={() =>
                speciality === "Gynecologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gynecologist")
              }
            >
              <img src="/Gynecologist.svg" style={{ width: "100px" }} />
              <p>Gynecologist</p>
            </div>
            <div
              style={{ width: "120px" }}
              className={`sm:w-auto  border flex flex-col items-center p-2 border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${
                speciality === "Dermatologist" ? "bg-indigo-100" : ""
              }`}
              onClick={() =>
                speciality === "Dermatologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Dermatologist")
              }
            >
              <img src="/Dermatologist.svg" style={{ width: "100px" }} />
              <p>Dermatologist</p>
            </div>
            <div
              style={{ width: "120px" }}
              className={`sm:w-auto  border flex flex-col items-center p-2 border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${
                speciality === "Pediatricians" ? "bg-indigo-100" : ""
              }`}
              onClick={() =>
                speciality === "Pediatricians"
                  ? navigate("/doctors")
                  : navigate("/doctors/Pediatricians")
              }
            >
              <img src="/Pediatricians.svg" style={{ width: "100px" }} />
              <p>Pediatricians</p>
            </div>
            <div
              style={{ width: "120px" }}
              className={`sm:w-auto  border flex flex-col items-center p-2 border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${
                speciality === "Neurologist" ? "bg-indigo-100" : ""
              }`}
              onClick={() =>
                speciality === "Neurologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Neurologist")
              }
            >
              <img src="/Neurologist.svg" style={{ width: "100px" }} />
              <p>Neurologist</p>
            </div>

            <div
              style={{ width: "120px" }}
              className={`sm:w-auto  border flex flex-col items-center p-2 border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${
                speciality === "Gastroenterologist" ? "bg-indigo-100" : ""
              }`}
              onClick={() =>
                speciality === "Gastroenterologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gastroenterologist")
              }
            >
              <img src="/Gastroenterologist.svg" style={{ width: "100px" }} />
              <p>Gastroenterologist</p>
            </div>
          </div>
          {/*================================ all doctors cards========================================================== */}
          <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
            {filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                key={index}
              >
                <img className="bg-blue-50" src={item.image} alt="" />
                <div className="p-4">
                  <div
                    className={`flex items-center gap-2 text-sm text-center ${
                      item.available ? "text-green-500" : "text-gray-500"
                    } `}
                  >
                    <p
                      className={`w-2 h-2 ${
                        item.available ? "bg-green-500 " : "bg-gray-500"
                      } rounded-full`}
                    ></p>
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
