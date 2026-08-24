import React, { useState } from "react";

function FormBuilder() {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  function addQuestion() {
    if (question.trim() !== "") {
      setQuestions([...questions, question]);
      setQuestion("");
    }
  }

  // Handler to remove a question by its index
  function removeQuestion(indexToRemove) {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  }

  return (
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
          <ol style={{ paddingLeft: "20px" }}>
            {questions.map((item, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                <span>{item} </span>
                <button
                  onClick={() => removeQuestion(index)}
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "2px 8px",
                    cursor: "pointer",
                    marginLeft: "8px"
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="form-preview">
          <h2>Form Preview</h2>
          {questions.length === 0 && (
            <p>Add questions to see the form preview.</p>
          )}

          {questions.map((item, index) => (
            <div className="question" key={index} style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>{item}</label>
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <input type="text" style={{ flex: 1 }} />
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    cursor: "pointer"
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {questions.length > 0 && <button>Submit Response</button>}
        </div>
      </div>
    </main>
  );
}

export default FormBuilder;