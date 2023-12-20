import React, { useState } from "react";
import WidgetsTitle from "../toolboxWidgets/ToolboxWidgetsTitle";
import Select from "react-select";

const PropertiesData = () => {
  const eventOptions = [
    { value: "Click", label: "Click" },
    { value: "Hover", label: "Hover" },
    { value: "Focus", label: "Focus" },
    { value: "Load", label: "Load" },
  ];

  const handleEventChange = (selectedOption) => {
    console.log("Selected event:", selectedOption.value);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลง Event
  };

  const [isEventVisible, setEventVisible] = useState(true);

  const handleWidgetsToggle = (widgetType, isOpen) => {
    switch (widgetType) {
      case "Element event":
        setEventVisible(isOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <WidgetsTitle
        title="Element event"
        onToggle={(isOpen) => handleWidgetsToggle("Element event", isOpen)}
      />
      {isEventVisible && (
        <div className="flex flex-col w-full mt-2">
          <div className="flex flex-row w-full justify-start pl-3 p-2 items-center text-white">
            <div className="w-1/12 mr-2">
              <p>On</p>
            </div>
            <div className="w-5/12 mr-2">
              <Select
                options={eventOptions}
                className="text-md text-black"
                onChange={handleEventChange}
              />
            </div>
            <div className="w-1/12 ml-2">
              <p>do</p>
            </div>
            <div className="w-4/12 ml-2">
              <button className="bg-blue-600 text-white p-2 rounded">
                Edit Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesData;
