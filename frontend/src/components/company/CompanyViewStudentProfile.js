import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfStudentHeader from '../studentProfile/ProfStudentHeader';
import ProfStudentEducation from '../studentProfile/ProfStudentEducation';
import ProfStudentExperience from '../studentProfile/ProfStudentExperience';
import CompanyNavbar from './CompanyNavbar';

import {getCurrentProfile, getStudentEducation, getStudentExperience } from '../../actions/profileActions';

class CompanyViewStudentProfile extends Component {
        async componentDidMount() {
            var student_id=null;
            console.log(this.props);
            if(this.props.location.state){
            console.log(this.props.location.state);
            student_id=this.props.location.state.student_id;  
            console.log(student_id);
            }
            console.log(student_id);
            await this.props.getCurrentProfile(student_id);
            await this.props.getStudentEducation(student_id);
            await this.props.getStudentExperience(student_id);
        }
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
                <Link to="/companyHome" className="btn btn-light mb-3 float-left">
                Back To Home
                </Link>
                <div className="col-md-6" />
                <ProfStudentHeader profile={profile} />
                <ProfStudentEducation education={education}/>
                <ProfStudentExperience experience={experience} />
                
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
      
    CompanyViewStudentProfile.propTypes = {
        getCurrentProfile: PropTypes.func.isRequired,
        getStudentEducation: PropTypes.func.isRequired,
        getStudentExperience: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
      };
      
      const mapStateToProps = state => ({
        profile: state.profile,
        education: state.education,
        experience: state.experience,
        errors: state.errors
      });
      
export default connect(mapStateToProps, { getCurrentProfile, getStudentEducation, getStudentExperience })(CompanyViewStudentProfile);
      