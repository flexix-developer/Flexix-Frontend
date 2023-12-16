import bgregister from "../images/Register-bg.png";
import NavBarHome from "../components/NavBarHome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleFnameChange = (event, setName, updateFormValidity) => {
    let newName = event.target.value;
    newName = newName.charAt(0).toUpperCase() + newName.slice(1);

    if (newName === "" || /^[A-Za-z-]+$/.test(newName)) {
      setName(newName);
      updateFormValidity();
      if (
        newName &&
        lname &&
        email &&
        password &&
        confirmPassword &&
        isValidEmail &&
        passwordsMatch
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  };

  const handleLnameChange = (event, setName, updateFormValidity) => {
    let newName = event.target.value;
    newName = newName.charAt(0).toUpperCase() + newName.slice(1);

    if (newName === "" || /^[A-Za-z-]+$/.test(newName)) {
      setName(newName);
      // console.log("New Name:", newName);
      updateFormValidity();
      if (
        newName &&
        fname &&
        email &&
        password &&
        confirmPassword &&
        isValidEmail &&
        passwordsMatch
      ) {
        // console.log("Name is not empty");
        setIsFormValid(true);
      } else {
        // console.log("Name is empty");
        setIsFormValid(false);
      }
    }
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
    updateFormValidity();
  };

  const isEmailValid = (email) => {
    // Regular Expression for email validation
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{1,})?$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Define your password criteria
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[-!"#$%&'()*+,.:;<=>?@[\\\]^_`{|}~]/;

    // Check if the password meets the criteria
    return (
      password.length >= minLength &&
      uppercaseRegex.test(password) &&
      digitRegex.test(password) &&
      !specialCharRegex.test(password)
    );
  };

  const handlePasswordChange = (event) => {
    console.log(password);
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Check password validity
    const isValidPassword = isPasswordValid(newPassword);
    setIsValidPassword(isValidPassword);
    const doPasswordsMatch = newPassword === confirmPassword;
    setPasswordsMatch(doPasswordsMatch);
    // Update isFormValid to true if all conditions are met
    updateFormValidity();
    if (
      isValidEmail &&
      isValidPassword &&
      doPasswordsMatch &&
      isPasswordValid(newPassword)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    const doPasswordsMatch = newConfirmPassword === password;
    setPasswordsMatch(doPasswordsMatch);
    updateFormValidity();
    if (doPasswordsMatch && isValidEmail && isPasswordValid(password)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const updateFormValidity = () => {
    const isValidForm =
      fname &&
      lname &&
      email &&
      password &&
      confirmPassword &&
      isValidEmail &&
      passwordsMatch;
    setIsFormValid(isValidForm);
  };

  const save = async (event) => {
    event.preventDefault();

    if (!passwordsMatch) {
      setPasswordsMatch(false);

      return;
    }
    if (
      !fname ||
      !lname ||
      !email ||
      !password ||
      !confirmPassword ||
      !isValidEmail
    ) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    try {
      // Your axios post request here...
      await axios.post("http://127.0.0.1:8000/register", {
        Fname: fname,
        Lname: lname,
        Email: email,
        Pass: password,
      });

      alert("Registration Successful");
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordsMatch(true);

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      alert("This Email is already in use.");
    }
  };

  return (
    <div className="h-screen">
      <NavBarHome />
      <div className="Container flex h-90/0">
        {/* Left content */}
        <div className="Left w-3/6 h-full flex items-center flex-col">
          <div className="h-10/12 w-10/12 mt-32">
            <img className="h-full " src={bgregister} alt="" />
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-semibold mt-10">
              What you'll enjoy:
            </span>
            <span className="text-2xl tracking-wide">
              <div className="my-2">
                - Free access to the FLEXiX platform
                <br />
              </div>
              <div className="my-2">
                - Access to templates, widgets, test API
                <br />
              </div>
              <div className="my-2">
                - Self-paced courses and certifications
                <br />
              </div>
            </span>
          </div>
        </div>

        {/* Right content */}
        <div className="Right w-3/5 h-full flex  items-center  ">
          <div className="Right-Content  mr-64 w-full h-5/6 flex  flex-col">
            <span className="text-5xl font-semibold mt-10">Sign Up</span>
            <form className="mt-8">
              <div className=" flex flex-row justify-between mb-2 ">
                <label className="text-2xl font-normal w-6/12 mr-4">
                  First Name
                  <br />
                  <input
                    className="w-full h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-xl"
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder="John"
                    value={fname}
                    onChange={(event) =>
                      handleFnameChange(event, setFname, updateFormValidity)
                    }
                    required
                  />
                </label>
                <label className="text-2xl font-normal w-6/12 ml-4">
                  Last Name
                  <br />
                  <input
                    className="w-full h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-xl"
                    type="text"
                    name="lname"
                    id="lname"
                    placeholder="Smith"
                    value={lname}
                    onChange={(event) =>
                      handleLnameChange(event, setLname, updateFormValidity)
                    }
                    required
                  />
                </label>
              </div>
              <label className="text-2xl font-normal">
                Email
                <input
                  className="w-full h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-xl"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john_smith@mail.com"
                  value={email}
                  required
                  onChange={handleEmailChange}
                />
              </label>
              {!isValidEmail && (
                <p className="text-red-500 text-xl mt-2">
                  Email does not match the required pattern!
                </p>
              )}
              <label className="text-2xl  font-normal">
                Password
                <input
                  className="w-full  h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-xl"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="+8 Character"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </label>
              {!isValidPassword && (
                <p className="text-red-500 text-xl mt-2">
                  {password && !/[A-Z]/.test(password) && (
                    <>
                      Upper case
                      <br />
                    </>
                  )}
                  {password && !/[a-z]/.test(password) && (
                    <>
                      {" "}
                      Lower case
                      <br />
                    </>
                  )}
                  {password && !/[0-9]/.test(password) && (
                    <>
                      {" "}
                      Numbers
                      <br />
                    </>
                  )}
                  {password &&
                    /[-!"#$%&'()*+,.:;<=>?@[\\\]^_`{|}~]/.test(password) && (
                      <>
                        No Special character
                        <br />
                      </>
                    )}
                  {password && password.length < 8 && (
                    <> At least 8 characters</>
                  )}
                </p>
              )}
              <label className="text-2xl  font-normal">
                Confirm Password
                <input
                  className="w-full  h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-xl"
                  type="password"
                  name="name"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  required
                  onChange={handleConfirmPasswordChange}
                />
              </label>
              {!passwordsMatch && (
                <p className="text-red-500 text-xl mt-2">
                  Passwords do not match!
                </p>
              )}
              <div className="w-full flex justify-center">
                <input
                  className={`bg-blue-900 text-white w-2/5 h-16 border-2 rounded-xl text-2xl mt-4 mb-4 ${
                    isFormValid ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  type="submit"
                  value="Next"
                  onClick={(event) => {
                    save(event);
                  }}
                  disabled={!isFormValid}
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
