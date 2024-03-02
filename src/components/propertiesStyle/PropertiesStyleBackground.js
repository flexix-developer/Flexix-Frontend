import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundColorChange, BackgroundColorOpacityChange } from "../../features/counter/counterSlice";
import { parse } from "node-html-parser";

const PropertiesStyleBackground = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);
  const root = parse(counterState.value);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    dispatch(BackgroundColorChange(newColor.toUpperCase()));
  };

  const getSelectedColorValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "#FFFFFF"; // Default value if no targetNode is found
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "#FFFFFF"; // Default value if no style is found
    }

    const styleArray = targetNodeStyle.split(";");

    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "background-color") {
        return style[1].trim();
      }
    }

    return "#FFFFFF"; // Default value if no background-color is found

  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-2/12 pl-2">
          <p>Fill</p>
        </div>
        <div className="w-9/12 flex flex-row items-center">
          <div className="text-center mr-1 w-24 h-9">
            <input
              type="color"
              value={getSelectedColorValue().slice(0, 7)}
              onChange={handleColorChange}
              className="bg-neutral-700 text-white text-center w-full h-full"
              placeholder="auto"
            />
          </div>
          <div className="w-5/12 text-center ml-4 mr-4">
          <p
              contentEditable  // Add contentEditable attribute
              onBlur={(e) => {
                const newColor = e.target.innerText.trim();
                dispatch(BackgroundColorChange(newColor.toUpperCase()));
              }}
              style={{ color: "white" }}
              className="tooltip"
              title="Hex Color"
            >
              {getSelectedColorValue().slice(0, 7).toUpperCase()}
            </p>
          </div>
          <div className="flex flex-row w-7/12 text-center mr-4">
          <p
              contentEditable  // Add contentEditable attribute
              onBlur={(e) => {
                const newOpacity = e.target.innerText.trim();
                dispatch(BackgroundColorOpacityChange(newOpacity));
              }}
              style={{ color: "white" }}
              className="w-6/12 tooltip"
              title="Opacity"
            >
              100
            </p>
            <p className="w-1/12">%</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesStyleBackground;
