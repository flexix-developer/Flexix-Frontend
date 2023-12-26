import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useTokenCheckLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // ถ้าไม่มี token ให้ redirect ไปที่หน้า login
      navigate("/");
    } else {
      navigate("/workspace");
    }
  }, [navigate]);
};

export default useTokenCheckLogin;
