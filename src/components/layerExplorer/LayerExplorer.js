import React, { useState } from "react";
import { useSelector } from "react-redux";
import { parse } from "node-html-parser";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import { IoSearchOutline } from "react-icons/io5";
import { FaLink, FaRegImage } from "react-icons/fa6";
import { ImEmbed2 } from "react-icons/im";
import { LiaWpforms } from "react-icons/lia";
import { MdOutlineLabel, MdInput } from "react-icons/md";
import { BsTextareaResize } from "react-icons/bs";
import { RxDropdownMenu, RxText, RxButton } from "react-icons/rx";
import { GoColumns } from "react-icons/go";
import { PiRowsLight } from "react-icons/pi";

const LayerExplorer = () => {
  const { counter } = useSelector((state) => state);
  const root = parse(`${counter.value}`);

  const findAllMainDivTags = () =>
    root
      .querySelector("#main")
      ?.childNodes?.filter((node) => node.nodeType === 1) || null;

  const RenderContentItem = ({ tag, depth }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleExpansion = () => setIsExpanded(!isExpanded);
    const hasNonEmptyChildNodes = tag.childNodes.some(
      (child) => child.nodeType === 1 && child.rawTagName !== "script"
    );

    const iconMapping = {
      DIV: {
        check: (tag) =>
          tag.id &&
          (tag.id.toLowerCase().startsWith("col") ||
            tag.id.toLowerCase().includes("row")),
        icon: (
          <>
            {tag.id && tag.id.toLowerCase().includes("row") ? (
              <PiRowsLight size={25} className="text-white-500" />
            ) : (
              <GoColumns size={20} className="text-white-500" />
            )}
          </>
        ),
      },
      A: { check: () => true, icon: <FaLink className="text-white-500" /> },
      IMG: {
        check: () => true,
        icon: <FaRegImage size={18} className="text-white-500" />,
      },
      P: {
        check: () => true,
        icon: <RxText size={20} className="text-white-500" />,
      },
      IFRAME: {
        check: () => true,
        icon: <ImEmbed2 size={20} className="text-white-500" />,
      },
      FORM: {
        check: () => true,
        icon: <LiaWpforms size={20} className="text-white-500" />,
      },
      LABEL: {
        check: () => true,
        icon: <MdOutlineLabel size={20} className="text-white-500" />,
      },
      BUTTON: {
        check: () => true,
        icon: <RxButton size={20} className="text-white-500" />,
      },
      INPUT: {
        check: () => true,
        icon: <MdInput size={20} className="text-white-500" />,
      },
      TEXTAREA: {
        check: () => true,
        icon: <BsTextareaResize size={20} className="text-white-500" />,
      },
      SELECT: {
        check: () => true,
        icon: <RxDropdownMenu size={20} className="text-white-500" />,
      },
    };

    const tagType = Object.keys(iconMapping).find((key) => tag.tagName === key);
    const tagIcon =
      iconMapping[tagType]?.check(tag) && iconMapping[tagType]?.icon;

    return (
      <div className="border-l border-gray-300 p-2  ">
        <div className="flex items-center">
          {hasNonEmptyChildNodes && (
            <span onClick={toggleExpansion} className="cursor-pointer">
              {isExpanded ? (
                <SlArrowDown className="transform rotate-0" />
              ) : (
                <SlArrowRight className="transform rotate-0" />
              )}
            </span>
          )}

          {tagIcon && <span className="ml-2 ">{tagIcon}</span>}

          <span className="ml-2 font-semibold">
            {tag.tagName}
            {tag.id && `#${tag.id}`}
          </span>
        </div>
        <div
          className={`ml-2 transition-all duration-300  w-full overflow-x-auto ${
            isExpanded ? "block" : "h-0"
          }`}
        >
          {hasNonEmptyChildNodes &&
            tag.childNodes
              .filter(
                (node) =>
                  node.nodeType === 1 &&
                  node.rawTagName !== "script" &&
                  node.rawTagName !== "style"
              )
              .map((child, index) => (
                <RenderContentItem key={index} tag={child} depth={depth + 1} />
              ))}
        </div>
      </div>
    );
  };

  const mainDivTags = findAllMainDivTags();

  return (
    <div>
      <div className="bg-black p-1 pl-3 flex items-center">
        <IoSearchOutline className="text-gray-500" size={25} color="white" />
        <input
          type="text"
          placeholder="search..."
          className="bg-black p-2 ml-2 rounded-md focus:outline-none focus:border-blue-500 w-full text-white h-0.5"
        />
      </div>
      <div className="flex flex-col text-white items-start mt-4 ml-2 overflow-y-scroll overflow-x-scroll h-screen">
        {mainDivTags &&
          mainDivTags.map((tag, index) => (
            <RenderContentItem key={index} tag={tag} depth={0} />
          ))}
      </div>
    </div>
  );
};

export default LayerExplorer;
