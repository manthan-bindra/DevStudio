import React, { useState } from "react";

function Portfolio({ projectList, setProjectList }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");

  function addProject(e) {
    e.preventDefault();
    if (!title || !description || !technology) return;

    const newProject = {
      id: Date.now(),
      title,
      description,
      technology,
    };

    setProjectList([...projectList, newProject]);
    setTitle("");
    setDescription("");
    setTechnology("");
  }

  // Handler to remove a project by its unique ID
  function removeProject(idToRemove) {
    setProjectList(projectList.filter((project) => project.id !== idToRemove));
  }

  return (
    <main className="page">
      <h1>My Portfolio</h1>
      <p className="subtitle">
        A collection of my projects and work. Add your own below!
      </p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* PORTFOLIO INPUT FORM */}
        <div className="form-box" style={{ flex: "1 1 300px" }}>
          <h2>Add New Project</h2>

          <label>Project Title</label>
          <input
            type="text"
            placeholder="e.g. E-Commerce Website"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            placeholder="Brief description of your project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Technologies Used</label>
          <input
            type="text"
            placeholder="e.g. React, Node.js, MongoDB"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          />

          <button onClick={addProject}>Add Project</button>
        </div>

        {/* PORTFOLIO DISPLAY GRID */}
        <div className="project-grid" style={{ flex: "2 1 400px" }}>
          {projectList.length === 0 ? (
            <p>No projects available. Add one!</p>
          ) : (
            projectList.map((project) => (
              <div className="project-card" key={project.id}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <p className="technology">
                  <strong>Technology:</strong> {project.technology}
                </p>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button>View Project</button>
                  <button
                    onClick={() => removeProject(project.id)}
                    style={{
                      backgroundColor: "#ff4d4d",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Portfolio;