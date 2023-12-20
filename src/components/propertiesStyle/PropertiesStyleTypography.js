import React, { useState } from "react";
import Select from "react-select";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
} from "react-icons/md";

const PropertiesStyleTypography = () => {
  const fontOptions = [
    { value: "Arial", label: "Arial" },
    { value: "Verdana", label: "Verdana" },
    { value: "Helvetica", label: "Helvetica" },
    { value: "Tahoma", label: "Tahoma" },
    { value: "Trebuchet MS", label: "Trebuchet MS" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Georgia", label: "Georgia" },
    { value: "Garamond", label: "Garamond" },
    { value: "Courier New", label: "Courier New" },
    { value: "Brush Script MT", label: "Brush Script MT" },
  ];

  const sizeOptions = [];
  for (let i = 1; i <= 100; i++) {
    i++;
    sizeOptions.push({ value: i, label: i });
  }

  const [currentTextColor, setCurrentTextColor] = useState("#000000");

  const handleFontChange = (selectedOption) => {
    console.log("Selected font:", selectedOption.value);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลง Font
  };

  const handleSizeChange = (selectedOption) => {
    console.log("Selected font size:", selectedOption.value);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลง Font Size
  };

  const handleTextColorChange = (event) => {
    const newColor = event.target.value;
    setCurrentTextColor(newColor);
    console.log("Selected text color:", newColor);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลง Text Color
  };

  const handleFormatAction = (action) => {
    alert(`Clicked ${action} button`);
    // เพิ่มโค้ดที่ต้องการทำเมื่อคลิกที่ปุ่ม Format (Bold, Italic, Underline, Strikethrough)
  };

  const handleAlignAction = (alignment) => {
    alert(`Clicked Align ${alignment} button`);
    // เพิ่มโค้ดที่ต้องการทำเมื่อคลิกที่ปุ่ม Align (Left, Center, Right)
  };

  return (
    <div className="flex flex-col w-full mt-2">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Font name</p>
        </div>
        <div className="w-7/12">
          <Select
            options={fontOptions}
            className="text-md text-black"
            onChange={handleFontChange}
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Font size</p>
        </div>
        <div className="w-4/12">
          <Select
            options={sizeOptions}
            className="text-md text-black"
            onChange={handleSizeChange}
          />
        </div>
        <div className="w-3/12 pl-2">
          <p>px</p>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-4/12 pl-2">
          <p>Text Color</p>
        </div>
        <div className="w-8/12 flex flex-row items-center ml-9">
          <div className="text-center mr-1 w-9 h-9">
            <input
              type="color"
              value={currentTextColor}
              onChange={handleTextColorChange}
              className="rounded-full border-1 border-neutral-600 bg-neutral-700 text-white text-center w-full h-full"
              placeholder="auto"
            />
          </div>
          <div className="w-2/12 text-center ml-4 mr-4">
            {currentTextColor.replace("#", "").toUpperCase()}
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="flex flex-row w-6/12 justify-between mx-2">
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer" onClick={() => handleFormatAction("Bold")} >
            <MdFormatBold />
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer" onClick={() => handleFormatAction("Italic")} >
            <MdFormatItalic />
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer" onClick={() => handleFormatAction("Underlined")} >
            <MdFormatUnderlined />
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer" onClick={() => handleFormatAction("StrikethroughS")} >
            <MdStrikethroughS />
          </div>
        </div>
        <div className="flex flex-row w-6/12 justify-between mx-6">
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer" onClick={() => handleAlignAction("Left")}>
            <MdFormatAlignLeft />
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer" onClick={() => handleAlignAction("Center")}>
            <MdFormatAlignCenter />
          </div>
          <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer" onClick={() => handleAlignAction("Right")}>
            <MdFormatAlignRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesStyleTypography;
