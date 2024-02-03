import { IoMdFolderOpen } from "react-icons/io";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
import { useState, useEffect } from "react"; // Import useState
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { updateValue } from "../../features/counter/counterSlice";

const PageExplorer = ({
  pages,
  projectName,
  onDeletePage,
  onClickPage,
  spage,
  updatepage,
  handlePageActivate,
  TbIndex,
}) => {
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(null);
  const [checkFocus, setCheckFocus] = useState(false);
  const [showDeletePagePopup, setShowDeletePagePopup] = useState(false);
  const [editedPageName, setEditedPageName] = useState("");
  const [editedNewPageName, setEditedNewPageName] = useState("");
  const [editingPageIndex, setEditingPageIndex] = useState(null);

  const handleClick = (page, index) => {
    console.log("index", index, page);
    if (editingPageIndex !== null) {
      return;
    }

    setSelectedPage(index);
    setCheckFocus(true);
  };

  // useEffect เพื่อดำเนินการเมื่อ TbIndex เปลี่ยนแปลง
  useEffect(() => {
    setSelectedPage(TbIndex);
    setCheckFocus(true);
    // อาจจะมีการเรียกใช้ function เพิ่มเติมที่นี่ เช่น handlePageActivate(pages[TbIndex])
    if (TbIndex !== null && pages[TbIndex]) {
      handleGetpage(pages[TbIndex]);
    }
  }, [TbIndex, pages]); // ใส่ TbIndex และ pages เป็น dependencies

  const handleClickOpenPopup = (page) => {
    setShowDeletePagePopup(true);
    setEditedPageName(page);
  };

  const handleEditButtonClick = (index, pagename) => {
    setEditingPageIndex(index);
    setEditedPageName(pagename);
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

  const handleInputChange = (event) => {
    const input = event.target.value;

    const isValid = /^[A-Za-z0-9._%+-]+$/.test(input);
    if (isValid) {
      setEditedNewPageName(input);
    } else {
      setEditedNewPageName("");
    }
  };

  const handleSaveEdit = async () => {
    if (editedNewPageName === "") {
      return;
    } else {
      try {
        // Your axios.post code here to update the page name
        const ID = localStorage.getItem("ID");
        const ProjectID = localStorage.getItem("ProjectID");
        const token = localStorage.getItem("token");

        await axios.post(
          "http://127.0.0.1:8081/users/editpage",
          {
            id: ID,
            proid: ProjectID,
            pageName: editedPageName,
            newpagename: editedNewPageName + ".html",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // spage(editedNewPageName, editedPageName);
        updatepage(editedNewPageName, editedPageName.slice(0, -5));
        onDeletePage();
        setEditingPageIndex(null);
        setEditedNewPageName("");
      } catch (error) {
        console.log("Error:", error);
        alert("page name in already used!");
        setEditedNewPageName("");
        setEditingPageIndex(null);
        // Handle error if needed
      }
    }
  };

  const handleGetpage = async (page) => {
    // console.log(page);
    try {
      // Your axios.post code here to update the page name
      const ID = localStorage.getItem("ID");
      const ProjectID = localStorage.getItem("ProjectID");
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8081/users/getpage",
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
      spage(page.slice(0, -5));
      // console.log(response.data.content);
      handleApiResponse(response);
      onClickPage();
      handlePageActivate(page);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleApiResponse = (response) => {
    const content = response.data.content;
    dispatch(updateValue(content));
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
                selectedPage === index && checkFocus ? "bg-blue-500" : ""
              }`}
            >
              <div className="flex items-center w-11/12 ">
                {editingPageIndex === index ? (
                  <div className="w-full flex">
                    <div className="w-full">
                      <input
                        type="text"
                        value={editedNewPageName}
                        onChange={handleInputChange}
                        className="border-b border-black px-2 text-black w-full h-full"
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <FaCheck
                        className=" cursor-pointer text-green-500  ml-2 w-5 h-7"
                        onClick={handleSaveEdit}
                      />
                      <ImCross
                        className="cursor-pointer text-red-500  ml-2 w-5 h-6 "
                        onClick={() => {
                          // Reset the edited name and exit editing mode
                          setEditedNewPageName("");
                          setEditingPageIndex(null);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex w-full"
                    onClick={() => {
                      handleClick(page, index);
                      handleGetpage(page);
                    }}
                  >
                    <GrDocumentText size={22} />
                    <p className="pl-2 text-left text-xl truncate w-8/12">
                      {page}
                    </p>
                    {selectedPage === index && !editingPageIndex && (
                      <>
                        <FiEdit
                          className={`ml-2 cursor-pointer text-yellow-500 w-6 h-6  `}
                          onClick={() => {
                            setEditedNewPageName(page.slice(0, -5));
                            handleEditButtonClick(index, page); // Call handleInputChange if needed
                          }}
                        />
                        <FiTrash2
                          className={`cursor-pointer text-red-500 w-6 h-6`}
                          onClick={() => handleClickOpenPopup(page)}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
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
              Confirm Delete {editedPageName}
            </p>
            <div className="flex justify-between">
              <button
                className="bg-red-700 text-white py-2 px-4"
                onClick={() => handleDeleteButtonClick(editedPageName)}
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
    </div>
  );
};

export default PageExplorer;
