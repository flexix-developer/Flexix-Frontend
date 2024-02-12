import React from "react";
import { useDispatch } from "react-redux";
import {
  HeightInputChange,
} from "../../features/counter/counterSlice";

const PropertiesOptionsCol = () => {
  const dispatch = useDispatch();

  const handleHeightInputChange = (value) => {
    const heightValue = value;
    console.log(heightValue);
    dispatch(HeightInputChange(heightValue));
  };

  return (
    <div className="flex flex-col w-full p-2">
      <div className="flex flex-row pl-2 pb-1 text-lg">
        <p>Column Layouts</p>
      </div>
      <div className="flex flex-col bg-neutral-800 p-2 rounded-md">
        <div className="flex flex-row w-full">
          <div className="flex flex-row w-6/12 items-center justify-center bg-neutral-900 p-2 m-1 rounded-sm">
            <div className="flex justify-center bg-neutral-500 text-black font-bold w-full rounded-sm cursor-pointer">
              <p>1/1</p>
            </div>
          </div>
          <div className="flex flex-row w-6/12 bg-neutral-900 p-2 m-1 rounded-sm cursor-pointer">
            <div className="w-6/12 flex items-center justify-center bg-neutral-500 text-black font-bold mr-1 rounded-sm">
              <p>1/2</p>
            </div>
            <div className="w-6/12 flex items-center justify-center bg-neutral-500 text-black font-bold rounded-sm">
              <p>1/2</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row w-6/12 bg-neutral-900 p-2 m-1 rounded-sm cursor-pointer">
            <div className="w-4/12 flex items-center justify-center bg-neutral-500 text-black font-bold mr-1 rounded-sm">
              <p>1/3</p>
            </div>
            <div className="w-4/12 flex items-center justify-center bg-neutral-500 text-black font-bold mr-1 rounded-sm">
              <p>1/3</p>
            </div>
            <div className="w-4/12 flex items-center justify-center bg-neutral-500 text-black font-bold rounded-sm">
              <p>1/3</p>
            </div>
          </div>
          <div className="flex flex-row w-6/12 bg-neutral-900 p-2 m-1 rounded-sm cursor-pointer">
            <div className="w-3/12 flex items-center justify-center bg-neutral-500 text-black font-bold mr-1 rounded-sm">
              <p>1/4</p>
            </div>
            <div className="w-3/12 flex items-center justify-center bg-neutral-500 text-black font-bold mr-1 rounded-sm">
              <p>1/4</p>
            </div>
            <div className="w-3/12 flex items-center justify-center bg-neutral-500 text-black font-bold mr-1 rounded-sm">
              <p>1/4</p>
            </div>
            <div className="w-3/12 flex items-center justify-center bg-neutral-500 text-black font-bold rounded-sm">
              <p>1/4</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row w-6/12 bg-neutral-900 p-2 m-1 rounded-sm cursor-pointer">
            <div className="w-5/12 flex items-center justify-center bg-neutral-500 text-black font-bold mr-1 rounded-sm">
              <p>1/3</p>
            </div>
            <div className="w-7/12 flex items-center justify-center bg-neutral-500 text-black font-bold rounded-sm">
              <p>2/3</p>
            </div>
          </div>
          <div className="flex flex-row w-6/12 bg-neutral-900 p-2 m-1 cursor-pointer">
            <div className="w-7/12 flex items-center justify-center bg-neutral-500 text-black font-bold mr-1 rounded-sm">
              <p>2/3</p>
            </div>
            <div className="w-5/12 flex items-center justify-center bg-neutral-500 text-black font-bold rounded-sm">
              <p>1/3</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row pl-2 pb-1 text-lg mt-2">
        <p>Link URL</p>
      </div>
      <div className="flex flex-row pl-2 pb-1">
        <input
          type="text"
          placeholder="e.g. https://www.google.com"
          className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600"
        />
      </div>
      <div className="flex flex-row pl-2 pb-1 text-xs w-full text-neutral-400">
        <p>Set this to make this whole block link somewhere</p>
      </div>
    </div>
  );
};

export default PropertiesOptionsCol;
