import React, { Component } from "react";
import StudentRegister from "./StudentRegister";
import StudentList from "./StudentList";

export default class StudentManagement extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h4 className="bg-dark text-white p-3">THÔNG TIN SINH VIÊN</h4>
        </header>
        <StudentRegister />
        <StudentList />
      </div>
    );
  }
}
