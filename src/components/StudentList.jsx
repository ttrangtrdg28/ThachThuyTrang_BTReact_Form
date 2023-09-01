import React, { Component } from "react";
import Student from "./Student";

export default class StudentList extends Component {
  render() {
    return (
      <table className="table mt-4">
        <thead className="bg-dark p-2 text-white">
          <tr>
            <th>No.</th>
            <th>Full name</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <Student />
        </tbody>
      </table>
    );
  }
}
