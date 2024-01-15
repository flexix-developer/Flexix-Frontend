import { useState } from "react";
import { useSelector } from "react-redux";
import { parse } from "node-html-parser";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import { IoSearchOutline } from "react-icons/io5";

const LayerExplorer = () => {
  const { counter } = useSelector((state) => state);
  const root = parse(`${counter.value}`);

  const findAllMainDivTags = () => {
    const div = root.querySelector('#main');
    return div ? div.childNodes.filter(node => node.nodeType === 1) : null;
  };

  const RenderContentItem = ({ tag, depth }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
    };

    const hasNonEmptyChildNodes = tag.childNodes.some(
      (child) => child.nodeType === 1 && child.rawTagName !== "script"
    );

    const indent = Array.from({ length: depth }, (_, index) => (
      <span key={`indent-${index}`} className="ml-2">
        &#x2502;
      </span>
    ));
    console.log(indent);

    return (
      <div className="border-l border-gray-300 p-2">
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
          <span className="ml-2 font-semibold">
            {tag.tagName}
            {tag.id && `#${tag.id}`} {/* Display the id if available */}
          </span>
        </div>
        <div
          className={`ml-2 transition-all duration-300 overflow-hidden ${
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
      <div className="flex flex-col text-white items-start mt-4 ml-2">
        {mainDivTags && mainDivTags.map((tag, index) => (
          <RenderContentItem key={index} tag={tag} depth={0} />
        ))}
      </div>
    </div>
  );
};

export default LayerExplorer;
