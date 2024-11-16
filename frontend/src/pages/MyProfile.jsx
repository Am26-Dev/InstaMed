import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, []);

  return (
    userData && (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-xl space-y-8">
  
        <div className="flex justify-center">
          <div className="relative">
            {isEdit ? (
              <>
                <label htmlFor="image" className="cursor-pointer">
                  <img
                    className="w-40 h-40 rounded-full object-cover ring-4 ring-blue-500"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                  />
                  <img
                    className="absolute bottom-0 right-0 w-10 h-10 p-2 bg-white rounded-full shadow-lg"
                    src={image ? "" : assets.upload_icon}
                    alt="Upload Icon"
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </>
            ) : (
              <img
                className="w-40 h-40 rounded-full object-cover ring-4 ring-blue-500"
                src={userData.image}
                alt="Profile"
              />
            )}
          </div>
        </div>

        <div className="text-center">
          {isEdit ? (
            <input
              className="w-full max-w-lg bg-blue-50 text-2xl font-medium px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-3xl font-semibold text-gray-800">
              {userData.name}
            </p>
          )}
        </div>

        <hr className="border-t border-gray-300" />

{/*-------------------------------------------Contact Information Section------------------------------------------*/}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
          <p className="text-xl font-semibold text-gray-700 mb-4">
            Contact Information
          </p>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">Email:</p>
              <p className="text-blue-500">{userData.email}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">Phone:</p>
              {isEdit ? (
                <input
                  className="w-1/2 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-blue-400">{userData.phone}</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">Address:</p>
              {isEdit ? (
                <div className="space-y-3">
                  {[
                    "housenumber",
                    "locality",
                    "district",
                    "city",
                    "state",
                    "country",
                  ].map((field) => (
                    <input
                      key={field}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={userData.address[field]}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, [field]: e.target.value },
                        }))
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">{`${userData.address.housenumber}, ${userData.address.locality}, ${userData.address.district}, ${userData.address.city}, ${userData.address.state}, ${userData.address.country}`}</p>
              )}
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />


        <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
          <p className="text-xl font-semibold text-gray-700 mb-4">
            Basic Information
          </p>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">Gender:</p>
              {isEdit ? (
                <select
                  className="w-1/2 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-600">{userData.gender}</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  className="w-1/2 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-600">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

  
        <div className="text-center">
          {isEdit ? (
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all"
              onClick={()=>{updateUserProfileData(), scrollTo(0,0)}}
            >
              Save Information
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-white border-2 border-blue-500 text-blue-500 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
