import { assets } from "../assets/assets"
const Customer = () => {
  return (
      <div className="w-full px-6 md:px-20 lg:px-35 py-10 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-5">
  <div className="flex flex-col items-center gap-3 text-center">
    <img src={assets.exchange_icon} className="w-12" />
    <h1 className="font-bold">Easy Exchange Policy</h1>
    <p className="text-gray-600">We offer hassle free exchange policy</p>
  </div>

  <div className="flex flex-col items-center gap-3 text-center">
    <img src={assets.quality_icon} className="w-12" />
    <h1 className="font-bold">7 Days Return Policy</h1>
    <p className="text-gray-600">We provide 7 days free return policy</p>
  </div>

  <div className="flex flex-col items-center gap-3 text-center">
    <img src={assets.support_img} className="w-12" />
    <h1 className="font-bold">Best customer support</h1>
    <p className="text-gray-600">We provide 24/7 customer support</p>
  </div>
</div>

  )
}

export default Customer