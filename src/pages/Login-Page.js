import NavBar from "../components/navbar/NavBar";
import bglogin from "../assets/images/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import useTokenCheck from "../components/useTokenCheck/useTokenCheck";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useTokenCheck("/workspace");

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;

    if (newEmail === "" || /^[A-Za-z0-9._%+-@]+$/.test(newEmail)) {
      setEmail(newEmail);
    }
  };

  const handlePassChange = (event) => {
    const newPass = event.target.value;
    setPassword(newPass);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8081/login", {
        email: email,
        pass: password,
      });

      const { status, message, token, ID } = response.data;

      if (status === "ok") {
        // ลงทะเบียนสำเร็จ - ทำตามที่คุณต้องการที่นี่
        localStorage.setItem("token", token);
        localStorage.setItem("ID", ID);
        // console.log("Login Success", message);
        // console.log("Token:", token);
        // console.log("Token In Local", localStorage.getItem("token"));
        alert("Login Success!");
        navigate("/workspace");
      } else {
        // ลงทะเบียนไม่สำเร็จ
        console.error("Login Failed", message);
        alert("Email or Password Invalid");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };
  return (
    <div className="h-screen">
      <NavBar />
      <div className="Container flex h-90/0">
        <div className="Left w-2/5 h-full flex justify-center items-center">
          <img className="h-full" src={bglogin} alt="" />
        </div>
        <div className="Right w-3/5 h-full flex  items-center  ">
          <div className="Right-Content mx-24 mr-80 w-full h-5/6 flex  flex-col">
            <span className="text-5xl font-semibold mt-20">
              Sign in to FLEXiX
            </span>
            <form
              className="mt-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <label className="text-2xl font-normal">
                Email
                <br />
                <input
                  className="w-full h-14 border rounded-xl border-slate-950 my-2 mb-6 text-left px-4 py-1 text-3xl"
                  type="text"
                  name="email"
                  value={email}
                  required
                  onChange={handleEmailChange}
                />
              </label>
              <br />
              <label className="text-2xl my-2 font-normal">
                <div className="flex justify-between m-0">
                  Password
                  <Link to="/forgot">
                    <p className="text-blue-800">Forgot password? </p>
                  </Link>
                </div>
                <input
                  className="w-full  h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl"
                  type="password"
                  name="password"
                  value={password}
                  required
                  onChange={handlePassChange}
                />
              </label>
              <br />
              <input
                className="bg-blue-900 text-white w-full  h-16 border-2 rounded-xl text-2xl mt-4 mb-4"
                type="submit"
                name="sign_in"
                value="Sign in"
              />
            </form>
            <span className="ml-2 text-xl">
              Don't have an account ?{" "}
              <a className="text-blue-700" href="/register">
                Sign Up.
              </a>
            </span>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
