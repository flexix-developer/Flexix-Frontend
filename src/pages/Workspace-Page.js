import React, { useState, useEffect, useCallback } from "react";
// import NavBarWorkspace from "../components/navbar/NavBarWorkspace";
import NavBarDesign from "../components/navbar/NavbarDesign";
import { FiDownload, FiTrash2, FiEdit, FiCheck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useTokenCheck from "../components/useTokenCheck/useTokenCheck";
import axios from "axios";

const HomePage = () => {
  useTokenCheck("/workspace");
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [userInfo, setUserInfo] = useState({ fname: "", lname: "" });
  const [showNewProjectPopup, setShowNewProjectPopup] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const ID = localStorage.getItem("ID");
        const token = localStorage.getItem("token");
        const response = await axios.get(
          // `http://localhost:8081/users/readall/${ID}`,
          `http://ceproject.thddns.net:3322/users/readall/${ID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.message === "Token is expired") {
          localStorage.clear();
        }

        setUserInfo({
          fname: response.data.fname,
          lname: response.data.lname,
        });
      } catch (error) {
        console.error("Error during login", error);
        navigate("/login");
        return;
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchProject = useCallback(async () => {
    try {
      const ID = localStorage.getItem("ID");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        // `http://localhost:8081/users/readproject/${ID}`,
        `http://ceproject.thddns.net:3322/users/readproject/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ลบข้อมูลเดิมใน projects
      setProjects([]);

      response.data.Projects.forEach((project) => {
        fetchShowProject(
          project.ID,
          project.ProjectName,
          project.UpdatedAt,
          project.ScreenIMG
        );
      });
    } catch (error) {
      localStorage.clear();
      // alert("Error during login", error);
      console.error("Error during login", error);
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleNewProject = () => {
    setShowNewProjectPopup(true);
  };

  const fetchShowProject = (id, pname, uptime, img) => {
    // Check if uptime is a valid Date object
    const dateObject = uptime instanceof Date ? uptime : new Date(uptime);

    // Check if dateObject is a valid Date
    if (isNaN(dateObject.getTime())) {
      console.error("Invalid date:", uptime);
      return;
    }

    const formattedDate = dateObject.toISOString().split("T")[0];
    setProjects((prevProjects) => {
      const newProject = {
        id: id,
        name: pname,
        lastEdit: `Edit ${formattedDate}`,
        img: img,
      };
      return [...prevProjects, newProject];
    });
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        // `http://localhost:8081/users/delproject/${projectId}`,
        `http://ceproject.thddns.net:3322/users/delproject/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If deletion is successful, update the state
      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  const handleEditProject = (projectId, projectName) => {
    setEditingProjectId(projectId);
    setEditedProjectName(projectName);
  };

  // const handleDownloadProject = async (projectId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const id = localStorage.getItem("ID");
  //     console.log("id", id, projectId, token);

  //     const response = await axios.post(
  //       "http://localhost:8081/users/downproject",
  //       // "http://ceproject.thddns.net:3322/users/page",
  //       {
  //         id: id,
  //         proid: projectId, // Assuming proid should also be projectId, change it accordingly
  //         pagename: "cart",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         responseType: "blob", // ระบุประเภทข้อมูลที่จะรับกลับเป็น blob
  //       }
  //     );

  //     // สร้าง URL สำหรับไฟล์ zip จาก blob ที่ได้รับ
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     // สร้าง element <a> เพื่อดาวน์โหลดไฟล์ zip
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "project.zip");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove(); // ลบ element <a> ที่สร้างขึ้นหลังจากการดาวน์โหลดเสร็จสิ้น
  //   } catch (error) {
  //     console.error("Error Download project", error);
  //   }
  // };

  const handleDownloadProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("ID");
      console.log("id", id, projectId);
      const requestData = {
        id: id,
        proid: `${projectId.id}`, // Assuming proid should also be projectId, change it accordingly
        pagename: "cart",
      };

      const response = await axios.post(
        // `http://localhost:8081/users/downproject`,
        `http://ceproject.thddns.net:3322/users/downproject`,

        requestData, // ส่ง requestData โดยไม่ต้องแปลงเป็น JSON ซึ่ง Axios จะทำให้โดยอัตโนมัติ
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // ระบุประเภทข้อมูลที่จะรับกลับเป็น blob
        }
      );

      // สร้าง URL สำหรับไฟล์ zip จาก blob ที่ได้รับ
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // สร้าง element <a> เพื่อดาวน์โหลดไฟล์ zip
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${projectId.name}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove(); // ลบ element <a> ที่สร้างขึ้นหลังจากการดาวน์โหลดเสร็จสิ้น
    } catch (error) {
      console.error("Error Download project", error);
    }
  };

  const handleSaveEdit = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("ID");
      await axios.put(
        // `http://localhost:8081/users/editname/${projectId}`,
        `http://ceproject.thddns.net:3322/users/editname/${projectId}`,
        { id: id, newpname: editedProjectName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If update is successful, update the state
      const updatedProjects = projects.map((project) =>
        project.id === projectId
          ? { ...project, name: editedProjectName }
          : project
      );
      setProjects(updatedProjects);

      // Reset editing state
      setEditingProjectId(null);
      setEditedProjectName("");
    } catch (error) {
      alert("Error updating project name");
      console.error("Error updating project name", error);
    }
  };
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (editedProjectName !== "") {
      // ตรวจสอบว่าข้อมูลที่กรอกถูกต้องตามรูปแบบหรือไม่
      const isValidInput = /^[A-Za-z0-9._%+-]+$/.test(editedProjectName);

      if (isValidInput) {
        const ID = localStorage.getItem("ID");
        const token = localStorage.getItem("token");
        try {
          await axios.post(
            // "http://127.0.0.1:8081/users/create",
            "http://ceproject.thddns.net:3322/users/create",
            {
              id: ID,
              name: editedProjectName,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Create New Project Success!");
          setShowNewProjectPopup(false);
          setEditedProjectName("");
          // Fetch projects after creating a new one
          fetchProject();
        } catch (error) {
          alert("Create New Project Failed!");
        }
      } else {
        alert(
          "Invalid characters in Project Name. Please use A-Z, a-z, 0-9, ., _, %, +, -"
        );
      }
    } else {
      alert("Please Enter Project Name!");
    }
  };
  const handleClickProject = (id) => {
    localStorage.setItem("ProjectID", id);
    const projectid = localStorage.getItem("ProjectID");
    console.log(projectid);
    navigate("/design");
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* <NavBarWorkspace fname={userInfo.fname} lname={userInfo.lname} /> */}
      <NavBarDesign fname={userInfo.fname} lname={userInfo.lname} />
      <div className="flex flex-row items-center justify-between px-6 md:px-6 lg:px-8 py-8">
        <div className="flex items-center w-11/12">
          <p className="text-3xl md:text-4xl lg:text-4xl text-Black font-bold">
            My Project
          </p>
          <button
            className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-5 ml-8 border border-sky-800 rounded shadow"
            onClick={handleNewProject}
            name="new_project"
          >
            + New project
          </button>
        </div>
        <div className="">
          <Link to="/tutorial">
            <button className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-2 px-8 border border-sky-800 rounded shadow">
              Tutorial
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap w-">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col w-2/12 bg-gray-300 m-5 ml-10"
            onDoubleClick={() => handleClickProject(project.id)}
          >
            <img
              // src="https://media.gcflearnfree.org/content/55e0914924929be0279509cf_05_29_2014/start_intro_flower.jpg"
              src={`data:image/png;base64,${project.img}`} // ใช้ template literals ในการนำมาแสดง
              className="w-full"
              alt=""
            />
            <div className="flex flex-row mt-1 p-2 px-4">
              <div>
                {editingProjectId === project.id ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="new_name_project"
                      value={editedProjectName}
                      onChange={(e) => setEditedProjectName(e.target.value)}
                      className="border-b border-black px-2"
                    />
                    <FiCheck
                      name="save_new_name"
                      className="ml-2 cursor-pointer text-green-500"
                      onClick={() => handleSaveEdit(project.id)}
                    />
                  </div>
                ) : (
                  <p className="font-semibold text-xl flex items-center">
                    {project.name}
                    <FiEdit
                      name="fiCheckIcon"
                      className="ml-2 cursor-pointer text-blue-500"
                      onClick={() =>
                        handleEditProject(project.id, project.name)
                      }
                    />
                  </p>
                )}
                <p>{project.lastEdit}</p>
              </div>
              <div className="ml-auto mt-4 flex cursor-pointer">
                <FiDownload
                  className="mr-2"
                  onClick={() => handleDownloadProject(project)}
                />
                <FiTrash2
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeleteProject(project.id)}
                  name="delete_project"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewProjectPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4">
            <p className="text-lg font-semibold mb-4">New Project</p>
            <input
              type="text"
              placeholder="Project Name"
              name="project_name"
              value={editedProjectName}
              onChange={(e) => setEditedProjectName(e.target.value)}
              className="border border-gray-300 p-2 mb-2"
            />
            <button
              className="bg-green-700 text-white py-2 px-4"
              onClick={handleCreateProject}
              name="create_project"
            >
              Create Project
            </button>
            <button
              className="bg-gray-400 text-black ml-2 py-2 px-4"
              onClick={() => {
                setShowNewProjectPopup(false);
                setEditedProjectName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
