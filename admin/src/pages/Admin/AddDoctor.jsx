import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/adminContext";
import { toast } from "react-toastify";
import axios from "axios";

export const AddDoctor = () => {
  const [img, setImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exp, setExp] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [locality, setLocality] = useState("");
  const [district, setDistrict] = useState("");
  const [buildingnumber, setBuildingNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [fixedId, setFixedId] = useState("");

  const { atoken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!img) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();

      formData.append("image", img);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("about", about);
      formData.append("fees", Number(fee));
      formData.append("experience", exp);
      formData.append(
        "address",
        JSON.stringify({
          buildingnumber: buildingnumber,
          locality: locality,
          district: district,
          city: city,
          state: state,
          country: country,
        })
      );
      formData.append("degree", degree);
      formData.append("fixedId", fixedId);

      const { data } = await axios.post(
        backendUrl + "/admin/add-doctor",
        formData,
        {
          headers: { atoken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setImg("");
        setName("");
        setEmail("");
        setPassword("");
        setAbout("");
        setDegree("");
        setLocality("");
        setBuildingNumber("");
        setCity("");
        setState("");
        setCountry("");
        setDistrict("");
        setFee("");
        setFixedId("");
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center justify-center mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="max-w-24 bg-gray-100 rounded-full"
              src={img ? URL.createObjectURL(img) : "/upload.png"}
              alt="Upload Doctor Image"
            />
          </label>
          <input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="mt-2 text-center">Upload Doctor Picture</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-600">
          <div>
            <div className="flex flex-col mb-4">
              <label className="mb-1">Doctor Name</label>
              <input
                className="border rounded px-4 py-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter name"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Doctor Email</label>
              <input
                className="border rounded px-4 py-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Doctor Password</label>
              <input
                className="border rounded px-4 py-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Experience</label>
              <select
                onChange={(e) => setExp(e.target.value)}
                value={exp}
                className="border rounded px-4 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Fee</label>
              <input
                className="border rounded px-4 py-2"
                onChange={(e) => setFee(e.target.value)}
                value={fee}
                type="number"
                placeholder="Enter fee"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col mb-4">
              <label className="mb-1">Specialty</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-4 py-2"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Education</label>
              <input
                className="border rounded px-4 py-2"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Enter education"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Address</label>
              <input
                className="border rounded px-4 py-2"
                onChange={(e) => setBuildingNumber(e.target.value)}
                value={buildingnumber}
                type="text"
                placeholder="Building number"
                required
              />
              <input
                className="border rounded px-4 py-2 mt-2"
                onChange={(e) => setLocality(e.target.value)}
                value={locality}
                type="text"
                placeholder="Locality"
                required
              />
              <input
                className="border rounded px-4 py-2 mt-2"
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
                type="text"
                placeholder="District"
                required
              />
              <input
                className="border rounded px-4 py-2 mt-2"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                type="text"
                placeholder="City"
                required
              />
              <input
                className="border rounded px-4 py-2 mt-2"
                onChange={(e) => setState(e.target.value)}
                value={state}
                type="text"
                placeholder="State"
                required
              />
              <input
                className="border rounded px-4 py-2 mt-2"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                type="text"
                placeholder="Country"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Video Call ID</label>
              <input
                className="border rounded px-4 py-2"
                onChange={(e) => setFixedId(e.target.value)}
                value={fixedId}
                type="text"
                placeholder="Enter Fixed ID"
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">About</label>
          <textarea
            className="w-full px-4 pt-2 border rounded"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write about the doctor"
            rows={5}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-8 py-4 mt-4 rounded-full w-full lg:w-auto"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};
