import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from '../common/TextFieldGroup';
import {createCompanyProfile,getCurrentCompanyProfile} from '../../actions/profileActions';
import {isFieldEmpty} from '../auth/HelperApis';

 class CompanyProfile extends Component {
   constructor(props) {
     super(props);
     this.state = {
       company_name: "",
       location:"",
       description: "",
       contact_info: "",
       email: "",
       profile_pic: "",
       errors: {}
     };

     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
   }

   componentDidMount(){
     console.log(this.props.auth.user.id);
       this.props.getCurrentCompanyProfile(this.props.auth.user.id);
   }
   componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
       this.setState({ errors: nextProps.errors });
     }

     if(nextProps.profile.profile){
      console.log(nextProps.profile);
       console.log(nextProps.profile.profile.companyDetails);
       const profile = nextProps.profile.profile.companyDetails[0];
       console.log(profile);

       profile.company_name = !isFieldEmpty(profile.company_name) ? profile.company_name : '';
       profile.location = !isFieldEmpty(profile.location) ? profile.location : '';
       profile.description = !isFieldEmpty(profile.description) ? profile.description : '';
       profile.contact_info = !isFieldEmpty(profile.contact_info) ? profile.contact_info : '';
       profile.email = !isFieldEmpty(profile.email) ? profile.email : '';
       profile.profile_pic = !isFieldEmpty(profile.profile_pic) ? profile.profile_pic : '';

       this.setState({
         handle: profile.handle,
         company_name: profile.company_name,
         location: profile.location,
         description:profile.description,
         contact_info: profile.contact_info,
         profile_pic: profile.profile_pic,
         email: profile.email
       });
     }
   }
   onSubmit(e) {
     e.preventDefault();
        let id = this.props.auth.user.id;
        console.log("company id is: ",id);
        const basicData = {
          company_name: this.state.company_name, 
          location: this.state.location,
          description:this.state.description,
          contact_info: this.state.contact_info,
          email: this.state.email,
          id :id 
        };
        //we call redux action using props
        this.props.createCompanyProfile(basicData, this.props.history);
     
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
       <div className="companyProfile">
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center">
                 Edit Company Profile
               </h1>
               <form noValidate onSubmit={this.onSubmit}>
                 <TextFieldGroup
                   placeholder="Name"
                   name="company_name"
                   value={this.state.company_name}
                   onChange={this.onChange}
                   error={errors.company_name}
                 />
                 <TextFieldGroup
                   placeholder="Location"
                   name="location"
                   value={this.state.location}
                   onChange={this.onChange}
                   error={errors.location}
                 />
                  <TextFieldGroup
                   placeholder="Description"
                   name="description"
                   value={this.state.description}
                   onChange={this.onChange}
                   error={errors.description}
                 />
                 <TextFieldGroup
                   placeholder="Phone Number"
                   name="contact_info"
                   value={this.state.contact_info}
                   onChange={this.onChange}
                   error={errors.contact_info}
                 />
                 <TextFieldGroup
                   placeholder="email"
                   name="email"
                   value={this.state.email}
                   onChange={this.onChange}
                   error={errors.email}
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
     );
   }
 }

 CompanyProfile.propTypes = {
  createCompanyProfile: PropTypes.func.isRequired,
  getCurrentCompanyProfile: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { createCompanyProfile, getCurrentCompanyProfile })(withRouter(CompanyProfile));