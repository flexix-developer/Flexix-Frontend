import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parse } from "node-html-parser";
import {
  AddOptionsSelect,
  deleteOption,
  editOptionValue,
  editOptionText,
} from "../../features/counter/counterSlice";
import { IoMdClose } from "react-icons/io";

const PropertiesOptionsSelect = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);
  const root = parse(counterState.value);
  const [options, setOptions] = useState([]);

  // Initialize options state with the values from the select element
  useEffect(() => {
    const selectElement = root.querySelector(counterState.currentFocus);
    if (selectElement) {
      const optionElements = selectElement.querySelectorAll("option");
      const initialValues = Array.from(optionElements, (option) => ({
        id: option.id || initialValues.length + 1,
        text: option.text,
        value: option.hasAttribute("value") ? option.getAttribute("value") : "",
      }));
      setOptions(initialValues);
    }
  }, [root]);

  const handleAddOptionsSelect = () => {
    const newOptionValue = "null"; // You can modify this value as needed
    dispatch(AddOptionsSelect(newOptionValue));
    setOptions([
      ...options,
      { id: options.length + 1, text: newOptionValue, value: newOptionValue },
    ]);
  };

  const handleEditValue = (index, newValue) => {
    dispatch(
      editOptionValue({
        optionIdToEdit: options[index].id,
        newOptionValue: newValue,
      })
    );

    const updatedOptions = [...options];
    updatedOptions[index].value = newValue;
    setOptions(updatedOptions);
  };

  const handleEditOption = (index, newOption) => {
    dispatch(
      editOptionText({
        optionIdToEdit: options[index].id,
        newOptionText: newOption,
      })
    );

    const updatedOptions = [...options];
    updatedOptions[index].text = newOption;
    setOptions(updatedOptions);
  };

  const handleDeleteOption = (index) => {
    dispatch(deleteOption(index));
  };

  const displayOptions = () => {
    return options.map((option, index) => (
      <div key={index} className="border-2 border-neutral-500 my-3">
        <div className="flex flex-row justify-between border-2 border-b-neutral-500 border-neutral-500/0 p-1 pl-3 py-2">
          <p>Option Id: {option.id}</p>
          <IoMdClose
            className="text-red-500"
            onClick={() => handleDeleteOption(option.id)}
          />
        </div>
        <div className="flex flex-row w-full pl-4 pt-4">
          <p>Text:</p>
          <input
            type="text"
            className="text-black ml-4 pl-1"
            value={option.text}
            onChange={(e) => handleEditOption(index, e.target.value)}
          />
        </div>
        <div className="flex flex-row w-full pl-4 py-4">
          <p>Value:</p>
          <input
            type="text"
            className="text-black ml-2 pl-1"
            value={option.value}
            onChange={(e) => handleEditValue(index, e.target.value)}
          />
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="flex flex-col w-full items-center overflow-y-auto h-[680px]">
        <div className="flex flex-col w-11/12 text-white">
          {displayOptions()}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <button
          className="w-11/12 bg-blue-500 text-white ml-3 p-2 rounded-sm"
          onClick={handleAddOptionsSelect}
        >
          Add Option
        </button>
      </div>
      <p className="invisible">Hello Hacker!</p>
      <p className="invisible">i see you.</p>
    </>
  );
};

export default PropertiesOptionsSelect;
