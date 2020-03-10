import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfStudentHeader from './ProfStudentHeader';
import ProfStudentEducation from './ProfStudentEducation';
import ProfStudentExperience from './ProfStudentExperience';

import {getCurrentProfile, getStudentEducation, getStudentExperience } from '../../actions/profileActions';
import StudentNavbar from "../student/StudentNavbar";

class StudentProfile extends Component {

componentDidMount() {
    if(this.props.auth){
       this.props.getCurrentProfile(this.props.auth.user.id);
       this.props.getStudentEducation(this.props.auth.user.id);
       this.props.getStudentExperience(this.props.auth.user.id);
    }
  }

  //  componentWillReceiveProps(nextProps) {
  //   if (nextProps.profile.profile === null && this.props.profile.loading) {
  //     this.props.history.push('/not-found');
  //   }
  //  }

  render() {
    const { profile=[], loading } = this.props.profile;
    const { education=[], eduLoading } = this.props.education;
    const { experience=[], expLoading } = this.props.experience;
    
    console.log("Profile:")
    console.log(profile);
    console.log(" Edu loading value:", eduLoading);
    console.log(education);
    console.log("Exp loading value:", expLoading);
    console.log(experience);

    let profileContent;

    if (profile === null || loading || education === null || eduLoading ||
      experience === null || expLoading) {
      profileContent = "Student Profile will be displayed below:";
    } else {
    profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/studentHome" className="btn btn-light mb-3 float-left">
                Back To Home
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfStudentHeader profile={profile} />
          <ProfStudentEducation education={education}/>
          <ProfStudentExperience experience={experience} />
          
        </div>
      );
    }

    return (
    <div>
        <StudentNavbar />
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

StudentProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getStudentEducation: PropTypes.func.isRequired,
  getStudentExperience: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  education: state.education,
  experience: state.experience,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, getStudentEducation, getStudentExperience })(StudentProfile);
