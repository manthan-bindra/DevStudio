import React, { useState } from "react";
import "./App.css";
import initialProjects from "./data";
import Resume from "./components/Resume";
import Portfolio from "./components/Portfolio";
import FormBuilder from "./components/FormBuilder";

function App() {
  const [page, setPage] = useState("dashboard");
  const [projectList, setProjectList] = useState(initialProjects);

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

      {/* PAGE ROUTES */}
      {page === "resume" && <Resume projectList={projectList} />}
      {page === "portfolio" && (
        <Portfolio projectList={projectList} setProjectList={setProjectList} />
      )}
      {page === "forms" && <FormBuilder />}
    </div>
  );
}

export default App;