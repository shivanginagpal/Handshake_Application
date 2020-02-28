import React, { Component } from 'react'
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import StudentNavbar from "./StudentNavbar";
import {addEducationRecord} from '../../actions/profileActions';

 class StudentEducation extends Component {
    constructor(props){
        super(props);
        this.state = {
            college_name: "",
            location: "",
            degree: "",
            major: "",
            year_passing: "",
            cgpa:"",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //componentwillreceiveprops


    onChange(e) {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let id = this.props.auth.user.id;
            console.log("student id is: ",id);
        const educationData = {
            college_name:this.state.college_name,
            degree:this.state.degree,
            location:this.state.location,
            major: this.state.major,
            year_passing:this.state.year_passing,
            cgpa:this.state.cgpa,
            id: id
        }
        //we call redux action using props
        this.props.addEducationRecord(educationData, this.props.history);
    }
    render() {
        const {errors} = this.state;
        return (
            <div>
            <StudentNavbar />
            <div className="studentExp">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-6 text-center">
                                Enter Education details
                            </h1>
                            <form noValidate onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    placeholder="School Name"
                                    name="college_name"//same
                                    value={this.state.college_name}//same
                                    onChange={this.onChange}
                                    error={errors.college_name}//backend fname
                                />

                                <TextFieldGroup
                                    placeholder="Degree"
                                    name="degree"//same
                                    value={this.state.degree}//same
                                    onChange={this.onChange}
                                    error={errors.degree}//backend fname
                                />

                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"//same
                                    value={this.state.location}//same
                                    onChange={this.onChange}
                                    error={errors.location}//backend fname
                                />

                                <TextFieldGroup
                                    placeholder="Major"
                                    name="major"//same
                                    value={this.state.major}//same
                                    onChange={this.onChange}
                                    error={errors.major}//backend fname
                                />

                                <TextFieldGroup
                                    placeholder="Graduated Year"
                                    name="year_passing"//same
                                    value={this.state.year_passing}//same
                                    onChange={this.onChange}
                                    error={errors.year_passing}//backend fname
                                />

                                <TextFieldGroup
                                    placeholder="CGPA"
                                    name="cgpa"//same
                                    value={this.state.cgpa}//same
                                    onChange={this.onChange}
                                    error={errors.cgpa}//backend fname
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

StudentEducation.propTypes = {
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
  
  export default connect(mapStateToProps, { addEducationRecord })(withRouter(StudentEducation));