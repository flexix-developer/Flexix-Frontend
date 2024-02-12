import PropertiesOptionsRow from "./PropertiesOptionsRow";
import PropertiesOptionsCol from "./PropertiesOptionsCol";
import PropertiesOptionsText from "./PropertiesOptionsText";
import PropertiesOptionsLink from "./PropertiesOptionsLink";
import PropertiesOptionsImage from "./PropertiesOptionsImage";
import PropertiesOptionsEmbed from "./PropertiesOptionsEmbed";
import PropertiesOptionsForm from "./PropertiesOptionsForm";
import PropertiesOptionsButton from "./PropertiesOptionsButton";
import PropertiesOptionsLabel from "./PropertiesOptionsLabel";
import PropertiesOptionsInput from "./PropertiesOptionsInput";
import PropertiesOptionsSelect from "./PropertiesOptionsSelect";
import PropertiesOptionsTextarea from "./PropertiesOptionsTextarea";
import WidgetsTitle from "../toolboxWidgets/ToolboxWidgetsTitle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PropertiesOptions = () => {
  const counterState = useSelector((state) => state.counter);
  const counter = counterState.currentFocus.slice(1, 4);

  useEffect(() => {
    if (counterState.currentFocusElement === "p") {
      setSelectedComponent("PropertiesOptionsText");
    } else if (counterState.currentFocusElement === "a") {
      setSelectedComponent("PropertiesOptionsLink");
    } else if (counterState.currentFocusElement === "img") {
      setSelectedComponent("PropertiesOptionsImage");
    } else if (counter === "emb") {
      setSelectedComponent("PropertiesOptionsEmbed");
    } else if (counterState.currentFocusElement === "form") {
      setSelectedComponent("PropertiesOptionsForm");
    } else if (counterState.currentFocusElement === "label") {
      setSelectedComponent("PropertiesOptionsLabel");
    } else if (counterState.currentFocusElement === "button") {
      setSelectedComponent("PropertiesOptionsButton");
    } else if (counterState.currentFocusElement === "input") {
      setSelectedComponent("PropertiesOptionsInput");
    } else if (counterState.currentFocusElement === "select") {
      setSelectedComponent("PropertiesOptionsSelect");
    } else if (counterState.currentFocusElement === "textarea") {
      setSelectedComponent("PropertiesOptionsTextarea");
    } else if (counter === "row") {
      setSelectedComponent("PropertiesOptionsRow");
    } else if (counter === "col") {
      setSelectedComponent("PropertiesOptionsCol");
    } else {
      setSelectedComponent("");
    }
  }, [counterState.currentFocusElement, counter]);

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
        ((selectedComponent === "PropertiesOptionsRow" && (
          <PropertiesOptionsRow />
        )) ||
          (selectedComponent === "PropertiesOptionsCol" && (
            <PropertiesOptionsCol />
          )) ||
          (selectedComponent === "PropertiesOptionsText" && (
            <PropertiesOptionsText />
          )) ||
          (selectedComponent === "PropertiesOptionsLink" && (
            <PropertiesOptionsLink />
          )) ||
          (selectedComponent === "PropertiesOptionsImage" && (
            <PropertiesOptionsImage />
          )) ||
          (selectedComponent === "PropertiesOptionsEmbed" && (
            <PropertiesOptionsEmbed />
          )) ||
          (selectedComponent === "PropertiesOptionsForm" && (
            <PropertiesOptionsForm />
          )) ||
          (selectedComponent === "PropertiesOptionsLabel" && (
            <PropertiesOptionsLabel />
          )) ||
          (selectedComponent === "PropertiesOptionsButton" && (
            <PropertiesOptionsButton />
          )) ||
          (selectedComponent === "PropertiesOptionsInput" && (
            <PropertiesOptionsInput />
          )) ||
          (selectedComponent === "PropertiesOptionsSelect" && (
            <PropertiesOptionsSelect />
          )) ||
          (selectedComponent === "PropertiesOptionsTextarea" && (
            <PropertiesOptionsTextarea />
          )))}
    </div>
  );
};

export default PropertiesOptions;
