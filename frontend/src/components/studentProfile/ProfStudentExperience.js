import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Moment from 'react-moment';

class ProfStudentExperience extends Component {
  render() {
    console.log("In Student Experience");
    var { experience } = this.props;

    //converting object to array to use the map function
    experience = Object.values(experience);
    console.log(experience);
    const expItems = experience.map((experience,i) => (
      <li key={i} className="list-group-item">
        <h4>{experience.company_name}</h4>
        <p>
            <Moment format="YYYY/MM/DD">{experience.start_date}</Moment> -
            {experience.end_date === null ? (
              ' Now'
            ) : (
              <Moment format="YYYY/MM/DD">{experience.end_date}</Moment>
            )}
        </p>
        <p>
          <strong>Position:</strong> {experience.title}
        </p>
        <p>
          {experience.location === '' ? null : (
            <span>
              <strong>Location: </strong> {experience.location}
            </span>
          )}
        </p>
        <p>
          {experience.work_desc === '' ? null : (
            <span>
              <strong>Description: </strong> {experience.work_desc}
            </span>
          )}
        </p>
      </li>
    ));
   
    return (
      <div className="row">
      <div className="col-md-12">
        <h3 className="text-center text-info">Experience</h3>
        {expItems.length > 0 ? (
          <ul className="list-group">{expItems}</ul>
        ) : (
          <p className="text-center">No Experience Listed</p>
        )}
      </div>
      </div>
    )
   
  }
}

export default connect(null)(withRouter(ProfStudentExperience));