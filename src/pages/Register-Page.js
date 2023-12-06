import register from "../images/register-bg.png";
import NavBarHome from "../components/NavBarHome";
import { Link } from 'react-router-dom';

/** 
 * TODO: Create Register page before 2 am.
 */
const RegisterPage = () => {
    return (
        <div className="h-screen ">
            <NavBarHome />
            <div className="flex justify-center items-center h-90/0 ">
                <div className="Left w-2/5 h-full flex justify-center items-center">
                    <img className="h-full" src={register} alt="" />
                </div>
                <div className="Right w-3/5 h-full flex ">
                    <div className="Right-Content mx-24 mr-80 w-full h-5/6 flex  flex-col">
                        <span className="text-3xl font-semibold mt-20">
                            Sign Up
                        </span>
                        {/* columnclass */}
                        <div className="mt-8 items-center">
                            <div>
                                <form>
                                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                        </div>
                                        <div>
                                            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Smith" required />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.smith@mail.com" required />
                                    </div> 
                                    <div className="mb-6">
                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="8+ Characters" required />
                                    </div> 
                                    <div className="mb-6">
                                        <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password again" required />
                                    </div> 
                                    <div className="flex items-start mb-6">
                                        <div className="flex items-center h-5">
                                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                        </div>
                                        <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with to <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">FLEXiX Privacy Policy </a>.</label>
                                    </div>
                                    <div className="flex items-start mb-6">
                                        <div className="flex items-center h-5">
                                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                        </div>
                                        <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I would like to receive communication from FLEXiX via email</label>
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-64 w-full px-5 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Already have an account? <a href="/login" className="text-blue-600 hover:underline dark:text-blue-500">Sign in</a></label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
  };
  
  export default RegisterPage;
  