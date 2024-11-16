import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom"

export const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className="flex bg-white rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
            {/* Text Content */}
            <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl ">
            <p className='text-gray-600 font-semibold '>Book Appointments</p> &nbsp;
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                InstaMed is a convenient healthcare application that helps users find nearby doctors and book appointments seamlessly, whether online or offline. With real-time availability, patients can quickly locate the right doctor and schedule visits at their convenience, streamlining the healthcare experience.
            </p>
            </div>

                <button
                    onClick={() => { navigate("/login"); scrollTo(0, 0); }}
                    className="bg-white border border-blue-500 text-blue-500 text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:bg-blue-500 hover:text-white transition-all"
                >
                    Create Account
                </button>
            </div>
    
            {/* Image with Light Sky-Blue Background */}
            <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
                <div className="relative w-full h-full flex items-center justify-center bg-sky-100 rounded-full p-4">
                    <img
                        src={assets.appointment_img}
                        alt="Doctor"
                        className="w-full max-w-xs object-cover "
                    />
                </div>
            </div>
        </div>
    );
}