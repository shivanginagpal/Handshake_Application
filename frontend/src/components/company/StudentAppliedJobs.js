import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { withRouter } from "react-router-dom";
import 'react-dropdown/style.css';
import { connect } from 'react-redux';
import { getStudentsForJob } from '../../actions/companyActions';
import CompanyNavbar from './CompanyNavbar';

class StudentAppliedJobs extends Component {

  constructor() {
    super();
    this.state = {
      jobstudents: [],
      job_id: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    axios.defaults.withCredentials = true;
    console.log("in componentDidMount");
    console.log(this.props);
    var job_id = null;
    job_id = this.props.location.state.job_id;
    await axios('getListOfStudentAppliedForJob', {
      method: 'get',
      params: { "job_id": job_id }
    })
      .then(res => {
        const { studentsForJob } = res.data;
        this.setState({
          job_id: job_id,
          jobstudents: studentsForJob
        });
        console.log(studentsForJob);
      })
      .catch(error => console.log(error.response.data))
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
  onChange = (student, e) => {
    console.log(student);
    console.log(e);
    const updateAppliedJob = {
      app_status: e.value,
      student_id: student.student_id,
      job_id: this.state.job_id
    };
    console.log(updateAppliedJob);
    axios
      .post('/updateAppliedJob', updateAppliedJob)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const status = ["Pending", "Approved", "Rejected"];
    console.log(this.props);
    // const {jobstudents, jobs_loading}=this.props;
    // console.log(jobstudents);

    let studentDetails = this.state.jobstudents.map(student => {
      return (
          <tr>
            <td>{<a href="#" onClick={() => this.reply_click(student.student_id)}> {student.first_name} {student.last_name}</a>}</td>
      <td>{<Dropdown options={status} onChange={(e) => this.onChange(student, e)} value={student.app_status} />}</td>
          </tr>
        )
    }
    )
    return (
      <div>
        <CompanyNavbar/>
      <div class="container">
        <h2>Students List</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Application Status</th>
            </tr>
          </thead>
          <tbody>
            {/*Display the Tbale row based on data recieved*/}
              {studentDetails}
          </tbody>
        </table>
      </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  jobstudents: state.studentjobReducer
});

export default connect(mapStateToProps, { getStudentsForJob })(withRouter(StudentAppliedJobs));

