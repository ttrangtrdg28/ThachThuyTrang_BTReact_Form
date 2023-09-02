// npm i --save @fortawesome/fontawesome-svg-core
// npm i --save @fortawesome/free-solid-svg-icons
// npm i --save @fortawesome/react-fontawesome

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import {
  deleteStudentAction,
  setSelectedAction,
} from "../store/actions/studentAction";
import { connect } from "react-redux";

class Student extends Component {
  render() {
    const { id, fullname, phone, email } = this.props.element;

    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{fullname}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>
          <button
            className="btn text-primary mr-1 p-0"
            onClick={() =>
              this.props.dispatch(setSelectedAction(this.props.element))
            }
          >
            <FontAwesomeIcon icon={faSquarePen} size="2x" />
          </button>
          <button
            className="btn text-danger ml-1 p-0"
            onClick={() =>
              this.props.dispatch(deleteStudentAction(this.props.element))
            }
          >
            <FontAwesomeIcon icon={faSquareXmark} size="2x" />
          </button>
        </td>
      </tr>
    );
  }
}

export default connect()(Student);
