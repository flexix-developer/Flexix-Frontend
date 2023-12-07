import NavBarHome from "../components/NavBarHome";
import platform from "../images/platform-begin.png";

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
                        <p>01 </p>
                        <p>Low-Code คืออะไร ?</p>
                    </div>
                    <div className="flex">
                        <p>02 </p>
                        <p>คุณสมบัติของ Low-Code ?</p>
                    </div>
                    <div className="flex">
                        <p>03 </p>
                        <p>ใครคือคนที่ต้องการ Low-Code ??</p>
                    </div>
                    <div className="flex">
                        <p>04 </p>
                        <p>Low-Code vs High Code</p>
                    </div>
                </div>
                <div className="m-10">
                    <img className="h-full" src={platform} alt="" />
                </div>
            </div>
            {/* section 2 */}
            <div className="flex justify-center  mt-auto">
                <div className="Left flex justify-center items-center bg-sky-400 w-3/12 h-80">
                    <div className="text-white  ">
                        <label className="text-4xl">Low-code</label> 
                        <br />
                        <label className="text-3xl">คืออะไร ?</label>
                    </div>
                </div>
                <div className="w-3/12 bg-gray-50 p-8 flex justify-center items-center">
                    <div>
                        <label className="font-bold">Low-code เป็นวิธีการพัฒนาแอปพลิเคชันที่ยกระดับ การเขียนโค้ดจากการใช้ข้อความไปสู่การใช้ส่วนกราฟิก</label>
                        <br /><br />
                        <label className=""><span className="text-blue-400 font-bold">Low-code</span> คือแพลตฟอร์มหรือเครื่องมือ ที่ช่วยให้นักพัฒนาสร้างแอปพลิเคชันโดยไม่ต้องเขียนโค้ดเต็มรูปแบบหรือเขียนน้อยมาก มันช่วยลดความซับซ้อนในการพัฒนาแอปพลิเคชันและทำให้การสร้างแอปพลิเคชันเร็วขึ้นและง่ายขึ้น</label>
                    </div>
                </div>
            </div>
            {/* section 3 */}
            <div className="flex justify-center mt-auto bg-gray-900">
                <div className="Left flex justify-center items-center bg-gray-900 w-3/12 h-80">
                    <div className="text-white  ">
                        <label className="text-4xl">คุณสมบัติของ</label> 
                        <br />
                        <label className="text-3xl">Low-code</label>
                    </div>
                </div>
                <div className="w-3/12 bg-gray-50 p-8 flex justify-center items-center">
                    <div>
                        <label className="font-bold">Low-code มีคุณสมบัติหลายอย่างที่ช่วยให้นักพัฒนาสามารถสร้างแอปพลิเคชันได้อย่างรวดเร็ว</label>
                        <br /><br />
                        <label className=""><span className="text-blue-400 font-bold"></span> การสร้างด้วยการลากและวาง (Drag-and-Drop) สามารถสร้าง UIและเพิ่มฟังก์ชันได้โดยใช้การลากและวางองค์ประกอบแบบกราฟิก ไม่ต้องเขียนโค้ดเข้าไปเองในกระบวนการนี้</label>
                    </div>
                </div>
            </div>
            {/* section 4 */}
            <div className="flex justify-center mt-auto bg-gray-900">
                <div className="Left flex justify-center items-center bg-sky-400 w-3/12 h-80">
                    <div className="text-white  ">
                        <label className="text-4xl">ใครคือคนที่ต้องการ </label> 
                        <br />
                        <label className="text-3xl">Low-code ?</label>
                    </div>
                </div>
                <div className="w-3/12 bg-gray-50 p-8 flex justify-center items-center">
                    <div>
                        <label className="font-bold">ในบทบาทของนักพัฒนาซอฟต์แวร์</label>
                        <br /><br />
                        <label className=""><span className="text-blue-400 font-bold">Low-code</span> เป็นเครื่องมือสำคัญในการเพิ่มความเร็วในการพัฒนาโปรแกรมและแอปพลิเคชันโดยช่วยให้ผู้พัฒนาสร้างแอปพลิเคชันได้อย่างง่ายและยืดหยุ่นสามารถเช่นเดียวกับการทำงานของนักพัฒนาซอฟต์แวร์เพิ่มประสิทธิภาพในการจัดการโปรเจกต์ของพวกเขาได</label>
                    </div>
                </div>
            </div>
            {/* section 5 */}
            <div className="flex justify-center mt-auto bg-gray-900">
                <div className="Left flex justify-center items-center bg-gray-900 w-3/12 h-80">
                    <div className="text-white  ">
                        <label className="text-4xl">Low-code</label> 
                        <br />
                        <label className="text-3xl">vs High code</label>
                    </div>
                </div>
                <div className="w-3/12 bg-gray-50 p-8 flex justify-center items-center">
                    <div>
                        <label className="font-bold">การพัฒนาแอปแบบ low-code และแบบเดิมแตกต่างกันอย่างไร</label>
                        <br /><br />
                        <label className=""><span className="text-blue-400 font-bold"></span> การพัฒนาแบบ low-code ต่างจากการพัฒนาแอปแบบเดิมๆ ที่ต้องเขียนโค้ดมาก โดย low-code ช่วยเพิ่มความสามารถในการสร้างแอปหรือเว็บไซต์ ให้กับผู้คนจำนวนมากโดยใช้ความรู้ขั้นต่ำและเครื่องมือง่าย. การพัฒนาแบบเดิมต้องอาศัยนักพัฒนามืออาชีพที่มีความเชี่ยวชาญในการเขียนโค้ดด้วยตนเอง</label>
                    </div>
                </div>
            </div>
        </div> 
    );
  };
  
  export default RegisterPage;