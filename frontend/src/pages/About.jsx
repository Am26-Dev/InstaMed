import { assets } from "../assets/assets"

const About = () => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>ABOUT <span className="text-gray-700 font-medium">US</span></p>
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-12">
                <img className="w-ull md:max-w-[360px]" src={assets.about_image} alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, incidunt quod. Neque delectus consequuntur quos ea rem voluptate in minus sunt aliquid id veniam, omnis itaque, error earum quo fuga?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, explicabo qui. Nesciunt corporis quidem provident omnis? Eum tempore necessitatibus culpa provident doloremque magnam, fuga beatae aliquam similique ducimus! Labore voluptate non necessitatibus sapiente pariatur autem fuga amet tempora reprehenderit nihil.</p>
                    <p className="text-gray-800">Our Vision</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium quis temporibus commodi, magnam eveniet minima.</p>
                </div>
            </div>

            <div className="text-xl my-4">
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
