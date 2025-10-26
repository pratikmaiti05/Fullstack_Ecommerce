import Navbar from "./components/Navbar"
import Mainroutes from "./routes/Mainroutes"

const App = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <Navbar/>
      <Mainroutes/>
    </div>
  )
}

export default App