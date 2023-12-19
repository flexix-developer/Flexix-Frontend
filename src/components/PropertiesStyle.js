import Select from "react-select";
import WidgetsTitle from "./ToolboxWidgetsTitle";
import { useState } from "react";
import {
    MdAlignHorizontalLeft,
    MdAlignHorizontalCenter,
    MdAlignHorizontalRight,
    MdAlignVerticalBottom,
    MdAlignVerticalCenter,
    MdAlignVerticalTop,
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdStrikethroughS,
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
} from "react-icons/md";
import { GoEye, GoEyeClosed } from "react-icons/go";

const PropertiesStyle = () => {
    const fontOptions = [
        { value: "Arial", label: "Arial" },
        { value: "Verdana", label: "Verdana" },
        { value: "Helvetica", label: "Helvetica" },
        { value: "Tahoma", label: "Tahoma" },
        { value: "Trebuchet MS", label: "Trebuchet MS" },
        { value: "Times New Roman", label: "Times New Roman" },
        { value: "Georgia", label: "Georgia" },
        { value: "Garamond", label: "Garamond" },
        { value: "Courier New", label: "Courier New" },
        { value: "Brush Script MT", label: "Brush Script MT" },
    ];

    const StyleBorderOptions = [
        { value: "Solid", label: "Solid" },
        { value: "Dotted", label: "Dotted" },
        { value: "Dashed", label: "Dashed" },
        { value: "Double", label: "Double" },
        { value: "Groove", label: "Groove" },
        { value: "Ridge", label: "Ridge" },
        { value: "Inset", label: "Inset" },
        { value: "Outset", label: "Outset" },
    ];

    const sizeBorderRadiusOptions = [];
    for (let i = 1; i <= 50; i++) {
        sizeBorderRadiusOptions.push({ value: i, label: i });
    }

    const sizeOptions = [];
    for (let i = 1; i <= 100; i++) {
        i++;
        sizeOptions.push({ value: i, label: i });
    }

    const sizeBorderOptions = [];
    for (let i = 1; i <= 20; i++) {
        sizeBorderOptions.push({ value: i, label: i });
    }

    const [currentColor, setCurrentColor] = useState("#000000");
    const [currentTextColor, setCurrentTextColor] = useState("#000000");
    const [isEyeVisible, setEyeVisible] = useState(true);

    const handleColorChange = (event) => {
        setCurrentColor(event.target.value);
    };

    const handleTextColorChange = (event) => {
        setCurrentTextColor(event.target.value);
    };

    const handleToggleEye = () => {
        setEyeVisible((prevVisibility) => !prevVisibility);
    };

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
        <div>
            <div className="flex flex-col bg-neutral-700 text-white">
                <WidgetsTitle
                    title="Layouts"
                    onToggle={(isOpen) => handleWidgetsToggle("Layouts", isOpen)}
                />
                {isLayoutsVisible && (
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-3/12 pl-2">
                                <p>Align</p>
                            </div>
                            <div className="w-9/12 flex flex-row">
                                <div className="w-1/12 text-center">
                                    <MdAlignHorizontalLeft />
                                </div>
                                <div className="w-1/12 text-center mx-2">
                                    <MdAlignHorizontalRight />
                                </div>
                                <div className="w-1/12 text-center mx-2">
                                    <MdAlignVerticalBottom />
                                </div>
                                <div className="w-1/12 text-center mx-2">
                                    <MdAlignVerticalCenter />
                                </div>
                                <div className="w-1/12 text-center mx-2">
                                    <MdAlignVerticalTop />
                                </div>
                                <div className="w-1/12 text-center mx-1">
                                    <MdAlignHorizontalCenter />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-3/12 pl-2 mr-2">
                                <p>Width</p>
                            </div>
                            <div className="w-9/12 flex flex-row">
                                <div className="w-7/12 text-center">
                                    <input
                                        type="text"
                                        className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
                                        placeholder="auto"
                                    />
                                </div>
                                <div className="w-2/12 text-center ml-2 mr-2">
                                    <p>px</p>
                                </div>
                            </div>
                            <div className="w-3/12 pl-2 mr-2">
                                <p>Height</p>
                            </div>
                            <div className="w-9/12 flex flex-row">
                                <div className="w-7/12 text-center">
                                    <input
                                        type="text"
                                        className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
                                        placeholder="auto"
                                    />
                                </div>
                                <div className="w-2/12 text-center ml-2 mr-2">
                                    <p>px</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col bg-neutral-700 text-white">
                <WidgetsTitle
                    title="Background"
                    onToggle={(isOpen) => handleWidgetsToggle("Background", isOpen)}
                />
                {isBackgroundVisible && (
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-2/12 pl-2">
                                <p>Fill</p>
                            </div>
                            <div className="w-10/12 flex flex-row items-center">
                                <div className="text-center mr-1 w-24 h-9">
                                    <input
                                        type="color"
                                        value={currentColor}
                                        onChange={handleColorChange}
                                        className="bg-neutral-700 text-white text-center w-full h-full"
                                        placeholder="auto"
                                    />
                                </div>
                                <div className="w-2/12 text-center ml-4 mr-4">
                                    {currentColor.replace("#", "").toUpperCase()}
                                </div>
                                <div className="w-2/12 text-center ml-4 mr-4">
                                    <p>100%</p>
                                </div>
                                <div className="w-2/12 text-center ml-4 mr-4">
                                    {isEyeVisible ? (
                                        <GoEye onClick={handleToggleEye} size={20} />
                                    ) : (
                                        <GoEyeClosed onClick={handleToggleEye} size={20} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col bg-neutral-700 text-white">
                <WidgetsTitle
                    title="Typography"
                    onToggle={(isOpen) => handleWidgetsToggle("Typography", isOpen)}
                />
                {isTypographyVisible && (
                    <div className="flex flex-col w-full mt-2">
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-5/12 pl-2">
                                <p>Font name</p>
                            </div>
                            <div className="w-7/12">
                                <Select options={fontOptions} className="text-md text-black" />
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-5/12 pl-2">
                                <p>Font size</p>
                            </div>
                            <div className="w-4/12">
                                <Select options={sizeOptions} className="text-md text-black" />
                            </div>
                            <div className="w-3/12 pl-2">
                                <p>px</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-4/12 pl-2">
                                <p>Text Color</p>
                            </div>
                            <div className="w-8/12 flex flex-row items-center ml-9">
                                <div className="text-center mr-1 w-9 h-9">
                                    <input
                                        type="color"
                                        value={currentTextColor}
                                        onChange={handleTextColorChange}
                                        className="rounded-full border-1 border-neutral-600 bg-neutral-700 text-white text-center w-full h-full"
                                        placeholder="auto"
                                    />
                                </div>
                                <div className="w-2/12 text-center ml-4 mr-4">
                                    {currentTextColor.replace("#", "").toUpperCase()}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="flex flex-row w-6/12 justify-between mx-2">
                                <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2">
                                    <MdFormatBold />
                                </div>
                                <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2">
                                    <MdFormatItalic />
                                </div>
                                <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2">
                                    <MdFormatUnderlined />
                                </div>
                                <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2">
                                    <MdStrikethroughS />
                                </div>
                            </div>
                            <div className="flex flex-row w-6/12 justify-between mx-6">
                                <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2">
                                    <MdFormatAlignLeft />
                                </div>
                                <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2">
                                    <MdFormatAlignCenter />
                                </div>
                                <div className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2">
                                    <MdFormatAlignRight />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col bg-neutral-700 text-white">
                <WidgetsTitle
                    title="Margin & Padding"
                    onToggle={(isOpen) => handleWidgetsToggle("Margin & Padding", isOpen)}
                />
                {isMarginPaddingVisible && console.log()}
            </div>
            <div className="flex flex-col bg-neutral-700 text-white">
                <WidgetsTitle
                    title="Border"
                    onToggle={(isOpen) => handleWidgetsToggle("Border", isOpen)}
                />
                {isBorderVisible && (
                    <div className="flex flex-col w-full mt-2">
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-5/12 pl-2">
                                <p>Border style</p>
                            </div>
                            <div className="w-7/12">
                                <Select options={StyleBorderOptions} className="text-md text-black" />
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-5/12 pl-2">
                                <p>Border size</p>
                            </div>
                            <div className="w-4/12">
                                <Select options={sizeBorderOptions} className="text-md text-black" />
                            </div>
                            <div className="w-3/12 pl-2">
                                <p>px</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-5/12 pl-2">
                                <p>Border radius</p>
                            </div>
                            <div className="w-4/12">
                                <Select options={sizeBorderRadiusOptions} className="text-md text-black" />
                            </div>
                            <div className="w-3/12 pl-2">
                                <p>px</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-start p-2 items-center">
                            <div className="w-4/12 pl-2">
                                <p>Text Color</p>
                            </div>
                            <div className="w-8/12 flex flex-row items-center ml-9">
                                <div className="text-center mr-1 w-9 h-9">
                                    <input
                                        type="color"
                                        value={currentTextColor}
                                        onChange={handleTextColorChange}
                                        className="rounded-full border-1 border-neutral-600 bg-neutral-700 text-white text-center w-full h-full"
                                        placeholder="auto"
                                    />
                                </div>
                                <div className="w-2/12 text-center ml-4 mr-4">
                                    {currentTextColor.replace("#", "").toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertiesStyle;
