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
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { focus, EditId } from "../../features/counter/counterSlice";

const LayerExplorer = () => {
  const { counter } = useSelector((state) => state);
  const root = parse(`${counter.value}`);
  const dispatch = useDispatch();
  const { highlightedElementId } = useSelector((state) => state.counter);

  const handleClick = (event) => {
    // get the clicked element title
    const clickedElement = event.target;
    const clickedElementId = clickedElement.title;

    if (clickedElementId !== "") {
      const highlightedElement = document.querySelector(".highlighted-text");

      // Check if the clicked element is not the "main" ID
      if (clickedElementId !== "main") {
        // Remove the previous highlighting
        if (highlightedElement) {
          highlightedElement.classList.remove("highlighted-text");
        }

        // Add highlighting to the clicked element
        clickedElement.classList.add("highlighted-text");
      } else {
        // Clicked element is "main" ID, remove the highlighting
        if (highlightedElement) {
          highlightedElement.classList.remove("highlighted-text");
        }
      }
      // Perform additional actions based on the clicked ID if needed
      dispatch(focus("#" + clickedElementId));
    }
  };

  const findAllMainDivTags = () =>
    root
      .querySelector("#main")
      ?.childNodes?.filter((node) => node.nodeType === 1) || null;

  const RenderContentItem = ({ tag, depth }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(tag.id || ''); // Initial value is the tag's ID

    const toggleExpansion = () => setIsExpanded(!isExpanded);
    const hasNonEmptyChildNodes = tag.childNodes.some(
      (child) => child.nodeType === 1 && child.rawTagName !== 'script'
    );

    const handleEditClick = (event) => {
      event.stopPropagation();
      setIsEditing(true);
    };

    const handleInputChange = (event) => {
      setEditedText(event.target.value);
    };

    const handleInputBlur = () => {
      setIsEditing(false);
      dispatch(focus("#" + tag.id));
      dispatch(EditId(editedText));
      dispatch(focus("#" + editedText));
    };

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
        <div className={`border-l border-gray-300 p-2 ${tag.id === highlightedElementId ? "highlighted-text" : ""}`}>
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
  
            {tagIcon && <span className="ml-2">{tagIcon}</span>}
  
            {isEditing ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editedText}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className="ml-2 font-semibold border-none focus:outline-none bg-transparent"
                />
                <span
                  className="cursor-pointer ml-2 text-white-500"
                  onClick={handleInputBlur}
                >
                  <FaCheck size={20} className="text-green-500" />
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span
                  className="ml-2 font-semibold"
                  title={tag.id}
                  onClick={handleClick}
                >
                  {tag.id}
                </span>
  
                <span
                  className="cursor-pointer ml-2 text-white-500"
                  title={tag.id}
                  onClick={handleEditClick}
                >
                  <MdEdit size={20} />
                </span>
              </div>
            )}
          </div>
          <div
            className={`ml-2 transition-all duration-300 w-full overflow-x-auto ${
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
          <div className="flex flex-row bg-neutral-700 w-12/12">
            <div className="flex flex-row px-5 py-1 text-lg items-center h-52">
              <p className="invisible">Hello, Hacker!</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LayerExplorer;
