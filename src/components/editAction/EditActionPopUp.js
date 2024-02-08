import { PiPlugsConnectedBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

const EditActionPopUp = ({ handleClosePopupEditAction }) => {
  const [apiInputValue, setApiInputValue] = useState("");
  const [testConnect, setTestConnect] = useState(null); // State to track selected event option
  const [headOptions, setHeadOptions] = useState([]);
  const [eventOptions, setEventOptions] = useState([]);
  const [selectedHead, setSelectedHead] = useState(null); // State to track selected event option
  const [responseAPI, setResponseAPI] = useState(null); // State to track selected event option

  const { counter } = useSelector((state) => state);
  const { value: sanitizedHTML } = counter;
  const { currentFocus: currentFocus } = counter;
  const { currentFocusElement: currentFocusElement } = counter;

  const [elements, setElements] = useState([
    { options: [], selectedOption: null },
  ]);

  const createEventOptions = (data) => {
    return Object.keys(data).map((key) => ({
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    }));
  };

  const handleHeadChange = (selectedOption) => {
    setSelectedHead(selectedOption);
    // console.log("Selected event:", selectedOption.value);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลง Event
  };

  const handleTestConnect = async () => {
    try {
      //   const response = await axios.get(`${apiInputValue}`);
      const response = await axios.get(`http://127.0.0.1:8082/getallcategory`);
      setTestConnect(true);
      //   console.log("Success");
      const newHeadOptions = createEventOptions(response.data);
      setResponseAPI(response.data);
      setHeadOptions(newHeadOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTestConnect(false);
    }
  };

  const handleInputChange = (event) => {
    setApiInputValue(event.target.value);
  };

  useEffect(() => {
    if (selectedHead && responseAPI && responseAPI[selectedHead.value]) {
      handleSelectHead();
    }
  }, [selectedHead, responseAPI]); // ตอบสนองต่อการเปลี่ยนแปลงของ selectedHead และ responseAPI

  const handleSelectHead = () => {
    // ตรวจสอบว่า selectedHead มีค่าหรือไม่
    if (selectedHead && responseAPI[selectedHead.value]) {
      // เข้าถึงข้อมูลตาม key ที่เลือกจาก selectedHead
      const dataToProcess = responseAPI[selectedHead.value];

      if (typeof dataToProcess === "object") {
        // สมมติว่า dataToProcess เป็น object หรือ array ของ objects
        const newEventOptions = Array.isArray(dataToProcess)
          ? dataToProcess.reduce((acc, current) => {
              // หากเป็น array, สร้าง options จาก keys ของ object แต่ละตัวใน array
              Object.keys(current).forEach((key) => {
                // เพิ่ม key ใหม่หากยังไม่มีใน acc
                if (!acc.find((option) => option.value === key)) {
                  acc.push({
                    value: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                  });
                }
              });
              return acc;
            }, [])
          : Object.keys(dataToProcess).map((key) => ({
              // หากเป็น object, สร้าง options จาก keys
              value: key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
            }));

        setEventOptions(newEventOptions);
      } else {
        // หากไม่เป็น object หรือ array, ไม่ต้องดำเนินการ
        console.log("Selected head does not contain object/array data");
        setEventOptions([]);
      }
    } else {
      console.log("Selected head is null or does not exist in response data");
      setEventOptions([]);
    }
  };
  const addElement = () => {
    setElements([...elements, { options: [], selectedOption: null }]);
  };

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงเลือกของ Select
  const handleSelectChange = (selectedOption, index) => {
    const newElements = elements.slice(); // คัดลอก array
    newElements[index].selectedOption = selectedOption; // อัปเดต selectedOption
    setElements(newElements); // อัปเดต state
  };
  const [selectedElement, setSelectedElement] = useState(null);
  const [elementOptions, setElementOptions] = useState([]);

  useEffect(() => {
    // สมมติว่า sanitizedHTML เป็น string HTML
    const htmlString = sanitizedHTML; // จาก state Redux ของคุณ

    // ใช้ DOMParser เพื่อแปลง string เป็น DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // ค้นหา container ที่มี id เป็น 'row-6'
    const selectD = doc.querySelector(`${currentFocus}`);

    // ตรวจสอบว่า row6 ไม่เป็น null
    if (selectD) {
      // ค้นหาทุก elements ภายใน row6 ที่มี id attribute
      const allElements = selectD.querySelectorAll("[id]");
      const options = Array.from(allElements).map((el) => ({
        value: el.id,
        label: el.id,
      }));
      setElementOptions(options);
    } else {
      // ถ้าไม่พบ row6, ตั้ง options เป็น array ว่าง
      setElementOptions([]);
    }
  }, [sanitizedHTML]); // เพิ่ม sanitizedHTML เป็น dependency เพื่อให้ useEffect ทำงานอีกครั้งเมื่อ sanitizedHTML มีการเปลี่ยนแปลง

  const handleChange = (selectedOption) => {
    setSelectedElement(selectedOption);
    console.log("Selected:", selectedOption);
  };

  return (
    <div className="bg-[#272727] p-4 w-5/12  pb-10  rounded-lg">
      <div className="flex w-full justify-end">
        <IoMdClose
          className="text-3xl text-red-500"
          onClick={handleClosePopupEditAction}
        />
      </div>
      <div className="text-white w-full flex justify-center items-center flex-col ">
        <div className="flex justify-center ite">
          <span className="text-3xl font-bold">New API Data Source</span>
        </div>
        <div className="w-4/5 mt-2 flex flex-col  ">
          <span className="text-xl">API</span>
          <div className="w-full flex justify-between h-10 mt-1">
            <input
              id="apiInput"
              value={apiInputValue}
              onChange={handleInputChange} // อัปเดต state ทุกครั้งที่มีการพิมพ
              className="w-10/12 bg-[#595959] rounded-sm ps-2"
            />
            <button
              className="bg-[#595959] w-12 rounded-sm"
              onClick={handleTestConnect}
            >
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
        <div className="w-4/5 mt-2 flex flex-col ">
          <div className="w-full flex justify-between  ">
            <div className="flex flex-col items-start ">
              <span className="text-xl ">Head Key</span>

              <Select
                options={headOptions}
                className="text-md text-black rounded-sm w-56 mt-1"
                onChange={handleHeadChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "#595959",
                    color: "white",
                    // คุณอาจจะต้องการปรับแต่งสไตล์อื่นๆ ที่นี่
                  }),
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
              />
            </div>
          </div>
        </div>
        <div className="w-4/5 mt-2 flex flex-col">
          {elements.map((element, index) => (
            <div key={`element-${index}`} className="flex justify-between">
              <div
                key={index}
                className="flex w-10/12 justify-between items-center"
              >
                {/*Element*/}
                <div className="flex flex-col">
                  <span className="text-xl">Element</span>
                  <Select
                    options={elementOptions}
                    value={selectedElement}
                    onChange={handleChange}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "#595959",
                        color: "white",
                        // คุณอาจจะต้องการปรับแต่งสไตล์อื่นๆ ที่นี่
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: "#595959",
                        // สำหรับเมนูดร็อปดาวน์
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? "#424242"
                          : "#595959",
                        color: "white",
                        // สำหรับตัวเลือกภายในเมนู
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "white",
                      }),
                      // คุณสามารถเพิ่มการปรับแต่งสำหรับส่วนอื่นๆ ที่ต้องการ
                    }}
                    className="text-md text-black rounded-sm w-56 mt-1"
                    // styles ของคุณที่นี่
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl">Json API</span>
                  <Select
                    options={eventOptions}
                    value={element.selectedOption}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, index)
                    }
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "#595959",
                        color: "white",
                        // คุณอาจจะต้องการปรับแต่งสไตล์อื่นๆ ที่นี่
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: "#595959",
                        // สำหรับเมนูดร็อปดาวน์
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? "#424242"
                          : "#595959",
                        color: "white",
                        // สำหรับตัวเลือกภายในเมนู
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "white",
                      }),
                      // คุณสามารถเพิ่มการปรับแต่งสำหรับส่วนอื่นๆ ที่ต้องการ
                    }}
                    className="text-md text-black rounded-sm w-56 mt-1"
                    // styles ของคุณที่นี่
                  />
                </div>
                {/* แสดงปุ่มเฉพาะใน element สุดท้าย */}
              </div>
              {index === elements.length - 1 && (
                <div className=" flex items-end ">
                  <button
                    onClick={addElement}
                    className=" bg-[#595959] w-12 rounded-sm h-10 flex-shrink-0"
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

export default EditActionPopUp;
