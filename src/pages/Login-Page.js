import NavBar from "../components/NavBar";
import bglogin from "../images/login-bg.png";
function LoginPage() {
  return (
    <div className="h-screen">
      <NavBar />
      <div className="Container flex h-90/0 ">
        <div className="Left w-2/5 h-full flex justify-center items-center">
          <img className="h-full" src={bglogin} />
        </div>
        <div className="Right w-3/5 h-full flex  items-center  ">
          <div className="Right-Content mx-24 mr-80 w-full h-5/6 flex  flex-col">
            <span className="text-5xl font-semibold mt-20">
              Sing in to FLEXiX
            </span>
            <form className="mt-8">
              <label className="text-2xl font-normal">
                Email
                <br />
                <input
                  className="w-full h-14 border rounded-xl border-slate-950 my-2 mb-6 text-left border rounded px-2 py-1 text-3xl"
                  type="text"
                  name="name"
                />
              </label>
              <br />
              <label className="text-2xl my-2 font-normal">
                <div className="flex justify-between m-0">
                  Password<p className="text-blue-800">Forgot password? </p>
                </div>
                <input
                  className="w-full  h-14 border rounded-xl border-slate-950 my-2 text-left border rounded px-2 py-1 text-3xl"
                  type="password"
                  name="name"
                />
              </label>
              <br />
              <input
                className="bg-blue-900 text-white w-full  h-16 border-2 rounded-xl mt-2 text-2xl mt-4 mb-4"
                type="submit"
                value="Sign in"
              />
            </form>
            <span className="ml-2 text-xl">
              Don't have an account ?{" "}
              <a className="text-blue-700" href="/">
                Sign Up.
              </a>
            </span>
            <br />
          </div>
        </div>
      </div>
      <div className="">
        <span className="ml-2 text-xl">
          @ FLEXiX 2023 | <a>Contact Us</a> | <a>Privacy Policy</a>
        </span>
      </div>
    </div>
  );
}
export default LoginPage;
