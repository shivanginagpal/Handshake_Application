import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import {isFieldEmpty} from "../auth/HelperApis";

class ProfStudentEducation extends Component {

    render() {
        console.log("In Student Education");
        var { education } = this.props;

        //converting object to array to use the map function
        education = Object.values(education);
        const eduItems = education.map((education,i) => (
            <li key={i} className="list-group-item">
              <h4>{education.college_name}{', '}{education.location}</h4>
              <p>
              <strong>Passing Year:{' '}</strong>
                {isFieldEmpty(education.year_passing) ? 'Current' : (
                  <span> {education.year_passing}</span>
                )}
              </p>
              <p>
                <strong>Degree:</strong> {education.degree}
              </p>
              <p>
                <strong>Field Of Study:</strong> {education.major}
              </p>
              <p>
                <strong>CGPA:</strong> {education.cgpa}
              </p>
            </li>
            
         ));
       
        return (
          <div className="row">
            <div className="col-md-12">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
        </div>
        )
       
    }
}

  
  export default connect(null)(withRouter(ProfStudentEducation));
  