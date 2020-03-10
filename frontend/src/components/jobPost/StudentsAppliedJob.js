import React, { Component } from 'react';
import axios from 'axios';
import NavJob from './NavJob';
import Dropdown from 'react-dropdown';
import { withRouter } from "react-router-dom";
import {Redirect}  from 'react-router';
import 'react-dropdown/style.css'

class StudentsAppliedJob extends Component {

    constructor() {
        super();
        this.state = { 
             students:[],
             studentsForJob:[],
             job_id:'',
             errors: {}
        };
    this.onChange = this.onChange.bind(this);
    }

     componentDidMount(){
        axios.defaults.withCredentials = true;  
        console.log("in componentDidMount");
        console.log(this.props);
        const job_id=this.props.job;
        console.log(job_id);
        console.log("Came here");
        //List of all jobs posted by this company
         axios('api/jobPosts/getStudentDetails', {
            method: 'get',
            params:{"job_id": job_id},
            config: {headers: {'Content-Type':'application/json'}}})
        .then(res=>{
            const {studentsForJob}=res.data;
            this.setState({studentsForJob: studentsForJob});
            console.log(studentsForJob);
        })
        .catch(error=> console.log(error.response.data))
    }

    reply_click = (student_id) => {
        console.log(student_id);
            this.props.history.push({
                pathname:"/viewStudentProfile",
                state:{
                    student_id:student_id
                 }
               });
      }
      onChange = (student, e) => {
        console.log(student);
        console.log(e);
        const updateAppliedJob = {
            app_status: e.value,
            student_id: student.student_id
        };
        axios
            .post('api/appliedJobs/updateAppliedJob', updateAppliedJob)
            .then(res => console.log(res.data))
            .catch(err => this.setState({ errors: err.response.data }));
    }

render() {
    const status=["Pending", "Approved", "Rejected"];

    let studentDetails = this.state.studentsForJob.map(student => {
        return(
            <div class="card w-50" id="studentscard">
            <div class="card-body">
         <div className="row">
        Student Name: <a href="#" onClick={()=>this.reply_click(student.student_id)}> {student.first_name} {student.last_name}</a>
           </div>
           <div className="row">
         Application Status: <Dropdown options={status} onChange={(e)=>this.onChange(student,e)} value={student.app_status}/>
           </div> 
           </div>
           </div>
        )})
        return (
            <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div className="dash-one">
                <h4 className="font-weight-bold">Students List</h4>
                {studentDetails.length > 0 ? (
                  <div className="col-10">{studentDetails}</div>
                ) : (
                  <div>
                    <h4 style={{ margin: "3em" }}>No students applied for this job.</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        )};
}

export default withRouter(StudentsAppliedJob);