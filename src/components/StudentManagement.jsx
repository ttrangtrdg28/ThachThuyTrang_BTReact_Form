import React, { Component } from "react";
import StudentRegister from "./StudentRegister";
import StudentList from "./StudentList";

export default class StudentManagement extends Component {
  render() {
    return (
      <div className="container">
        <StudentRegister />
        <StudentList />
      </div>
    );
  }
}
