import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {createProfile,getCurrentProfile} from '../../actions/profileActions';
import {isFieldEmpty} from '../auth/HelperApis';
import StudentNavbar from "./StudentNavbar";

 class EditStudentProfileBasic extends Component {
   constructor(props) {
     super(props);
     this.state = {
       first_name: "",//same
       last_name: "",
       dob: "",
       city: "",
       state: "",
       country: "",
       career_obj: "",
       email: "",
       phone_num: "",
       skill_set: "",
       errors: {}
     };

     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
   }

   componentDidMount(){
       this.props.getCurrentProfile(this.props.auth.user.id);
   }

   componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
       this.setState({ errors: nextProps.errors });
     }

     if(nextProps.profile.profile){
       const profile = nextProps.profile.profile[0];
       console.log(profile);

       profile.first_name = !isFieldEmpty(profile.first_name) ? profile.first_name : '';
       profile.last_name = !isFieldEmpty(profile.last_name) ? profile.last_name : '';
       profile.dob = !isFieldEmpty(profile.dob) ? profile.dob : '';
       profile.city = !isFieldEmpty(profile.city) ? profile.city : '';
       profile.state = !isFieldEmpty(profile.state) ? profile.state : '';
       profile.country = !isFieldEmpty(profile.country) ? profile.country : '';
       profile.email = !isFieldEmpty(profile.email) ? profile.email : '';
       profile.phone_num = !isFieldEmpty(profile.phone_num) ? profile.phone_num : '';
       profile.skill_set = !isFieldEmpty(profile.skill_set) ? profile.skill_set : '';
       profile.career_obj = !isFieldEmpty(profile.career_obj) ? profile.career_obj : '';

       this.setState({
         first_name: profile.first_name,
         last_name: profile.last_name,
         dob: profile.dob,
         city: profile.city,
         state: profile.state,
         country: profile.country,
         email: profile.email,
         phone_num: profile.phone_num,
         skill_set: profile.skill_set,
         career_obj: profile.career_obj
       });
     }
   }
   onSubmit(e) {
     e.preventDefault();
        let id = this.props.auth.user.id;
        console.log("student id is: ",id);
        const basicData = {
          first_name: this.state.first_name, 
          last_name: this.state.last_name,
          dob: this.state.dob,
          city: this.state.city,
          state: this.state.state,
          country: this.state.country,
          career_obj: this.state.career_obj,
          email: this.state.email,
          phone_num: this.state.phone_num,
          skill_set: this.state.skill_set,
          id :id 
        };
        //we call redux action using props
        this.props.createProfile(basicData, this.props.history);
     
   }
   onChange(e) {
     this.setState({ 
       [e.target.name]: e.target.value 
      });
   }

   render() {
     const { errors } = this.state;
     console.log(errors);
     
     return (
       <div>
         <StudentNavbar />
       <div className="studentbasic">
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center">
                 Edit your basic details
               </h1>
               <form noValidate onSubmit={this.onSubmit}>
                 <TextFieldGroup
                   placeholder="firstname"
                   name="first_name"//same
                   value={this.state.first_name}//same
                   onChange={this.onChange}
                   error={errors.first_name}//backend first_name
                 />

                 <TextFieldGroup
                   placeholder="lastname"
                   name="last_name"
                   value={this.state.last_name}
                   onChange={this.onChange}
                   error={errors.last_name}
                 />
                 <TextFieldGroup
                   placeholder="dob"
                   name="dob"
                   value={this.state.dob}
                   onChange={this.onChange}
                   error={errors.dob}
                 />
                 <TextFieldGroup
                   placeholder="city"
                   name="city"
                   value={this.state.city}
                   onChange={this.onChange}
                   error={errors.city}
                 />
                 <TextFieldGroup
                   placeholder="state"
                   name="state"
                   value={this.state.state}
                   onChange={this.onChange}
                   error={errors.state}
                 />
                 <TextFieldGroup
                   placeholder="country"
                   name="country"
                   value={this.state.country}
                   onChange={this.onChange}
                   error={errors.country}
                 />
                 <TextFieldGroup
                   placeholder="email"
                   name="email"
                   value={this.state.email}
                   onChange={this.onChange}
                   error={errors.email}
                 />
                 <TextFieldGroup
                   placeholder="Phone Number"
                   name="phone_num"
                   value={this.state.phone_num}
                   onChange={this.onChange}
                   error={errors.phone_num}
                 />
                 <TextAreaFieldGroup
                   placeholder="skill_set"
                   name="skill_set"
                   value={this.state.skill_set}
                   onChange={this.onChange}
                   error={errors.skill_set}
                 />
                 <TextAreaFieldGroup
                   placeholder="career_obj"
                   name="career_obj"
                   value={this.state.career_obj}
                   onChange={this.onChange}
                   error={errors.career_obj}
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
     );
   }
 }

EditStudentProfileBasic.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditStudentProfileBasic));