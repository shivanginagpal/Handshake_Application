import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import StudentNavbar from "./StudentNavbar";
import {addExperienceRecord} from '../../actions/profileActions';

 class StudentExperience extends Component {
     constructor(props) {
         super(props);
         this.state = {
             company_name: "",
             title: "",
             location: "",
             start_date: "",
             end_date: "",
             work_desc: "",
             errors:{}
         };
         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
     }

     //componentwillreceiveprops

     onChange(e) {
         this.setState({
             [e.target.name]: e.target.value
         });
     }

     onSubmit(e) {
        e.preventDefault();
        let id = this.props.auth.user.id;
        console.log("student id is: ",id);
        const expData = {
            company_name: this.state.company_name,
            title: this.state.title,
            location: this.state.location,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            work_desc: this.state.work_desc,
            id: id
        }
        //we call redux action using props
        this.props.addExperienceRecord(expData, this.props.history);
     }

    render() {
        const {errors} = this.state;

        return (
            <div>
            <StudentNavbar />
            <div className="studentExp">
                <div className="container">
                    <div className="row">
                        <div className="col-md m-auto">
                            <h1 className="display-6 text-center">
                                Enter your Experience details
                            </h1>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Company Name"
                                    name="company_name"//same
                                    value={this.state.company_name}//same
                                    onChange={this.onChange}
                                    error={errors.company_name}//backend fname
                                />

                                <TextFieldGroup
                                    placeholder="Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />

                                <TextFieldGroup
                                    placeholder="Company Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                
                                <TextFieldGroup
                                    placeholder="Start Date"
                                    name="start_date"
                                    value={this.state.start_date}
                                    onChange={this.onChange}
                                    error={errors.start_date}
                                />

                                <TextFieldGroup
                                    placeholder="End Date"
                                    name="end_date"
                                    value={this.state.end_date}
                                    onChange={this.onChange}
                                    error={errors.end_date}
                                />

                                <TextAreaFieldGroup
                                    placeholder="Work Description"
                                    name="work_desc"
                                    value={this.state.work_desc}
                                    onChange={this.onChange}
                                    error={errors.work_desc}
                                />
                                <input
                                    type="submit"
                                    value="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
              </div>  
            </div>
        )
    }
}

StudentExperience.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  //mapping state to props
  const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
  });
  
  export default connect(mapStateToProps, { addExperienceRecord })(withRouter(StudentExperience));