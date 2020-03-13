import React, { Component } from 'react';
import StudentNavbar from "../student/StudentNavbar";
import axios from "axios";
import "../../App.css";

 class ViewAllStudents extends Component {
   constructor() {
     super();
     this.state = {
       profiles: [],
       searchString: ""
     };
     this.searchChangeHandler = this.searchChangeHandler.bind(this);
   }
   searchChangeHandler(e) {
     this.setState({ searchString: e.target.value });
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

  reply_click1 = (student_id) => {
    console.log(student_id);
    this.props.history.push({
      pathname: "/viewStudentResume",
      state: {
        student_id: student_id
      }
    });
  }

   componentDidMount(){
       axios("/viewAllStudents",{
           method: "get"
       }).then(response => {
           this.setState({
               profiles:  response.data.students
           });
           console.log(this.state.profiles);
       })
   }
   render() {
       let studentProfile = this.state.profiles.map(student => {
           if (
               student.skill_set.toUpperCase()
               .includes(this.state.searchString.toUpperCase()) ||
               student.first_name.toUpperCase()
               .includes(this.state.searchString.toUpperCase()) || 
               student.last_name.toUpperCase()
               .includes(this.state.searchString.toUpperCase()) ||
               student.school.toUpperCase()
               .includes(this.state.searchString.toUpperCase()) ||
               student.major.toUpperCase()
               .includes(this.state.searchString.toUpperCase()) 
           ) {
               return (
                 <tr>
                   <td>{student.first_name}
                   
                   </td>
                   <td>{student.last_name}</td>
                   <td>{student.school}</td>
                   <td>{student.skill_set}</td>
                   <td>{student.major}</td>
                   
                   
                   <td>
                   {<a href="#" onClick={() => this.reply_click(student.id)}> View Profile</a>}
                   </td>

                   <td>
                   {<a href="#" onClick={() => this.reply_click1(student.id)}> View Resume</a>}
                   </td>

                 </tr>
               );
           }
       })
     return (
       <div className="viewevent">
         <StudentNavbar />
         <div className="container">
           <nav class="navbar navbar-light bg-light">
             <form class="form-inline">
               <input
                 class="form-control mr-sm-2"
                 type="search"
                 onChange={this.searchChangeHandler}
                 value={this.state.searchString}
                 placeholder="Search"
                 aria-label="Search"
               />
               
             </form>
           </nav>
           <div className="row justify-content-center align-items-center">
             <div className="col-12">
               <div className="dash-one">
                 <div className="dash-header">Student Profiles</div>
                 {this.state.profiles.length > 0 ? (
                   <div className="col-10">
                     <table className="table table-striped table-bordered">
                       <thead>
                         <tr>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>College Name</th>
                           <th>Skills</th>
                           <th>Major</th>
                         </tr>
                       </thead>
                       <tbody>{studentProfile}</tbody>
                     </table>
                   </div>
                 ) : (
                   <div>
                     <h4 style={{ margin: "3em" }}>No students to display!</h4>
                   </div>
                 )}
               </div>
             </div>
           </div>
         </div>
       </div>
     );
   }
 }


export default ViewAllStudents;