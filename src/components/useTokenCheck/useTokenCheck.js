// // useTokenCheck.js
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const useTokenCheck = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       // ถ้าไม่มี token ให้ redirect ไปที่หน้า login
//       navigate("/login");
//     } else {
//       navigate("/workspace");
//     }
//   }, [navigate]);
// };

// export default useTokenCheck;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenCheck = (redirectPath) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // ถ้าไม่มี token ให้ redirect ไปที่หน้าที่กำหนด
      navigate(redirectPath);
    } else {
      navigate("/workspace");
    }
  }, [navigate, redirectPath]);
};

export default useTokenCheck;
