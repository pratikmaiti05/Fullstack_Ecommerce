import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div className="w-full pt-20 flex flex-col gap-15">
      {/* Top Section */}
      <div className="w-full h-auto md:h-[20vh] flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
        
        {/* Logo & About */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <img src={assets.logo} className="w-[40vw] md:w-[10vw]" />
          <p className="font-thin text-sm md:text-base text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-5">
          <h1 className="text-xl md:text-2xl">COMPANY</h1>
          <ul className="text-gray-500 space-y-2 text-sm md:text-base">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-5">
          <h1 className="text-xl md:text-2xl">GET IN TOUCH</h1>
          <ul className="flex flex-col gap-3 text-gray-500 text-sm md:text-base">
            <li>+1-000-000-0000</li>
            <li>pratik@gmail.com</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="h-auto w-full flex flex-col justify-center items-center gap-3 mt-10 md:mt-0">
        <div className="w-full border border-gray-200"></div>
        <p className="mt-2 text-xs md:text-sm text-gray-600 text-center">
          Copyright 2025@ pratikmaiti - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
