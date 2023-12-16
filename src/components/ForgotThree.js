// import React, { useState } from "react";
// import BottomSlideBar from "./BottomSlideBar";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import axios from "axios";

// function ForgotThree() {
//   const { userData } = useAuth();
//   const navigate = useNavigate();

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Check if passwords match
//     if (newPassword !== confirmPassword) {
//       console.error("Passwords do not match");
//       alert("Password do not match");
//       return;
//     }

//     const apiUrl = "http://127.0.0.1:8000/repass";

//     try {
//       // Make a PUT request to the Django API
//       const response = await axios.put(apiUrl, {
//         Email: userData.email,
//         Pass: newPassword,
//       });

//       console.log(response.data);
//       navigate("/login");
//     } catch (error) {
//       console.error("Error updating password:", error);
//       // Handle the error (e.g., show an error message to the user)
//     }
//   };

//   return (
//     <div className="Right w-3/5 h-full flex items-center">
//       <div className="h-full flex flex-col">
//         <div className="Right-Content mx-24 mr-80 w-10/12 h-5/6 flex flex-col justify-center mb-24">
//           <span className="text-5xl font-semibold mt-20">Set new password</span>
//           <form className="mt-8" onSubmit={handleSubmit}>
//             <label className="text-2xl font-normal">
//               New Password
//               <br />
//               <input
//                 className="w-full h-14 border rounded-xl border-slate-950 my-2 mb-6 text-left px-4 py-1 text-3xl"
//                 type="password"
//                 name="newPassword"
//                 placeholder="+8 characters"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </label>
//             <br />
//             <label className="text-2xl my-2 font-normal">
//               <div className="flex justify-between m-0">Confirm Password</div>
//               <input
//                 className="w-full h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl "
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Password again"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </label>
//             <br />
//             <input
//               className="bg-blue-900 text-white w-full h-16 border-2 rounded-xl text-2xl mt-4 mb-4"
//               type="submit"
//               value="Reset Password"
//             />
//           </form>
//         </div>
//         <BottomSlideBar
//           children="flex h-2 justify-center ml-8 mt-8"
//           indexs={2}
//         />
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import BottomSlideBar from "./BottomSlideBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function ForgotThree() {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  // const isPasswordValid = (password) => {
  //   // Define your password criteria
  //   const minLength = 8;
  //   const uppercaseRegex = /[A-Z]/;
  //   const digitRegex = /\d/;
  //   const specialCharRegex = /[-!"#$%&'()*+,.:;<=>?@[\\\]^_`{|}~]/;

  //   // Check if the password meets the criteria
  //   return (
  //     password.length >= minLength &&
  //     uppercaseRegex.test(password) &&
  //     digitRegex.test(password) &&
  //     !specialCharRegex.test(password)
  //   );
  // };
  const isPasswordValid = (password) => {
    // Define your password criteria
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[-!"#$%&'()*+,.:;<=>?@[\\\]^_`{|}~]/;

    // Check if the password meets the criteria
    return (
      password.length >= minLength &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      digitRegex.test(password) &&
      !specialCharRegex.test(password)
    );
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);

    // Check password validity
    const isValidPassword = isPasswordValid(newPassword);
    console.log(isValidPassword);
    setIsValidPassword(isValidPassword);

    // Check if passwords match
    const doPasswordsMatch = newPassword === confirmPassword;
    setPasswordsMatch(doPasswordsMatch);

    // Update isFormValid to true if all conditions are met
    setIsFormValid(isValidPassword && doPasswordsMatch);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if passwords match
    const doPasswordsMatch = newConfirmPassword === newPassword;
    setPasswordsMatch(doPasswordsMatch);

    // Update isFormValid to true if all conditions are met
    setIsFormValid(doPasswordsMatch && isValidPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (!passwordsMatch) {
      console.error("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    // Check if the password is valid
    if (!isValidPassword) {
      console.error("Invalid password");
      alert("Invalid password");
      return;
    }

    const apiUrl = "http://127.0.0.1:8000/repass";

    try {
      // Make a PUT request to the Django API
      const response = await axios.put(apiUrl, {
        Email: userData.email,
        Pass: newPassword,
      });

      console.log(response.data);
      alert("Set new password complete");
      navigate("/login");
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="Right w-3/5 h-full flex items-center">
      <div className="h-full flex flex-col">
        <div className="Right-Content mx-24 mr-80 w-10/12 h-5/6 flex flex-col justify-center mb-24">
          <span className="text-5xl font-semibold mt-20">Set new password</span>
          <form className="mt-8" onSubmit={handleSubmit}>
            <label className="text-2xl font-normal">
              New Password
              <br />
              <input
                className={`w-full h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl ${
                  isValidPassword ? "" : "border-red-500"
                }`}
                type="password"
                name="newPassword"
                placeholder="+8 characters"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </label>

            {!isValidPassword && (
              <p className="text-red-500 text-xl mt-2">
                {newPassword && !/[A-Z]/.test(newPassword) && (
                  <>
                    Upper case
                    <br />
                  </>
                )}
                {newPassword && !/[a-z]/.test(newPassword) && (
                  <>
                    {" "}
                    Lower case
                    <br />
                  </>
                )}
                {newPassword && !/[0-9]/.test(newPassword) && (
                  <>
                    {" "}
                    Numbers
                    <br />
                  </>
                )}
                {newPassword &&
                  /[-!"#$%&'()*+,.:;<=>?@[\\\]^_`{|}~]/.test(newPassword) && (
                    <>
                      No Special character
                      <br />
                    </>
                  )}
                {newPassword && newPassword.length < 8 && (
                  <> At least 8 characters</>
                )}
              </p>
            )}
            <label className="text-2xl my-2 font-normal">
              <div className="flex justify-between m-0">Confirm Password</div>
              <input
                className={`w-full h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl ${
                  passwordsMatch ? "" : "border-red-500"
                }`}
                type="password"
                name="confirmPassword"
                placeholder="Password again"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </label>
            {!passwordsMatch && (
              <p className="text-red-500 text-xl mt-2">
                Passwords do not match
              </p>
            )}
            <br />
            {/* <input
              className="bg-blue-900 text-white w-full h-16 border-2 rounded-xl text-2xl mt-4 mb-4"
              type="submit"
              value="Reset Password"
              disabled={!isFormValid}
            /> */}
            <input
              className={`bg-blue-900 text-white w-full h-16 border-2 rounded-xl text-2xl mt-4 mb-4 ${
                isFormValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              value="Next"
              disabled={!isFormValid}
            />
          </form>
        </div>
        <BottomSlideBar
          children="flex h-2 justify-center ml-8 mt-8"
          indexs={2}
        />
      </div>
    </div>
  );
}

export default ForgotThree;
