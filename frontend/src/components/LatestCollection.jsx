const LatestCollection = () => {
  return (
    <div className="flex flex-col items-center gap-5 px-4 text-center">
  {/* Heading */}
  <div className="flex flex-col md:flex-row gap-3 items-center">
    <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-500 font-medium">
      LATEST
    </h1>
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800">
      COLLECTIONS
    </h1>
    <span className="w-[40vw] sm:w-[20vw] md:w-[6vw] h-1 bg-gray-600"></span>
  </div>

  {/* Subtitle */}
  <p className="text-sm sm:text-base md:text-lg font-thin text-gray-700 max-w-2xl leading-relaxed">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis assumenda
    sequi harum tempora labore repudiandae.
  </p>
</div>


  )
}

export default LatestCollection