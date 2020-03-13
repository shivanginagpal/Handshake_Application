import React, { Component } from 'react';
import CompanyNavbar from "../company/CompanyNavbar";
import axios from "axios";
import backendURL from "../auth/Settings";

export default class ViewStudentResume extends Component {
  
    constructor() {
      super();
      this.state = {
        resume:null,
        errors: {}
    };
  }
  async componentDidMount() {
    var student_id=null;
    if(this.props.location.state){
        student_id=this.props.location.state.student_id;  
    }

    await axios("/getStudentResume", {
      method: "get",
      params: { "student_id": student_id },
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(response => {
        console.log(response);
        console.log(response.data.resume_file[0].resume_file);
        this.setState({
          resume: response.data.resume_file[0].resume_file}
          )
        });
  }
  

    render() {
      console.log(this.state.resume);
      let resume_file = null;
      if (this.state.resume !== null){
        resume_file = backendURL+"/downloadResume/"+this.state.resume;
      }
      
    return (
      <div>
        <CompanyNavbar />
        <iframe style={{width:"1000px", height:"1100px"}} src={resume_file}></iframe>
      </div>
    )
  }
}
