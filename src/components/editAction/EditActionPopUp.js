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
  const [actionButton, setActionButton] = useState(false);
  const [nameactionButton, setNameActionButton] = useState(null);
  const [pageAction, setPageAction] = useState("");
  const [IDEActionOptions, setIDEActionOptions] = useState([]);

  const { counter } = useSelector((state) => state);
  const { value: sanitizedHTML } = counter;
  const { currentFocus: currentFocus } = counter;
  const { currentFocusElement: currentFocusElement } = counter;
  const { ListPages: ListPages } = counter;
  const { IndexPages: IndexPages } = counter;

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

  const handlePageActionChange = (event) => {
    setPageAction(event.target.value);
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
      setIDEActionOptions(options);
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
  const handleSelectElementActionChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setNameActionButton(selectedOption.label);
  };

  const handleDoneClick = () => {
    onLoadScript();
  };

  const handleAddButtonClick = () => {
    console.log(IDEActionOptions);
    setActionButton(true);
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

            
          });
          container.appendChild(clonedElement); // Add the clonedElement to the container
        });
      })
      .catch((error) => console.error("Error:", error));
  };`;
    let combinedChild = ""; // สร้างตัวแปรสำหรับเก็บสตริงที่รวมกันทั้งหมด

    elements.forEach((element, index) => {
      console.log(
        element.eventOptionSelected
          ? element.eventOptionSelected.label
          : "None",
        element.elementOptionSelected
          ? element.elementOptionSelected.label
          : "None"
      );

      console.log(sanitizedHTML);
      const htmlString = sanitizedHTML; // จาก state Redux ของคุณ

      // ใช้ DOMParser เพื่อแปลง string เป็น DOM
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      // ค้นหา element ที่มี id เป็น 'image-2'
      const selectedElement = doc.getElementById(
        element.elementOptionSelected.label
      );

      // เช็คว่า element ที่เลือกนั้นเป็น tag <img> หรือไม่
      const isImgTag = selectedElement.tagName.toLowerCase() === "img";

      console.log(isImgTag); // แสดงผลลัพธ์ว่าเป็น tag <img> หรือไม่
      if (isImgTag) {
        let child = `          \n// // Check and change src for ${element.elementOptionSelected.label}
    if (child.tagName === "IMG" && child.id.includes("${element.elementOptionSelected.label}")) {
    child.src = item.${element.eventOptionSelected.label}; // Set the new src
  }`;
        console.log("Child string:", child); // ใส่ "Child string:" ไว้เพื่อแสดงว่ามันเป็นสตริง child ที่ถูกเชื่อมต่อแล้ว

        combinedChild += child; // เพิ่มสตริง child ในลูปนี้เข้าไปใน combinedChild
      } else {
        let child = `          \n// Modify text for ${element.elementOptionSelected.label}
  if (child.id.includes("${element.elementOptionSelected.label}")) {
    child.textContent = item.${element.eventOptionSelected.label}; // Set the new text
  }`;

        console.log("Child string:", child); // ใส่ "Child string:" ไว้เพื่อแสดงว่ามันเป็นสตริง child ที่ถูกเชื่อมต่อแล้ว

        combinedChild += child; // เพิ่มสตริง child ในลูปนี้เข้าไปใน combinedChild
      }
      if (nameactionButton !== null) {
        let child = `          \n// // Check and change src for ${nameactionButton}
                   if (child.id.includes("${nameactionButton}")) {
                    child.addEventListener("click", function () {
                      window.location.href = \`${pageAction}?id=\${item.ID}\`;
                      console.log(item.ID);
                    });
                  }`;
        console.log("Child string:", child); // ใส่ "Child string:" ไว้เพื่อแสดงว่ามันเป็นสตริง child ที่ถูกเชื่อมต่อแล้ว

        combinedChild += child; // เพิ่มสตริง child ในลูปนี้เข้าไปใน combinedChild
      }
    });

    console.log("Combined Child:", combinedChild); // แสดงสตริงที่รวมกันทั้งหมดหลังจากลูป

    const regex = /\/\/\sCheck\sand\schange\ssrc\sfor\simages/g;
    script = script.replace(
      regex,
      `// Check and change src for images\n${combinedChild}\n`
    );
    console.log(script);
    handleSaveScript(script);
    // add If Next Close Popup
  };

  const handleSaveScript = async (script) => {
    try {
      const pagename = ListPages[IndexPages];
      const ID = localStorage.getItem("ID");
      const ProjectID = localStorage.getItem("ProjectID");
      const token = localStorage.getItem("token");
      console.log(pagename);
      await axios.post(
        "http://localhost:8081/users/editscript",
        {
          userID: ID,
          projectId: ProjectID,
          pageName: pagename.slice(0, -5),
          content: script,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Create Script Success!");
    } catch (error) {
      alert("Create New Page Failed!");
    }
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
        {!actionButton && (
          <div className="w-4/5 mt-2 ">
            <button
              className="mt-4 w-56 bg-[#3E64BD] rounded-sm h-10"
              onClick={handleAddButtonClick}
            >
              Add Action Element
            </button>
          </div>
        )}
        {/* IDEActionOptions */}

        {actionButton && (
          <div className="flex justify-between w-4/5 mt-4 ">
            <div className="flex w-10/12 justify-between items-center ">
              <div className="flex flex-col ">
                <span className="text-xl">Element Action</span>
                <Select
                  className="w-56"
                  value={IDEActionOptions.find(
                    (option) => option.value === pageAction
                  )}
                  onChange={(selectedOption) =>
                    handleSelectElementActionChange(selectedOption)
                  }
                  options={IDEActionOptions}
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
              <div className="flex flex-col">
                <span className="text-xl">Page Action</span>
                <input
                  id="PAGEACTION"
                  value={pageAction}
                  onChange={handlePageActionChange} // อัปเดต state ทุกครั้งที่มีการพิมพ
                  className="w-56 h-9 bg-[#595959] rounded-sm ps-2"
                />
              </div>
            </div>
          </div>
        )}
        <div className="w-4/5 mt-2">
          <button
            className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10"
            onClick={handleDoneClick}
          >
            {actionButton == false ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditActionPopUp;
