import PropertiesOptionsRow from "./PropertiesOptionsRow";
import PropertiesOptionsCol from "./PropertiesOptionsCol";
import WidgetsTitle from "../toolboxWidgets/ToolboxWidgetsTitle";
import { useState } from "react";

const PropertiesOptions = () => {

    const [isBlockOptionVisible, setBlockOptionVisible] = useState(true);

    const [selectedComponent] = useState("PropertiesOptionsCol");
    
    // const [selectedComponent, setSelectedComponent] = useState("PropertiesOptionsCol");
    // const handleComponentClick = (component) => {
    //   setSelectedComponent(component);
    // };

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
            || (selectedComponent === "PropertiesOptionsCol" && <PropertiesOptionsCol />)) }
        </div>
    )

}

export default PropertiesOptions;