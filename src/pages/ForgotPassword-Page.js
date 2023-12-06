import NavBar from "../components/NavBar";
import ForgotOne from "../components/ForgotOne";
import bglogin from "../images/login-bg.png";

function ForgotPasswordPage() {
  return (
    <div className="h-screen">
      <NavBar />
      <div className="Container flex h-90/0 ">
        <div className="Left w-2/5 h-full flex justify-center items-center">
          <img className="h-full" src={bglogin} alt="" />
        </div>
        <ForgotOne />
      </div>
    </div>
  );
}
export default ForgotPasswordPage;
