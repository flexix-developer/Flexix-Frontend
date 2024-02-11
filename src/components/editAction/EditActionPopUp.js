import { PiPlugsConnectedBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

const EditActionPopUp = ({ handleClosePopupEditAction, lastSelect }) => {
  console.log("lastSelect", lastSelect);
  const [apiInputValue, setApiInputValue] = useState("");
  const [testConnect, setTestConnect] = useState(null); // State to track selected event option
  const [eventOptions, setEventOptions] = useState([]);
  const [responseAPI, setResponseAPI] = useState(null); // State to track selected event option

  const { counter } = useSelector((state) => state);
  const { value: sanitizedHTML } = counter;
  const { currentFocus: currentFocus } = counter;
  const { currentFocusElement: currentFocusElement } = counter;

  const [elements, setElements] = useState([
    { eventOptionSelected: null, elementOptionSelected: null },
  ]);

  const handleTestConnect = async () => {
    try {
      // const response = await axios.get(`${apiInputValue}`);
      setApiInputValue("http://127.0.0.1:5000/api");
      const response = await axios.get(`http://127.0.0.1:5000/api`);
      setTestConnect(true);
      console.log("response.data", response.data);
      setResponseAPI(response.data);

      // สร้าง options สำหรับ Select จาก key ของข้อมูลแรก (หรือข้อมูลอื่นตามที่ต้องการ)
      const sampleData = response.data[0] || {}; // ใช้ข้อมูลแรกเป็นตัวอย่าง
      const keysOptions = Object.keys(sampleData).map((key) => ({
        value: key,
        label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
      }));

      // อัพเดท state ของ eventOptions ด้วย keysOptions ที่สร้างขึ้น
      setEventOptions(keysOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTestConnect(false);
      setEventOptions([]);
    }
  };

  const handleInputChange = (event) => {
    setApiInputValue(event.target.value);
  };

  const addElement = () => {
    setElements([...elements, { options: [], selectedOption: null }]);
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

  const handleSelectChange = (selectedOption, index) => {
    const newElements = [...elements];
    newElements[index].eventOptionSelected = selectedOption;
    setElements(newElements);
  };

  // สำหรับการเปลี่ยนแปลงที่เกี่ยวข้องกับ element options
  const handleSelectElementChange = (selectedOption, index) => {
    const newElements = [...elements];
    newElements[index].elementOptionSelected = selectedOption;
    setElements(newElements);
  };

  const handleDoneClick = () => {
    console.log("--------------------");
    elements.forEach((element, index) => {
      console.log(
        "Event Option Selected:",
        element.eventOptionSelected ? element.eventOptionSelected.label : "None"
      );
      console.log(
        "Element Option Selected:",
        element.elementOptionSelected
          ? element.elementOptionSelected.label
          : "None"
      );
    });
    console.log("--------------------");
    onLoadScript();
  };

  const onLoadScript = () => {
    let script = `window.onload = function () {
    fetch("http://127.0.0.1:5000/api")
      .then((response) => response.json())
      .then((data) => {
        const sourceElement = document.getElementById("${lastSelect.slice(1)}");
        const container = sourceElement.parentNode;
        container.innerHTML = ""; // Clear the container to prepare for new elements
        data.forEach((item, i) => {
          const clonedElement = sourceElement.cloneNode(true);
          clonedElement.id = \`\${sourceElement.id}\`; // No need to escape backticks here
          // Customize the clonedElement as necessary
          clonedElement.querySelectorAll("*").forEach((child, index) => {
            const newId = \`\${child.id}\`; // No need to escape backticks here
            child.id = newId; // Set the new id
            // Check and change src for images
            if (child.id.includes("image-2")) {
              child.src = item.Product_Image; // Set the new src
            }
            // Modify text for P_Name
            if (child.id.includes("P_Name")) {
              child.textContent = item.Product_Name; // Set the new text
            }
            // Additional examples: Check and change text or other properties as needed
          });
          container.appendChild(clonedElement); // Add the clonedElement to the container
        });
      })
      .catch((error) => console.error("Error:", error));
  };`;
    console.log(script);
  };

  return (
    <div className="bg-[#272727] p-4 w-5/12  pb-10  rounded-lg z-0">
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
        {/* <div className="w-4/5 mt-2 flex flex-col ">
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
        </div> */}
        <div className="w-4/5 mt-2 flex flex-col">
          {elements.map((element, index) => (
            <div key={`element-${index}`} className="flex justify-between">
              <div
                key={index}
                className="flex w-10/12 justify-between items-center"
              >
                {/*Element*/}
                <div className="flex flex-col">
                  <span className="text-xl">Element Web</span>
                  <Select
                    options={elementOptions}
                    value={element.elementOptionSelected}
                    onChange={(selectedOption) =>
                      handleSelectElementChange(selectedOption, index)
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
                <div className="flex flex-col">
                  <span className="text-xl">Json Key</span>
                  <Select
                    options={eventOptions}
                    value={element.eventOptionSelected}
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
          <button
            className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10"
            onClick={handleDoneClick}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditActionPopUp;
