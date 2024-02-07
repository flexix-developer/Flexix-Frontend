import PropertiesStyleTypography from "../propertiesStyle/PropertiesStyleTypography";
import { useDispatch, useSelector } from "react-redux";
import { EditText } from "../../features/counter/counterSlice";
import { parse } from "node-html-parser";
import React, { useState, useEffect } from 'react';

const PropertiesOptionsText = () => {
    const dispatch = useDispatch();
    const counterState = useSelector((state) => state.counter);

    const [selectedEditTextValue, setSelectedEditTextValue] = useState('');

    useEffect(() => {
        const targetNode = parse(counterState.value).querySelector(`p${counterState.currentFocus}`);
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
                    rows="6"
                    value={selectedEditTextValue}
                    onChange={handleEditText}
                ></textarea>
            </div>
            <div>
                <PropertiesStyleTypography />
            </div>
        </div>
    );
};

export default PropertiesOptionsText;
