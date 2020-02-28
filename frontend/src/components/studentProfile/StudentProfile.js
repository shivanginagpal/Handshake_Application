import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import StudentHeader from './StudentHeader';
import Spinner from '../common/Spinner';
import {getCurrentProfile} from '../../actions/profileActions';
import StudentNavbar from "../student/StudentNavbar";

class StudentProfile extends Component {

  componentDidMount() {
    if(this.props.auth){
      this.props.getCurrentProfile(this.props.auth.user.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = "Student Profile will be displayed below:";
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <StudentHeader profile={profile} />
          {/* <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          /> */}
          
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile })(withRouter(StudentProfile));
