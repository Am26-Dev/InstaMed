import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { AppContext } from "../../context/appContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorProfile = () => {
  const { dtoken, profileData, getProfileData, setProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/doctor/update-profile",
        updateData,
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  return (
    profileData && (
      <div className="flex flex-col items-center gap-8 m-5">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <div className="w-full md:w-64 lg:w-72 mb-6 md:mb-0">
            <img
              className="w-full h-full object-cover rounded-3xl shadow-lg border-4 border-primary"
              src={profileData.image}
              alt="Profile"
            />
          </div>

          <div className="w-full md:w-3/4 border border-stone-100 rounded-lg p-8 bg-white shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <p className="text-3xl font-medium text-gray-700">
                {profileData.name}
              </p>
            </div>

            <div className="flex items-center gap-3 text-gray-600 mb-4">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience} years experience
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-neutral-800 mb-2">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-3xl">
                {profileData.about}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-gray-600 font-medium mb-2">
                Appointment Fee:
                <span className="text-gray-800">
                  {currency}
                  {isEdit ? (
                    <input
                      className={`${isEdit ? "border-primary bg-indigo-200" : "border-gray-300 " } bg-gray-100 border  rounded-lg py-1 px-2 ml-2`}
                      type="number"
                      value={profileData.fees}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            <div className="mt-4">
              <p className="text-gray-600 font-medium mb-2">Address:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "buildingnumber",
                  "locality",
                  "district",
                  "city",
                  "state",
                  "country",
                ].map((field) => (
                  <div key={field}>
                    <input
                      className={`${isEdit ? "border-primary bg-indigo-200" : "border-gray-300"} bg-gray-100 border rounded-lg py-1 px-2 w-full`}
                      type="text"
                      value={profileData.address[field]}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            [field]: e.target.value,
                          },
                        }))
                      }
                      disabled={!isEdit}
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
              />
              <label className="text-sm text-gray-700">Available</label>
            </div>

            <div className="flex justify-end mt-6">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 bg-primary text-white text-sm rounded-full hover:bg-primary-dark transition-all"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 border border-primary text-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
