import PropertiesOptionsRow from "./PropertiesOptionsRow";
import PropertiesOptionsCol from "./PropertiesOptionsCol";
import PropertiesOptionsText from "./PropertiesOptionsText";
import PropertiesOptionsLink from "./PropertiesOptionsLink";
import PropertiesOptionsImage from "./PropertiesOptionsImage";
import PropertiesOptionsEmbed from "./PropertiesOptionsEmbed";
import WidgetsTitle from "../toolboxWidgets/ToolboxWidgetsTitle";
import { useEffect, useState } from "react";
import{ useDispatch, useSelector } from "react-redux";
import { focus, focusElement } from "../../features/counter/counterSlice";
import { parse } from "node-html-parser";

const PropertiesOptions = () => {
    const dispatch = useDispatch();
    const counterState = useSelector((state) => state.counter);
    const root = parse(counterState.value);

    useEffect(() => {
        if (counterState.currentFocusElement === "p") {
            setSelectedComponent("PropertiesOptionsText");
        } else if (counterState.currentFocusElement === "a") {
            setSelectedComponent("PropertiesOptionsLink");
        } else if (counterState.currentFocusElement === "img") {
            setSelectedComponent("PropertiesOptionsImage");
        } else if (counterState.currentFocusElement === "iframe") {
            setSelectedComponent("PropertiesOptionsEmbed");
        } else {
            setSelectedComponent("");
        };
    }, [counterState.currentFocusElement]);

    const [isBlockOptionVisible, setBlockOptionVisible] = useState(true);

    const [selectedComponent, setSelectedComponent] = useState("");

    const handleWidgetsToggle = (widgetType, isOpen) => {
        switch (widgetType) {
          case "Block Option":
            setBlockOptionVisible(isOpen);
            break;
          default:
        break;
    }
  };

    return (
        <div className="flex flex-col bg-neutral-700 text-white">
            <WidgetsTitle
            title="Block Option"
            onToggle={(isOpen) => handleWidgetsToggle("Block Option", isOpen)}
            />
            {isBlockOptionVisible && 
            ((selectedComponent === "PropertiesOptionsRow" && <PropertiesOptionsRow />) 
            || (selectedComponent === "PropertiesOptionsCol" && <PropertiesOptionsCol />)
            || (selectedComponent === "PropertiesOptionsText" && <PropertiesOptionsText />)
            || (selectedComponent === "PropertiesOptionsLink" && <PropertiesOptionsLink />)
            || (selectedComponent === "PropertiesOptionsImage" && <PropertiesOptionsImage />)
            || (selectedComponent === "PropertiesOptionsEmbed" && <PropertiesOptionsEmbed />)) }
        </div>
    )

}

export default PropertiesOptions;