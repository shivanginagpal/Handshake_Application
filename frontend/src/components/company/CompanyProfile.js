import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import CompanyHeader from './CompanyHeader';
import {getCurrentCompanyProfile} from '../../actions/profileActions';
import CompanyNavbar from "./CompanyNavbar";

class CompanyProfile extends Component {
  async componentDidMount() {
    var company_id=null;
    if(this.props.location.state){
      console.log("came inside location");
        company_id=this.props.location.state.company_id;  
    }
    else if(this.props.auth){
      console.log("came inside auth");
        company_id=this.props.auth.user.id;
    }
    console.log(company_id);
    await this.props.getCurrentCompanyProfile(company_id);
  }

  render() {
    console.log(this.props);
    const { profile, loading } = this.props.profile;
    console.log(profile);
    let profileContent;
    if((profile === null || loading)){
      profileContent = "Company Profile will be displayed below:";
      console.log(profileContent);
    } else {
      profileContent = (
        <div>
          <div className="row">
          <div className="col-md-6">
              <Link to="/CompanyHome" className="btn btn-light mb-3 float-left">
                Back To Home
              </Link>
              </div>
             <div className="navbar-nav ml-auto">
              <Link to="/editCompanyProfile" className="btn btn-light">
             <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
             </Link>
             </div>
             <div className="navbar-nav">
             <Link to="/uploadImage" className="btn btn-light">
             <i className="fas fa-file-image text-info mr-1" /> Upload Image
             </Link>
             </div>
            <div className="col-md-6" />
          </div>
          <CompanyHeader profile={profile} />
        </div>
      );
    }

    return (
    <div>
        <CompanyNavbar />
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

CompanyProfile.propTypes = {
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentCompanyProfile })(withRouter(CompanyProfile));