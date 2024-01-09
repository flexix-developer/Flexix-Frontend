import React, { useState, useEffect, useCallback } from "react";
import NavBarDesign from "../components/navbar/NavbarDesign";
import Properties from "../components/properties/Properties";
import Toolbox from "../components/toolbox/Toolbox";
import PageExplorer from "../components/pageExplorer/PageExplorer";
import LayerExplorer from "../components/layerExplorer/LayerExplorer";
import DesignWorkspace from "../components/genarateHTML/DesignWorkspace";
import { CgCloseO } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import useTokenCheck from "../components/useTokenCheck/useTokenCheck";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DesignPage = () => {
  useTokenCheck("/design");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ fname: "", lname: "" });
  const [code, setCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pagename, SetNewPageName] = useState("");
  const [width, SetWidth] = useState("");
  const [height, SetHeight] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("px");

  const [selectedComponent, setSelectedComponent] = useState("Toolbox");
  const [selectedLayer, setSelectedLayer] = useState("PageExplorer");

  const fetchUser = useCallback(async () => {
    try {
      const ID = localStorage.getItem("ID");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/users/readall/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Token is expired") {
        localStorage.clear();
      }

      setUserInfo({
        fname: response.data.fname,
        lname: response.data.lname,
      });
    } catch (error) {
      console.error("Error during login", error);

      // Check if the error is due to a specific condition (e.g., status code 500)
      if (error.response && error.response.status === 500) {
        // Redirect to the login page
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {}, [userInfo]);

  const handleComponentClick = (component) => setSelectedComponent(component);
  const handleLayerClick = (layer) => setSelectedLayer(layer);

  const handlePnameChange = (event, SetNewPageName) => {
    let newName = event.target.value;

    // Replace any characters that are not A-Za-z0-9_-
    newName = newName.replace(/[^A-Za-z0-9_-]/g, "");

    // console.log(newName);
    SetNewPageName(newName);
  };

  const handleWidthChange = (event, SetWidth) => {
    let newName = event.target.value;
    newName = newName.replace(/[^0-9]/g, "");
    SetWidth(newName);
    // console.log("w", width);
  };
  const handleHeightChange = (event, SetHeight) => {
    let newName = event.target.value;
    newName = newName.replace(/[^0-9]/g, "");
    SetHeight(newName);
    // console.log("h", height);
  };

  const handleUnitChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedUnit(selectedValue);
  };

  const handleCreateButtonClick = async (e) => {
    e.preventDefault();
    const ID = localStorage.getItem("ID");
    const ProjectID = localStorage.getItem("ProjectID");
    const token = localStorage.getItem("token");
    if (pagename === "") {
      return;
    } else {
      try {
        await axios.post(
          "http://127.0.0.1:8081/users/page",
          {
            userID: ID,
            projectId: ProjectID,
            pageName: pagename,
            width: width + selectedUnit,
            height: height + selectedUnit,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Create New Page Success!");

        const newHTMLCode = "Your generated HTML code";

        setCode(newHTMLCode);
        console.log("New HTML code:", newHTMLCode);

        setShowModal(false);
      } catch (error) {
        alert("Create New Page Failed!");
      }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <NavBarDesign
        fname={userInfo.fname}
        lname={userInfo.lname}
        isWorkspace={true}
      />
      {code === "" && (
        <div className="flex flex-row flex-1">
          <div className="flex flex-col w-2/12">
            <div className="flex flex-row w-full">
              <div
                onClick={() => handleLayerClick("PageExplorer")}
                className={`flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-white text-xl ${
                  selectedLayer === "PageExplorer"
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
              >
                <p>Page Explorer</p>
              </div>
              <div
                onClick={() => handleLayerClick("LayerExplorer")}
                className={`flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-white text-xl ${
                  selectedLayer === "LayerExplorer"
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
              >
                <p>Layer Explorer</p>
              </div>
            </div>
            <div className="flex flex-col w-full h-full bg-neutral-700">
              <div className="bg-black p-1 pl-3 flex items-center">
                <IoSearchOutline
                  className="text-gray-500"
                  size={25}
                  color="white"
                />
                <input
                  type="text"
                  placeholder="search..."
                  className="bg-black p-2 ml-2 rounded-md focus:outline-none focus:border-blue-500 w-full text-white h-0.5"
                  disabled
                />
              </div>
            </div>
            <div className="bg-neutral-700 flex-1">{/* Component */}</div>
          </div>
          <div className="flex flex-col w-8/12">
            <div className="flex flex-row bg-neutral-700 w-12/12">
              <div className="flex flex-row px-5 py-1 text-lg items-center h-full">
                <p className="invisible">Hello, Hacker!</p>
              </div>
            </div>
            <div
              className="flex flex-col justify-center items-center w-full h-full bg-neutral-600 cursor-pointer text-white"
              onClick={() => setShowModal(true)}
            >
              <div>
                <IoMdAddCircleOutline size={300} />
              </div>
              <div className="mb-24">
                <p className="text-5xl font-bold">Create new page</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-2/12">
            <div className="flex flex-row w-full">
              <div className="flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-xl"></div>
              <div className="flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-xl"></div>
            </div>
            <div className="flex flex-col w-full h-full bg-neutral-700"></div>
          </div>
        </div>
      )}
      {code !== "" && (
        <div className="flex flex-row flex-1">
          <div className="flex flex-col w-2/12">
            <div className="flex flex-row w-full">
              <div
                onClick={() => handleLayerClick("PageExplorer")}
                className={`flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-white text-xl ${
                  selectedLayer === "PageExplorer"
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
              >
                <p>Page Explorer</p>
              </div>
              <div
                onClick={() => handleLayerClick("LayerExplorer")}
                className={`flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-white text-xl ${
                  selectedLayer === "LayerExplorer"
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
              >
                <p>Layer Explorer</p>
              </div>
            </div>
            <div className="flex flex-col w-full h-full bg-neutral-700">
              {selectedLayer === "LayerExplorer" && <LayerExplorer />}
              {selectedLayer === "PageExplorer" && <PageExplorer />}
            </div>
            <div className="bg-neutral-700 flex-1">{/* Component */}</div>
          </div>
          <div className="flex flex-col w-8/12">
            <div className="flex flex-row bg-neutral-600 w-12/12">
              <div className="flex flex-row px-5 py-1 text-lg bg-neutral-700 items-center h-full text-white">
                <p>Home</p>
              </div>
              <div className="flex flex-row pl-10 pr-2 py-1 bg-neutral-700 items-center h-full">
                <CgCloseO color="white" size={15} />
              </div>
              <div className="flex flex-row p-1 items-center text-white">
                <div className="rounded-bl-md rounded-tr-md bg-neutral-700 px-2 py-1 cursor-pointer">
                  <IoMdAdd color="white" size={20} />
                </div>
              </div>
            </div>
            <div>
              <DesignWorkspace />
            </div>
          </div>
          <div className="flex flex-col w-2/12">
            <div className="flex flex-row w-full">
              <div
                onClick={() => handleComponentClick("Toolbox")}
                className={`flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-white text-xl ${
                  selectedComponent === "Toolbox"
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
              >
                <p>Toolbox</p>
              </div>
              <div
                onClick={() => handleComponentClick("Properties")}
                className={`flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-white text-xl ${
                  selectedComponent === "Properties"
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
              >
                <p>Properties</p>
              </div>
            </div>
            <div className="flex flex-col w-full h-full bg-neutral-700">
              {selectedComponent === "Toolbox" && <Toolbox />}
              {selectedComponent === "Properties" && <Properties />}
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/6 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 text-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-start p-6 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-4xl font-semibold">Create new page</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto text-xl">
                  <label>Page name:</label>
                  <input
                    type="text"
                    placeholder="Page name"
                    className="bg-gray-100 p-2 mb-4 mt-1 rounded-md focus:outline-none focus:border-blue-500 w-full text-black w-full"
                    value={pagename}
                    onChange={(event) =>
                      handlePnameChange(event, SetNewPageName)
                    }
                    required
                  />
                  <label>Width:</label>
                  <div className="flex w-full h-full">
                    <input
                      type="text"
                      placeholder="ex. 1920"
                      className="bg-gray-100 p-2 mb-4 mt-1 rounded-md focus:outline-none focus:border-blue-500 w-full text-black w-full"
                      value={width}
                      onChange={(event) => handleWidthChange(event, SetWidth)}
                      required
                    />
                    <select
                      name="unit"
                      id="unit"
                      className="bg-gray-100 p-2 mb-4 ml-2 mt-1 rounded-md focus:outline-none focus:border-blue-500 w-1/6 text-black "
                      value={selectedUnit}
                      onChange={handleUnitChange}
                    >
                      <option value="px">px</option>
                      <option value="rem">rem</option>
                      <option value="em">em</option>
                      <option value="%">%</option>
                      <option value="vh">vh</option>
                      <option value="vw">vw</option>
                      <option value="cm">cm</option>
                      <option value="ch">ch</option>
                    </select>
                  </div>
                  <label>Height:</label>
                  <div className="flex w-full h-full">
                    <input
                      type="text"
                      placeholder="ex. 1080"
                      className="bg-gray-100 p-2 mb-4 mt-1 rounded-md focus:outline-none focus:border-blue-500 w-full text-black w-full"
                      value={height}
                      onChange={(event) => handleHeightChange(event, SetHeight)}
                      required
                    />
                    <select
                      name="unit"
                      id="unit"
                      className="bg-gray-100 p-2 mb-4 ml-2 mt-1 rounded-md focus:outline-none focus:border-blue-500 w-1/6 text-black "
                      value={selectedUnit}
                      onChange={handleUnitChange}
                    >
                      <option value="px">px</option>
                      <option value="rem">rem</option>
                      <option value="em">em</option>
                      <option value="%">%</option>
                      <option value="vh">vh</option>
                      <option value="vw">vw</option>
                      <option value="cm">cm</option>
                      <option value="ch">ch</option>
                    </select>
                  </div>
                  <div className="my-2">
                    <label
                      className="inline-block pr-2 hover:cursor-pointer"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Normal page
                    </label>
                    <input
                      className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      disabled
                    />
                    <label
                      className="inline-block pl-2 hover:cursor-pointer"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Sub page
                    </label>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCreateButtonClick}
                  >
                    Create
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default DesignPage;
