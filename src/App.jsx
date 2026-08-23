import React, { useState } from "react";
import "./App.css";
import initialProjects from "./data";

function App() {
  const [page, setPage] = useState("dashboard");

  // Resume State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  // Dynamic Portfolio State
  const [projectList, setProjectList] = useState(initialProjects);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");

  // Form Builder State
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  // Handler to add new portfolio project
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

  function addQuestion() {
    if (question !== "") {
      setQuestions([...questions, question]);
      setQuestion("");
    }
  }

  function printResume() {
    window.print();
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">DevStudio</div>
        <div className="nav-buttons">
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("resume")}>Resume</button>
          <button onClick={() => setPage("portfolio")}>Portfolio</button>
          <button onClick={() => setPage("forms")}>Form Builder</button>
        </div>
      </nav>

      {/* DASHBOARD */}
      {page === "dashboard" && (
        <main className="dashboard">
          <section className="hero">
            <h1>Welcome to DevStudio 👋</h1>
            <p>Your all-in-one career and content workspace.</p>
          </section>

          <section className="cards">
            <div className="card">
              <h2>Resume Builder</h2>
              <p>
                Create a professional resume and see a live preview while
                entering your information.
              </p>
              <button onClick={() => setPage("resume")}>Create Resume</button>
            </div>

            <div className="card">
              <h2>Portfolio</h2>
              <p>
                Showcase your projects, technologies and work in an
                interactive portfolio.
              </p>
              <button onClick={() => setPage("portfolio")}>View Portfolio</button>
            </div>

            <div className="card">
              <h2>Form Builder</h2>
              <p>Create simple custom forms for collecting responses.</p>
              <button onClick={() => setPage("forms")}>Create Form</button>
            </div>
          </section>
        </main>
      )}

      {/* RESUME BUILDER */}
      {page === "resume" && (
        <main className="page">
          <h1>Resume Builder</h1>
          <p className="subtitle">
            Enter your information and see your resume live.
          </p>

          <div className="resume-container">
            <div className="form-box">
              <h2>Enter Details</h2>

              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Phone</label>
              <input
                type="text"
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label>Education</label>
              <textarea
                placeholder="Enter your education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              ></textarea>

              <label>Skills</label>
              <textarea
                placeholder="Example: Java, React, HTML, CSS"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              ></textarea>

              <label>Experience / Projects</label>
              <textarea
                placeholder="Enter your experience or projects"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              ></textarea>

              <button onClick={printResume}>Print Resume</button>
            </div>

            {/* LIVE RESUME PREVIEW */}
            <div className="resume-preview">
              <h2>{name || "Your Name"}</h2>
              <p>
                {email || "your@email.com"}
                {" | "}
                {phone || "Your Phone Number"}
              </p>

              <hr />

              <h3>Education</h3>
              <p>{education || "Your education details will appear here."}</p>

              <h3>Skills</h3>
              <p>{skills || "Your skills will appear here."}</p>

              <h3>Experience / Projects</h3>
              <p>
                {experience ||
                  "Your experience or project details will appear here."}
              </p>

              <h3>Portfolio Projects</h3>
              {projectList.length > 0 ? (
                projectList.map((project) => (
                  <div key={project.id} style={{ marginBottom: "10px" }}>
                    <strong>{project.title}</strong>
                    <p style={{ margin: "2px 0" }}>{project.description}</p>
                    <small>
                      <em>Tech: {project.technology}</em>
                    </small>
                  </div>
                ))
              ) : (
                <p>No portfolio projects added yet.</p>
              )}
            </div>
          </div>
        </main>
      )}

      {/* DYNAMIC PORTFOLIO */}
      {page === "portfolio" && (
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
              {projectList.map((project) => (
                <div className="project-card" key={project.id}>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <p className="technology">
                    <strong>Technology:</strong> {project.technology}
                  </p>
                  <button>View Project</button>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* FORM BUILDER */}
      {page === "forms" && (
        <main className="page">
          <h1>Form Builder</h1>
          <p className="subtitle">
            Create a custom form and preview your questions.
          </p>

          <div className="form-builder">
            <div className="form-box">
              <h2>Add Question</h2>
              <input
                type="text"
                placeholder="Example: What is your name?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button onClick={addQuestion}>Add Question</button>

              <h3>Questions Added</h3>
              {questions.length === 0 && <p>No questions added yet.</p>}
              <ol>
                {questions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="form-preview">
              <h2>Form Preview</h2>
              {questions.length === 0 && (
                <p>Add questions to see the form preview.</p>
              )}

              {questions.map((item, index) => (
                <div className="question" key={index}>
                  <label>{item}</label>
                  <input type="text" />
                </div>
              ))}

              {questions.length > 0 && <button>Submit Response</button>}
            </div>
          </div>
        </main>
      )}

    </div>
  );
}

export default App;