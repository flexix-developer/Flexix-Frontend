import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { parse } from "node-html-parser";
import {
  EditName,
  EditPlaceholder,
} from "../../features/counter/counterSlice";

const PropertiesOptionsTextarea = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);

  const [nameValue, setNameValue] = useState("");

  useEffect(() => {
    const targetNode = parse(counterState.value).querySelector(
      `textarea${counterState.currentFocus}`
    );
    if (targetNode) {
      setNameValue(targetNode.getAttribute("name"));
    } else {
      setNameValue("");
    }
  }, [counterState.currentFocus, counterState.value]);

  const handleEditName = (event) => {
    dispatch(EditName(event.target.value));
  };

  const [placeholderValue, setPlaceholderValue] = useState("");

  useEffect(() => {
    const targetNode = parse(counterState.value).querySelector(
      `textarea${counterState.currentFocus}`
    );
    if (targetNode) {
      setPlaceholderValue(targetNode.getAttribute("placeholder"));
    } else {
      setPlaceholderValue("");
    }
  }, [counterState.currentFocus, counterState.value]);

  const handleEditPlaceholder = (event) => {
    dispatch(EditPlaceholder(event.target.value));
  };

    return (
        <div className="flex flex-col w-full p-2">
          <div className="flex flex-row pl-2 pb-1 text-lg mt-2">
            <p>Name</p>
          </div>
          <div className="flex flex-row pl-2 pb-1">
            <input
              type="text"
              className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600"
              value={nameValue}
              onChange={handleEditName}
            />
          </div>
          <div className="flex flex-row pl-2 pb-1 text-xs w-full text-neutral-400">
            <p>Every input in a form needs a unique name describing what it get, e.g. “email”</p>
          </div>
          <div className="flex flex-row pl-2 pb-1 text-lg mt-2">
            <p>Placeholder</p>
          </div>
          <div className="flex flex-row pl-2 pb-1">
            <input
              type="text"
              className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600"
              value={placeholderValue}
              onChange={handleEditPlaceholder}
            />
          </div>
          <div className="flex flex-row pl-2 pb-1 text-xs w-full text-neutral-400">
            <p>Text to display when there is no value</p>
          </div>
        </div>
      );
}

export default PropertiesOptionsTextarea;