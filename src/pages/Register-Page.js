import register from "../images/login-bg.png";
import NavBarHome from "../components/NavBarHome";
// import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <div className="h-screen">
          <NavBarHome />
          <div className="Container flex">
                <div className="Left w-2/5 flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center">
                        <img className="h-full" src={register} alt="" />
                        <label className="">
                            What you'll enjoy:
                            <br />
                            - Free access to the FLEXiX platfrom
                            <br />
                            - Access to template, widgets, test API 
                            <br />
                            - Self-paced courses and certifications
                            <br />
                        </label>
                    </div>
                </div>
            <div className="Right w-3/5 h-full flex ">
                <div className="Right-Content w-full h-5/6 flex flex-col justify-center items-center">
                    <span className="text-5xl font-semibold mt-20 mb-10 mr-32">
                        Sign up to FLEXiX
                    </span>
                    <form>
                        <div>
                            <div className="flex mb-6">
                                <div className="">
                                    <label>First name</label>
                                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 " placeholder="John" required />
                                </div>
                                <div className="">
                                    <label>Last name</label>
                                    <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5" placeholder="Smith" required />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label>E-mail</label>
                                <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5    " placeholder="john_smith@mail.com" required />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label>Password</label>
                                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="+8 character" required />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label>Confirm Password</label>
                                <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="Confirm passoword" required />
                            </div>
                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50" required />
                                </div>
                                <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with to <a href="/loing" className="text-blue-600 hover:underline dark:text-blue-500">FLEXiX Privacy Policy </a>.</label>
                            </div>
                            <div className="flex items-start mb-6 ">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50" required />
                                </div>
                                <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I would like to receive communication from FLEXiX via email</label>
                            </div>
                            <div className="flex flex-col items-center">
                                <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-64 px-5 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Already have an account? <a href="/login" className="text-blue-600 hover:underline dark:text-blue-500">Sign in</a></label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
    );
  };
  
  export default RegisterPage;
  