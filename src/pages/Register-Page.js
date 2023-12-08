import bglogin from "../images/Register-bg.png";
import NavBarHome from "../components/NavBarHome";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="h-screen">
      <NavBarHome />
      <div className="Container flex h-90/0">
        <div className="Left w-3/6 h-full flex items-center flex-col">
          <div className="h-10/12 w-10/12 mt-32">
            <img className="h-full " src={bglogin} alt="" />
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-semibold mt-10">
              What you'll emjoy:
            </span>
            <span className="text-2xl tracking-wide">
              <div className="my-2">
                - Free access to the FLEXiX platfrom
                <br />
              </div>
              <div className="my-2">
                - Access to template,widgets, test API
                <br />
              </div>
              <div className="my-2">
                - Self-paced courses and certifications
                <br />
              </div>
            </span>
          </div>
        </div>

        <div className="Right w-3/5 h-full flex  items-center  ">
          <div className="Right-Content  mr-64 w-full h-5/6 flex  flex-col">
            <span className="text-5xl font-semibold mt-10">Sign up</span>
            <form className="mt-8">
              <div className=" flex flex-row justify-between mb-2 ">
                <label className="text-2xl font-normal w-6/12 mr-4">
                  First Name
                  <br />
                  <input
                    className="w-full h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl"
                    type="text"
                    name="name"
                  />
                </label>
                <label className="text-2xl font-normal w-6/12 ml-4">
                  Last Name
                  <br />
                  <input
                    className="w-full h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl"
                    type="text"
                    name="name"
                  />
                </label>
              </div>
              <label className="text-2xl  font-normal">
                Email
                <input
                  className="w-full  h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl"
                  type="email"
                  name="name"
                />
              </label>
              <label className="text-2xl  font-normal">
                Password
                <input
                  className="w-full  h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl"
                  type="password"
                  name="name"
                />
              </label>
              <label className="text-2xl  font-normal">
                Confirm Password
                <input
                  className="w-full  h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl"
                  type="password"
                  name="name"
                />
              </label>
              <div>
                <input
                  type="checkbox"
                  id="agreePolicy"
                  name="agreePolicy"
                  value="agreePolicy"
                  className="my-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="agreePolicy" className="ml-2 ">
                  I agree with to FLEXiX Privacy Policy
                </label>
                <br />
                <input
                  type="checkbox"
                  id="receiveInMail"
                  name="receiveInMail"
                  value="receiveInMail"
                  className="my-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="receiveInMail" className="ml-2">
                  I would like to receive communication from FLEXiX via email
                </label>
                <br />
              </div>
              <div className="w-full flex justify-center">
                <input
                  className="bg-blue-900 text-white w-2/5  h-16 border-2 rounded-xl text-2xl mt-4 mb-4"
                  type="submit"
                  value="Next"
                />
              </div>
            </form>
            <div className="flex justify-center">
              <span className="ml-2 text-xl">
                Already have an account?
                <Link to="/login">
                  <a className="text-blue-700 ml-2" href="/register">
                    Sign In.
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
