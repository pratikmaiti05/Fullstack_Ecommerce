import { assets } from "../assets/assets"
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe";
const About = () => {
  return (
    <div className="w-full min-h-screen flex flex-col px-6 md:px-20 lg:px-32 gap-16 py-12">
  {/* ABOUT US */}
  <div className="flex flex-col gap-10">
    <div className="flex justify-center items-center gap-3">
      <p className="text-3xl flex gap-2 font-semibold">
        <span className="text-gray-400">ABOUT</span>
        <span className="text-gray-800">US</span>
      </p>
      <div className="h-1 rounded-lg bg-gray-500 w-16"></div>
    </div>

    <div className="flex flex-col lg:flex-row gap-12 items-center">
      {/* Image */}
      <img
        src={assets.about_img}
        className="w-full lg:w-1/3 h-[50vh] object-cover rounded-xl shadow-md"
      />

      {/* Text */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6 text-gray-700">
        <p>
          Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
        </p>
        <p>
          Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
        </p>
        <h1 className="text-xl font-semibold text-gray-900">Our Mission</h1>
        <p>
          Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
        </p>
      </div>
    </div>
  </div>

  {/* WHY CHOOSE US */}
  <div className="flex flex-col gap-10">
    <div className="flex items-center gap-3">
      <p className="text-3xl flex gap-2 font-semibold">
        <span className="text-gray-400">WHY</span>
        <span className="text-gray-800">CHOOSE US</span>
      </p>
      <div className="h-1 rounded-lg bg-gray-500 w-20"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition">
        <h1 className="font-bold text-lg">Quality Assurance</h1>
        <p className="text-gray-600 mt-2">
          We meticulously select and vet each product to ensure it meets our stringent quality standards.
        </p>
      </div>
      <div className="border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition">
        <h1 className="font-bold text-lg">Convenience</h1>
        <p className="text-gray-600 mt-2">
          With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
        </p>
      </div>
      <div className="border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition">
        <h1 className="font-bold text-lg">Exceptional Service</h1>
        <p className="text-gray-600 mt-2">
          Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
        </p>
      </div>
    </div>
  </div>

  <Subscribe />
  <Footer />
</div>

  )
}

export default About