import { IoMdFolderOpen } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
import { useState } from "react"; // Import useState
import axios from "axios";

const PageExplorer = ({ pages, projectName, onDeletePage }) => {
  const [selectedPage, setSelectedPage] = useState(null); // State to track selected page
  const [checkFocus, setCheckFocus] = useState(false);
  const [showDeletePagePopup, setShowDeletePagePopup] = useState(false);
  const [showEditPagePopup, setShowEditPagePopup] = useState(false);
  const [page, setPage] = useState("");
  const [newnamepage, setNewNamePage] = useState("");

  const handleClick = (index) => {
    setSelectedPage(index);
    setCheckFocus(true);
  };

  const handleClickOpenPopup = (e) => {
    setShowDeletePagePopup(true);
    setPage(e);
  };

  const handleClickEditOpenPopup = (e) => {
    setShowEditPagePopup(true);
    setPage(e);
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    const isValid = /^[A-Za-z0-9._%+-]+$/.test(input);

    if (isValid) {
      setNewNamePage(input);
    } else {
      setNewNamePage("");
    }
    // Optionally, you can provide feedback to the user if the input is invalid.
    // For example, you might want to display an error message or change the input style.
  };
  const handleDeleteButtonClick = async (page) => {
    const ID = localStorage.getItem("ID");
    const ProjectID = localStorage.getItem("ProjectID");
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://127.0.0.1:8081/users/deletepage",
        {
          id: ID,
          proid: ProjectID,
          pageName: page,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowDeletePagePopup(false);
      onDeletePage();
    } catch (error) {
      // Handle error if needed
    }
  };

  const handleEditButtonClick = async (page) => {
    const ID = localStorage.getItem("ID");
    const ProjectID = localStorage.getItem("ProjectID");
    const token = localStorage.getItem("token");
    if (newnamepage === "") {
      return;
    } else {
      try {
        await axios.post(
          "http://127.0.0.1:8081/users/editpage",
          {
            id: ID,
            proid: ProjectID,
            pageName: page,
            newpagename: newnamepage + ".html",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShowEditPagePopup(false);
        onDeletePage();
        setNewNamePage("");
      } catch (error) {
        // Handle error if needed
      }
    }
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
              <div className="flex items-center w-4/6">
                <GrDocumentText size={22} />
                <p className="pl-2 text-left text-xl truncate w-full">{page}</p>
              </div>
              {selectedPage === index && (
                <>
                  <div onClick={() => handleClickEditOpenPopup(page)}>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-5 cursor-pointer text-yellow-500"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </div>
                  <div onClick={() => handleClickOpenPopup(page)}>
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
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No pages available</p>
        )}
      </div>
      {showDeletePagePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4">
            <p className="text-lg font-semibold mb-4 text-black">
              Confirm Delete {page}
            </p>
            <div className="flex justify-between">
              <button
                className="bg-red-700 text-white py-2 px-4"
                onClick={() => handleDeleteButtonClick(page)}
              >
                Delete
              </button>
              <button
                className="bg-gray-400 text-black ml-2 py-2 px-4"
                onClick={() => setShowDeletePagePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditPagePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4">
            <input
              className="rounded-sm border-2 border-black mb-8 text-black"
              type="text"
              value={newnamepage}
              onChange={handleInputChange}
            ></input>
            <div className="flex justify-between">
              <button
                className="bg-red-700 text-white py-2 px-4"
                onClick={() => handleEditButtonClick(page)}
              >
                Edit
              </button>
              <button
                className="bg-gray-400 text-black ml-2 py-2 px-4"
                onClick={() => {
                  setShowEditPagePopup(false);
                  setNewNamePage("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageExplorer;
