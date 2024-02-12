import PropertiesStyleTypography from "../propertiesStyle/PropertiesStyleTypography";
import { useDispatch, useSelector } from "react-redux";
import { EditText, EditHref } from "../../features/counter/counterSlice";
import { parse } from "node-html-parser";
import React, { useState, useEffect } from 'react';

const PropertiesOptionsLink = () => {
  const dispatch = useDispatch();
    const counterState = useSelector((state) => state.counter);

    const [selectedEditTextValue, setSelectedEditTextValue] = useState('');

  const [linkValue, setLinkValue] = useState("");

  useEffect(() => {
    const targetNode = parse(counterState.value).querySelector(
      `a${counterState.currentFocus}`
    );
    if (targetNode) {
      setLinkValue(targetNode.getAttribute("href"));
    } else {
      setLinkValue("");
    }
  }, [counterState.currentFocus, counterState.value]);

  const handleEditHref = (event) => {
    dispatch(EditHref(event.target.value));
};

    useEffect(() => {
        const targetNode = parse(counterState.value).querySelector(`a${counterState.currentFocus}`);
        if (targetNode) {
            setSelectedEditTextValue(targetNode.text);
        } else {
            setSelectedEditTextValue('');
        }
    }, [counterState.currentFocus, counterState.value]);

    const handleEditText = (event) => {
        dispatch(EditText(event.target.value));
    };

  return (
    <div className="flex flex-col w-full p-2">
      <div className="flex flex-row pl-2 pb-1 text-lg">
        <p>Text</p>
      </div>
      <div className="flex flex-row pl-2 pb-1">
        <textarea
          className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600 resize-none"
          placeholder="Enter some text ..."
          value={selectedEditTextValue}
          onChange={handleEditText}
          rows="6"
        ></textarea>
      </div>
      <div>
        <PropertiesStyleTypography />
      </div>
      <div className="flex flex-row pl-2 pb-1 text-lg mt-2">
        <p>Link URL</p>
      </div>
      <div className="flex flex-row pl-2 pb-1">
        <input
          type="text"
          placeholder="e.g. https://www.google.com"
          value={linkValue}
          onChange={handleEditHref}
          className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600"
        />
      </div>
      <div className="flex flex-row pl-2 pb-1 text-xs w-full text-neutral-400">
        <p>Set this to make this whole block link somewhere</p>
      </div>
    </div>
  );
};

export default PropertiesOptionsLink;
