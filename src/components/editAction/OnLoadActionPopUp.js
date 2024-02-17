import { PiPlugsConnectedBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

const OnLoadActionPopUp = ({
  handleClosePopupEditAction,
  lastSelect,
  ClosePopupEditAction,
}) => {
  const [apiInputValue, setApiInputValue] = useState("");
  const [apiInputValue2, setApiInputValue2] = useState("");
  const [paramInputValue, setParamInputValue] = useState("");
  const [dataTestInputValue, setDataTestInputValue] = useState("");

  const [testConnect, setTestConnect] = useState(null); // State to track selected event option
  const [eventOptions, setEventOptions] = useState([]);
  const [responseAPI, setResponseAPI] = useState(null); // State to track selected event option
  const [actionButton, setActionButton] = useState(false);
  const [actionButtonP2, setActionButtonP2] = useState(false);
  const [nameactionButton, setNameActionButton] = useState(null);
  const [pageAction, setPageAction] = useState("");
  const [IDEActionOptions, setIDEActionOptions] = useState([]);
  const [mapAction, setMapAction] = useState(false);
  const [page2action, setPage2Action] = useState(null);
  const [selectAuth, setSelectAuth] = useState("No Auth");
  const [userToken, setUserToken] = useState("");

  const { counter } = useSelector((state) => state);
  const { value: sanitizedHTML } = counter;
  const { currentFocus: currentFocus } = counter;
  const { currentFocusElement: currentFocusElement } = counter;
  const { ListPages: ListPages } = counter;
  const { IndexPages: IndexPages } = counter;
  const [Auth, setAuth] = useState([
    "No Auth",
    "Basic Auth",
    "Bearer Token",
    "JWT Token",
    "OAuth2.0",
    "API Key",
    "No Auth",
  ]);
  const handleAuthChange = (selectedOption) => {
    console.log("Selected option:", selectedOption.value);
    setSelectAuth(selectedOption.value);
    // ทำอะไรกับ selectedOption ตามที่คุณต้องการ
  };
  const handleTokenChange = (event) => {
    console.log("Token:", event.target.value);
    setUserToken(event.target.value);
  };
  useEffect(() => {
    console.log(userToken);
  }, [userToken]);

  const [elements, setElements] = useState([
    { eventOptionSelected: null, elementOptionSelected: null },
  ]);
  const [elementsp2, setElementsp2] = useState([
    { eventOptionSelected: null, elementOptionSelected: null },
  ]);

  const handleTestConnect = async () => {
    const authHeaders = {
      "No Auth": {},
      "Basic Auth": { Authorization: `Basic ${userToken}` },
      "Bearer Token": { Authorization: `Bearer ${userToken}` },
      "JWT Token": { Authorization: `Bearer ${userToken}` },
      "OAuth2.0": { Authorization: `Bearer ${userToken}` },
      "API Key": { Authorization: `ApiKey ${userToken}` },
    };
    const headers = authHeaders[selectAuth];
    try {
      const response = await axios.get(`${apiInputValue}`, {
        method: "GET", // สามารถเปลี่ยนเป็น 'POST', 'PUT', ถ้ามีความจำเป็น
        headers: headers, // ใช้ headers ที่ตั้งค่าไว้
      });
      // setApiInputValue("http://127.0.0.1:5000/api");
      // const response = await axios.get(`http://127.0.0.1:5000/api`);
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

  const handleTestConnect2 = async () => {
    console.log(
      "Map Done Click",
      apiInputValue2,
      paramInputValue,
      dataTestInputValue
    );
    const authHeaders = {
      "No Auth": {},
      "Basic Auth": { Authorization: `Basic ${userToken}` },
      "Bearer Token": { Authorization: `Bearer ${userToken}` },
      "JWT Token": { Authorization: `Bearer ${userToken}` },
      "OAuth2.0": { Authorization: `Bearer ${userToken}` },
      "API Key": { Authorization: `ApiKey ${userToken}` },
    };
    const headers = authHeaders[selectAuth];
    try {
      const response = await axios.get(
        `${apiInputValue2}${dataTestInputValue}`,
        {
          method: "GET", // สามารถเปลี่ยนเป็น 'POST', 'PUT', ถ้ามีความจำเป็น
          headers: headers, // ใช้ headers ที่ตั้งค่าไว้
        }
      );
      // console.log("response.data", response.data);
      setResponseAPI(response.data);
      setTestConnect(true);

      // สร้าง options สำหรับ Select จาก key ของข้อมูลแรก (หรือข้อมูลอื่นตามที่ต้องการ)
      const sampleData = response.data || {}; // ใช้ข้อมูลแรกเป็นตัวอย่าง
      console.log("sampleData", sampleData);

      // Generating options from the keys of sampleData
      const keysOptions = Object.keys(sampleData).map((key) => ({
        value: key,
        label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
      }));

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
  const handleInputChange2 = (event) => {
    setApiInputValue2(event.target.value);
  };

  const handleInputParamChange = (event) => {
    setParamInputValue(event.target.value);
  };

  const handleInputDataTestChange = (event) => {
    setDataTestInputValue(event.target.value);
  };

  const handlePageActionChange = (event) => {
    setPageAction(event.target.value);
  };

  const addElement = () => {
    setElements([...elements, { options: [], selectedOption: null }]);
  };

  const addElementp2 = () => {
    setElementsp2([...elementsp2, { options: [], selectedOption: null }]);
  };

  const [selectedElement, setSelectedElement] = useState(null);
  const [elementOptions, setElementOptions] = useState([]);
  const [elementNewPage, setElementNewPage] = useState([]);

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
  const handleSelectChange2 = (selectedOption, index) => {
    const newElements = [...elementsp2];
    newElements[index].eventOptionSelected = selectedOption;
    setElementsp2(newElements);
  };

  const handleSelectElementChange2 = (selectedOption, index) => {
    console.log("selectedOption", selectedOption);
    const newElements = [...elementsp2];
    newElements[index].elementOptionSelected = selectedOption;
    setElementsp2(newElements);
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
    ClosePopupEditAction();
  };

  const handleMapDoneClick = async () => {
    console.log(elementsp2);
    SingleonLoadScript();
    ClosePopupEditAction();
  };

  const handleNextClick = async () => {
    onLoadScript();
    setMapAction(true);
    setActionButtonP2(true);
    setTestConnect(null);
    try {
      // Your axios.post code here to update the page name
      const ID = localStorage.getItem("ID");
      const ProjectID = localStorage.getItem("ProjectID");
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8081/users/getpage",
        {
          id: ID,
          proid: ProjectID,
          pageName: pageAction,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data.content);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data.content, "text/html");
      setPage2Action(doc);
      // ค้นหา container ที่มี id เป็น 'row-6'
      const selectD = doc.querySelector(`#main`);
      console.log("selectD", selectD);

      // ตรวจสอบว่า row6 ไม่เป็น null
      if (selectD) {
        // ค้นหาทุก elements ภายใน row6 ที่มี id attribute
        const allElements = selectD.querySelectorAll("[id]");
        const options = Array.from(allElements).map((el) => ({
          value: el.id,
          label: el.id,
        }));
        setElementNewPage(options);
      } else {
        // ถ้าไม่พบ row6, ตั้ง options เป็น array ว่าง
        setElementOptions([]);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddButtonClick = () => {
    console.log(IDEActionOptions);
    setActionButton(true);
  };

  const onLoadScript = () => {
    const authHeaders = {
      "No Auth": {},
      "Basic Auth": { Authorization: `Basic ${userToken}` },
      "Bearer Token": { Authorization: `Bearer ${userToken}` },
      "JWT Token": { Authorization: `Bearer ${userToken}` },
      "OAuth2.0": { Authorization: `Bearer ${userToken}` },
      "API Key": { Authorization: `ApiKey ${userToken}` },
    };
    const headers = authHeaders[selectAuth];
    console.log("headers", headers);
    let script = `window.onload = function () {
    fetch("${apiInputValue}"
    , {
        method: "GET", // สามารถเปลี่ยนเป็น 'POST', 'PUT', ถ้ามีความจำเป็น
        headers: ${JSON.stringify(headers).replace(/"/g, "'")},
      })
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
    handleSaveScript(ListPages[IndexPages], script);
    // add If Next Close Popup
  };

  const SingleonLoadScript = () => {
    const authHeaders = {
      "No Auth": {},
      "Basic Auth": { Authorization: `Basic ${userToken}` },
      "Bearer Token": { Authorization: `Bearer ${userToken}` },
      "JWT Token": { Authorization: `Bearer ${userToken}` },
      "OAuth2.0": { Authorization: `Bearer ${userToken}` },
      "API Key": { Authorization: `ApiKey ${userToken}` },
    };
    const headers = authHeaders[selectAuth];
    console.log("headers", headers);
    let script = `// detail.js
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("id"); // ดึงค่า ID
  console.log(param); // แสดงค่า ID ใน console
fetch(\`${apiInputValue2}\${param}\`, {
        method: "GET", // สามารถเปลี่ยนเป็น 'POST', 'PUT', ถ้ามีความจำเป็น
        headers: ${JSON.stringify(headers).replace(/"/g, "'")},
      })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // อัปเดต UI ตามข้อมูลที่ได้
    })
    .catch((error) => console.error("Error loading product details:", error));
  
});
`;
    let combinedChild = ""; // สร้างตัวแปรสำหรับเก็บสตริงที่รวมกันทั้งหมด

    elementsp2.forEach((element, index) => {
      console.log(
        element.eventOptionSelected
          ? element.eventOptionSelected.label
          : "None",
        element.elementOptionSelected
          ? element.elementOptionSelected.label
          : "None"
      );

      console.log(page2action);
      const htmlString = page2action; // จาก state Redux ของคุณ
      // ค้นหา element ที่มี id เป็น 'image-2'
      const selectedElement = htmlString.getElementById(
        element.elementOptionSelected.label
      );
      console.log("selectedElement", selectedElement);

      // เช็คว่า element ที่เลือกนั้นเป็น tag <img> หรือไม่
      const isImgTag = selectedElement.tagName.toLowerCase() === "img";
      const isbuttonTag = selectedElement.tagName.toLowerCase() === "button";

      console.log(isImgTag); // แสดงผลลัพธ์ว่าเป็น tag <img> หรือไม่

      if (isImgTag) {
        let child = `          \n document.getElementById("${element.elementOptionSelected.label}").src = data.${element.eventOptionSelected.label};`;
        console.log("Child string:", child); // ใส่ "Child string:" ไว้เพื่อแสดงว่ามันเป็นสตริง child ที่ถูกเชื่อมต่อแล้ว

        combinedChild += child; // เพิ่มสตริง child ในลูปนี้เข้าไปใน combinedChild
      } else if (isbuttonTag) {
        let child = `          \ndocument.getElementById("${element.elementOptionSelected.label}").value = data.${element.eventOptionSelected.label};`;
        console.log("Child string:", child); // ใส่ "Child string:" ไว้เพื่อแสดงว่ามันเป็นสตริง child ที่ถูกเชื่อมต่อแล้ว

        combinedChild += child; // เพิ่มสตริง child ในลูปนี้เข้าไปใน combinedChild
      } else {
        let child = `          \ndocument.getElementById("${element.elementOptionSelected.label}").textContent = data.${element.eventOptionSelected.label};`;

        console.log("Child string:", child); // ใส่ "Child string:" ไว้เพื่อแสดงว่ามันเป็นสตริง child ที่ถูกเชื่อมต่อแล้ว

        combinedChild += child; // เพิ่มสตริง child ในลูปนี้เข้าไปใน combinedChild
      }
    });

    console.log("Combined Child:", combinedChild); // แสดงสตริงที่รวมกันทั้งหมดหลังจากลูป

    const regex = /\/\/ อัปเดต UI ตามข้อมูลที่ได้\n/;
    script = script.replace(
      regex,
      `// อัปเดต UI ตามข้อมูลที่ได้\n${combinedChild}\n`
    );
    console.log(script);
    handleSaveScript(pageAction, script);
    // add If Next Close Popup
  };

  const handleSaveScript = async (pagename, script) => {
    try {
      // const pagename = ListPages[IndexPages];
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

  const overflowRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isOverflow2, setIsOverflow2] = useState(false);

  const checkOverflow = () => {
    const element = overflowRef.current;

    if (!element) return;

    const isOverflowingVertically = element.scrollHeight > element.clientHeight;
    const isOverflowingHorizontally = element.scrollWidth > element.clientWidth;
    if (isOverflowingVertically || isOverflowingHorizontally) {
      setIsOverflow(true);
      // ตัวอย่างการใช้งาน
      console.log(`Is Overflowing Vertically: ${isOverflowingVertically}`);
      console.log(`Is Overflowing Horizontally: ${isOverflowingHorizontally}`);
    }
  };

  const checkOverflow2 = () => {
    const element = overflowRef.current;

    if (!element) return;

    const isOverflowingVertically = element.scrollHeight > element.clientHeight;
    const isOverflowingHorizontally = element.scrollWidth > element.clientWidth;
    if (isOverflowingVertically || isOverflowingHorizontally) {
      setIsOverflow2(true);
      // ตัวอย่างการใช้งาน
      console.log(`Is Overflowing Vertically: ${isOverflowingVertically}`);
      console.log(`Is Overflowing Horizontally: ${isOverflowingHorizontally}`);
    }
  };

  // เรียกใช้ฟังก์ชัน checkOverflow เมื่อ component ถูก mount
  useEffect(() => {
    checkOverflow();
    checkOverflow2();
    console.log(isOverflow);
  }, [elements, elementsp2]);

  return (
    <div className="bg-[#272727] p-4 w-5/12 max-h-[600px]  pb-10  rounded-lg z-100">
      <div className="flex w-full justify-end">
        <IoMdClose
          className="text-3xl text-red-500"
          onClick={handleClosePopupEditAction}
        />
      </div>

      {!mapAction && (
        <div className="text-white w-full flex justify-center items-center flex-col ">
          <div className="flex justify-center ite">
            <span className="text-3xl font-bold">Onload API Data Source</span>

            {/* <span className="text-3xl font-bold">New API Data Source</span> */}
          </div>
          <div className="w-4/5 mt-2 flex flex-col  ">
            <span className="text-xl">API</span>
            <div className="w-full flex justify-between h-10 mt-1">
              <input
                id="apiInput"
                value={apiInputValue}
                onChange={handleInputChange} // อัปเดต state ทุกครั้งที่มีการพิมพ
                className="w-[88.5%] bg-[#595959] rounded-sm ps-2"
              />
              <button
                className="bg-[#595959] w-12 rounded-sm"
                onClick={handleTestConnect}
              >
                <PiPlugsConnectedBold className="w-full h-6" />
              </button>
            </div>
          </div>

          <div className="w-4/5 mt-2 flex  items-end justify-between">
            <div className="w-[25%]">
              <span className="text-xl">Auth</span>

              <Select
                menuPortalTarget={document.body}
                options={Auth.map((item, index) => ({
                  value: item,
                  label: item,
                }))}
                defaultValue={
                  Auth.length > 0
                    ? { value: Auth[0], label: Auth[0] }
                    : undefined
                }
                onChange={handleAuthChange}
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
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
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
            <div className="flex flex-col  w-[60%]">
              <span className="text-xl">Token</span>
              <input
                id="apiInput"
                className="w-full bg-[#595959] rounded-sm ps-2 h-[38px] ps-2 pe-2"
                onChange={handleTokenChange}
              />
            </div>
            <div className="h-[38px] w-12"></div>
          </div>
          <div className="w-4/5 mt-2 ">
            {testConnect === true && (
              <span className="text-[#42FF00]">Connected</span>
            )}
            {testConnect === false && (
              <span className="text-[#ff5555]">Connect Failed</span>
            )}
            {testConnect === null && (
              <span className="text-[#FFFFFF]">Wait...</span>
            )}
          </div>
          <div
            className="w-4/5 max-h-[140px] mt-2 flex flex-col overflow-y-auto"
            ref={overflowRef}
          >
            {elements.map((element, index) => (
              <div
                key={`element-${index}`}
                className="flex justify-between w-full"
              >
                <div
                  key={index}
                  className="flex w-11/12 justify-between items-center"
                >
                  {/*Element*/}
                  <div className="flex flex-col w-7/12">
                    <span className="text-xl">Element Web</span>
                    <Select
                      className={
                        !isOverflow
                          ? "text-md text-black rounded-sm w-[93%] mt-1 "
                          : "text-md text-black rounded-sm w-[94%] mt-1  "
                      }
                      options={elementOptions}
                      value={element.elementOptionSelected}
                      onChange={(selectedOption) =>
                        handleSelectElementChange(selectedOption, index)
                      }
                      menuPortalTarget={document.body}
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
                      // styles ของคุณที่นี่
                    />
                  </div>
                  <div className="flex flex-col w-7/12">
                    <span className="text-xl ">Json Key</span>
                    <Select
                      className={
                        !isOverflow
                          ? "text-md text-black rounded-sm w-[93%] mt-1 "
                          : "text-md text-black rounded-sm w-[94%] mt-1  "
                      }
                      options={eventOptions}
                      value={element.eventOptionSelected}
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, index)
                      }
                      menuPortalTarget={document.body}
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
          {actionButton == false ? (
            <div className="w-4/5 mt-2">
              <button
                className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10"
                onClick={handleDoneClick}
              >
                Done
              </button>
            </div>
          ) : (
            <div className="w-4/5 mt-2">
              <button
                className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Page2 Create Script */}
      {mapAction && (
        <div className="text-white w-full flex justify-center items-center flex-col ">
          <div className="flex justify-center ">
            <span className="text-3xl font-bold">Mapping</span>
          </div>
          <div className="w-4/5 mt-2 flex flex-col  ">
            <div>
              <span className="text-xl">API</span>
            </div>
            <div className="w-full flex justify-between mt-1 items-end">
              <div className="w-8/12 h-full">
                <span className="text-xl ">API</span>
                <input
                  id="apiInput"
                  value={apiInputValue2}
                  onChange={handleInputChange2} // อัปเดต state ทุกครั้งที่มีการพิมพ
                  className="w-full h-10 bg-[#595959] rounded-sm ps-2"
                />
              </div>
              <div className="w-2/12 h-full">
                <span className="text-xl ">Data Test</span>
                <input
                  id="DataTestInput"
                  value={dataTestInputValue}
                  onChange={handleInputDataTestChange} // อัปเดต state ทุกครั้งที่มีการพิมพ
                  className="w-full h-10 bg-[#595959] rounded-sm ps-2"
                />
              </div>
              <button
                className="bg-[#595959] w-12 rounded-sm h-10"
                onClick={handleTestConnect2}
              >
                <PiPlugsConnectedBold className="w-full h-6" />
              </button>
            </div>
          </div>

          <div className="w-4/5 mt-2 flex  items-end justify-between">
            <div className="w-[25%]">
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
            <div className="flex flex-col  w-[60%]">
              <span className="text-xl">Token</span>
              <input
                id="apiInput"
                className="w-full bg-[#595959] rounded-sm ps-2 pe-2 h-[38px]"
                onChange={handleTokenChange}
              />
            </div>

            <div className="h-[38px] w-12"></div>
          </div>
          <div className="w-4/5 mt-2 ">
            {testConnect === true && (
              <span className="text-[#42FF00]">Connected</span>
            )}
            {testConnect === false && (
              <span className="text-[#ff5555]">Connect Failed</span>
            )}
            {testConnect === null && (
              <span className="text-[#FFFFFF]">Wait...</span>
            )}
          </div>
          <div
            className="w-4/5 mt-2 flex flex-col max-h-[200px] overflow-y-scroll"
            ref={overflowRef}
          >
            {elementsp2.map((element, index) => (
              <div key={`element-${index}`} className="flex justify-between ">
                <div
                  key={index}
                  className="flex w-11/12 justify-between items-center"
                >
                  {/*Element*/}
                  <div className="flex flex-col w-7/12">
                    <span className="text-xl">Element Web</span>

                    <Select
                      className={
                        !isOverflow2
                          ? "text-md text-black rounded-sm w-[93%] mt-1 "
                          : "text-md text-black rounded-sm w-[95%] mt-1  "
                      }
                      options={elementNewPage}
                      value={element.elementOptionSelected}
                      onChange={(selectedOption) =>
                        handleSelectElementChange2(selectedOption, index)
                      }
                      menuPortalTarget={document.body}
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
                    />
                  </div>
                  <div className="flex flex-col w-7/12">
                    <span className="text-xl">Json Key</span>
                    <Select
                      className={
                        !isOverflow2
                          ? "text-md text-black rounded-sm w-[93%] mt-1 "
                          : "text-md text-black rounded-sm w-[95%] mt-1  "
                      }
                      options={eventOptions}
                      value={element.eventOptionSelected}
                      onChange={(selectedOption) =>
                        handleSelectChange2(selectedOption, index)
                      }
                      menuPortalTarget={document.body}
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
                    />
                  </div>

                  {/* แสดงปุ่มเฉพาะใน element สุดท้าย */}
                </div>
                {index === elementsp2.length - 1 && (
                  <div className=" flex items-end ">
                    <button
                      onClick={addElementp2}
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

          {!actionButtonP2 &&
            (actionButton == false ? (
              <div className="w-4/5 mt-2">
                <button
                  className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10"
                  onClick={handleDoneClick}
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="w-4/5 mt-2">
                <button
                  className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              </div>
            ))}

          {actionButtonP2 && (
            <div className="w-4/5 mt-2">
              <button
                className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10"
                onClick={handleMapDoneClick}
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnLoadActionPopUp;
