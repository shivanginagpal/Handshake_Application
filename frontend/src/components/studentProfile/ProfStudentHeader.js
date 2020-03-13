import React, { Component } from 'react';
import {isFieldEmpty} from "../auth/HelperApis";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import backendURL from "../auth/Settings";


class ProfStudentHeader extends Component {

  render() {
    console.log("In Student Header");
    const { profile } = this.props;
    console.log(typeof profile);
    //console.log(profile[0].email);
    let imgSource = isFieldEmpty(profile[0].profile_pic)?
   "https://static.change.org/profile-img/default-user-profile.svg":
    backendURL + "/downloadProfileImg/" + profile[0].profile_pic;
  
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src = {imgSource}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-6 text-center">{profile[0].first_name}
                {' '}{profile[0].last_name}</h1>
              <p className="lead text-center">
                Student{' '}
                {isFieldEmpty(profile[0].school) ? null : (
                  <span>at {profile[0].school}</span>
                )}
              </p>
              {isFieldEmpty(profile[0].city) ? null : <p>{profile[0].city} , {profile[0].state}</p>}
              {isFieldEmpty(profile[0].major) ? null : <p>{profile[0].major} </p>}
              <p className="lead text-center">
                Skills{' '}:
                {isFieldEmpty(profile[0].skill_set) ? null : (
                  <span> {profile[0].skill_set}</span>
                )}
              </p>
            </div>
          </div>
        </div>
       </div>
    );
  }
}
export default connect(null)(withRouter(ProfStudentHeader));
