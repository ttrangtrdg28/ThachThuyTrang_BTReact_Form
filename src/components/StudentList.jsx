import React, { Component } from "react";
import Student from "./Student";
import { connect } from "react-redux";

class StudentList extends Component {
  state = {
    keyword: "",
  };

  renderContent = () => {
    let data = this.props.studentList.filter((element) => {
      return (
        element.fullname
          .toLowerCase()
          .indexOf(this.state.keyword.toLowerCase()) !== -1
      );
    });

    return data.map((element, index) => {
      return <Student key={element.id} element={element} index={index} />;
    });
  };

  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  render() {
    return (
      <>
        <div className="form-group">
          <input
            type="text"
            className="form-control mt-4"
            placeholder="Search by full name"
            onChange={this.handleChange}
          />
        </div>
        <table className="table mt-2">
          <thead className="bg-dark p-2 text-white">
            <tr>
              <th>No.</th>
              <th>Full name</th>
              <th>Phone number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderContent()}</tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentList: state.studentReducer.studentList,
  };
};

export default connect(mapStateToProps)(StudentList);
