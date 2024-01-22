import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { parse } from "node-html-parser";
import {
  BorderColorChange,
  BorderStyleChange,
  BorderSizeChange,
  BorderRadiusChange,
} from "../../features/counter/counterSlice";

const PropertiesStyleBoarder = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);

  const root = parse(counterState.value);

  const StyleBorderOptions = [
    { value: "none", label: "none" },
    { value: "dotted", label: "dotted" },
    { value: "dashed", label: "dashed" },
    { value: "solid", label: "solid" },
    { value: "double", label: "double" },
    { value: "groove", label: "groove" },
    { value: "ridge", label: "ridge" },
    { value: "inset", label: "inset" },
    { value: "outset", label: "outset" },
  ];

  const handleBorderColorChange = (event) => {
    const borderColor = event.target.value;
    dispatch(BorderColorChange(borderColor.toUpperCase()));
  };

  const handleBorderStyleChange = () => {
    let e = document.getElementsByClassName("BorderStyleInputChange")[0];
    const borderStyleValue = e.value;
    dispatch(BorderStyleChange(borderStyleValue));
  };

  const handleBorderSizeChange = (event) => {
    const borderSizeValue = event.target.value;
    dispatch(BorderSizeChange(borderSizeValue));
  };

  const handleBorderRadiusChange = (event) => {
    const borderRadiusValue = event.target.value;
    dispatch(BorderRadiusChange(borderRadiusValue));
  };

  const getSelectedBorderColorValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "#000000";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "#000000";
    }

    const styleArray = targetNodeStyle.split(";");

    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "border-color") {
        return style[1].trim();
      }
    }

    return "#000000";
  };

  const getSelectedBorderStyleValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "none";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "none";
    }

    const styleArray = targetNodeStyle.split(";");

    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "border-style") {
        return style[1].trim();
      }
    }

    return "none";
  };

  const getSelectedBorderSizeValue = () => {
    // const targetNode = root.querySelector(counterState.currentFocus);

    // if (!targetNode) {
    //   return "";
    // }

    // const targetNodeStyle = targetNode.getAttribute("style");

    // if (!targetNodeStyle) {
    //   return "";
    // }

    // const styleArray = targetNodeStyle.split(";");

    // for (let i = 0; i < styleArray.length; i++) {
    //   const style = styleArray[i].split(":");

    //   if (style[0].trim() === "border-width") {
    //     return style[1].trim().replace("px", "");
    //   }
    // }

    // return "";
  };

  const getSelectedBorderRadiusValue = () => {
    // const targetNode = root.querySelector(counterState.currentFocus);

    // if (!targetNode) {
    //   return "";
    // }

    // const targetNodeStyle = targetNode.getAttribute("style");

    // if (!targetNodeStyle) {
    //   return "";
    // }

    // const styleArray = targetNodeStyle.split(";");

    // for (let i = 0; i < styleArray.length; i++) {
    //   const style = styleArray[i].split(":");

    //   if (style[0].trim() === "border-radius") {
    //     return style[1].trim().replace("px", "");
    //   }
    // }

    // return "";
  };

  return (
    <div className="flex flex-col w-full mt-2">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Border style</p>
        </div>
        <div className="w-7/12 text-black">
          <select
            options={StyleBorderOptions}
            className="p-1 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            class="BorderStyleInputChange"
            value={getSelectedBorderStyleValue()}
            onChange={handleBorderStyleChange}
          >
            {StyleBorderOptions.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Border size</p>
        </div>
        <div className="w-3/12">
          <input
            type="text"
            className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
            placeholder="0"
            value = {getSelectedBorderSizeValue()}
            onChange={(event) => handleBorderSizeChange(event)}
          />
        </div>
        <div className="w-3/12 pl-2">
          <p>px</p>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Border radius</p>
        </div>
        <div className="w-3/12">
        <input
            type="text"
            className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
            placeholder="0"
            value = {getSelectedBorderRadiusValue()}
            onChange={(event) => handleBorderRadiusChange(event)}
          />
        </div>
        <div className="w-3/12 pl-2">
          <p>px</p>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Border Color</p>
        </div>
        <div className="w-7/12 flex flex-row items-center">
          <div className="text-center mr-1 w-9 h-9">
            <input
              type="color"
              value={getSelectedBorderColorValue().slice(0, 7)}
              onChange={handleBorderColorChange}
              className="rounded-full border-1 border-neutral-600 bg-neutral-700 text-white text-center w-full h-full"
              placeholder="auto"
            />
          </div>
          <div className="w-6/12 text-center ml-1">
            <p
              contentEditable // Add contentEditable attribute
              onBlur={(e) => {
                const borderColor = e.target.innerText.trim();
                dispatch(BorderColorChange(borderColor.toUpperCase()));
              }}
              style={{ color: "white" }}
            >
              {getSelectedBorderColorValue().slice(0, 7).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesStyleBoarder;
