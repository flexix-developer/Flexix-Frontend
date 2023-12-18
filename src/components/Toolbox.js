import { useState } from "react";
import { GoRows, GoColumns } from "react-icons/go";
import { PiTextTBold } from "react-icons/pi";
import { FaLink, FaRegImage, FaCode, FaWpforms } from "react-icons/fa6";
import { MdLabelOutline, MdOutlineInput } from "react-icons/md";
import { RxButton, RxDropdownMenu } from "react-icons/rx";
import { BsTextareaResize } from "react-icons/bs";
import WidgetsTitle from "./ToolboxWidgetsTitle";
import WidgetsElement from "./ToolboxWidgetsElement";

const Toolbox = () => {
  const iconSize = 50;

  const [isLayoutsVisible, setLayoutsVisible] = useState(true);
  const [isTextVisible, setTextVisible] = useState(true);
  const [isMediaVisible, setMediaVisible] = useState(true);
  const [isFormsVisible, setFormsVisible] = useState(true);

  const handleWidgetsToggle = (widgetType, isOpen) => {
    switch (widgetType) {
      case "Layouts":
        setLayoutsVisible(isOpen);
        break;
      case "Text":
        setTextVisible(isOpen);
        break;
      case "Media":
        setMediaVisible(isOpen);
        break;
      case "Forms":
        setFormsVisible(isOpen);
        break;
      default:
        break;
    }
  };

  const handleElementClick = (elementName) => {
    if (elementName === "Row") {
      // Do something specific for "Row"
      alert("Clicked on Row");
    } else if (elementName === "Column") {
      // Do something specific for "Column"
      alert("Clicked on Column");
    } else if (elementName === "Text") {
      // Do something specific for "Text"
      alert("Clicked on Text");
    } else if (elementName === "Link") {
      // Do something specific for "Link"
      alert("Clicked on Link");
    } else if (elementName === "Image") {
      // Do something specific for "Image"
      alert("Clicked on Image");
    } else if (elementName === "Embed") {
      // Do something specific for "Embed"
      alert("Clicked on Embed");
    } else if (elementName === "Form") {
      // Do something specific for "Form"
      alert("Clicked on Form");
    } else if (elementName === "Label") {
      // Do something specific for "Label"
      alert("Clicked on Label");
    } else if (elementName === "Button") {
      // Do something specific for "Button"
      alert("Clicked on Button");
    } else if (elementName === "Textarea") {
      // Do something specific for "Textarea"
      alert("Clicked on Textarea");
    } else if (elementName === "Input") {
      // Do something specific for "Input"
      alert("Clicked on Input");
    } else if (elementName === "Select") {
      // Do something specific for "Select"
      alert("Clicked on Select");
    } else {
      // pass
    }
  };

   return (
    <div className="flex flex-col bg-neutral-700 text-white">
      <WidgetsTitle title="Layouts" onToggle={(isOpen) => handleWidgetsToggle("Layouts", isOpen)} />
      {isLayoutsVisible && (
        <WidgetsElement
          ElementIcon1={<GoRows size={iconSize} />}
          ElementName1="Row"
          ElementIcon2={<GoColumns size={iconSize} />}
          ElementName2="Column"
          onClick1={() => handleElementClick("Row")}
          onClick2={() => handleElementClick("Column")}
        />
      )}
      <WidgetsTitle title="Text" onToggle={(isOpen) => handleWidgetsToggle("Text", isOpen)} />
      {isTextVisible && (
        <WidgetsElement
          ElementIcon1={<PiTextTBold size={iconSize} />}
          ElementName1="Text"
          ElementIcon2={<FaLink size={iconSize} />}
          ElementName2="Link"
          onClick1={() => handleElementClick("Text")}
          onClick2={() => handleElementClick("Link")}
        />
      )}
      <WidgetsTitle title="Media" onToggle={(isOpen) => handleWidgetsToggle("Media", isOpen)} />
      {isMediaVisible && (
        <WidgetsElement
          ElementName1="Image"
          ElementIcon1={<FaRegImage size={iconSize} />}
          ElementName2="Embed"
          ElementIcon2={<FaCode size={iconSize} />}
          onClick1={() => handleElementClick("Image")}
          onClick2={() => handleElementClick("Embed")}
        />
      )}
      <WidgetsTitle title="Forms" onToggle={(isOpen) => handleWidgetsToggle("Forms", isOpen)} />
      {isFormsVisible && (
        <>
          <WidgetsElement
            ElementName1="Form"
            ElementIcon1={<FaWpforms size={iconSize} />}
            ElementName2="Label"
            ElementIcon2={<MdLabelOutline size={iconSize} />}
            onClick1={() => handleElementClick("Form")}
            onClick2={() => handleElementClick("Label")}
          />
          <WidgetsElement
            ElementName1="Button"
            ElementIcon1={<RxButton size={iconSize} />}
            ElementName2="Textarea"
            ElementIcon2={<BsTextareaResize size={iconSize} />}
            onClick1={() => handleElementClick("Button")}
            onClick2={() => handleElementClick("Textarea")}
          />
          <WidgetsElement
            ElementName1="Input"
            ElementIcon1={<MdOutlineInput size={iconSize} />}
            ElementName2="Select"
            ElementIcon2={<RxDropdownMenu size={iconSize} />}
            onClick1={() => handleElementClick("Button")}
            onClick2={() => handleElementClick("Textarea")}
          />
        </>
      )}
    </div>
  );
};

export default Toolbox;
