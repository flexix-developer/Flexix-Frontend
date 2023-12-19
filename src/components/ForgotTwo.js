import React, { useState, useRef, useEffect } from "react";
import BottomSlideBar from "./BottomSlideBar";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function ForgotTwo({ onNextStep }) {
  const { userData } = useAuth();
  const [numbers, setNumbers] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index, value) => {
    const newNumber = value.replace(/\D/g, "");

    setNumbers((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      newNumbers[index] = newNumber;
      return newNumbers;
    });

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (value && index < inputRefs.current.length - 1) {
      // If a digit is entered, move focus to the next input
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = numbers.join("");

    try {
      const response = await axios.post("http://localhost:8081/check", {
        otp_code: otpCode,
        email: userData.email,
      });

      if (response.status === 200) {
        console.log(response.data.message);
        alert("OK");
        onNextStep();
      } else {
        console.error(response.data.message);
        alert("Wrong OTP");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Please Enter Your OTP");
    }
  };

  return (
    <div className="Right w-3/5 h-full flex items-center">
      <div className="h-full flex flex-col">
        <div className="Right-Content mx-24 mr-80 w-9/12 h-5/6 flex flex-col justify-center mb-24">
          <span className="text-5xl font-semibold mt-2">Password reset</span>
          <form className="mt-8" onSubmit={handleSubmit}>
            <label className="text-2xl font-normal">
              <div className="flex m-0">
                We sent code to
                <p className="ml-2 font-semibold">{userData.email}</p>
              </div>
              <div className="flex justify-center">
                {numbers.map((value, index) => (
                  <input
                    key={index}
                    className="w-16 h-16 border rounded-xl border-slate-950 mt-4 my-2 mx-2 px-4 py-1 text-3xl text-center"
                    name="verifycode"
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>

              <span className="ml-2 text-xl">
                Didn't receive the email?
                <a
                  className="text-blue-700 ml-2 underline cursor-pointer"
                  href="/"
                >
                  Click here
                </a>
              </span>
            </label>
            <input
              className="bg-blue-900 text-white w-full h-16 border-2 rounded-xl text-2xl mt-4 cursor-pointer"
              type="submit"
              value="Continue"
            />
          </form>
        </div>

        <BottomSlideBar
          children="flex h-2 justify-center mr-15 mt-8"
          indexs={1}
        />
      </div>
    </div>
  );
}

export default ForgotTwo;
