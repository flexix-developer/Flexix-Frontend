import BottomSlideBar from "./BottomSlideBar";
import { useNavigate } from "react-router-dom";
function ForgotThree() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // ทำตรวจสอบหรือการทำงานที่ต้องการก่อน

    // เปลี่ยนเส้นทางไปที่หน้า Login
    navigate("/login");
  };

  return (
    <div className="Right w-3/5 h-full flex  items-center  ">
      <div className="h-full flex flex-col">
        <div className="Right-Content mx-24 mr-80 w-10/12 h-5/6 flex flex-col justify-center mb-24">
          <span className="text-5xl font-semibold mt-20">Set new password</span>
          <form className="mt-8" onSubmit={handleSubmit}>
            <label className="text-2xl font-normal">
              New Password
              <br />
              <input
                className="w-full h-14 border rounded-xl border-slate-950 my-2 mb-6 text-left px-4 py-1 text-3xl"
                type="password"
                name="name"
                placeholder="+6 character"
              />
            </label>
            <br />
            <label className="text-2xl my-2 font-normal">
              <div className="flex justify-between m-0">Confirm Password</div>
              <input
                className="w-full  h-14 border rounded-xl border-slate-950 my-2 text-left px-4 py-1 text-3xl "
                type="password"
                name="name"
                placeholder="Password again"
              />
            </label>
            <br />
            <input
              className="bg-blue-900 text-white w-full  h-16 border-2 rounded-xl text-2xl mt-4 mb-4"
              type="submit"
              value="Reset Password"
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
