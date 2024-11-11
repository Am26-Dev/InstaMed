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
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

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
        JSON.stringify({ line1: line1, line2: line2 })
      );
      formData.append("degree", degree);


      const { data } = await axios.post(backendUrl + "/admin/add-doctor", formData, {
        headers: { atoken },
      });
      if (data.success) {
        toast.success(data.message);
        setImg("")
        setName("")
        setEmail("")
        setPassword("")
        setAbout("")
        setDegree("")
        setLine1("")
        setLine2("")
        setFee("")
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message)
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex  items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="max-w-20  bg-gray-100 rounded-full cursor-pointer"
              src={img ? URL.createObjectURL(img) : "/upload.png"}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 felx flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                className="border rounded px-4 py-2 mb-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="enter name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border rounded px-4 py-2 mb-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="enter email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border rounded px-4 py-2 mb-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 mb-2">
              <p>Experience</p>
              <select
                onChange={(e) => setExp(e.target.value)}
                value={exp}
                className="mb-2"
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

            <div className="flex-1 flex flex-col gap-1">
              <p>Fee</p>
              <input
                className="border rounded px-4 py-2 mb-2"
                onChange={(e) => setFee(e.target.value)}
                value={fee}
                type="number"
                placeholder="fee"
                required
              />
            </div>
          </div>

          <div className="w-full flex flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="mb-2"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Education</p>
              <input
                className="border rounded px-4 py-2 mb-2"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border rounded px-4 py-2 mb-2"
                onChange={(e) => setLine1(e.target.value)}
                value={line1}
                type="text"
                placeholder="line1"
                required
              />
              <input
                className="border rounded px-4 py-2 mb-2"
                onChange={(e) => setLine2(e.target.value)}
                value={line2}
                type="text"
                placeholder="line2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About</p>
          <textarea
            className="w-full px-4 pt-2 border rounded"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="write about doctor"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-8 py-4 mt-4 rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};
