import React, { useState } from "react";
import Select from "react-select";

const PropertiesStyleBoarder = () => {
  const StyleBorderOptions = [
    { value: "Solid", label: "Solid" },
    { value: "Dotted", label: "Dotted" },
    { value: "Dashed", label: "Dashed" },
    { value: "Double", label: "Double" },
    { value: "Groove", label: "Groove" },
    { value: "Ridge", label: "Ridge" },
    { value: "Inset", label: "Inset" },
    { value: "Outset", label: "Outset" },
  ];

  const [currentTextColor, setCurrentTextColor] = useState("#000000");

  const sizeBorderOptions = [];
  for (let i = 1; i <= 20; i++) {
    sizeBorderOptions.push({ value: i, label: i });
  }

  const sizeBorderRadiusOptions = [];
  for (let i = 1; i <= 50; i++) {
    sizeBorderRadiusOptions.push({ value: i, label: i });
  }

  const handleTextColorChange = (event) => {
    setCurrentTextColor(event.target.value);
    console.log("Selected text color:", event.target.value);
  };

  const handleBorderStyleChange = (selectedOption) => {
    console.log("Selected border style:", selectedOption.value);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลง Border Style
  };

  const handleBorderSizeChange = (selectedOption) => {
    console.log("Selected border size:", selectedOption.value);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลง Border Size
  };

  const handleBorderRadiusChange = (selectedOption) => {
    console.log("Selected border radius:", selectedOption.value);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลง Border Radius
  };

  return (
    <div className="flex flex-col w-full mt-2">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Border style</p>
        </div>
        <div className="w-7/12">
          <Select
            options={StyleBorderOptions}
            className="text-md text-black"
            onChange={handleBorderStyleChange}
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Border size</p>
        </div>
        <div className="w-4/12">
          <Select
            options={sizeBorderOptions}
            className="text-md text-black"
            onChange={handleBorderSizeChange}
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
        <div className="w-4/12">
          <Select
            options={sizeBorderRadiusOptions}
            className="text-md text-black"
            onChange={handleBorderRadiusChange}
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
    </div>
  );
};

export default PropertiesStyleBoarder;
