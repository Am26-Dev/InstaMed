import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm bg-blue-50 p-5">
      {/* Left section */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Link to="/"> 
            <img
              onClick={() => scrollTo(0, 0)}
              className="w-20 cursor-pointer"
              src="/logo.webp"
              alt="InstaMed Logo"
            />
          </Link>
          <span className="text-xl font-semibold text-gray-800">InstaMed</span>
        </div>
        <p className="w-full md:w-2/3 text-gray-600 leading-6">
        InstaMed is a convenient healthcare application that helps users find nearby doctors and book appointments seamlessly, whether online or offline. With real-time availability, patients can quickly locate the right doctor and schedule visits at their convenience, streamlining the healthcare experience.
        </p>
      </div>
  
      {/* Center section */}
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-2 text-gray-600">
          <li>Home</li>
          <li>About Us</li>
          <li>Privacy</li>
          <li>Privacy policy</li>
        </ul>
      </div>
  
      {/* Right section */}
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-2 text-gray-600">
          <li>+1-212-56-7890</li>
          <li>instamed@gmail.com</li>
        </ul>
      </div>
  
      {/* Copyright text */}
      <div className="col-span-3">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ InstaMed - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;