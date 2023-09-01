// npm i --save @fortawesome/fontawesome-svg-core
// npm i --save @fortawesome/free-solid-svg-icons
// npm i --save @fortawesome/react-fontawesome

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  deleteStudentAction,
  setSelectedAction,
} from "../store/actions/studentAction";

class Student extends Component {
  renderContent = () => {
    return this.props.studentList.map((element, index) => {
      const { id, fullname, phone, email } = element;

      const bg = index % 2 === 0 ? "bg-light" : "";

      return (
        <tr key={id} className={bg}>
          <td>{index + 1}</td>
          <td>{fullname}</td>
          <td>{phone}</td>
          <td>{email}</td>
          <td>
            <button
              className="btn text-primary mr-1 p-0"
              onClick={() => this.props.dispatch(setSelectedAction(element))}
            >
              <FontAwesomeIcon icon={faSquarePen} size="2x" />
            </button>
            <button
              className="btn text-danger ml-1 p-0"
              onClick={() => this.props.dispatch(deleteStudentAction(element))}
            >
              <FontAwesomeIcon icon={faSquareXmark} size="2x" />
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return <>{this.renderContent()}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    studentList: state.studentReducer.studentList,
  };
};

export default connect(mapStateToProps)(Student);
