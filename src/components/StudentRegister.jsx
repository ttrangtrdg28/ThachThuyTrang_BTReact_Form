import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import {
  addStudentAction,
  updateStudentAction,
} from "../store/actions/studentAction";
import StudentList from "./StudentList";

class StudentRegister extends Component {
  codeWarningRef = createRef();
  fullnameWarningRef = createRef();
  phoneWarningRef = createRef();
  emailWarningRef = createRef();

  state = {
    id: "",
    code: "",
    fullname: "",
    phone: "",
    email: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    // console.log(event);
  };

  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.selectedStudent &&
      nextProps.selectedStudent.id !== currentState.id
    ) {
      currentState = nextProps.selectedStudent;
    }

    return currentState;
  }

  validateRequired = (value, refError, message) => {
    if (value) {
      refError.innerHTML = "";
      return true;
    }
    refError.innerHTML = message;
    return false;
  };

  validateWithRegex = (value, refError, message, regex) => {
    if (regex.test(value)) {
      refError.innerHTML = "";
      return true;
    }
    refError.innerHTML = message;
    return false;
  };

  checkExist = (value, ref, message, stdList) => {
    let isExist = false;

    const idx = stdList.findIndex((element) => element.code === value);

    if (idx !== -1) {
      isExist = true;
    }

    if (isExist) {
      ref.innerHTML = message;
      return false;
    }
    ref.innerHTML = "";
    return true;
  };

  handleValidate = (isCreate) => {
    let isValid = true;

    if (isCreate) {
      isValid &=
        this.validateRequired(
          this.state.code,
          this.codeWarningRef.current,
          "Student's code is required"
        ) &&
        this.checkExist(
          this.state.code,
          this.codeWarningRef.current,
          "Student's code is existed",
          this.props.studentList
        );
    }

    isValid &= this.validateRequired(
      this.state.fullname,
      this.fullnameWarningRef.current,
      "Student's fullname is required"
    );

    isValid &=
      this.validateRequired(
        this.state.phone,
        this.phoneWarningRef.current,
        "Student's phone number is required"
      ) &&
      this.validateWithRegex(
        this.state.phone,
        this.phoneWarningRef.current,
        "Student's phone number is incorrect",
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      );

    isValid &=
      this.validateRequired(
        this.state.email,
        this.emailWarningRef.current,
        "Student's email is required"
      ) &&
      this.validateWithRegex(
        this.state.email,
        this.emailWarningRef.current,
        "Student's email is incorrect",
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      );

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    if (this.state.id) {
      isValid = this.handleValidate(false);

      if (isValid) {
        this.props.dispatch(updateStudentAction(this.state));
      }
    } else {
      isValid = this.handleValidate(true);

      if (isValid) {
        this.props.dispatch(addStudentAction(this.state));
      }
    }

    this.setState({
      id: "",
      code: "",
      fullname: "",
      phone: "",
      email: "",
    });
  };

  handleReset = () => {
    this.setState({
      id: "",
      code: "",
      fullname: "",
      phone: "",
      email: "",
    });

    this.codeWarningRef.current.innerHTML = "";
    this.fullnameWarningRef.current.innerHTML = "";
    this.phoneWarningRef.current.innerHTML = "";
    this.emailWarningRef.current.innerHTML = "";

    console.log("reset");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="form-group col-12 col-xl-3 col-md-3">
            <label>Student's code</label>
            <input
              value={this.state.code}
              name="code"
              onChange={this.handleChange}
              type="text"
              className="form-control"
              placeholder="Code "
            />
            <small ref={this.codeWarningRef} className="text-danger" />
          </div>

          <div className="form-group col-12 col-xl-3 col-md-3">
            <label>Full name</label>
            <input
              value={this.state.fullname}
              name="fullname"
              onChange={this.handleChange}
              type="text"
              className="form-control"
              placeholder="Full name"
            />
            <small ref={this.fullnameWarningRef} className="text-danger" />
          </div>

          <div className="form-group col-12 col-xl-3 col-md-3">
            <label>Phone number</label>
            <input
              value={this.state.phone}
              name="phone"
              onChange={this.handleChange}
              type="text"
              className="form-control"
              placeholder="Phone number"
            />
            <small ref={this.phoneWarningRef} className="text-danger" />
          </div>

          <div className="form-group col-12 col-xl-3 col-md-3">
            <label>Email</label>
            <input
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              type="text"
              className="form-control"
              placeholder="Email"
            />
            <small ref={this.emailWarningRef} className="text-danger" />
          </div>
        </div>

        <div className="d-flex align-item-center justify-content-end">
          <button
            // type="button"
            className="btn btn-success mr-3"
            // onClick={() => this.handleAdd()}
          >
            SAVE
          </button>

          <button
            type="reset"
            className="btn btn-secondary"
            onClick={() => this.handleReset()}
          >
            RESET
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentList: state.studentReducer.studentList,
    selectedStudent: state.studentReducer.selected,
  };
};

export default connect(mapStateToProps)(StudentRegister);
