import { assets } from "../assets/assets"

const Hero = () => {
  return (
    <div className="border w-[90vw] md:w-[80vw] h-auto md:h-[60vh] flex flex-col md:flex-row mx-auto rounded-2xl overflow-hidden shadow-md">
  {/* Left Section */}
  <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start p-6 md:p-10 text-center md:text-left bg-white">
    {/* Top Line */}
    <div className="flex items-center gap-2 mb-4">
      <span className="border-b border-gray-400 w-[40px] md:w-[4vw]"></span>
      <h1 className="font-thin text-xs sm:text-sm md:text-base tracking-widest text-gray-600">
        OUR BESTSELLERS
      </h1>
    </div>

    {/* Main Heading */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
      Latest Arrivals
    </h1>

    {/* Bottom Line */}
    <div className="flex items-center gap-2 mt-6 cursor-pointer group">
      <h1 className="font-light text-sm md:text-base group-hover:underline">
        SHOP NOW
      </h1>
      <span className="border-b border-gray-400 w-[40px] md:w-[4vw] group-hover:border-black transition"></span>
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full md:w-1/2 h-[250px] md:h-full">
    <img
      src={assets.hero_img}
      className="w-full h-full object-cover"
      alt="Hero"
    />
  </div>
</div>

  )
}

export default Hero
