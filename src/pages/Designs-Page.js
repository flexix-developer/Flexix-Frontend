import React, { useState } from "react";
import NavBarDesign from "../components/NavbarDesign";
import Properties from "../components/Properties";
import Toolbox from "../components/Toolbox";
import { CgCloseO } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";

const DesignPage = () => {
  const [selectedComponent, setSelectedComponent] = useState("Toolbox");

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };
  
  return (
    <div className="flex flex-col h-screen">
      <NavBarDesign />
      <div className="flex flex-row flex-1">
        <div className="flex flex-col w-2/12">
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-6/12 items-center p-1 bg-neutral-700 text-white text-xl">
              <p>Page Explorer</p>
            </div>
            <div className="flex flex-col w-6/12 items-center p-1 bg-neutral-800 text-white text-xl">
              <p>Layer Explorer</p>
            </div>
          </div>
          <div className="bg-neutral-700 flex-1">
            {/* Component */}
          </div>
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
              <div className="rounded-bl-md rounded-tr-md bg-neutral-700 px-2 py-1">
                <IoMdAdd color="white" size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white">
            {/* Main */}
          </div>
        </div>
        <div className="flex flex-col w-2/12">
        <div className="flex flex-row w-full">
        <div
            onClick={() => handleComponentClick("Toolbox")}
            className={`flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-white text-xl ${
            selectedComponent === "Toolbox" ? "bg-neutral-700" : "bg-neutral-800"
            }`}
        >
            <p>Toolbox</p>
        </div>
        <div
            onClick={() => handleComponentClick("Properties")}
            className={`flex flex-col cursor-pointer w-6/12 items-center p-1 bg-neutral-700 text-white text-xl ${
            selectedComponent === "Properties" ? "bg-neutral-700" : "bg-neutral-800"
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
    </div>
  );
};

export default DesignPage;
