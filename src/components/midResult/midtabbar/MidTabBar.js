import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateValue } from "../../../features/counter/counterSlice";
import React, { useState } from "react";

const MidTabBar = ({
  setShowModal,
  ArrPageList,
  deletedPage,
  setFirstpage,
  handlePageActivate,
  activepage,
  handleClickTabBar,
}) => {
  // console.log("activatepage", activepage);
  // const [activePage, setActivePage] = useState("");
  const dispatch = useDispatch();
  if (ArrPageList.length === 0) {
    setFirstpage();
  }
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
          pageName: page + ".html",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.content);
      handleApiResponse(response);
      // setActivePage(page);
      handlePageActivate(page + ".html");
      handleClickTabBar(page + ".html");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleApiResponse = (response) => {
    const content = response.data.content;
    dispatch(updateValue(content));
  };
  return (
    <div className="flex flex-row bg-[#3A3A3A] w-12/12 ">
      {ArrPageList.map((pageName, index) => (
        <div
          className={`flex flex-row px-5 py-1 text-lg items-center h-full w-56 text-white ${
            activepage === pageName ? "bg-[#3A3A3A]" : "bg-[#505050]"
          }`}
          key={index}
        >
          <div className="w-5/6" onClick={() => handleGetpage(pageName)}>
            <p>{pageName}</p>
          </div>
          <div className="w-1/6 flex justify-end">
            <IoClose
              color="white"
              size={25}
              onClick={() => deletedPage(pageName)}
            />
          </div>
        </div>
      ))}
      <div
        className="flex flex-row p-1 items-center text-white"
        onClick={() => setShowModal(true)}
      >
        <div className="rounded-bl-md rounded-tr-md bg-[#303030] px-2 py-1 cursor-pointer">
          <IoMdAdd color="white" size={20} />
        </div>
      </div>
    </div>
  );
};

export default MidTabBar;
