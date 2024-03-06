import DesignWorkspace from "../designWorkspace/DesignWorkspace";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import MidTabBar from "./midtabbar/MidTabBar";

const MidResult = ({
  onClick,
  ArrPageList,
  deletedPage,
  setFirstpage,
  handlePageActivate,
  activepage,
  handleClickTabBar,
}) => {
  const [pagename, SetNewPageName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { counter } = useSelector((state) => state);
  const [width, SetWidth] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("px");
  const [height, SetHeight] = useState("");
  const { value: sanitizedHTML } = counter;
  const [createButtonClicked, setCreateButtonClicked] = useState(false);
  // console.log("ArrayList", ArrPageList);
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

  const handleUnitChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedUnit(selectedValue);
  };

  const handleHeightChange = (event, SetHeight) => {
    let newName = event.target.value;
    newName = newName.replace(/[^0-9]/g, "");
    SetHeight(newName);
    // console.log("h", height);
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
          // "http://127.0.0.1:8081/users/page",
          "http://ceproject.thddns.net:3322/users/page",
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
        setCreateButtonClicked(true);
        setShowModal(false);
        SetNewPageName("");
        SetWidth("");
        SetHeight("");
        onClick();
      } catch (error) {
        alert("Create New Page Failed!");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col w-8/12">
        <MidTabBar
          setShowModal={setShowModal}
          ArrPageList={ArrPageList}
          deletedPage={deletedPage}
          setFirstpage={setFirstpage}
          handlePageActivate={handlePageActivate}
          activepage={activepage}
          handleClickTabBar={handleClickTabBar}
        />
        <div className="overflow-auto max-h-[820px]">
          <DesignWorkspace />
        </div>
      </div>
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
                    className="bg-gray-100 p-2 mb-4 mt-1 rounded-md focus:outline-none focus:border-blue-500 w-full text-black"
                    value={pagename}
                    onChange={(event) =>
                      handlePnameChange(event, SetNewPageName)
                    }
                    required
                  />
                  {/* <label>Width:</label>
                  <div className="flex w-full h-full">
                    <input
                      type="text"
                      placeholder="ex. 1920"
                      className="bg-gray-100 p-2 mb-4 mt-1 rounded-md focus:outline-none focus:border-blue-500 w-full text-black"
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
                      <option value="%">%</option>
                      <option value="vh">vh</option>
                      <option value="vw">vw</option>
                    </select>
                  </div>
                  <label>Height:</label>
                  <div className="flex w-full h-full">
                    <input
                      type="text"
                      placeholder="ex. 1080"
                      className="bg-gray-100 p-2 mb-4 mt-1 rounded-md focus:outline-none focus:border-blue-500 w-full text-black"
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
                      <option value="%">%</option>
                      <option value="vh">vh</option>
                      <option value="vw">vw</option>
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
                  </div> */}
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
    </>
  );
};

export default MidResult;
