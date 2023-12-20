import React from "react";
import {
  TbBoxAlignTopFilled,
  TbBoxAlignRightFilled,
  TbBoxAlignBottomFilled,
  TbBoxAlignLeftFilled,
} from "react-icons/tb";

const PropertiesStyleMarginPadding = () => {
  const handleInputChange = (type, index, event) => {
    const newValue = event.target.value;
    console.log(`${type} ${index + 1} changed to:`, newValue);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนแปลงค่า Margin หรือ Padding
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
                  onChange={(event) => handleInputChange("Margin", index, event)}
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
                  onChange={(event) => handleInputChange("Padding", index, event)}
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
