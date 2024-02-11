import React, { useEffect, useState } from "react";
import WidgetsTitle from "../toolboxWidgets/ToolboxWidgetsTitle";
import Select from "react-select";
import PopupEditAction from "../editAction/EditActionPopUp";
import { useSelector, useDispatch } from "react-redux";

const PropertiesData = () => {
  const [isEventVisible, setEventVisible] = useState(true);
  const [CheckPopupEditAction, setCheckPopupEditAction] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to track selected event option
  const [lastSelect, setLastSelect] = useState(null);
  const { counter } = useSelector((state) => state);
  const { currentFocus: currentFocus } = counter;
  const eventOptions = [
    { value: "Click", label: "Click" },
    // { value: "Hover", label: "Hover" },
    // { value: "Focus", label: "Focus" },
    { value: "Load", label: "Load" },
  ];
  const handleClosePopupEditAction = () => {
    setCheckPopupEditAction(false);
  };

  const handleEventChange = (selectedOption) => {
    setSelectedEvent(selectedOption);
    console.log("Selected event:", selectedOption.value);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลง Event
  };
  const handleWidgetsToggle = (widgetType, isOpen) => {
    switch (widgetType) {
      case "Element event":
        setEventVisible(isOpen);
        break;
      default:
        break;
    }
  };

  const handleClickEidtAction = () => {
    setCheckPopupEditAction(true);
    console.log("Edit Action", PopupEditAction);
    setLastSelect(currentFocus);
  };

  useEffect(() => {
    console.log(lastSelect);
  }, [lastSelect]);

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
              <button
                className="bg-blue-600 text-white p-2 rounded"
                onClick={handleClickEidtAction}
              >
                Edit Action
              </button>
            </div>
          </div>
        </div>
      )}
      {CheckPopupEditAction &&
        selectedEvent?.value === "Load" && ( // Use the selectedEvent state for conditional rendering
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
            <PopupEditAction
              handleClosePopupEditAction={handleClosePopupEditAction}
              lastSelect={lastSelect}
            />
          </div>
        )}
    </div>
  );
};

export default PropertiesData;
