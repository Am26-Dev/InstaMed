import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { AppContext } from "../../context/appContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"

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
      }

      const { data } = await axios.post(backendUrl + "/doctor/update-profile", updateData, {headers: {dtoken}})

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }

    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }

  }

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointments fee:{" "}
              <span className="text-gray-800">
                {currency}
                {isEdit ? (
                  <input
                    className="bg-gray-100"
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    className="bg-gray-100"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...address, buildingnumber: e.target.value },
                      }))
                    }
                    value={profileData.address.buildingnumber}
                    type="text"
                  />
                ) : (
                  profileData.address.buildingnumber
                )}
                  {isEdit ? (
                  <input
                    className="bg-gray-100"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...address, locality: e.target.value },
                      }))
                    }
                    value={profileData.address.locality}
                    type="text"
                  />
                ) : (
                  profileData.address.locality
                )}
                  {isEdit ? (
                  <input
                    className="bg-gray-100"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...address, district: e.target.value },
                      }))
                    }
                    value={profileData.address.district}
                    type="text"
                  />
                ) : (
                  profileData.address.district
                )}
                  {isEdit ? (
                  <input
                    className="bg-gray-100"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...address, city: e.target.value },
                      }))
                    }
                    value={profileData.address.city}
                    type="text"
                  />
                ) : (
                  profileData.address.city
                )}
                  {isEdit ? (
                  <input
                    className="bg-gray-100"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...address, state: e.target.value },
                      }))
                    }
                    value={profileData.address.state}
                    type="text"
                  />
                ) : (
                  profileData.address.state
                )}
                <br />
                {isEdit ? (
                  <input
                    className="bg-gray-100"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...address, country: e.target.value },
                      }))
                    }
                    value={profileData.address.country}
                    type="text"
                  />
                ) : (
                  profileData.address.country
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};
