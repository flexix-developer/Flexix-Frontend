import React, { useState } from "react";
import WidgetsTitle from "../toolboxWidgets/ToolboxWidgetsTitle";

const PropertiesOptionsForm = () => {

    const methodOption = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
  ];

  const subPageOption = [
    { value: "null", label: "null" },
    { value: "null", label: "null" },
  ];


  const [isBlockOptionVisible, setBlockOptionVisible] = useState(true);
  const handleWidgetsToggle = (widgetType, isOpen) => {
    switch (widgetType) {
      case "Block Option":
        setBlockOptionVisible(isOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row pl-4 py-2 text-lg">
        <p>Name</p>
      </div>
      <div className="flex flex-row pl-4 pb-2">
        <input
          className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600 resize-none"
          placeholder="Enter some text ..."
        />
      </div>
      <div className="flex flex-row pl-4 py-2 text-lg">
        <p>Action</p>
      </div>
      <div className="flex flex-row pl-4 pb-4">
        <input
          className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600 resize-none"
          placeholder="url/product/all"
        />
      </div>
      <WidgetsTitle
        title="Advanced Option"
        onToggle={(isOpen) => handleWidgetsToggle("Block Option", isOpen)}
      />
      {isBlockOptionVisible && (
        <div className="py-2">
          <div className="flex flex-row pl-4 py-2 text-lg">
            <p>Method</p>
          </div>
          <div className="flex flex-row pl-4 pb-2 text-black">
            <select className="MethodInputChange">
              {methodOption.map((Option) => (
                <option key={Option.value} value={Option.value}>
                  {Option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <WidgetsTitle
        title="Advanced Option"
        onToggle={(isOpen) => handleWidgetsToggle("Block Option", isOpen)}
      />
      {isBlockOptionVisible && (
        <div>
          <div className="flex flex-row pl-4 py-2 text-lg">
            <p>Page</p>
          </div>
          <div className="flex flex-row pl-4 pb-2 text-black">
            <select className="MethodInputChange">
              {subPageOption.map((Option) => (
                <option key={Option.value} value={Option.value}>
                  {Option.label}
                </option>
              ))}
            </select>
            <button className="bg-blue-500 text-white p-1 px-2 rounded ml-2">Setting</button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default PropertiesOptionsForm;
