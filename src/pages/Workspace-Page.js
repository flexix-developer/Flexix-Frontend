// import React, { useState, useEffect } from "react";
import React, { useState, useEffect, useCallback } from "react";
import NavBarWorkspace from "../components/navbar/NavBarWorkspace";
import { FiDownload, FiTrash2, FiEdit, FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import useTokenCheck from "../components/useTokenCheck/useTokenCheck";
import axios from "axios";

const HomePage = () => {
  useTokenCheck("/login");
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [userInfo, setUserInfo] = useState({ fname: "", lname: "" });
  const [showNewProjectPopup, setShowNewProjectPopup] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const ID = localStorage.getItem("ID");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/users/readall/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.data.message === "Token is expired") {
        localStorage.clear();
      }
      setUserInfo({
        fname: response.data.fname,
        lname: response.data.lname,
      });
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  // useEffect(() => {
  //   fetchProject();
  // }, []);

  // const fetchProject = async () => {
  const fetchProject = useCallback(async () => {
    try {
      const ID = localStorage.getItem("ID");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/users/readproject/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ลบข้อมูลเดิมใน projects
      setProjects([]);

      response.data.Projects.forEach((project) => {
        fetchShowProject(project.ID, project.ProjectName, project.UpdatedAt);
      });
    } catch (error) {
      console.error("Error during login", error);
    }
  }, []);
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleNewProject = () => {
    setShowNewProjectPopup(true);
  };

  const fetchShowProject = (id, pname, uptime) => {
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
      };
      return [...prevProjects, newProject];
    });
  };

  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updatedProjects);
  };

  const handleEditProject = (projectId, projectName) => {
    setEditingProjectId(projectId);
    setEditedProjectName(projectName);
  };

  const handleSaveEdit = (projectId) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, name: editedProjectName }
        : project
    );
    setProjects(updatedProjects);
    setEditingProjectId(null);
    setEditedProjectName("");
  };
  const handleCreateProject = async (e) => {
    e.preventDefault();
    console.log(editedProjectName);
    if (editedProjectName !== "") {
      // ตรวจสอบว่าข้อมูลที่กรอกถูกต้องตามรูปแบบหรือไม่
      const isValidInput = /^[A-Za-z0-9._%+-]+$/.test(editedProjectName);

      if (isValidInput) {
        const ID = localStorage.getItem("ID");
        const token = localStorage.getItem("token");
        try {
          await axios.post(
            "http://127.0.0.1:8081/users/create",
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

  return (
    <div className="h-screen bg-white flex flex-col">
      <NavBarWorkspace fname={userInfo.fname} lname={userInfo.lname} />
      <div className="flex flex-row items-center justify-between px-6 md:px-6 lg:px-8 py-8">
        <div className="flex items-center">
          <p className="text-3xl md:text-4xl lg:text-4xl text-Black font-bold">
            My Project
          </p>
          <button
            className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-5 ml-8 border border-sky-800 rounded shadow"
            onClick={handleNewProject}
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
          >
            <img
              src="https://media.gcflearnfree.org/content/55e0914924929be0279509cf_05_29_2014/start_intro_flower.jpg"
              className="w-full"
              alt=""
            />
            <div className="flex flex-row mt-1 p-2 px-4">
              <div>
                {editingProjectId === project.id ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editedProjectName}
                      onChange={(e) => setEditedProjectName(e.target.value)}
                      className="border-b border-black px-2"
                    />
                    <FiCheck
                      className="ml-2 cursor-pointer text-green-500"
                      onClick={() => handleSaveEdit(project.id)}
                    />
                  </div>
                ) : (
                  <p className="font-semibold text-xl flex items-center">
                    {project.name}
                    <FiEdit
                      className="ml-2 cursor-pointer text-blue-500"
                      onClick={() =>
                        handleEditProject(project.id, project.name)
                      }
                    />
                  </p>
                )}
                <p>{project.lastEdit}</p>
              </div>
              <div className="ml-auto mt-4 flex">
                <FiDownload className="mr-2" />
                <FiTrash2
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeleteProject(project.id)}
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
              value={editedProjectName}
              onChange={(e) => setEditedProjectName(e.target.value)}
              className="border border-gray-300 p-2 mb-2"
            />
            <button
              className="bg-green-700 text-white py-2 px-4"
              onClick={handleCreateProject}
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
