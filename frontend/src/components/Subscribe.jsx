const Subscribe = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8 px-5">
  <h1 className="text-2xl font-medium text-center">Subscribe now & get 20% off</h1>
  <p className="text-gray-500 text-center">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </p>

  <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[35vw] flex">
    <input
      placeholder="Enter your email"
      className="border border-gray-200 outline-none p-2 w-2/3"
    />
    <button className="w-1/3 p-1.5 font-thin text-xl text-black border border-black hover:bg-black hover:text-white duration-400">
      Subscribe
    </button>
  </div>
</div>

  )
}

export default Subscribe