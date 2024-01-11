import React from "react";
import { useDispatch } from "react-redux";
import { AlignHorizontalLeft, AlignHorizontalCenter, AlignHorizontalRight, AlignVerticalBottom, AlignVerticalCenter, AlignVerticalTop } from "../../features/counter/counterSlice";

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

  const handleAlignHorizontalLeft = () => {
    console.log("Align Horizontal Left clicked");
    dispatch(AlignHorizontalLeft());
  };

  const handleAlignHorizontalCenter = () => {
    console.log("Align Horizontal Center clicked");
    dispatch(AlignHorizontalCenter());
  };

  const handleAlignHorizontalRight = () => {
    console.log("Align Horizontal Right clicked");
    dispatch(AlignHorizontalRight());
  };

  const handleAlignVerticalBottom = () => {
    console.log("Align Vertical Bottom clicked");
    dispatch(AlignVerticalBottom());
  };

  const handleAlignVerticalCenter = () => {
    console.log("Align Vertical Center clicked");
    dispatch(AlignVerticalCenter());
  };

  const handleAlignVerticalTop = () => {
    console.log("Align Vertical Top clicked");
    dispatch(AlignVerticalTop());
  };

  const handleWidthInputChange = (event) => {
    const widthValue = event.target.value;
    console.log("Width changed to:", widthValue);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนค่า Width
  };

  const handleHeightInputChange = (event) => {
    const heightValue = event.target.value;
    console.log("Height changed to:", heightValue);
    // เพิ่มโค้ดที่ต้องการทำเมื่อมีการเปลี่ยนค่า Height
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-3/12 pl-2">
          <p>Align</p>
        </div>
        <div className="w-9/12 flex flex-row">
        <div className="w-1/12 text-center mx-2 cursor-pointer" onClick={handleAlignHorizontalLeft}>
          <MdAlignHorizontalLeft />
       </div>
        <div className="w-1/12 text-center mx-2 cursor-pointer" onClick={handleAlignHorizontalRight}>
          <MdAlignHorizontalRight />
        </div>
        <div className="w-1/12 text-center mx-2 cursor-pointer" onClick={handleAlignVerticalBottom}>
          <MdAlignVerticalBottom />
        </div>
        <div className="w-1/12 text-center mx-2 cursor-pointer" onClick={handleAlignVerticalCenter}>
          <MdAlignVerticalCenter />
        </div>
        <div className="w-1/12 text-center mx-2 cursor-pointer" onClick={handleAlignVerticalTop}>
          <MdAlignVerticalTop />
        </div>
        <div className="w-1/12 text-center mx-1 cursor-pointer" onClick={handleAlignHorizontalCenter}>
          <MdAlignHorizontalCenter />
        </div>
      </div>
      </div>

      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-3/12 pl-2 mr-2">
          <p>Width</p>
        </div>
        <div className="w-9/12 flex flex-row">
          <div className="w-7/12 text-center">
            <input
              type="text"
              className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
              placeholder="auto"
              onChange={handleWidthInputChange}
            />
          </div>
          <div className="w-2/12 text-center ml-2 mr-2">
            <p>px</p>
          </div>
        </div>
        <div className="w-3/12 pl-2 mr-2">
          <p>Height</p>
        </div>
        <div className="w-9/12 flex flex-row">
          <div className="w-7/12 text-center">
            <input
              type="text"
              className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
              placeholder="auto"
              onChange={handleHeightInputChange}
            />
          </div>
          <div className="w-2/12 text-center ml-2 mr-2">
            <p>px</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesStyleLayout;
