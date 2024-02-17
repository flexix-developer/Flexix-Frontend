import { PiPlugsConnectedBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { addElementAction, AddFunc } from "../../features/counter/counterSlice";

const OnClickActionPopUp = ({ handleClosePopupEditAction, activepage }) => {
  const { counter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { value: sanitizedHTML } = counter;
  const [testConnect, setTestConnect] = useState(null);
  const [Method, setMethod] = useState(["GET", "POST", "PUT", "DELETE"]);
  const [selectMethod, setSelectMethod] = useState("GET");
  const [userToken, setUserToken] = useState("");
  const [param, setParam] = useState("");
  const [Auth, setAuth] = useState([
    "No Auth",
    "Basic Auth",
    "Bearer Token",
    "JWT Token",
    "OAuth2.0",
    "API Key",
  ]);
  const [activeSetParam, setActiveSetParam] = useState(false);
  const [rawApi, setRawApi] = useState("");
  const overflowRef = useRef(null); // Ref สำหรับ div ที่ต้องการตรวจสอบ
  const [isOverflow, setIsOverflow] = useState(false);
  const [rows, setRows] = useState([
    { param: "", dataFromID: "", testData: "" },
  ]);
  const [dataBody, setDataBody] = useState([{}]);
  const [papePopUp, setPapePopUp] = useState(false);
  const [jsdataBypage, setJsdataBypage] = useState("");
  const [listjsdataBypage, setListjsdataBypage] = useState([]);
  const [FuncName, setFuncName] = useState("");
  const [completeScript, setCompleteScript] = useState("");

  const addRow = () => {
    const newRow = { param: "", testData: "", dataFromID: "" };
    setRows([...rows, newRow]);
  };

  const handleTokenChange = (event) => {
    console.log("Token:", event.target.value);
    setUserToken(event.target.value);
  };

  const handleFuncNameChange = (event) => {
    console.log("Token:", event.target.value);
    setFuncName(event.target.value);
  };

  const handlerawApiChange = (e) => {
    if (param !== "") {
      e.preventDefault();
    } else {
      console.log(e.target.value);
      setRawApi(e.target.value);
    }
  };

  const handleInputChange = (index, field, value) => {
    console.log(index, field, value);
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    if (selectMethod == "GET" || selectMethod == "DELETE") {
      let newRawApi = rawApi.split("?")[0];
      let queryParams = [];
      updatedRows.forEach((row, i) => {
        if (row.param && row.param.trim() !== "") {
          let prefix = i === 0 ? "?" : "&";
          queryParams.push(`${prefix}${row.param}=${row.testData || ""}`);
        }
      });
      setParam(queryParams.join(""));
    } else if (selectMethod === "POST" || selectMethod === "PUT") {
      // สร้าง object สำหรับ dataBody จาก updatedRows
      let newDataBody = updatedRows.reduce((body, row) => {
        if (row.param && row.param.trim() !== "") {
          body[row.param] = row.testData || "";
        }
        return body;
      }, {});

      setDataBody(newDataBody);
    }
  };
  const handleActiveSetParam = () => {
    setActiveSetParam(true);
  };

  useEffect(() => {
    console.log("rawApi", rawApi);
  }, [rawApi]);

  useEffect(() => {
    const checkOverflow = () => {
      const current = overflowRef.current;
      if (current) {
        // ตรวจสอบว่า current ไม่เป็น null
        const isOverflowing = current.scrollHeight > current.clientHeight;
        setIsOverflow(isOverflowing);
      }
    };

    checkOverflow();
    console.log(rows);
  }, [rows]); // อาจต้องการใส่ dependencies ถ้า rows เปลี่ยนแปลง

  const handleTryConnect = async () => {
    // const Methods = Method[];

    const authHeaders = {
      "No Auth": {},
      "Basic Auth": { Authorization: `Basic ${userToken}` },
      "Bearer Token": { Authorization: `Bearer ${userToken}` },
      "JWT Token": { Authorization: `Bearer ${userToken}` },
      "OAuth2.0": { Authorization: `Bearer ${userToken}` },
      "API Key": { Authorization: `ApiKey ${userToken}` },
    };

    const headers = authHeaders[selectAuth];
    console.log("headers", headers, "Method", selectMethod, "rawApi", rawApi);
    console.log(rawApi + param);
    try {
      const response = await axios({
        method: selectMethod,
        url: `${rawApi + param}`,
        headers: headers,
        // data: { atname: "jelly fish" },
        data: dataBody,
      });
      console.log("Data:", response.data);
      setTestConnect(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTestConnect(false);
    }
  };

  const [selectAuth, setSelectAuth] = useState("No Auth");

  const handleAuthChange = (selectedOption) => {
    console.log("Selected option:", selectedOption.value);
    setSelectAuth(selectedOption.value);
    // ทำอะไรกับ selectedOption ตามที่คุณต้องการ
  };
  const handleMethodChange = (selectedOption) => {
    console.log("Selected option:", selectedOption.value);
    setSelectMethod(selectedOption.value);
    // ทำอะไรกับ selectedOption ตามที่คุณต้องการ
  };

  const [selectActionElement, setSelectActionElement] = useState("");
  const handleElementActionChange = (selectedOption) => {
    console.log("Selected option:", selectedOption.value);
    setSelectActionElement(selectedOption.value);
    dispatch(addElementAction(selectedOption.value));
    // ทำอะไรกับ selectedOption ตามที่คุณต้องการ
  };

  useEffect(() => {
    const load_scrpit_data = async () => {
      const ID = localStorage.getItem("ID");
      const ProjectID = localStorage.getItem("ProjectID");
      const token = localStorage.getItem("token");
      const pagename = activepage.slice(0, -5) + ".js";

      try {
        const response = await axios.post(
          "http://127.0.0.1:8081/users/getscript",
          {
            id: ID,
            proid: ProjectID,
            pagename: pagename,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.content);
        setJsdataBypage(response.data.content);
      } catch (error) {
        alert("Create New Page Failed!");
      }
    };
    load_scrpit_data();
  }, [activepage]);

  useEffect(() => {
    getAllFunctionNames();
  }, [jsdataBypage]);

  const getAllFunctionNames = () => {
    // ใช้ regular expression เพื่อหาชื่อฟังก์ชันใน text
    const regex = /const\s+(\w+)\s*=\s*async\s*\(\)\s*=>/g;

    let match;
    const functionNames = [];

    // Loop over the matches and extract the function names
    while ((match = regex.exec(jsdataBypage)) !== null) {
      functionNames.push(match[1]);
    }
    setListjsdataBypage(functionNames);
    console.log(functionNames); // This will log: ['post', 'gost']
  };

  const handlePapePopUp = () => {
    setPapePopUp(true);
  };

  useEffect(() => {
    // สมมติว่า sanitizedHTML เป็น string HTML
    const htmlString = sanitizedHTML; // จาก state Redux ของคุณ

    // ใช้ DOMParser เพื่อแปลง string เป็น DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // ค้นหา container ที่มี id เป็น 'row-6'
    const selectD = doc.querySelector(`#main`);

    // ตรวจสอบว่า row6 ไม่เป็น null
    if (selectD) {
      // ค้นหาทุก elements ภายใน row6 ที่มี id attribute
      const allElements = selectD.querySelectorAll("[id]");
      const options = Array.from(allElements).map((el) => ({
        value: el.id,
        label: el.id,
      }));
      setElements(options);
    } else {
      // ถ้าไม่พบ row6, ตั้ง options เป็น array ว่าง
      setElements([]);
    }
  }, [sanitizedHTML]); // เพิ่ม sanitizedHTML เป็น dependency เพื่อให้ useEffect ทำงานอีกครั้งเมื่อ sanitizedHTML มีการเปลี่ยนแปลง

  const [elements, setElements] = useState([
    { eventOptionSelected: null, elementOptionSelected: null },
  ]);

  const CreateOnClickScript = () => {
    const authHeaders = {
      "No Auth": {}, // ใส่ quotes รอบ "Content-Type"
      "Basic Auth": { Authorization: `Basic ${userToken}` },
      "Bearer Token": { Authorization: `Bearer ${userToken}` },
      "JWT Token": { Authorization: `Bearer ${userToken}` },
      "OAuth2.0": { Authorization: `Bearer ${userToken}` },
      "API Key": { Authorization: `ApiKey ${userToken}` },
    };
    const headers = authHeaders[selectAuth];
    console.log("headers", headers);

    const formatHeadersForScript = (headers) => {
      return Object.entries(headers)
        .map(([key, value]) => {
          // ตรวจสอบค่าเพื่อกำหนดการใส่ quotes สำหรับค่า
          const formattedValue =
            typeof value === "string" ? `'${value}'` : value;
          return `${key}: ${formattedValue}`;
        })
        .join(",\n        ");
    };
    let headerString = formatHeadersForScript(headers);

    if (selectMethod == "GET" || selectMethod == "DELETE") {
      let script = `const ${FuncName} = async () => {

  try {
    const response = await fetch("${rawApi + param}", {
      method: "${selectMethod}",
            headers: {
        "Content-Type": "application/json", // กำหนด Content-Type header เป็น application/json
        ${headerString},
      },
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json(); // อ่าน JSON จาก response body
    console.log("Data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
`;
      setCompleteScript(script);
      console.log(script);
    } else {
      let inputValuesString = rows
        .map(
          (row) =>
            `const ${row.param} = document.getElementById("${row.dataFromID}").value;`
        )
        .join("\n  ");

      let bodyInputVariable = rows
        .map((row) => `${row.param}:${row.param},`)
        .join("\n  ");

      let script = `const ${FuncName} = async () => {
  // รับค่าจาก input fields
  ${inputValuesString}


  // สร้าง object สำหรับส่งข้อมูล
  const dataBody = {
${bodyInputVariable}
  };

  try {
    const response = await fetch("${rawApi}", {
      method: "${selectMethod}",
            headers: {
        "Content-Type": "application/json", // กำหนด Content-Type header เป็น application/json
        ${headerString},
      },
      body: JSON.stringify(dataBody), // แปลง object เป็นสตริง JSON
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json(); // อ่าน JSON จาก response body
    console.log("Data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
`;
      setCompleteScript(script);
      console.log(script, rows);
    }
    SaveScriptFunctionBK();
  };

  const SaveScriptFunctionBK = async () => {
    const ID = localStorage.getItem("ID");
    const ProjectID = localStorage.getItem("ProjectID");
    const token = localStorage.getItem("token");
    const pagename = activepage.slice(0, -5);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8081/users/savefunc",
        {
          id: ID,
          proid: ProjectID,
          pagename: pagename,
          scriptContent: completeScript,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.content);
      dispatch(AddFunc(FuncName));
      console.log("Save Script Function Success!");
    } catch (error) {
      alert("Create New Page Failed!");
    }
  };

  return (
    <div className="bg-[#272727] p-4 w-5/12 max-h-[700px]  pb-10  rounded-lg z-100">
      <div className="flex w-full justify-end">
        <IoMdClose
          className="text-3xl text-red-500"
          onClick={handleClosePopupEditAction}
        />
      </div>

      {!papePopUp && (
        <div className="text-white w-full flex  items-center flex-col h-[500px]">
          <div className="flex justify-center ite">
            <span className="text-3xl font-bold">Function</span>
          </div>
          {/* MAP */}
          {listjsdataBypage.map((data, index) => (
            <div
              key={index}
              className="w-4/5 mt-2 flex  items-end justify-between"
            >
              <div className="flex flex-col  w-[80%] mt-2">
                <div className="w-full bg-[#303030] rounded-sm ps-2 h-[38px] border-2 border-[#595959]">
                  <span className="text-xl">{data}</span>
                </div>
              </div>
              <div className="h-[38px]">
                <button className="bg-[#595959] w-12 rounded-sm h-full">
                  <FiEdit className="w-full h-6 cursor-pointer text-yellow-300 " />
                </button>
              </div>
              <div className="h-[38px]">
                <button className="bg-[#595959] w-12 rounded-sm h-full">
                  <FiTrash2 className="w-full h-6 cursor-pointer text-red-400" />
                </button>
              </div>
            </div>
          ))}
          <div className="w-4/5 mt-2 h-full flex items-end">
            <button
              className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10"
              onClick={handlePapePopUp}
            >
              Create
            </button>
          </div>
        </div>
      )}
      {/*  */}
      {papePopUp && (
        <div className="text-white w-full flex  items-center flex-col ">
          <div className="flex justify-center ite">
            <span className="text-3xl font-bold">OnClick API Data Source</span>
          </div>
          {/*  */}
          <div className="w-4/5 mt-2 flex  items-end justify-between">
            <div className="w-[25%]">
              <span className="text-xl">Element Action</span>
              <Select
                options={elements}
                onChange={handleElementActionChange}
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
              <span className="text-xl">Function Name</span>
              <input
                id="apiInput"
                className="w-full bg-[#595959] rounded-sm ps-2 h-[38px]"
                onChange={handleFuncNameChange}
              />
            </div>
            <div className="h-[38px] w-12"></div>
          </div>
          {/*  */}
          <div className="w-4/5 mt-2 flex  items-end justify-between">
            <div className="w-[25%]">
              <span className="text-xl">Method</span>

              <Select
                options={Method.map((item) => ({ value: item, label: item }))}
                defaultValue={
                  Method.length > 0
                    ? { value: Method[0], label: Method[0] }
                    : undefined
                }
                onChange={handleMethodChange}
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
              <span className="text-xl">API</span>
              <input
                id="apiInput"
                className="w-full bg-[#595959] rounded-sm ps-2 h-[38px]"
                onChange={handlerawApiChange}
                value={rawApi + param}
              />
            </div>
            <div className="h-[38px]">
              <button
                className="bg-[#595959] w-12 rounded-sm h-full"
                onClick={handleTryConnect}
              >
                <PiPlugsConnectedBold className="w-full h-6" />
              </button>
            </div>
          </div>

          <div className="w-4/5 mt-2 flex  items-end justify-between">
            <div className="w-[25%]">
              <span className="text-xl">Type</span>

              <Select
                className=""
                options={Auth.map((item) => ({ value: item, label: item }))}
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
                className="w-full bg-[#595959] rounded-sm ps-2 h-[38px]"
                onChange={handleTokenChange}
              />
            </div>
            <div className="h-[38px] w-12"></div>
          </div>
          {!activeSetParam && (
            <div className="w-4/5 mt-4">
              <div className="h-[38px]">
                <button
                  className="bg-[#595959] w-full rounded-sm h-full"
                  onClick={handleActiveSetParam}
                >
                  <span className="text-xl">Set Params</span>
                </button>
              </div>
            </div>
          )}
          {activeSetParam && (
            <div
              className="w-4/5 max-h-[220px] overflow-y-auto"
              id="over"
              ref={overflowRef}
            >
              {rows.map((row, index) => (
                <div className="w-full mt-2 flex  items-end justify-between ">
                  {/* <div className="w-[20.5%] "> */}
                  <div className={isOverflow ? "w-[25.5%]" : "w-[25.5%]"}>
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
                        ? "flex flex-col w-[28%] "
                        : "flex flex-col w-[29%] ml-4"
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
                  <div
                    className={
                      !isOverflow
                        ? "flex flex-col w-[29%] "
                        : "flex flex-col w-[29%] ml-3"
                    }
                  >
                    <span className="text-xl">Data From ID</span>
                    <Select
                      options={elements}
                      // onChange={handleElementActionChange}
                      menuPortalTarget={document.body}
                      onChange={(e) =>
                        handleInputChange(index, "dataFromID", e.value)
                      }
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
                    ></Select>
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
          )}
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
          <div className="w-4/5 mt-2 h-full flex items-end">
            <button
              className="mt-4 w-full bg-[#3E64BD] rounded-sm h-10"
              onClick={CreateOnClickScript}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnClickActionPopUp;
