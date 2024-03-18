import NavBarHome from "../components/navbar/NavBarHome";
import NavBarWorkspace from "../components/navbar/NavBarWorkspace";
import axios from "axios";
import React, { useState, useEffect } from "react";

const TutorialPage = () => {
  const [userInfo, setUserInfo] = useState({ fname: "", lname: "" }); // State to hold user info
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []); // ทำให้มีลำดับเพียงครั้งเดียวที่ตอน Component ถูกโหลด

  const fetchProjects = async () => {
    try {
      const ID = localStorage.getItem("ID");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/users/readall/${ID}`,
        // `http://ceproject.thddns.net:3322/users/readall/${ID}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ทำตรงนี้กับข้อมูลที่ได้จาก response
      console.log(response.data);
      setUserInfo({
        fname: response.data.fname,
        lname: response.data.lname,
      });
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const [selectedVideo, setSelectedVideo] = useState(
    "https://www.youtube.com/embed/JWJul9o1qwM?si=JJFmaFQLCU1_X91n"
  );
  const [showFullDescription, setShowFullDescription] = useState(false);

  const videoDescriptions = {
    "https://www.youtube.com/embed/JWJul9o1qwM?si=JJFmaFQLCU1_X91n":
      "1. Contrary to popular belief, Lorem Ipsum is not simply random text. \n 2. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin \n 3. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin \n 1. Contrary to popular belief, Lorem Ipsum is not simply random text. \n 2. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin \n 3. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin \n 1. Contrary to popular belief, Lorem Ipsum is not simply random text. \n 2. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin \n 3. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin \n 1. Contrary to popular belief, Lorem Ipsum is not simply random text. \n 2. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin \n 3. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin",

    "https://www.youtube.com/embed/MoGDiI_K-Pk?si=ulxZ1Svbd3ukMZ81":
      "1. Professor at Hampden-Sydney College in Virginia, \n 2. looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical \n 3. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin",

    "https://www.youtube.com/embed/27afGUnAqGo?si=7dwe7VCBnvH3VCke":
      "1. 45 BC. This book is a treatise on the theory of ethics, \n 2. very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",

    "https://www.youtube.com/embed/HDroWRz4n54?si=RhJJ0U_qOmw2OkWQ":
      "1. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections \n 2. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin \n 3. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin",

    "https://www.youtube.com/embed/Az893xQQLk8?si=UVDSVBnPjNcDPLX6":
      "1. mbined with a handful of model sentence structures, \n 2. to generate Lorem Ipsum which looks reasonable. \n 2.The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  };

  const handleButtonClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setShowFullDescription(false); // Reset showFullDescription when changing videos
  };

  const handleSeeMoreClick = () => {
    setShowFullDescription(true);
  };

  const handleSeeLessClick = () => {
    setShowFullDescription(false);
  };

  const getDescription = () => {
    const description = videoDescriptions[selectedVideo] || "";
    const lines = description.split("\n");
    const showLines = showFullDescription ? lines.length : 2;

    if (lines.length > 0) {
      return (
        <div>
          {lines.slice(0, showLines).map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          {lines.length > 2 && (
            <div>
              {showFullDescription ? (
                <span
                  className="text-blue-200 cursor-pointer"
                  onClick={handleSeeLessClick}
                >
                  See less ...
                </span>
              ) : (
                <span
                  className="text-blue-200 cursor-pointer"
                  onClick={handleSeeMoreClick}
                >
                  See more ...
                </span>
              )}
            </div>
          )}
        </div>
      );
    } else {
      return <div>{description}</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {token ? (
        <NavBarWorkspace fname={userInfo.fname} lname={userInfo.lname} />
      ) : (
        <NavBarHome />
      )}

      <div className="flex flex-col items-center my-8">
        <p className="text-white font-bold text-4xl">TUTORIAL</p>
      </div>
      <div className="flex flex-row mx-8 flex-1">
        <div className="w-3/12 flex flex-col mr-1">
          <button
            onClick={() =>
              handleButtonClick(
                "https://www.youtube.com/embed/JWJul9o1qwM?si=JJFmaFQLCU1_X91n"
              )
            }
            className="bg-white p-4 mb-4 mr-4 rounded text-blue-700 font-bold text-lg hover:bg-gray-100 cursor-pointer text-left inline-block w-auto"
          >
            01. วิธีการสร้างและการตั้งชื่อโปรเจกต์
          </button>
          <button
            onClick={() =>
              handleButtonClick(
                "https://www.youtube.com/embed/MoGDiI_K-Pk?si=ulxZ1Svbd3ukMZ81"
              )
            }
            className="bg-white p-4 mb-4 mr-4 rounded text-blue-700 font-bold text-lg hover:bg-gray-100 cursor-pointer text-left inline-block w-auto"
          >
            02. แนะนำ Toolbox และ Properties ต่างๆ
          </button>
          <button
            onClick={() =>
              handleButtonClick(
                "https://www.youtube.com/embed/27afGUnAqGo?si=7dwe7VCBnvH3VCke"
              )
            }
            className="bg-white p-4 mb-4 mr-4 rounded text-blue-700 font-bold text-lg hover:bg-gray-100 cursor-pointer text-left inline-block w-auto"
          >
            03. แนะนำการวาง widgets วางๆ ใน Toolbox
          </button>
          <button
            onClick={() =>
              handleButtonClick(
                "https://www.youtube.com/embed/HDroWRz4n54?si=RhJJ0U_qOmw2OkWQ"
              )
            }
            className="bg-white p-4 mb-4 mr-4 rounded text-blue-700 font-bold text-lg hover:bg-gray-100 cursor-pointer text-left inline-block w-auto"
          >
            04. แนะนำการใช้งาน API และการจัดเตรียม API
          </button>
          <button
            onClick={() =>
              handleButtonClick(
                "https://www.youtube.com/embed/Az893xQQLk8?si=UVDSVBnPjNcDPLX6"
              )
            }
            className="bg-white p-4 mb-4 mr-4 rounded text-blue-700 font-bold text-lg hover:bg-gray-100 cursor-pointer text-left inline-block w-auto"
          >
            05. Preview หรือ แสดงเว็บไซต์เวอร์ชั่นใช้งานจริง
          </button>
        </div>
        <div className="w-9/12 flex flex-col">
          <div className="h-6/12">
            {selectedVideo && (
              <iframe
                className="w-full h-[640px]"
                src={selectedVideo}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div className="w-full h-6/12 p-4 overflow-y-auto text-white">
            {getDescription()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
