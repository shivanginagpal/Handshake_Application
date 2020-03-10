import React, { Component } from 'react';
import CompanyNavbar from "./CompanyNavbar";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCompanyJobs, getCompanyEvents } from '../../actions/companyActions';
import CompanyPostedJobs from './CompanyPostedJobs';
import CompanyAddedEvents from './CompanyAddedEvents';

class CompanyHome extends Component {

    async componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
          }
      console.log("in componentDidMount");
      await this.props.getCompanyJobs(this.props.auth.user.id);
      await this.props.getCompanyEvents(this.props.auth.user.id);
    }

    render() {
    console.log(this.props);
    console.log(this.props.companyjobs);
    const {companyjobs=[], job_loading } = this.props.companyjobs;
    console.log(companyjobs,job_loading);
    const { companyevents=[], event_loading } = this.props.companyevents;
    console.log(companyevents, event_loading);
    let landingContent;
    if(companyjobs===null || job_loading || companyevents===null || event_loading){
        landingContent = "Jobs and Events will be displayed below:";
      console.log(landingContent);
    } else if(Object.keys(companyjobs).length > 0 || Object.keys(companyevents).length > 0)
       { landingContent = (
        <div>
          <div className="row">
          <div className="col-md-6">
            </div>
            <div className="col-md-6" />
          </div>
          <div>
          <CompanyPostedJobs companyjobs={companyjobs}/> 
          <CompanyAddedEvents companyevents={companyevents}/>
        </div>
        </div>
      );
}
    return (
        <div>
            <CompanyNavbar />
          <div className="profile">
            <div className="container">
              <div className="row">
                <div className="col-md-12">{landingContent}</div>
              </div>
            </div>
          </div>
          </div>
        );
      }
    }

    CompanyHome.propTypes = {
    getCompanyJobs : PropTypes.func.isRequired,
    getCompanyEvents: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    companyjobs : state.companyjobs,
    companyevents : state.companyevents
  });
  
export default connect(mapStateToProps, { getCompanyJobs, getCompanyEvents })(CompanyHome);


