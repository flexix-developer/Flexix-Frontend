import { PiPlugsConnectedBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

const OnClickActionPopUp = ({ handleClosePopupEditAction }) => {
  const [testConnect, setTestConnect] = useState(null);
  const [Method, setMethod] = useState(["GET", "POST", "PUT", "DELETE"]);
  const [Auth, setAuth] = useState([
    "Basic Auth",
    "Bearer Token",
    "JWT Token",
    "OAuth2.0",
    "API Key",
    "No Auth",
  ]);
  const overflowRef = useRef(null); // Ref สำหรับ div ที่ต้องการตรวจสอบ
  const [isOverflow, setIsOverflow] = useState(false);

  const [rows, setRows] = useState([
    { param: "", dataFromID: "", testData: "" },
  ]);

  const addRow = () => {
    const newRow = { param: "", dataFromID: "", testData: "" };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  useEffect(() => {
    const checkOverflow = () => {
      const current = overflowRef.current;
      // ตรวจสอบการ overflow
      const isOverflowing = current.scrollHeight > current.clientHeight;
      setIsOverflow(isOverflowing);
    };

    checkOverflow();
    // ตั้งค่า event listener ถ้าคุณต้องการตรวจสอบการเปลี่ยนแปลงขนาดใน real-time
  }, [rows]); // อาจต้องการใส่ dependencies ถ้า rows เปลี่ยนแปลง

  return (
    <div className="bg-[#272727] p-4 w-5/12 max-h-[600px]  pb-10  rounded-lg z-100">
      <div className="flex w-full justify-end">
        <IoMdClose
          className="text-3xl text-red-500"
          onClick={handleClosePopupEditAction}
        />
      </div>

      <div className="text-white w-full flex justify-center items-center flex-col ">
        <div className="flex justify-center ite">
          <span className="text-3xl font-bold">OnClick API Data Source</span>
        </div>
        <div className="w-4/5 mt-2 flex  items-end justify-between">
          <div className="w-[20%]">
            <span className="text-xl">Method</span>

            <Select
              options={Method.map((item) => ({ value: item, label: item }))}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#595959",
                  color: "white",
                  // คุณอาจจะต้องการปรับแต่งสไตล์อื่นๆ ที่นี่
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "#595959",
                  // สำหรับเมนูดร็อปดาวน์
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#424242" : "#595959",
                  color: "white",
                  // สำหรับตัวเลือกภายในเมนู
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                // คุณสามารถเพิ่มการปรับแต่งสำหรับส่วนอื่นๆ ที่ต้องการ
              }}
            ></Select>
          </div>
          <div className="flex flex-col  w-[65%]">
            <span className="text-xl">API</span>
            <input
              id="apiInput"
              className="w-full bg-[#595959] rounded-sm ps-2 h-[38px]"
            />
          </div>
          <div className="h-[38px]">
            <button className="bg-[#595959] w-12 rounded-sm h-full">
              <PiPlugsConnectedBold className="w-full h-6" />
            </button>
          </div>
        </div>
        <div className="w-4/5 mt-2 ">
          {testConnect === true && (
            <span className="text-[#42FF00]">Connect 200 Ok</span>
          )}
          {testConnect === false && (
            <span className="text-[#FF0000]">Connect Failed</span>
          )}
          {testConnect === null && (
            <span className="text-[#FFFFFF]">Wait...</span>
          )}
        </div>
        <div className="w-4/5 mt-2 flex  items-end justify-between">
          <div className="w-[20%]">
            <span className="text-xl">Auth</span>

            <Select
              className=""
              options={Auth.map((item) => ({ value: item, label: item }))}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#595959",
                  color: "white",
                  // คุณอาจจะต้องการปรับแต่งสไตล์อื่นๆ ที่นี่
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "#595959",
                  // สำหรับเมนูดร็อปดาวน์
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#424242" : "#595959",
                  color: "white",
                  // สำหรับตัวเลือกภายในเมนู
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                // คุณสามารถเพิ่มการปรับแต่งสำหรับส่วนอื่นๆ ที่ต้องการ
              }}
            ></Select>
          </div>
          <div className="flex flex-col  w-[30%]">
            <span className="text-xl">Data From ID</span>
            <input
              id="apiInput"
              className="w-full bg-[#595959] rounded-sm ps-2 h-[38px]"
            />
          </div>
          <div className="flex flex-col  w-[30%]">
            <span className="text-xl">TestData</span>
            <input
              id="apiInput"
              className="w-full bg-[#595959] rounded-sm ps-2 h-[38px]"
            />
          </div>
          <div className="h-[38px] w-12"></div>
        </div>
        <div
          className="w-4/5 max-h-[250px] overflow-y-auto"
          id="over"
          ref={overflowRef}
        >
          {rows.map((row, index) => (
            <div className="w-full mt-2 flex  items-end justify-between ">
              {/* <div className="w-[20.5%] "> */}
              <div className={isOverflow ? "w-[20.5%]" : "w-[20%]"}>
                <span className="text-xl">Param</span>
                <input
                  className="w-full bg-[#595959] rounded-sm ps-2 h-[38px]"
                  value={row.param}
                  onChange={(e) =>
                    handleInputChange(index, "param", e.target.value)
                  }
                />
              </div>
              <div
                className={
                  !isOverflow
                    ? "flex flex-col w-[30%] "
                    : "flex flex-col w-[30.5%] ml-3"
                }
              >
                <span className="text-xl">Data From ID</span>
                <input
                  className="w-full bg-[#595959] rounded-sm ps-2 h-[38px]"
                  value={row.dataFromID}
                  onChange={(e) =>
                    handleInputChange(index, "dataFromID", e.target.value)
                  }
                />
              </div>
              <div
                className={
                  !isOverflow
                    ? "flex flex-col w-[30%] "
                    : "flex flex-col w-[30.5%] ml-3"
                }
              >
                <span className="text-xl">TestData</span>
                <input
                  className="w-full bg-[#595959] rounded-sm ps-2 h-[38px]"
                  value={row.testData}
                  onChange={(e) =>
                    handleInputChange(index, "testData", e.target.value)
                  }
                />
              </div>
              {/* เพิ่ม div นี้หากไม่ใช่แถวสุดท้าย */}
              {index !== rows.length - 1 && (
                <div className="h-[38px] w-12"></div>
              )}
              {/* แสดงปุ่มเฉพาะในแถวสุดท้าย */}
              {index === rows.length - 1 && (
                <div className="h-[38px]">
                  <button
                    onClick={addRow}
                    className="bg-[#595959] w-12 rounded-sm h-full"
                  >
                    <IoMdAdd className="w-full h-6" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-4/5 mt-2">
          <button className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnClickActionPopUp;
