import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';
import InsideNavbar from '../studentViews/InsideNavbar';
import JobFilter from '../studentViews/JobFilter';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';


class StudentHome extends Component {
        componentDidMount() {
          if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
          }
          this.props.getCurrentProfile(this.props.auth.user.id);
    }
    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashboardcontent;
        let home = {home: "Job Search"};
        if (profile === null || loading){
          dashboardcontent = <h4>Loading...</h4>
        }else{
          if (Object.keys(profile).length > 0 ){
            dashboardcontent = (
              <div>
                {/* <InsideNavbar links={home}/> */}
                <p className="lead text-muted">
                  Welcome {user.first_name}, Latest Job Posting are listed!
                </p>
                <JobFilter />
                {/* <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div style={{ marginBottom: '60px' }} />
                <button
                  onClick={this.onDeleteClick.bind(this)}
                  className="btn btn-danger"
                >
                  Delete My Account
                </button> */}
          </div>
            );
          }else{
            //user logged in but no profile
            dashboardcontent = (
              <div>
                <p className="lead text-muted">Welcome {user.first_name}</p>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/studentProfileBasic" className="btn btn-lg btn-info">
                  Update Profile
                </Link>
            </div>
            );
          }
        }
        return (
            <div>
                <StudentNavbar />
                <div className="dashboard">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      {dashboardcontent}
                    </div>
                    {/* <DashStudentExperience /> */}
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

StudentHome.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
  });
  
export default connect(mapStateToProps, { getCurrentProfile })(StudentHome);