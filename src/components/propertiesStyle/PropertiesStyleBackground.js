import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useDispatch } from "react-redux";
import { BackgroundColorChange } from "../../features/counter/counterSlice";

const PropertiesStyleBackground = () => {
  const dispatch = useDispatch();
  const [currentColor, setCurrentColor] = useState("#000000");
  const [isEyeVisible, setEyeVisible] = useState(true);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setCurrentColor(newColor);
    dispatch(BackgroundColorChange(newColor.toUpperCase()));
  };

  const handleToggleEye = () => {
    setEyeVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-2/12 pl-2">
          <p>Fill</p>
        </div>
        <div className="w-10/12 flex flex-row items-center">
          <div className="text-center mr-1 w-24 h-9">
            <input
              type="color"
              value={currentColor}
              onChange={handleColorChange}
              className="bg-neutral-700 text-white text-center w-full h-full"
              placeholder="auto"
            />
          </div>
          <div className="w-2/12 text-center ml-4 mr-4">
            {currentColor.replace("#", "").toUpperCase()}
          </div>
          <div className="w-2/12 text-center ml-4 mr-4">
            <p>100%</p>
          </div>
          <div className="w-2/12 text-center ml-4 mr-4 cursor-pointer">
            {isEyeVisible ? (
              <GoEye onClick={handleToggleEye} size={20} />
            ) : (
              <GoEyeClosed onClick={handleToggleEye} size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesStyleBackground;
