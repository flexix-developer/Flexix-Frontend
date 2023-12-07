import React, { useState } from "react";
import NavBarHome from "../components/NavBarWorkspace";
import { FiDownload } from "react-icons/fi";
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [projects, setProjects] = useState([]);

  const handleNewProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `Project ${projects.length + 1}`,
      description: "Project description goes here.",
      lastEdit: "Edit 19 Oct 2023 : 00.00",
    };

    setProjects([...projects, newProject]);
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <NavBarHome />
      <div className="flex flex-row items-center justify-between px-6 md:px-6 lg:px-8 py-8">
        <div className="flex items-center">
          <p className="text-3xl md:text-4xl lg:text-4xl text-Black font-bold">My Project</p>
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
          <div key={project.id} className="flex flex-col w-2/12 bg-gray-300 m-5 ml-10">
            <img src="https://media.gcflearnfree.org/content/55e0914924929be0279509cf_05_29_2014/start_intro_flower.jpg" className="w-full" alt="" />
            <div className="flex flex-row mt-1 p-2 px-5">
              <div>
                <p className="font-semibold text-xl">{project.name}</p>
                <p>{project.lastEdit}</p>
              </div>
              <div className="ml-auto mt-4">
                <FiDownload />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
