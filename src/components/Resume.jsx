import React, { useState } from "react";

function Resume({ projectList }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  function printResume() {
    window.print();
  }

  return (
    <main className="page">
      <h1>Resume Builder</h1>
      <p className="subtitle">Enter your information and see your resume live.</p>

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
          <p>{experience || "Your experience or project details will appear here."}</p>

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
  );
}

export default Resume;