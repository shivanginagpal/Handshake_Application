import React, { Component } from 'react';
import axios from 'axios';
import 'react-dropdown/style.css';
import { withRouter } from "react-router-dom";
import CompanyNavbar from './CompanyNavbar';

class StudentsRegisteredEvent extends Component {

  constructor() {
    super();
    this.state = {
        studentsForEvent: [],
        event_id: '',
        errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    console.log("in componentDidMount-event");
    console.log(this.props);
    var event_id = null;
    event_id = this.props.location.state.event_id;
    console.log(event_id);
    axios('/getRegisteredStudentDetails', {
      method: 'get',
      params: { "event_id": event_id },
      config: { headers: { 'Content-Type': 'application/json' } }
    })
      .then(res => {
        const { studentsForEvent } = res.data;
        this.setState({ studentsForEvent: studentsForEvent });
        console.log(studentsForEvent);
      })
      .catch(error => console.log(error.response.data))
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  reply_click = (student_id) => {
    console.log(student_id);
    this.props.history.push({
      pathname: "/companyViewStudentProfile",
      state: {
        student_id: student_id
      }
    });
  }

  render() {
    let studentDetails = this.state.studentsForEvent.map(student => {
      return (
        <tr>
          <td>{<a href="#" onClick={() => this.reply_click(student.student_id)}> {student.first_name} {student.last_name}</a>}</td>
        </tr>
      )
    })
    return (<div>
      <CompanyNavbar />
      <div class="container">
        <h2>Students List</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Student Name</th>
            </tr>
          </thead>
          <tbody>
            {/*Display the Table row based on data recieved*/}
            {studentDetails}
          </tbody>
        </table>
      </div>
    </div>
    )
  };
}

export default withRouter(StudentsRegisteredEvent);