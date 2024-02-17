import PropertiesStyle from "../propertiesStyle/PropertiesStyle";
import PropertiesOptions from "../propertiesOptions/PropertiesOptions";
import PropertiesData from "../propertiesData/PropertiesData";
import { useState } from "react";

const Properties = ({ activepage }) => {
  const [selectedComponent, setSelectedComponent] = useState("PropertiesStyle");

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex flex-col w-full h-full bg-neutral-700">
      <div className="flex flex-row justify-center mx-6 my-2 text-white w-12/12">
        <div
          className={`flex flex-row w-3/12 justify-center p-1 border-2 border-y-neutral-500 border-l-neutral-500 border-r-neutral-800  rounded-l-xl cursor-pointer ${
            selectedComponent === "PropertiesOptions"
              ? "bg-blue-500 text-black"
              : "bg-neutral-800 text-white"
          }`}
          onClick={() => handleComponentClick("PropertiesOptions")}
        >
          <p className="text-center pl-1">Options</p>
        </div>
        <div
          className={`flex flex-row w-3/12 justify-center p-1 cursor-pointer border-2 border-y-neutral-500 border-x-neutral-800 ${
            selectedComponent === "PropertiesStyle"
              ? "bg-blue-500 text-black"
              : "bg-neutral-800 text-white"
          }`}
          onClick={() => handleComponentClick("PropertiesStyle")}
        >
          <p className="text-center">Style</p>
        </div>
        <div
          className={`flex flex-row w-3/12 justify-center p-1 border-2 border-y-neutral-500 border-r-neutral-500 border-l-neutral-800 rounded-r-xl cursor-pointer ${
            selectedComponent === "PropertiesData"
              ? "bg-blue-500 text-black"
              : "bg-neutral-800 text-white"
          }`}
          onClick={() => handleComponentClick("PropertiesData")}
        >
          <p className="text-center">Data</p>
        </div>
      </div>
      <div>
        {selectedComponent === "PropertiesOptions" && <PropertiesOptions />}
        {selectedComponent === "PropertiesStyle" && <PropertiesStyle />}
        {selectedComponent === "PropertiesData" && (
          <PropertiesData activepage={activepage} />
        )}
      </div>
    </div>
  );
};

export default Properties;
