import React, { useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { RiFileCopy2Line } from "react-icons/ri";
import beautify from "js-beautify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateValue } from "../../features/counter/counterSlice";

const CodePopUp = ({ htmlCode, jsCode, closePopUp, activepage }) => {
  const dispatch = useDispatch();
  const html_beautify = beautify.html;
  const [selectedCode, setSelectedCode] = useState("html");
  const [isEditing, setIsEditing] = useState(false);
  const formattedHtml = html_beautify(htmlCode, {
    indent_size: 2,
    space_in_empty_paren: true,
    indent_with_tabs: true,
    eol: "\n",
  });

  const [editableCode, setEditableCode] = useState({
    // html: formatHtmlString(htmlCode),
    html: formattedHtml,
    js: jsCode,
  });

  const handleClickHTML = () => {
    setSelectedCode("html");
    setIsEditing(false); // Exit editing mode when switching
  };
  const handleClickJS = () => {
    setSelectedCode("js");
    setIsEditing(false); // Exit editing mode when switching
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const ID = localStorage.getItem("ID");
    const ProjectID = localStorage.getItem("ProjectID");
    const token = localStorage.getItem("token");
    if (selectedCode === "html") {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8081/users/savepage",
          // "http://ceproject.thddns.net:3322/users/savepage",
          {
            id: ID,
            proid: ProjectID,
            pagename: activepage.slice(0, -4) + selectedCode,
            content: editableCode.html,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("SavePage Success", response.data);
        setIsEditing(false);
        handleGetpage(activepage);
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      try {
        await axios.post(
          // "http://localhost:8081/users/editscript",
          "http://ceproject.thddns.net:3322/users/editscript",
          {
            userID: ID,
            projectId: ProjectID,
            pageName: activepage.slice(0, -5),
            content: editableCode.js,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Create Script Success!");
        setIsEditing(false);
      } catch (error) {
        alert("Create New Page Failed!");
      }
    }
  };

  const handleChange = (event) => {
    setEditableCode((prevCode) => ({
      ...prevCode,
      [selectedCode]: event.target.value,
    }));
    console.log(editableCode.js);
  };

  const handleApiResponse = (response) => {
    const content = response.data.content;
    dispatch(updateValue(content));
  };

  const handleGetpage = async (page) => {
    try {
      // Your axios.post code here to update the page name
      const ID = localStorage.getItem("ID");
      const ProjectID = localStorage.getItem("ProjectID");
      const token = localStorage.getItem("token");

      const response = await axios.post(
        // "http://127.0.0.1:8081/users/getpage",
        "http://ceproject.thddns.net:3322/users/getpage",
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

      handleApiResponse(response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-[#272727]  w-8/12 h-[800px]    rounded-lg z-100 border-2 text-white flex  flex-col">
        <div className="w-full h-24 bg-[#454545] rounded-t-lg flex justify-between">
          <div className="flex">
            <div
              className={`ml-10 w-20 flex justify-center items-center text-2xl cursor-pointer border-b-4 ${
                selectedCode === "html"
                  ? "border-indigo-500"
                  : "border-[#454545]"
              }`}
              onClick={handleClickHTML}
            >
              <span>HTML</span>
            </div>
            <div
              className={`ml-10 w-20 flex justify-center items-center text-2xl cursor-pointer border-b-4 ${
                selectedCode === "js" ? "border-indigo-500" : "border-[#454545]"
              }`}
              onClick={handleClickJS}
            >
              <span>JS</span>
            </div>
          </div>
          <div className="flex justify-center items-center mr-15">
            <div>
              <RiFileCopy2Line size={28} />
            </div>
          </div>
        </div>
        <div className="w-full h-[620px] overflow-auto">
          {isEditing ? (
            <textarea
              className="mt-4 ml-10 w-full h-full bg-[#272727] text-white p-4"
              value={editableCode[selectedCode]}
              onChange={handleChange}
            />
          ) : (
            <pre className="mt-4 ml-10">
              <code>
                {selectedCode === "html" ? editableCode.html : editableCode.js}
              </code>
            </pre>
          )}
        </div>
        <div className="flex justify-between w-full h-20 bg-[#454545] rounded-b-lg">
          <div
            className="w-20 flex justify-center items-center"
            onClick={handleEditClick}
          >
            <FiEdit size={28} />
          </div>

          <div className="w-44 flex justify-center items-center mr-10">
            <div className="flex justify-between w-full">
              {isEditing && (
                <button
                  className="bg-[#30cd9e] w-20 h-9 rounded-lg text-xl font-bold"
                  onClick={handleSave}
                >
                  Save
                </button>
              )}
              {!isEditing && <div className="w-20 h-9"></div>}
              <button
                className="bg-[#FF6359] w-20 h-9 rounded-lg text-xl font-bold"
                onClick={closePopUp}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePopUp;
