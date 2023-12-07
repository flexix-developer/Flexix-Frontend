import NavBarHome from "../components/NavBarHome";
import platform from "../images/platform-begin.png";
import { TbSquareNumber1 } from "react-icons/tb";
import { TbSquareNumber2 } from "react-icons/tb";
import { TbSquareNumber3 } from "react-icons/tb";
import { TbSquareNumber4 } from "react-icons/tb";

const RegisterPage = () => {
    return (
        <div className="h-screen bg-gray-900 ">
            <NavBarHome />
            <div className="bg-gray-900 flex justify-center mt-auto mb-10">
                <span className="text-white text-3xl font-semibold">
                    Platform
                </span>
            </div>
            <div className="flex bg-gray-900 justify-center ">
                <div className="Left grid gap-4 grid-cols-1  text-white text-1xl font-bold m-10">
                    <p className="text-3xl ">การพัฒนาแบบ Low-code</p>
                    <div className="flex">
                        <p className="text-2xl"><TbSquareNumber1 /> </p>
                        <p>&nbsp; &nbsp;Low-Code คืออะไร ?</p>
                    </div>
                    <div className="flex">
                        <p className="text-2xl"><TbSquareNumber2 /></p>
                        <p> &nbsp; &nbsp;คุณสมบัติของ Low-Code ?</p>
                    </div>
                    <div className="flex">
                    <p className="text-2xl"><TbSquareNumber3 /></p>
                        <p>&nbsp; &nbsp;ใครคือคนที่ต้องการ Low-Code ??</p>
                    </div>
                    <div className="flex">
                    <p className="text-2xl"><TbSquareNumber4 /></p>
                        <p>&nbsp; &nbsp;Low-Code vs High Code</p>
                    </div>
                </div>
                <div className="m-10">
                    <img className="h-full" src={platform} alt="" />
                </div>
            </div>
            {/* section 2 */}
            <div className="flex justify-center mt-auto h-2/4 bg-gray-900">
                <div className="Left flex justify-center items-center bg-sky-400 w-5/12">
                    <div className="text-white mr-20 pl-3">
                        <label className="text-6xl ">Low-code</label> 
                        <br />
                        <label className="text-5xl">คืออะไร ?</label>
                    </div>
                </div>
                <div className="w-5/12 bg-gray-50 p-8 flex justify-center items-center">
                    <div>
                        <label className="font-bold text-3xl">Low-code เป็นวิธีการพัฒนาแอปพลิเคชันที่ยกระดับ การเขียนโค้ดจากการใช้ข้อความไปสู่การใช้ส่วนกราฟิก</label>
                        <br /><br />
                        <label className="text-2xl"><span className="text-blue-400 font-bold ">Low-code</span> คือแพลตฟอร์มหรือเครื่องมือ ที่ช่วยให้นักพัฒนาสร้างแอปพลิเคชันโดยไม่ต้องเขียนโค้ดเต็มรูปแบบหรือเขียนน้อยมาก มันช่วยลดความซับซ้อนในการพัฒนาแอปพลิเคชันและทำให้การสร้างแอปพลิเคชันเร็วขึ้นและง่ายขึ้น</label>
                    </div>
                </div>
            </div>
            {/* section 3 */}
            <div className="flex justify-center mt-auto bg-gray-900 h-2/4">
                <div className="Left flex justify-center items-center bg-gray-900 w-5/12">
                    <div className="text-white">
                        <label className="text-6xl">คุณสมบัติของ</label> 
                        <br />
                        <label className="text-5xl">Low-code</label>
                    </div>
                </div>
                <div className="w-5/12 bg-gray-50 p-8 flex justify-center items-center">
                    <div>
                        <label className="font-bold text-3xl">Low-code มีคุณสมบัติหลายอย่างที่ช่วยให้นักพัฒนาสามารถสร้างแอปพลิเคชันได้อย่างรวดเร็ว</label>
                        <br /><br />
                        <label className="text-2xl"><span className="text-blue-400 font-bold"></span> การสร้างด้วยการลากและวาง (Drag-and-Drop) สามารถสร้าง UIและเพิ่มฟังก์ชันได้โดยใช้การลากและวางองค์ประกอบแบบกราฟิก ไม่ต้องเขียนโค้ดเข้าไปเองในกระบวนการนี้</label>
                    </div>
                </div>
            </div>
            {/* section 4 */}
            <div className="flex justify-center mt-auto bg-gray-900 h-2/4">
                <div className="Left flex justify-center items-center bg-sky-400 w-5/12">
                    <div className="text-white ml-28 pl-4">
                        <label className="text-6xl">ใครคือคนที่ต้องการ </label> 
                        <br />
                        <label className="text-5xl">Low-code ?</label>
                    </div>
                </div>
                <div className="w-5/12 bg-gray-50 p-8 flex justify-center items-center">
                    <div>
                        <label className="font-bold text-3xl">ในบทบาทของนักพัฒนาซอฟต์แวร์</label>
                        <br /><br />
                        <label className="text-2xl"><span className="text-blue-400 font-bold">Low-code</span> เป็นเครื่องมือสำคัญในการเพิ่มความเร็วในการพัฒนาโปรแกรมและแอปพลิเคชันโดยช่วยให้ผู้พัฒนาสร้างแอปพลิเคชันได้อย่างง่ายและยืดหยุ่นสามารถเช่นเดียวกับการทำงานของนักพัฒนาซอฟต์แวร์เพิ่มประสิทธิภาพในการจัดการโปรเจกต์ของพวกเขาได</label>
                    </div>
                </div>
            </div>
            {/* section 5 */}
            <div className="flex justify-center mt-auto bg-gray-900 h-2/4">
                <div className="Left flex justify-center items-center bg-gray-900 w-5/12">
                    <div className="text-white mr-20 pl-1">
                        <label className="text-6xl">Low-code</label> 
                        <br />
                        <label className="text-5xl">vs High code</label>
                    </div>
                </div>
                <div className="w-5/12 bg-gray-50 p-8 flex justify-center items-center">
                    <div>
                        <label className="font-bold text-3xl">การพัฒนาแอปแบบ low-code และแบบเดิมแตกต่างกันอย่างไร</label>
                        <br /><br />
                        <label className="text-2xl"><span className="text-blue-400 font-bold"></span> การพัฒนาแบบ low-code ต่างจากการพัฒนาแอปแบบเดิมๆ ที่ต้องเขียนโค้ดมาก โดย low-code ช่วยเพิ่มความสามารถในการสร้างแอปหรือเว็บไซต์ ให้กับผู้คนจำนวนมากโดยใช้ความรู้ขั้นต่ำและเครื่องมือง่าย. การพัฒนาแบบเดิมต้องอาศัยนักพัฒนามืออาชีพที่มีความเชี่ยวชาญในการเขียนโค้ดด้วยตนเอง</label>
                    </div>
                </div>
            </div>
        </div> 
    );
  };
  
  export default RegisterPage;