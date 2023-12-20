import WidgetsTitle from "./ToolboxWidgetsTitle";
import { useState } from "react";
import PropertiesStyleLayout from "./PropertiesStyleLayout";
import PropertiesStyleBackground from "./PropertiesStyleBackground";
import PropertiesStyleTypography from "./PropertiesStyleTypography";
import PropertiesStyleMarginPadding from "./PropertiesStyleMarginPadding";
import PropertiesStyleBoarder from "./PropertiesStyleBorder";

const PropertiesStyle = () => {
  const [isLayoutsVisible, setLayoutsVisible] = useState(true);
  const [isBackgroundVisible, setBackgroundVisible] = useState(true);
  const [isTypographyVisible, setTextVisible] = useState(true);
  const [isMarginPaddingVisible, setMarginPaddingVisible] = useState(true);
  const [isBorderVisible, setBorderVisible] = useState(true);

  const handleWidgetsToggle = (widgetType, isOpen) => {
    switch (widgetType) {
      case "Layouts":
        setLayoutsVisible(isOpen);
        break;
      case "Background":
        setBackgroundVisible(isOpen);
        break;
      case "Typography":
        setTextVisible(isOpen);
        break;
      case "Margin & Padding":
        setMarginPaddingVisible(isOpen);
        break;
      case "Border":
        setBorderVisible(isOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div className="overflow-y-scroll overflow-x-hidden h-[50rem]">
      <div className="flex flex-col bg-neutral-700 text-white">
        <WidgetsTitle
          title="Layouts"
          onToggle={(isOpen) => handleWidgetsToggle("Layouts", isOpen)}
        />
        {isLayoutsVisible && <PropertiesStyleLayout />}
      </div>
      <div className="flex flex-col bg-neutral-700 text-white">
        <WidgetsTitle
          title="Background"
          onToggle={(isOpen) => handleWidgetsToggle("Background", isOpen)}
        />
        {isBackgroundVisible && <PropertiesStyleBackground />}
      </div>
      <div className="flex flex-col bg-neutral-700 text-white">
        <WidgetsTitle
          title="Typography"
          onToggle={(isOpen) => handleWidgetsToggle("Typography", isOpen)}
        />
        {isTypographyVisible && <PropertiesStyleTypography />}
      </div>
      <div className="flex flex-col bg-neutral-700 text-white">
        <WidgetsTitle
          title="Margin & Padding"
          onToggle={(isOpen) => handleWidgetsToggle("Margin & Padding", isOpen)}
        />
        {isMarginPaddingVisible && <PropertiesStyleMarginPadding />}
      </div>
      <div className="flex flex-col bg-neutral-700 text-white">
        <WidgetsTitle
          title="Border"
          onToggle={(isOpen) => handleWidgetsToggle("Border", isOpen)}
        />
        {isBorderVisible && <PropertiesStyleBoarder />}
      </div>
    </div>
  );
};

export default PropertiesStyle;
