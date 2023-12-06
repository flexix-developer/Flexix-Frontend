import React, { useState, useRef, useEffect } from "react";

function ForgotTwo() {
  const [numbers, setNumbers] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus on the first input when the component mounts
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index, value) => {
    const newNumber = value.replace(/\D/g, "");

    setNumbers((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      newNumbers[index] = newNumber;
      return newNumbers;
    });

    // Move focus to the next input when a digit is entered
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="Right w-3/5 h-full flex items-center">
      <div className="h-full flex flex-col">
        <div className="Right-Content mx-24 mr-80 w-90/0 h-5/6 flex flex-col justify-center mb-24">
          <span className="text-5xl font-semibold mt-2">Password reset</span>
          <form className="mt-8">
            <label className="text-2xl font-normal">
              <div className="flex m-0">
                We sent code to
                <p className="ml-2 font-semibold font-semibold">
                  jonh_smith@gmail.com
                </p>
              </div>
              <div className="flex justify-center">
                {numbers.map((value, index) => (
                  <input
                    key={index}
                    className="w-16 h-16 border rounded-xl border-slate-950 mt-4 my-2 mx-2 text-left px-4 py-1 text-3xl text-center"
                    name="verifycode"
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              <br />
              <span className="ml-2 text-xl">
                Didn't receive the email?
                <a className="text-blue-700 ml-2 underline cursor-pointer">
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
        <div className="flex h-2 justify-center mr-16 mt-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`w-24 bg-${
                index === 1 ? "blue-900" : "gray-400"
              } mx-2.5 border rounded-xl`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForgotTwo;
