

const About = () => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>ABOUT <span className="text-gray-700 font-medium">US</span></p>
            </div>

            <div className="my-10 flex justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl border border-blue-500">
                <div className="flex flex-col gap-6 text-sm text-gray-600">
                <p>Our app is designed to make healthcare more accessible and convenient, especially for people in remote or underserved areas.With options for video consultations for minor issues and in-person visits for critical needs, we aim to bridge the gap between patients and healthcare providers. Integrated with real-time mapping, our app helps users find nearby hospitals, book appointments, and make secure online payments—all in one place. </p>
                <p className="text-gray-800 font-semibold">Our Vision</p>
                <p>Our mission is to empower individuals with easy access to medical support, regardless of location, and improve the healthcare experience for everyone.</p>
                </div>
            </div>
        </div>

            <div className="text-xl my-4 text-center">
                <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
            </div>

            <div className="flex flex-col md:flex-row mb-20">
                <div className="border px-10 md:px-16 py-8 sm:p-16 flex flex-col gap-5 text-base hover:bg-primary hover:text-white transition-all duration-200 text-gray-600 cursor-pointer">
                    <b>Efficiency:</b>
                    <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:p-16 flex flex-col gap-5 text-base hover:bg-primary hover:text-white transition-all duration-200 text-gray-600 cursor-pointer">
                    <b>Efficiency:</b>
                    <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:p-16 flex flex-col gap-5 text-base hover:bg-primary hover:text-white transition-all duration-200 text-gray-600 cursor-pointer">
                    <b>Efficiency:</b>
                    <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>
            </div>


        </div>
    )
}

export default About