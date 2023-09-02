import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import {
  addStudentAction,
  updateStudentAction,
} from "../store/actions/studentAction";

class StudentRegister extends Component {
  idWarningRef = createRef();
  fullnameWarningRef = createRef();
  phoneWarningRef = createRef();
  emailWarningRef = createRef();

  state = {
    id: "",
    fullname: "",
    phone: "",
    email: "",
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

  validateRequired = (value, ref, message) => {
    if (value) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = message;
    return false;
  };

  validateWithRegex = (value, ref, message, regex) => {
    if (regex.test(value)) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = message;
    return false;
  };

  checkExist = (value, ref, message, stdList) => {
    let isExist = false;

    const idx = stdList.findIndex((element) => element.id === value);

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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleAdd = () => {
    let isValid = true;

    isValid &= this.validateRequired(
      this.state.id,
      this.idWarningRef.current,
      "Student ID is required"
    );
    // &&
    //   this.checkExist(
    //     this.state.id,
    //     this.idWarningRef.current,
    //     "Student ID is existed",
    //     this.props.studentList
    //   );

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

    if (isValid) {
      if (this.state.id) {
        this.props.dispatch(updateStudentAction(this.state));
      } else {
        this.props.dispatch(addStudentAction(this.state));
      }
    }

    this.setState({
      id: "",
      fullname: "",
      phone: "",
      email: "",
    });

    // this.props.dispatch(addStudentAction(this.state));
  };

  render() {
    return (
      <>
        <header>
          <h4 className="bg-dark text-white p-3">THÔNG TIN SINH VIÊN</h4>
        </header>

        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form-group col-12 col-xl-3 col-md-3">
              <label>Student ID</label>
              <input
                onChange={this.handleChange}
                value={this.state.id}
                name="id"
                type="text"
                className="form-control"
                placeholder="Student ID"
              />
              <small ref={this.idWarningRef} className="text-danger" />
            </div>

            <div className="form-group col-12 col-xl-3 col-md-3">
              <label>Full name</label>
              <input
                onChange={this.handleChange}
                value={this.state.fullname}
                name="fullname"
                type="text"
                className="form-control"
                placeholder="Full name"
              />
              <small ref={this.fullnameWarningRef} className="text-danger" />
            </div>

            <div className="form-group col-12 col-xl-3 col-md-3">
              <label>Phone number</label>
              <input
                onChange={this.handleChange}
                value={this.state.phone}
                name="phone"
                type="text"
                className="form-control"
                placeholder="Phone number"
              />
              <small ref={this.phoneWarningRef} className="text-danger" />
            </div>

            <div className="form-group col-12 col-xl-3 col-md-3">
              <label>Email</label>
              <input
                onChange={this.handleChange}
                value={this.state.email}
                name="email"
                type="text"
                className="form-control"
                placeholder="Email"
              />
              <small ref={this.emailWarningRef} className="text-danger" />
            </div>
          </div>

          <div className="d-flex align-item-center justify-content-end">
            <button
              type="button"
              className="btn btn-success mr-3"
              onClick={() => this.handleAdd()}
            >
              SAVE
            </button>

            <button type="reset" className="btn btn-secondary">
              RESET
            </button>
          </div>
        </form>
      </>
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
