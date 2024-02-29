import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlignHorizontalLeft,
  AlignHorizontalCenter,
  AlignHorizontalRight,
  AlignHorizontalSpaceBetween,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceEvenly,
  AlignHorizontalStretch,
  AlignVerticalBottom,
  AlignVerticalCenter,
  AlignVerticalTop,
  AlignVerticalBaseline,
  AlignVerticalStretch,
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

import { RxSpaceBetweenHorizontally, RxSpaceEvenlyHorizontally, RxStretchHorizontally, RxStretchVertically, RxAlignBaseline  } from "react-icons/rx";
import { LuAlignHorizontalSpaceAround } from "react-icons/lu";

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

  const isJustifySpaceBetween = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("justify-between");
  };

  const isJustifySpaceAround = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("justify-around");
  };

  const isJustifySpaceEvenly = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("justify-evenly");
  };

  const isJustifyStretch = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("justify-stretch");
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

  const isItemsBaseline = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("items-baseline");
  };

  const isItemsStretch = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("items-stretch");
  };

  const getSelectedWidthValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "w-auto"; // Default value if no targetNode is found
    }

    const widthClasses = [
      "w-0",
      "w-px",
      "w-0.5",
      "w-1",
      "w-1.5",
      "w-2",
      "w-2.5",
      "w-3",
      "w-3.5",
      "w-4",
      "w-5",
      "w-6",
      "w-7",
      "w-8",
      "w-9",
      "w-10",
      "w-11",
      "w-12",
      "w-14",
      "w-16",
      "w-20",
      "w-24",
      "w-28",
      "w-32",
      "w-36",
      "w-40",
      "w-44",
      "w-48",
      "w-52",
      "w-56",
      "w-60",
      "w-64",
      "w-72",
      "w-80",
      "w-96",
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
      "h-0",
      "h-px",
      "h-0.5",
      "h-1",
      "h-1.5",
      "h-2",
      "h-2.5",
      "h-3",
      "h-3.5",
      "h-4",
      "h-5",
      "h-6",
      "h-7",
      "h-8",
      "h-9",
      "h-10",
      "h-11",
      "h-12",
      "h-14",
      "h-16",
      "h-20",
      "h-24",
      "h-28",
      "h-32",
      "h-36",
      "h-40",
      "h-44",
      "h-48",
      "h-52",
      "h-56",
      "h-60",
      "h-64",
      "h-72",
      "h-80",
      "h-96",
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

  const handleAlignHorizontalSpaceBetween = () => {
    dispatch(AlignHorizontalSpaceBetween());
  };

  const handleAlignHorizontalSpaceAround = () => {
    dispatch(AlignHorizontalSpaceAround());
  };

  const handleAlignHorizontalSpaceEvenly = () => {
    dispatch(AlignHorizontalSpaceEvenly());
  };

  const handleAlignHorizontalStretch = () => {
    dispatch(AlignHorizontalStretch());
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

  const handleAlignVerticalBaseline = () => {
    dispatch(AlignVerticalBaseline());
  };

  const handleAlignVerticalStretch = () => {
    dispatch(AlignVerticalStretch());
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
    { value: "w-0", label: "0 px" },
    { value: "w-px", label: "1 px" },
    { value: "w-0.5", label: "2 px" },
    { value: "w-1", label: "4 px" },
    { value: "w-1.5", label: "6 px" },
    { value: "w-2", label: "8 px" },
    { value: "w-2.5", label: "10 px" },
    { value: "w-3", label: "12 px" },
    { value: "w-3.5", label: "14 px" },
    { value: "w-4", label: "16 px" },
    { value: "w-5", label: "20 px" },
    { value: "w-6", label: "24 px" },
    { value: "w-7", label: "28 px" },
    { value: "w-8", label: "32 px" },
    { value: "w-9", label: "36 px" },
    { value: "w-10", label: "40 px" },
    { value: "w-11", label: "44 px" },
    { value: "w-12", label: "48 px" },
    { value: "w-14", label: "56 px" },
    { value: "w-16", label: "64 px" },
    { value: "w-20", label: "80 px" },
    { value: "w-24", label: "96 px" },
    { value: "w-28", label: "112 px" },
    { value: "w-32", label: "128 px" },
    { value: "w-36", label: "144 px" },
    { value: "w-40", label: "160 px" },
    { value: "w-44", label: "176 px" },
    { value: "w-48", label: "192 px" },
    { value: "w-52", label: "208 px" },
    { value: "w-56", label: "224 px" },
    { value: "w-60", label: "240 px" },
    { value: "w-64", label: "256 px" },
    { value: "w-72", label: "288 px" },
    { value: "w-80", label: "320 px" },
    { value: "w-96", label: "384 px" },
    { value: "w-1/12", label: "9 %" },
    { value: "w-2/12", label: "17 %" },
    { value: "w-3/12", label: "25 %" },
    { value: "w-4/12", label: "34 %" },
    { value: "w-5/12", label: "42 %" },
    { value: "w-6/12", label: "50 %" },
    { value: "w-7/12", label: "58 %" },
    { value: "w-8/12", label: "67 %" },
    { value: "w-9/12", label: "75 %" },
    { value: "w-10/12", label: "84 %" },
    { value: "w-11/12", label: "91 %" },
    { value: "w-full", label: "100 %" },
    { value: "w-screen", label: "100 vw" },
  ];

  const HeightOptions = [
    { value: "h-auto", label: "auto" },
    { value: "h-0", label: "0 px" },
    { value: "h-px", label: "1 px" },
    { value: "h-0.5", label: "2 px" },
    { value: "h-1", label: "4 px" },
    { value: "h-1.5", label: "6 px" },
    { value: "h-2", label: "8 px" },
    { value: "h-2.5", label: "10 px" },
    { value: "h-3", label: "12 px" },
    { value: "h-3.5", label: "14 px" },
    { value: "h-4", label: "16 px" },
    { value: "h-5", label: "20 px" },
    { value: "h-6", label: "24 px" },
    { value: "h-7", label: "28 px" },
    { value: "h-8", label: "32 px" },
    { value: "h-9", label: "36 px" },
    { value: "h-10", label: "40 px" },
    { value: "h-11", label: "44 px" },
    { value: "h-12", label: "48 px" },
    { value: "h-14", label: "56 px" },
    { value: "h-16", label: "64 px" },
    { value: "h-20", label: "80 px" },
    { value: "h-24", label: "96 px" },
    { value: "h-28", label: "112 px" },
    { value: "h-32", label: "128 px" },
    { value: "h-36", label: "144 px" },
    { value: "h-40", label: "160 px" },
    { value: "h-44", label: "176 px" },
    { value: "h-48", label: "192 px" },
    { value: "h-52", label: "208 px" },
    { value: "h-56", label: "224 px" },
    { value: "h-60", label: "240 px" },
    { value: "h-64", label: "256 px" },
    { value: "h-72", label: "288 px" },
    { value: "h-80", label: "320 px" },
    { value: "h-96", label: "384 px" },
    { value: "h-1/6", label: "17 %" },
    { value: "h-2/6", label: "34 %" },
    { value: "h-3/6", label: "50 %" },
    { value: "h-4/6", label: "67 %" },
    { value: "h-5/6", label: "84 %" },
    { value: "h-full", label: "100 %" },
    { value: "h-screen", label: "100 vh" },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-3/12 pl-2">
          <p>Justify</p>
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
            onClick={handleAlignHorizontalSpaceBetween}
          >
            {isJustifySpaceBetween() ? (
              <RxSpaceBetweenHorizontally  color="skyblue" />
            ) : (
              <RxSpaceBetweenHorizontally  />
            )}
          </div>
          <div
            className="w-1/12 text-center mx-2 cursor-pointer"
            onClick={handleAlignHorizontalSpaceAround}
          >
            {isJustifySpaceAround() ? (
              <LuAlignHorizontalSpaceAround  color="skyblue" />
            ) : (
              <LuAlignHorizontalSpaceAround  />
            )}
            </div>
          <div
            className="w-1/12 text-center mx-2 cursor-pointer"
            onClick={handleAlignHorizontalSpaceEvenly}
          >
            {isJustifySpaceEvenly() ? (
              <RxSpaceEvenlyHorizontally color="skyblue" />
            ) : (
              <RxSpaceEvenlyHorizontally  />
            )}
          </div>
          <div
            className="w-1/12 text-center mx-2 cursor-pointer"
            onClick={handleAlignHorizontalStretch}
          >
            {isJustifyStretch() ? (
              <RxStretchHorizontally color="skyblue" />
            ) : (
              <RxStretchHorizontally/>
            )}
            </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-3/12 pl-2">
          <p>Align</p>
        </div>
        <div className="w-9/12 flex flex-row">
          <div
            className="w-1/12 text-center mx-1 cursor-pointer"
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
          <div
            className="w-1/12 text-center mx-1 cursor-pointer"
            onClick={handleAlignVerticalBaseline}
          >
            {isItemsBaseline() ? (
              <RxAlignBaseline color="skyblue" />
            ) : (
              <RxAlignBaseline />
            )}
            </div>
          <div
            className="w-1/12 text-center mx-2 cursor-pointer"
            onClick={handleAlignVerticalStretch}
          >
            {isItemsStretch() ? (
              <RxStretchVertically color="skyblue" />
            ) : (
              <RxStretchVertically />
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
              className="WidthInputChange"
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
              className="HeightInputChange"
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
