import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

const students = [
  { id: 1, name: "Aman", marks: 65, course: "BCA", attendance: 92 },
  { id: 2, name: "Riya", marks: 45, course: "BCA", attendance: 78 },
  { id: 3, name: "Karan", marks: 72, course: "BBA", attendance: 56 },
  { id: 4, name: "Neha", marks: 30, course: "BCA", attendance: 95 },
  { id: 5, name: "Arjun", marks: 92, course: "BBA", attendance: 49 },
  { id: 6, name: "Sonia", marks: 55, course: "BCA", attendance: 65 }
];

function getFinalStatus(marks, attendance) {
  if (marks < 50) {
    return "Fail";
  }
  if (attendance < 60) {
    return "Attendance Shortage";
  }
  return "Pass";
}

function App() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Course</th>
          <th>Marks</th>
          <th>Attendance</th>
          <th>Final Status</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.course}</td>
            <td>{student.marks}</td>
            <td>{student.attendance}</td>
            <td>{getFinalStatus(student.marks, student.attendance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;