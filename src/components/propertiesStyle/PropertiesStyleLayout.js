import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlignHorizontalLeft,
  AlignHorizontalCenter,
  AlignHorizontalRight,
  AlignVerticalBottom,
  AlignVerticalCenter,
  AlignVerticalTop,
  WidthInputChange,
  HeightInputChange,
} from "../../features/counter/counterSlice";
import { parse } from "node-html-parser";

import {
  MdAlignHorizontalLeft,
  MdAlignHorizontalCenter,
  MdAlignHorizontalRight,
  MdAlignVerticalBottom,
  MdAlignVerticalCenter,
  MdAlignVerticalTop,
} from "react-icons/md";

const PropertiesStyleLayout = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);

  const root = parse(counterState.value);

  const isJustifyStart = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("justify-start");
  };

  const isJustifyEnd = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("justify-end");
  };

  const isJustifyCenter = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("justify-center");
  };

  const isItemsStart = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("items-start");
  };

  const isItemsEnd = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("items-end");
  };

  const isItemsCenter = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("items-center");
  };

  const getSelectedWidthValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "w-auto"; // Default value if no targetNode is found
    }

    const widthClasses = [
      "w-auto",
      "w-full",
      "w-1/2",
      "w-1/3",
      "w-2/3",
      "w-1/4",
      "w-2/4",
      "w-3/4",
      "w-1/5",
      "w-2/5",
      "w-3/5",
      "w-4/5",
      "w-1/6",
      "w-2/6",
      "w-3/6",
      "w-4/6",
      "w-5/6",
      "w-1/12",
      "w-2/12",
      "w-3/12",
      "w-4/12",
      "w-5/12",
      "w-6/12",
      "w-7/12",
      "w-8/12",
      "w-9/12",
      "w-10/12",
      "w-11/12",
      "w-screen",
      "w-min",
      "w-max",
      "w-fit",
    ];

    for (const widthClass of widthClasses) {
      if (targetNode.classList.contains(widthClass)) {
        return widthClass;
      }
    }

    return ""; // Default value if none of the width classes match
  };

  const getSelectedHeightValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "h-auto"; // Default value if no targetNode is found
    }

    const heightClasses = [
      "h-auto",
      "h-full",
      "h-1/2",
      "h-1/3",
      "h-2/3",
      "h-1/4",
      "h-2/4",
      "h-3/4",
      "h-1/5",
      "h-2/5",
      "h-3/5",
      "h-4/5",
      "h-1/6",
      "h-2/6",
      "h-3/6",
      "h-4/6",
      "h-5/6",
      "h-1/12",
      "h-2/12",
      "h-3/12",
      "h-4/12",
      "h-5/12",
      "h-6/12",
      "h-7/12",
      "h-8/12",
      "h-9/12",
      "h-10/12",
      "h-11/12",
      "h-screen",
      "h-min",
      "h-max",
      "h-fit",
    ];

    for (const heightClass of heightClasses) {
      if (targetNode.classList.contains(heightClass)) {
        return heightClass;
      }
    }

    return ""; // Default value if none of the height classes match
  };

  const handleAlignHorizontalLeft = () => {
    dispatch(AlignHorizontalLeft());
  };

  const handleAlignHorizontalCenter = () => {
    dispatch(AlignHorizontalCenter());
  };

  const handleAlignHorizontalRight = () => {
    dispatch(AlignHorizontalRight());
  };

  const handleAlignVerticalBottom = () => {
    dispatch(AlignVerticalBottom());
  };

  const handleAlignVerticalCenter = () => {
    dispatch(AlignVerticalCenter());
  };

  const handleAlignVerticalTop = () => {
    dispatch(AlignVerticalTop());
  };

  const handleWidthInputChange = () => {
    let e = document.getElementsByClassName("WidthInputChange")[0];
    const widthValue = e.value;
    console.log(widthValue);
    dispatch(WidthInputChange(widthValue));
  };

  const handleHeightInputChange = () => {
    let e = document.getElementsByClassName("HeightInputChange")[0];
    const heightValue = e.value;
    dispatch(HeightInputChange(heightValue));
  };

  const WidthOptions = [
    { value: "w-auto", label: "auto" },
    { value: "w-full", label: "full" },
    { value: "w-1/2", label: "1/2" },
    { value: "w-1/3", label: "1/3" },
    { value: "w-2/3", label: "2/3" },
    { value: "w-1/4", label: "1/4" },
    { value: "w-2/4", label: "2/4" },
    { value: "w-3/4", label: "3/4" },
    { value: "w-1/5", label: "1/5" },
    { value: "w-2/5", label: "2/5" },
    { value: "w-3/5", label: "3/5" },
    { value: "w-4/5", label: "4/5" },
    { value: "w-1/6", label: "1/6" },
    { value: "w-2/6", label: "2/6" },
    { value: "w-3/6", label: "3/6" },
    { value: "w-4/6", label: "4/6" },
    { value: "w-5/6", label: "5/6" },
    { value: "w-1/12", label: "1/12" },
    { value: "w-2/12", label: "2/12" },
    { value: "w-3/12", label: "3/12" },
    { value: "w-4/12", label: "4/12" },
    { value: "w-5/12", label: "5/12" },
    { value: "w-6/12", label: "6/12" },
    { value: "w-7/12", label: "7/12" },
    { value: "w-8/12", label: "8/12" },
    { value: "w-9/12", label: "9/12" },
    { value: "w-10/12", label: "10/12" },
    { value: "w-11/12", label: "11/12" },
    { value: "w-screen", label: "screen" },
    { value: "w-min", label: "min" },
    { value: "w-max", label: "max" },
    { value: "w-fit", label: "fit" },
  ];

  const HeightOptions = [
    { value: "h-auto", label: "auto" },
    { value: "h-full", label: "full" },
    { value: "h-1/2", label: "1/2" },
    { value: "h-1/3", label: "1/3" },
    { value: "h-2/3", label: "2/3" },
    { value: "h-1/4", label: "1/4" },
    { value: "h-2/4", label: "2/4" },
    { value: "h-3/4", label: "3/4" },
    { value: "h-1/5", label: "1/5" },
    { value: "h-2/5", label: "2/5" },
    { value: "h-3/5", label: "3/5" },
    { value: "h-4/5", label: "4/5" },
    { value: "h-1/6", label: "1/6" },
    { value: "h-2/6", label: "2/6" },
    { value: "h-3/6", label: "3/6" },
    { value: "h-4/6", label: "4/6" },
    { value: "h-5/6", label: "5/6" },
    { value: "h-1/12", label: "1/12" },
    { value: "h-2/12", label: "2/12" },
    { value: "h-3/12", label: "3/12" },
    { value: "h-4/12", label: "4/12" },
    { value: "h-5/12", label: "5/12" },
    { value: "h-6/12", label: "6/12" },
    { value: "h-7/12", label: "7/12" },
    { value: "h-8/12", label: "8/12" },
    { value: "h-9/12", label: "9/12" },
    { value: "h-10/12", label: "10/12" },
    { value: "h-11/12", label: "11/12" },
    { value: "h-screen", label: "screen" },
    { value: "h-min", label: "min" },
    { value: "h-max", label: "max" },
    { value: "h-fit", label: "fit" },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-3/12 pl-2">
          <p>Align</p>
        </div>
        <div className="w-9/12 flex flex-row">
          <div
            className="w-1/12 text-center mx-2 cursor-pointer"
            onClick={handleAlignHorizontalLeft}
          >
            {isJustifyStart() ? (
              <MdAlignHorizontalLeft color="skyblue" />
            ) : (
              <MdAlignHorizontalLeft />
            )}
          </div>
          <div
            className="w-1/12 text-center mx-1 cursor-pointer"
            onClick={handleAlignHorizontalCenter}
          >
            {isJustifyCenter() ? (
              <MdAlignHorizontalCenter color="skyblue" />
            ) : (
              <MdAlignHorizontalCenter />
            )}
          </div>
          <div
            className="w-1/12 text-center mx-2 cursor-pointer"
            onClick={handleAlignHorizontalRight}
          >
            {isJustifyEnd() ? (
              <MdAlignHorizontalRight color="skyblue" />
            ) : (
              <MdAlignHorizontalRight />
            )}
          </div>
          <div
            className="w-1/12 text-center mx-2 cursor-pointer"
            onClick={handleAlignVerticalBottom}
          >
            {isItemsEnd() ? (
              <MdAlignVerticalBottom color="skyblue" />
            ) : (
              <MdAlignVerticalBottom />
            )}
          </div>
          <div
            className="w-1/12 text-center mx-2 cursor-pointer"
            onClick={handleAlignVerticalCenter}
          >
            {isItemsCenter() ? (
              <MdAlignVerticalCenter color="skyblue" />
            ) : (
              <MdAlignVerticalCenter />
            )}
          </div>
          <div
            className="w-1/12 text-center mx-2 cursor-pointer"
            onClick={handleAlignVerticalTop}
          >
            {isItemsStart() ? (
              <MdAlignVerticalTop color="skyblue" />
            ) : (
              <MdAlignVerticalTop />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-3/12 pl-2 mr-2">
          <p>Width</p>
        </div>
        <div className="w-9/12 flex flex-row">
          <div className="w-12/12 text-black">
            <select
              className="p-1 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              class="WidthInputChange"
              value={getSelectedWidthValue()}
              onChange={handleWidthInputChange}
            >
              {WidthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-3/12 mr-2">
          <p>Height</p>
        </div>
        <div className="w-9/12 flex flex-row">
          <div className="w-12/12 text-center text-black">
            <select
              className="p-1 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              class="HeightInputChange"
              value={getSelectedHeightValue()}
              onChange={handleHeightInputChange}
            >
              {HeightOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesStyleLayout;
