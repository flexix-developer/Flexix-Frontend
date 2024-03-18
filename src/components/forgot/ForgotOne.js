// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { GoArrowLeft } from "react-icons/go";
// import BottomSlideBar from "./BottomSlideBar";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";

// function ForgotOne({ onNextStep }) {
//   const { setUserDataValue } = useAuth();
//   const [email, setEmail] = useState("");
//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [isFormValid, setIsFormValid] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Perform API call to Django backend
//       const response = await axios.post("http://127.0.0.1:8000/forgot", {
//         Email: email,
//       });

//       // Check the response and handle accordingly
//       if (response.status === 200) {
//         // Success
//         console.log(response.data.message);
//         alert("Send Email Complete");
//         setUserDataValue({ email }); // Set email to context
//         onNextStep();
//       } else {
//         // Handle error
//         console.error(response.data.message);
//       }
//     } catch (error) {
//       // Handle network or other errors
//       console.error("An error occurred:", error);
//     }
//   };
//   const updateFormValidity = () => {
//     const isValidForm = isValidEmail;
//     setIsFormValid(isValidForm);
//   };
//   const handleEmailChange = (event) => {
//     const newEmail = event.target.value;

//     // Check if the input is empty, and handle it accordingly
//     if (newEmail === "" || /^[A-Za-z0-9._%+-@]+$/.test(newEmail)) {
//       setEmail(newEmail);
//     }

//     // Check email validity
//     const isValid = isEmailValid(newEmail);
//     setIsValidEmail(isValid);
//     updateFormValidity();
//   };
//   const isEmailValid = (email) => {
//     // Regular Expression for email validation
//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   return (
//     <div className="Right w-3/5 h-full flex items-center ">
//       <div className=" h-full flex flex-col">
//         <div className="Right-Content mx-24 mr-80 w-85 h-5/6 flex flex-col justify-center mb-24">
//           <span className="text-5xl font-semibold mt-20">Forgot password</span>
//           <form className="mt-8" onSubmit={handleSubmit}>
//             <label className="text-2xl font-normal">
//               Enter Email Address
//               <br />
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full h-14 border rounded-xl border-slate-950 mt-4 my-2  text-left px-4 py-1 text-3xl"
//                 type="email"
//                 name="email"
//                 placeholder="john_smith@gmail.com"
//                 required
//               />
//             </label>
//             <input
//               className="bg-blue-900 text-white w-full  h-16 border-2 rounded-xl text-2xl mt-4 cursor-pointer"
//               type="submit"
//               value="Send"
//             />
//           </form>
//           <span className="ml-2 text-xl">
//             <div className="flex justify-center flex-row p-6 text-slate-500">
//               <Link to="/login" className="flex items-center flex-row ">
//                 <GoArrowLeft className="text-2xl mr-2" />
//                 <p className="tracking-wider">Back to sign in</p>
//               </Link>
//             </div>
//           </span>
//           <br />
//         </div>
//         <BottomSlideBar
//           children="flex h-2 justify-center mr-3 mt-8"
//           indexs={0}
//         />
//       </div>
//     </div>
//   );
// }

// export default ForgotOne;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import BottomSlideBar from "../sidebar/BottomSlideBar";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

function ForgotOne({ onNextStep }) {
  const { setUserDataValue } = useAuth();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/forgot", {
        // const response = await axios.post(
        //   "http://ceproject.thddns.net:3322/forgot",
        //   {
        email: email,
      });

      if (response.status === 200) {
        console.log(response.data.message);
        alert("Send Email Complete");
        setUserDataValue({ email }); // Set email to context
        onNextStep(); // If needed, uncomment this line
      } else {
        console.error(response.data.message);
        alert("Email not found in the system.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Email not found in the system.");
    }
  };

  const updateFormValidity = () => {
    const isValidForm = email && isValidEmail;
    setIsFormValid(isValidForm);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;

    // Check if the input is empty, and handle it accordingly
    if (newEmail === "" || /^[A-Za-z0-9._%+-@]+$/.test(newEmail)) {
      setEmail(newEmail);
    }

    // Check email validity
    const isValid = isEmailValid(newEmail);
    setIsValidEmail(isValid);

    // Log the values for debugging
    console.log("New Email:", newEmail);
    console.log("isValidEmail:", isValidEmail);
    console.log("isEmailValid:", isValid);
    console.log("isFormValid (before update):", isFormValid);

    updateFormValidity(); // Call this function to update isFormValid

    // Log the values after the update
    console.log("isFormValid (after update):", isFormValid);
  };

  const isEmailValid = (email) => {
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{1,})?$/;
    return emailRegex.test(email);
  };

  return (
    <div className="Right w-3/5 h-full flex items-center ">
      <div className="h-full flex flex-col">
        <div className="Right-Content mx-24 mr-80 w-85 h-5/6 flex flex-col justify-center mb-24">
          <span className="text-5xl font-semibold mt-20">Forgot password</span>
          <form className="mt-8" onSubmit={handleSubmit}>
            <label className="text-2xl font-normal">
              Enter Email Address
              <br />
              <input
                className={`w-full h-14 border rounded-xl border-slate-950 mt-4 my-2  text-left px-4 py-1 text-3xl ${
                  !isValidEmail ? "border-red-500" : ""
                }`}
                type="email"
                name="email"
                id="email"
                placeholder="john_smith@gmail.com"
                required
                value={email}
                onChange={handleEmailChange}
              />
              {!isValidEmail && (
                <p className="text-red-500 text-xl mt-2">
                  Invalid email format
                </p>
              )}
            </label>

            <input
              className={`bg-blue-900 text-white w-full  h-16 border-2 rounded-xl text-2xl mt-4  ${
                isFormValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              value="Send"
              name="BT_Send"
              disabled={!isFormValid}
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
