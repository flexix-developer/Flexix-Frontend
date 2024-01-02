// import NavBar from "../components/NavBar";
// import ForgotOne from "../components/ForgotOne";
// import ForgotTwo from "../components/ForgotTwo";
// import ForgotThree from "../components/ForgotThree";
// import bglogin from "../assets/images/login-bg.png";
// import React, { useState } from "react";

// function ForgotPasswordPage() {
//   const [currentStep, setCurrentStep] = useState(1);

//   const handleNextStep = () => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

//   const renderComponent = () => {
//     switch (currentStep) {
//       case 1:
//         return <ForgotOne onNextStep={handleNextStep} />;
//       case 2:
//         return <ForgotTwo onNextStep={handleNextStep} />;
//       case 3:
//         return <ForgotThree />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="h-screen">
//       <NavBar />
//       <div className="Container flex h-90/0 ">
//         <div className="Left w-2/5 h-full flex justify-center items-center">
//           <img className="h-full" src={bglogin} alt="" />
//         </div>
//         {renderComponent()}
//       </div>
//     </div>
//   );
// }

// export default ForgotPasswordPage;

import React, { useState } from "react";
import NavBar from "../components/navbar/NavBar";
import ForgotOne from "../components/forgot/ForgotOne";
import ForgotTwo from "../components/forgot/ForgotTwo";
import ForgotThree from "../components/forgot/ForgotThree";
import { AuthProvider } from "../contexts/AuthContext";
import bglogin from "../assets/images/login-bg.png";
// import useTokenCheckForgot from "../components/useTokenCheck/useTokenCheckForgot";
import useTokenCheck from "../components/useTokenCheck/useTokenCheck";

function ForgotPasswordPage() {
  // useTokenCheckForgot();
  useTokenCheck("/forgot");
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const renderComponent = () => {
    switch (currentStep) {
      case 1:
        return <ForgotOne onNextStep={handleNextStep} />;
      case 2:
        return <ForgotTwo onNextStep={handleNextStep} />;
      case 3:
        return <ForgotThree />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen">
      <NavBar />

      <AuthProvider>
        {/* <div className="Container flex h-90/0 ">{renderComponent()}</div> */}

        <div className="Container flex h-90/0 ">
          <div className="Left w-2/5 h-full flex justify-center items-center">
            <img className="h-full" src={bglogin} alt="" />
          </div>
          {renderComponent()}
        </div>
      </AuthProvider>
    </div>
  );
}

export default ForgotPasswordPage;
