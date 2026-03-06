import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [showResult, setShowResult] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    enroll: "",
    program: "BCA",
    semester: "4",
    exam: "November - 2024",
    java: "",
    php: "",
    sad: "",
    fawd: "",
  });

  const [photoPreview, setPhotoPreview] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
  };

  const calculateTotal = () => {
    return (
      Number(student.java || 0) +
      Number(student.php || 0) +
      Number(student.sad || 0) +
      Number(student.fawd || 0)
    );
  };

  const calculatePercentage = () => {
    return (calculateTotal() / 400) * 100;
  };

  const calculateGrade = (marks) => {
    marks = Number(marks || 0);
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";
    return "F";
  };

  const finalGrade = () => calculateGrade(calculatePercentage());

  const finalStatus = () => {
    return calculatePercentage() >= 40 ? "PASS" : "FAIL";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  const handleReset = () => {
    setStudent({
      name: "",
      enroll: "",
      program: "BCA",
      semester: "4",
      exam: "November - 2024",
      java: "",
      php: "",
      sad: "",
      fawd: "",
    });
    setPhotoPreview("");
    setShowResult(false);
  };

  const downloadMarksheet = () => {
    window.print();
  };

  const total = calculateTotal();
  const percentage = calculatePercentage().toFixed(2);
  const grade = finalGrade();
  const status = finalStatus();

  return (
    <div className="main-container" >
      <h1 className="main-title">🎓 Student Marksheet Generator</h1>

      <div className="form-wrapper">
        <div className="form-card">
          <h2>Enter Student Details</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Student Name</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                placeholder="Enter Student Name"
                required
              />
            </div>

            <div className="input-group">
              <label>Enrollment No</label>
              <input
                type="text"
                name="enroll"
                value={student.enroll}
                onChange={handleChange}
                placeholder="Enter Enrollment Number"
                required
              />
            </div>

            <div className="two-grid">
              <div className="input-group">
                <label>Program</label>
                <input
                  type="text"
                  name="program"
                  value={student.program}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Semester</label>
                <input
                  type="text"
                  name="semester"
                  value={student.semester}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Examination</label>
              <input
                type="text"
                name="exam"
                value={student.exam}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Upload Student Photo</label>
              <input type="file" accept="image/*" onChange={handlePhoto} />
            </div>

            <h3 className="marks-title">Enter Marks (Out of 100)</h3>

            <div className="two-grid">
              <div className="input-group">
                <label>Java</label>
                <input
                  type="number"
                  name="java"
                  value={student.java}
                  onChange={handleChange}
                  placeholder="Java Marks"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="input-group">
                <label>PHP</label>
                <input
                  type="number"
                  name="php"
                  value={student.php}
                  onChange={handleChange}
                  placeholder="PHP Marks"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="input-group">
                <label>SAD</label>
                <input
                  type="number"
                  name="sad"
                  value={student.sad}
                  onChange={handleChange}
                  placeholder="SAD Marks"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="input-group">
                <label>FAWD</label>
                <input
                  type="number"
                  name="fawd"
                  value={student.fawd}
                  onChange={handleChange}
                  placeholder="FAWD Marks"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>

            <div className="btn-group">
              <button type="submit" className="btn submit-btn">
                Submit Result
              </button>

              <button
                type="button"
                className="btn reset-btn"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {showResult && (
        <div className="result-wrapper">
          <div className="marksheet" id="print-area">
            <div className="marksheet-header">
              <div className="logo-section">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcy2_F-e0iePwqDChDH4Yd8cUmmJqbhzVQow&s"
                  alt="Atmiya University Logo"
                  className="uni-logo"
                />
              </div>

              <div className="uni-details">
                <h1>ATMIYA UNIVERSITY</h1>
                <p>Yogidham Gurukul, Kalawad Road, Rajkot - 360005</p>
                <h3>PROVISIONAL STATEMENT OF MARKS</h3>
              </div>

              <div className="photo-section">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Student"
                    className="student-photo"
                  />
                ) : (
                  <div className="no-photo">No Photo</div>
                )}
              </div>
            </div>

            <div className="student-info">
              <div>
                <b>Name of Candidate:</b> {student.name}
              </div>
              <div>
                <b>Enrollment No:</b> {student.enroll}
              </div>
              <div>
                <b>Programme:</b> {student.program}
              </div>
              <div>
                <b>Semester:</b> {student.semester}
              </div>
              <div>
                <b>Examination:</b> {student.exam}
              </div>
              <div>
                <b>Date:</b> {new Date().toLocaleDateString()}
              </div>
            </div>

            <table className="marks-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Marks</th>
                  <th>Out Of</th>
                  <th>Grade</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Java Programming</td>
                  <td>{student.java}</td>
                  <td>100</td>
                  <td>{calculateGrade(student.java)}</td>
                  <td>{student.java >= 40 ? "P" : "F"}</td>
                </tr>

                <tr>
                  <td>PHP Programming</td>
                  <td>{student.php}</td>
                  <td>100</td>
                  <td>{calculateGrade(student.php)}</td>
                  <td>{student.php >= 40 ? "P" : "F"}</td>
                </tr>

                <tr>
                  <td>System Analysis & Design (SAD)</td>
                  <td>{student.sad}</td>
                  <td>100</td>
                  <td>{calculateGrade(student.sad)}</td>
                  <td>{student.sad >= 40 ? "P" : "F"}</td>
                </tr>

                <tr>
                  <td>Front End Web Development (FAWD)</td>
                  <td>{student.fawd}</td>
                  <td>100</td>
                  <td>{calculateGrade(student.fawd)}</td>
                  <td>{student.fawd >= 40 ? "P" : "F"}</td>
                </tr>
              </tbody>
            </table>

            <div className="result-summary">
              <div className="summary-box">
                <h4>Total</h4>
                <p>{total}/400</p>
              </div>

              <div className="summary-box">
                <h4>Percentage</h4>
                <p>{percentage}%</p>
              </div>

              <div className="summary-box">
                <h4>Grade</h4>
                <p>{grade}</p>
              </div>

              <div className={`summary-box status ${status}`}>
                <h4>Status</h4>
                <p>{status}</p>
              </div>
            </div>

            <div className="signatures">
              <div>
                <div className="line"></div>
                <p>Controller of Examination</p>
              </div>

              <div>
                <div className="line"></div>
                <p>Registrar</p>
              </div>
            </div>
          </div>

          <button className="download-btn" onClick={downloadMarksheet}>
            ⬇ Download Result (A4 One Page)
          </button>
        </div>
      )}
    </div>
  );
}