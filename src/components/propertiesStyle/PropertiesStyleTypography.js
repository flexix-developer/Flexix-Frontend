import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontFamilyChange, FontSizeChange, TextColorChange,
  TextStyleBold, TextStyleItalic, TextStyleUnderline, TextStyleLineThrough,
  TextAlignLeft, TextAlignCenter, TextAlignRight, TextAlignJustify } from "../../features/counter/counterSlice";
import { parse } from "node-html-parser";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
} from "react-icons/md";

const PropertiesStyleTypography = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);

  const root = parse(counterState.value);

  const fontOptions = [
    { value: "font-sans", label: "font-sans" },
    { value: "font-serif", label: "font-serif" },
    { value: "font-mono", label: "font-mono" },
  ];

  const sizeOptions = [
    { value: "text-xs", label: "text-xs" },
    { value: "text-sm", label: "text-sm" },
    { value: "text-base", label: "text-base" },
    { value: "text-lg", label: "text-lg" },
    { value: "text-xl", label: "text-xl" },
    { value: "text-2xl", label: "text-2xl" },
    { value: "text-3xl", label: "text-3xl" },
    { value: "text-4xl", label: "text-4xl" },
    { value: "text-5xl", label: "text-5xl" },
    { value: "text-6xl", label: "text-6xl"},
    { value: "text-7xl", label: "text-7xl" },
    { value: "text-8xl", label: "text-8xl" },
    { value: "text-9xl", label: "text-9xl" },
  ];

  const getSelectedFontValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "font-sans"; 
    }

    const fontClasses = [
      "font-sans",
      "font-serif",
      "font-mono",
    ];

    for (const fontClass of fontClasses) {
      if (targetNode.classList.contains(fontClass)) {
        return fontClass;
      }
    }

    return "";
  };

  const getSelectedFontSizeValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "text-base";
    }

    const fontSizeClasses = [
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
      "text-7xl",
      "text-8xl",
      "text-9xl",
    ];

    for (const fontSizeClass of fontSizeClasses) {
      if (targetNode.classList.contains(fontSizeClass)) {
        return fontSizeClass;
      }
    }

    return "";
  };

  const getSelectedTextColorValue = () => {
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

      if (style[0].trim() === "color") {
        return style[1].trim();
      }
    }

    return "#000000";
  };

  const handleFontChange = () => {
    let e = document.getElementsByClassName("FontInputChange")[0];
    const fontValue = e.value;
    dispatch(FontFamilyChange(fontValue));
  };

  const handleSizeChange = () => {
    let e = document.getElementsByClassName("SizeInputChange")[0];
    const sizeValue = e.value;
    dispatch(FontSizeChange(sizeValue));
  };

  const handleTextColorChange = (event) => {
    const textColor = event.target.value;
    dispatch(TextColorChange(textColor.toUpperCase()));
  };

  const isBold = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("font-bold");
  };

  const isItalic = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("italic");
  };

  const isUnderlined = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("underline");
  };

  const isStrikethrough = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("line-through");
  };

  const isTextAlignLeft = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("text-left");
  };

  const isTextAlignCenter = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("text-center");
  };

  const isTextAlignRight = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("text-right");
  };

  const isTextAlignJustify = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("text-justify");
  };

  const handleTextStylesBold = () => {
    dispatch(TextStyleBold());
  };

  const handleTextStylesItalic = () => {
    dispatch(TextStyleItalic());
  };

  const handleTextStylesUnderline = () => {
    dispatch(TextStyleUnderline());
  };

  const handleTextStylesStrikethrough = () => {
    dispatch(TextStyleLineThrough());
  };

  const handleTextAlignLeft = () => {
    dispatch(TextAlignLeft());
  };

  const handleTextAlignCenter = () => {
    dispatch(TextAlignCenter());
  };

  const handleTextAlignRight = () => {
    dispatch(TextAlignRight());
  };

  const handleTextAlignJustify = () => {
    dispatch(TextAlignJustify());
  }
  
  return (
    <div className="flex flex-col w-full mt-2">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Font name</p>
        </div>
        <div className="w-7/12 text-black">
          <select 
            className="FontInputChange"
            value={getSelectedFontValue()}
            onChange={handleFontChange}
          >
            {fontOptions.map((Option) => (
              <option key={Option.value} value={Option.value}>
                {Option.label}
                </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Font size</p>
        </div>
        <div className="w-4/12 text-black">
          <select
            className="SizeInputChange"
            value={getSelectedFontSizeValue()}
            onChange={handleSizeChange}
            >
            {sizeOptions.map((Option) => (
              <option key={Option.value} value={Option.value}>
                {Option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-4/12 pl-2">
          <p>Text Color</p>
        </div>
        <div className="w-9/12 flex flex-row items-center ml-9">
          <div className="text-center mr-1 w-9 h-9">
            <input
              type="color"
              value={getSelectedTextColorValue().slice(0, 7)}
              onChange={handleTextColorChange}
              className="rounded-full border-1 border-neutral-600 bg-neutral-700 text-white text-center w-full h-full"
              placeholder="auto"
            />
          </div>
          <div className="w-/12 text-center ml-4 mr-4">
          <p
              contentEditable  // Add contentEditable attribute
              onBlur={(e) => {
                const textColor = e.target.innerText.trim();
                dispatch(TextColorChange(textColor.toUpperCase()));
              }}
              style={{ color: "white" }}
            >
              {getSelectedTextColorValue().slice(0, 7).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start pb-2 items-center">
        <div className="flex flex-row w-6/12 justify-between mx-2">
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer" 
          onClick={handleTextStylesBold}
          >
            {isBold() ? (<MdFormatBold color="skyblue" />) : (<MdFormatBold />)}
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer"
          onClick={handleTextStylesItalic}
          >
            {isItalic() ? (<MdFormatItalic color="skyblue" />) : (<MdFormatItalic />)}
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer"
          onClick={handleTextStylesUnderline}
          >
            {isUnderlined() ? (<MdFormatUnderlined color="skyblue" />) : (<MdFormatUnderlined />)}
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer"
          onClick={handleTextStylesStrikethrough}
          >
            {isStrikethrough() ? (<MdStrikethroughS color="skyblue" />) : (<MdStrikethroughS />)}
          </div>
        </div>
        <div className="flex flex-row w-6/12 justify-between">
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer"
          onClick={handleTextAlignLeft}
          >
            {isTextAlignLeft() ? (<MdFormatAlignLeft color="skyblue" />) : (<MdFormatAlignLeft />)}
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer"
          onClick={handleTextAlignCenter}
          >
            {isTextAlignCenter() ? (<MdFormatAlignCenter color="skyblue" />) : (<MdFormatAlignCenter />)}
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer"
          onClick={handleTextAlignRight}
          >
            {isTextAlignRight() ? (<MdFormatAlignRight color="skyblue" />) : (<MdFormatAlignRight />)}
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer"
          onClick={handleTextAlignJustify}
          >
            {isTextAlignJustify() ? (<MdFormatAlignJustify color="skyblue" />) : (<MdFormatAlignJustify />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesStyleTypography;
