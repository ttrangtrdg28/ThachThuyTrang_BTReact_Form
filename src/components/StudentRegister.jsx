import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import {
  addStudentAction,
  updateStudentAction,
} from "../store/actions/studentAction";

class StudentRegister extends Component {
  idInputRef = createRef();
  fullnameInputRef = createRef();
  phoneInputRef = createRef();
  emailInputRef = createRef();

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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    isValid &= this.validateRequired(
      this.state.id,
      this.idInputRef.current,
      "Student ID is required"
    );

    isValid &= this.validateRequired(
      this.state.fullname,
      this.fullnameInputRef.current,
      "Student's fullname is required"
    );

    isValid &=
      this.validateRequired(
        this.state.phone,
        this.phoneInputRef.current,
        "Student's phone number is required"
      ) &&
      this.validateWithRegex(
        this.state.email,
        this.emailInputRef.current,
        "Student's phone number is incorrect",
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      );

    isValid &=
      this.validateRequired(
        this.state.email,
        this.emailInputRef.current,
        "Student's email is required"
      ) &&
      this.validateWithRegex(
        this.state.email,
        this.emailInputRef.current,
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
              <small ref={this.idInputRef} className="text-danger" />
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
              <small ref={this.fullnameInputRef} className="text-danger" />
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
              <small ref={this.phoneInputRef} className="text-danger" />
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
              <small ref={this.emailInputRef} className="text-danger" />
            </div>
          </div>

          <div className="d-flex align-item-center justify-content-end">
            <button type="submit" className="btn btn-success mr-3">
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
    selectedStudent: state.studentReducer.selected,
  };
};

export default connect(mapStateToProps)(StudentRegister);
