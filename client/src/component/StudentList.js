import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://student-management-system-backend-olive.vercel.app/student");
      console.log("Response: ", response.data);
      setStudents(response.data); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleDeleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `https://student-management-system-backend-olive.vercel.app/student/deleteStudent?id=${id}`
      );
      console.log("Response: ", response);
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(filter.toLowerCase()) ||
    student.homeAddress.toLowerCase().includes(filter.toLowerCase()) ||
    new Date(student.createdAt)
      .toLocaleDateString()
      .includes(filter.toLowerCase())
  );

  console.log("Students", students);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" navbar-collapse" id="navbarTogglerDemo01">
          <h1 className="navbar-brand">Student Dashboard</h1>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <Link to="/add-student">
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Add new student
            </button>
          </Link>
          <Link to="/">
            <button
              className="btn btn-danger mx-3 my-2 my-sm-0"
              type="submit"
              style={{ backgroundColor: "darkRed", color: "white" }}
            >
              Logout
            </button>
          </Link>
        </div>
      </nav>
      <div className="container">
        <div className="my-3">
          <input
            type="text"
            placeholder="Filter by name, address, or registration date"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-control"
          />
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Father's Name</th>
              <th scope="col">Mother's Name</th>
              <th scope="col">Home Address</th>
              <th scope="col">Roll Number</th>
              <th scope="col">Registration Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.fathersName}</td>
                <td>{student.mothersName}</td>
                <td>{student.homeAddress}</td>
                <td>{student.rollNumber}</td>
                <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/edit-student/${student._id}`}>
                    <button className="btn btn-dark">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn-red btn-dark"
                    onClick={() => handleDeleteStudent(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentList;
