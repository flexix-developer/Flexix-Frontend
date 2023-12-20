import wallpaper from "../assets/images/home-wallpaper.png";
import NavBarHome from "../components/navbar/NavBarHome";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <NavBarHome />
      <div className="flex justify-center items-center flex-1">
        <div className="mx-auto md:flex bg-gray-800 p-8 md:p-12 rounded-lg w-10/12">
          <div className="text-white mr-8 w-full md:w-5/12">
            <p className="text-2xl md:text-lg lg:text-2xl text-white mb-1">LOW-CODE APPLICATION DEVELOPMENT PLATFORM</p>
            <p className="text-7xl md:text-5xl lg:text-7xl text-white font-bold mb-1">WELCOME TO</p>
            <p className="text-8xl md:text-6xl lg:text-8xl text-orange-600 font-bold mb-2">FLEXiX</p>
            <p className="text-2xl md:text-lg lg:text-2xl text-white mb-1">Enter the next era of app development</p>
            <p className="text-2xl md:text-lg lg:text-2xl text-white mb-10">with our platform-wide updates.</p>

            <div className="mt-4 flex flex-row space-x-2">
              <Link to="/tutorial">
                <button className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-2 px-8 border border-sky-800 rounded shadow">
                  Tutorial
                </button>
              </Link>
              <a href="/platform  ">
                <button className="bg-white hover:bg-gray-100 text-sky-800 font-semibold py-2 px-8 border border-sky-800 rounded shadow">
                  Platform
                </button>
              </a>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden w-7/12">
            <img src={wallpaper} alt="Wallpaper" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
