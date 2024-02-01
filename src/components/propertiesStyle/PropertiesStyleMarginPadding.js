import React from "react";
import {
  TbBoxAlignTopFilled,
  TbBoxAlignRightFilled,
  TbBoxAlignBottomFilled,
  TbBoxAlignLeftFilled,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { parse } from "node-html-parser";
import {
  MaginBottomChange,
  MaginLeftChange,
  MaginRightChange,
  MaginTopChange,
  PaddingBottomChange,
  PaddingLeftChange,
  PaddingRightChange,
  PaddingTopChange,
} from "../../features/counter/counterSlice";

const PropertiesStyleMarginPadding = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);

  const root = parse(counterState.value);

  const handleInputChange = (type, index, event) => {
    let newValue = event.target.value;
    switch (type) {
      case "Margin":
        switch (index) {
          case 0:
            dispatch(MaginTopChange(newValue));
            break;
          case 1:
            dispatch(MaginRightChange(newValue));
            break;
          case 2:
            dispatch(MaginBottomChange(newValue));
            break;
          case 3:
            dispatch(MaginLeftChange(newValue));
            break;
          default:
            break;
        }
        break;
      case "Padding":
        switch (index) {
          case 0:
            dispatch(PaddingTopChange(newValue));
            break;
          case 1:
            dispatch(PaddingRightChange(newValue));
            break;
          case 2:
            dispatch(PaddingBottomChange(newValue));
            break;
          case 3:
            dispatch(PaddingLeftChange(newValue));
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  const getMarginTopValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "";
    }

    const styleArray = targetNodeStyle.split(";");

    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "margin-top") {
        return style[1].trim().replace("px", "");
      }
    }

    return "";
  };

  const getMarginRightValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "";
    }

    const styleArray = targetNodeStyle.split(";");
    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "margin-right") {
        return style[1].trim().replace("px", "");
      }
    }

    return "";
  };

  const getMarginBottomValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "";
    }

    const styleArray = targetNodeStyle.split(";");
    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "margin-bottom") {
        return style[1].trim().replace("px", "");
      }
    }

    return "";
  };

  const getMarginLeftValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "";
    }

    const styleArray = targetNodeStyle.split(";");
    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "margin-left") {
        return style[1].trim().replace("px", "");
      }
    }

    return "";
  };

  const getPaddingTopValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "";
    }

    const styleArray = targetNodeStyle.split(";");
    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "padding-top") {
        return style[1].trim().replace("px", "");
      }
    }

    return "";
  };

  const getPaddingRightValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "";
    }

    const styleArray = targetNodeStyle.split(";");
    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "padding-right") {
        return style[1].trim().replace("px", "");
      }
    }

    return "";
  };

  const getPaddingBottomValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "";
    }

    const styleArray = targetNodeStyle.split(";");

    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "padding-bottom") {
        return style[1].trim().replace("px", "");
      }
    }

    return "";
  };

  const getPaddingLeftValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "";
    }

    const styleArray = targetNodeStyle.split(";");
    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "padding-left") {
        return style[1].trim().replace("px", "");
      }
    }

    return "";
  };

  return (
    <div className="flex flex-col w-full mt-3 pl-2">
      <div className="flex flex-row w-full pl-1 ml-20">
        <p className="mr-7">
          <TbBoxAlignTopFilled />
        </p>
        <p className="mr-6">
          <TbBoxAlignRightFilled />
        </p>
        <p className="mr-6">
          <TbBoxAlignBottomFilled />
        </p>
        <p>
          <TbBoxAlignLeftFilled />
        </p>
      </div>
      <div className="flex flex-row w-full my-2">
        <div className="w-3/12 pl-2">
          <p>Margin</p>
        </div>
        <div className="w-9/12">
          <div className="flex flex-row">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="w-2/12 mr-1">
                <input
                  type="text"
                  className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
                  placeholder="0"
                  onChange={(event) =>
                    handleInputChange("Margin", index, event)
                  }
                  value={
                    index === 0
                      ? getMarginTopValue()
                      : index === 1
                      ? getMarginRightValue()
                      : index === 2
                      ? getMarginBottomValue()
                      : getMarginLeftValue()
                  }
                />
              </div>
            ))}
            <div className="w-2/12 pl-2">
              <p>px</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full my-2">
        <div className="w-3/12 pl-2">
          <p>Padding</p>
        </div>
        <div className="w-9/12">
          <div className="flex flex-row">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="w-2/12 mr-1">
                <input
                  type="text"
                  className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
                  placeholder="0"
                  onChange={(event) =>
                    handleInputChange("Padding", index, event)
                  }
                  value={
                    index === 0
                      ? getPaddingTopValue()
                      : index === 1
                      ? getPaddingRightValue()
                      : index === 2
                      ? getPaddingBottomValue()
                      : getPaddingLeftValue()
                  }
                />
              </div>
            ))}
            <div className="w-2/12 pl-2">
              <p>px</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesStyleMarginPadding;
