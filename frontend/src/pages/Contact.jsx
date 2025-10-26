import { assets } from "../assets/assets"
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe";
const Contact = () => {
  return (
     <div className="w-full min-h-screen flex flex-col px-5 sm:px-10 lg:px-25 gap-10 py-10">
  {/* Divider */}
  <div className="w-full border border-gray-200"></div>

  <div className="w-full flex flex-col gap-15">
    {/* Title */}
    <div className="w-full flex justify-center items-center gap-3">
      <p className="text-2xl flex gap-2">
        <span className="text-gray-400">CONTACT</span>
        <span className="text-gray-800">US</span>
      </p>
      <div className="h-1 rounded-lg bg-gray-500 w-15"></div>
    </div>

    {/* Content */}
    <div className="w-full flex flex-col lg:flex-row gap-10 items-center lg:px-40">
      {/* Image */}
      <img
        src={assets.contact_img}
        className="w-full lg:w-1/2 h-[40vh] lg:h-[65vh] object-cover rounded-md"
      />

      {/* Info */}
      <div className="w-full lg:w-1/2 flex flex-col gap-10">
        <h1 className="text-2xl font-bold text-gray-600">Our Store</h1>
        <div>
          <p className="text-gray-400">54709 Willms Station</p>
          <p className="text-gray-400">Suite 350, Washington, USA</p>
        </div>
        <div>
          <p className="text-gray-400">Tel: (415) 555-0132</p>
          <p className="text-gray-400">Email: pratik@gmail.com</p>
        </div>

        <h1 className="text-2xl font-bold text-gray-600">Careers at Forever</h1>
        <p className="text-gray-400">Learn more about our teams and job openings.</p>

        <button className="w-full sm:w-[50%] lg:w-[10vw] p-2 font-thin text-xl text-black border border-black hover:bg-black hover:text-white duration-400">
          Explore Jobs
        </button>
      </div>
    </div>
  </div>

  <Subscribe />
  <Footer />
</div>

  )
}

export default Contact