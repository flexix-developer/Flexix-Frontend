import { useState } from "react";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";

const ToolboxWidgetsTitle = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    if (props.onToggle) {
      props.onToggle(!isMenuOpen);
    }
  };

  return (
    <div
      className="flex flex-row w-full cursor-pointer"
      onClick={toggleMenu}
    >
      <div className="flex items-center bg-neutral-600 text-white w-full p-2">
        {isMenuOpen ? <SlArrowDown /> : <SlArrowRight />}
        <p className="text-2xl ml-2 mb-1">{props.title}</p>
      </div>
    </div>
  );
};

export default ToolboxWidgetsTitle;