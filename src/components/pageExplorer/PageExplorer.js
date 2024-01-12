import { IoMdFolderOpen } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
import { useState } from "react"; // Import useState

const PageExplorer = ({ pages, projectName }) => {
  const [selectedPage, setSelectedPage] = useState(null); // State to track selected page
  const [checkFocus, setCheckFocus] = useState(false);

  const handleClick = (index) => {
    setSelectedPage(index);
    setCheckFocus(true);
  };

  return (
    <div className="flex flex-col text-white ">
      <div className="bg-black  p-1 pl-3 flex items-center">
        <IoSearchOutline className="text-gray-500" size={25} color="white" />
        <input
          type="text"
          placeholder="search..."
          className="bg-black p-2 ml-2 rounded-md focus:outline-none focus:border-blue-500 w-full text-white h-0.5"
        />
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex flex-row ml-11 mt-2">
          <IoMdFolderOpen size={29} />
          <p className="pl-2 text-center text-xl">{projectName}</p>
        </div>
        {pages && pages.length > 0 ? (
          pages.map((page, index) => (
            <div
              key={index}
              className={`flex flex-row ml-20 mt-2 ${
                selectedPage === index && checkFocus ? "bg-blue-500" : "" // Check if the page is selected and in focus
              }`}
              onClick={() => handleClick(index)} // Set the selected page on click
            >
              <GrDocumentText size={22} />
              <p className="pl-2 text-center text-xl">{page}</p>
              {selectedPage === index && (
                <>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    class="ml-5 cursor-pointer text-yellow-500"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>

                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 cursor-pointer text-red-500"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No pages available</p>
        )}
      </div>
    </div>
  );
};

export default PageExplorer;
