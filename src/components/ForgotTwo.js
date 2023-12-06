import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

function ForgotTwo() {
  return (
    // <div className="Right w-3/5 h-full flex  items-center ">
    //   <div className=" h-full flex flex-col">
    //     <div className="Right-Content mx-24 mr-80 w-90/0 h-5/6 flex  flex-col justify-center mb-40">
    //       <span className="text-5xl font-semibold mt-20">Password reset</span>
    //       <form className="mt-8">
    //         <label className="text-2xl font-normal">
    //           <div className="flex my-0">
    //             We sent a code to
    //             <p className="ml-2 font-semibold "> john_smith@mail.com</p>
    //           </div>

    //           <input
    //             className="w-full h-14 border rounded-xl border-slate-950 mt-4 my-2  text-left px-4 py-1 text-3xl"
    //             type="email"
    //             name="email"
    //             placeholder="่john_smith@gmail.com"
    //           />
    //         </label>
    //         <input
    //           className="bg-blue-900 text-white w-full  h-16 border-2 rounded-xl text-2xl mt-4"
    //           type="submit"
    //           value="Continue"
    //         />
    //       </form>

    //       <span className="ml-2 text-xl">
    //         Didn't receive the email?
    //         <a className="text-blue-700 ml-2" href="/">
    //           Click here
    //         </a>
    //       </span>
    //       <br />
    //     </div>
    //     <div className="flex h-2 justify-center ml-52 mt-8">
    //       <div className=" w-24  bg-blue-900 mx-2.5 border rounded-xl "></div>
    //       <div className="w-24  bg-gray-400 mx-2.5 border rounded-xl"></div>
    //       <div className="w-24  bg-gray-400 mx-2.5 border rounded-xl"></div>
    //     </div>
    //   </div>
    // </div>
    <div className="Right w-3/5 h-full flex  items-center ">
      <div className=" h-full flex flex-col">
        <div className="Right-Content mx-24 mr-80 w-3/4 h-5/6 flex  flex-col justify-center mb-24">
          <span className="text-5xl font-semibold mt-2">Password reset</span>
          <form className="mt-8">
            <label className="text-2xl font-normal">
              <div className="flex m-0">
                We sent code to <p className="ml-2">jonh_smith@gmail.com</p>
              </div>
              <input
                className="w-full h-14 border rounded-xl border-slate-950 mt-4 my-2  text-left px-4 py-1 text-3xl"
                type="email"
                name="email"
                placeholder="่john_smith@gmail.com"
              />
              <span className="ml-2 text-xl">
                Don't have an account ?{" "}
                <a className="text-blue-700" href="/">
                  Sign Up.
                </a>
              </span>
            </label>
            <input
              className="bg-blue-900 text-white w-full  h-16 border-2 rounded-xl text-2xl mt-4"
              type="submit"
              value="Continue"
            />
          </form>
        </div>
        <div className="flex h-2 justify-center mr-16 mt-8">
          <div className=" w-24   bg-gray-400 mx-2.5 border rounded-xl "></div>
          <div className="w-24  bg-blue-900 mx-2.5 border rounded-xl"></div>
          <div className="w-24  bg-gray-400 mx-2.5 border rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
export default ForgotTwo;
