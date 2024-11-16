const Header = () => {
    return (
        <div
            className="relative flex flex-col md:flex-row items-center justify-center rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-16 lg:py-20 text-center"
            style={{
                backgroundImage: `url(${"/headerbg.png"})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
    
            {/* Content */}
            <div className="relative md:w-3/4 flex flex-col items-center justify-center gap-4 py-10 z-10">
                <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                    Consult Doctors <br /> For Any Health Concern
                </p>
                <div className="flex flex-col md:flex-row items-center gap-3 text-gray-200 text-sm font-light">
                    <p>
                        Browse through our extensive list of trusted doctors,
                        <br className="hidden sm:block" /> and schedule your appointment hassle-free
                    </p>
                </div>
                <a
                    href="#speciality"
                    className="flex items-center gap-2 bg-gray-800 px-8 py-3 rounded-full text-white text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
                >
                    Book Appointment
                </a>
            </div>
        </div>
    );
    
}

export default Header