import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import BottomSlideBar from "./BottomSlideBar";
import React from "react";

function ForgotOne({ onNextStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form submission logic
    // ...

    // Move to the next step
    onNextStep();
  };

  return (
    <div className="Right w-3/5 h-full flex items-center ">
      <div className=" h-full flex flex-col">
        <div className="Right-Content mx-24 mr-80 w-85 h-5/6 flex flex-col justify-center mb-24">
          <span className="text-5xl font-semibold mt-20">Forgot password</span>
          <form className="mt-8" onSubmit={handleSubmit}>
            <label className="text-2xl font-normal">
              Enter Email Address
              <br />
              <input
                className="w-full h-14 border rounded-xl border-slate-950 mt-4 my-2  text-left px-4 py-1 text-3xl"
                type="email"
                name="email"
                placeholder="john_smith@gmail.com"
              />
            </label>
            <input
              className="bg-blue-900 text-white w-full  h-16 border-2 rounded-xl text-2xl mt-4 cursor-pointer"
              type="submit"
              value="Send"
            />
          </form>
          <span className="ml-2 text-xl">
            <div className="flex justify-center flex-row p-6 text-slate-500">
              <Link to="/login" className="flex items-center flex-row ">
                <GoArrowLeft className="text-2xl mr-2" />
                <p className="tracking-wider">Back to sign in</p>
              </Link>
            </div>
          </span>
          <br />
        </div>
        <BottomSlideBar
          children="flex h-2 justify-center mr-3 mt-8"
          indexs={0}
        />
      </div>
    </div>
  );
}

export default ForgotOne;
