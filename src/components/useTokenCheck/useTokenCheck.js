// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const useTokenCheck = (redirectPath) => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       // ถ้าไม่มี token ให้ redirect ไปที่หน้าที่กำหนด
//       navigate(redirectPath);
//     } else {
//       navigate("/login");
//     }
//   }, [navigate, redirectPath]);
// };

// export default useTokenCheck;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenCheck = (redirectPath) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // ถ้าไม่มี token ให้ไม่ redirect ไปที่หน้า login
      return;
    }

    // ถ้ามี token ให้ redirect ไปที่หน้าที่กำหนด
    navigate(redirectPath);
  }, [navigate, redirectPath]);
};

export default useTokenCheck;
