import React, { Component } from 'react';
import StudentNavbar from "../student/StudentNavbar";
import CompanyNavbar from "../company/CompanyNavbar";
import { getID, getUserType } from '../auth/HelperApis';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from "sweetalert";

export default class UploadImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            imageUploaded: false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
    }

    //handle upload for resume
    handleUpload = event => {
    console.log(event.target.files[0]);
    this.setState({ file: event.target.files[0] });
    };

    uploadFile = async (e) => {
        e.preventDefault();
        console.log("In upload file...", this.state.file);
        const student_id = getID();
        const user_type = getUserType();
        if (this.state.file !== null) {
          const formData = new FormData();
          formData.append("id", student_id);
          formData.append("file", this.state.file); //file[0]
          await axios((user_type=='student')?
            "/updateStudentProfilePic":"/updateCompanyProfilePic", {
            method: "post",
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } } 
          }).then(response => {
            console.log("Here");
            console.log(response);
            this.setState({imageUploaded:true});
          }
            //{
            //   setTimeout(() => {
            //     swal({
            //       title: "Congratulations!",
            //       text: "Image Upload Success!",
            //       icon: "success",
            //       button: "OK"
            //     });
            //   }, 5000);
          //}   
        )}
        
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        let redirectVal = null;
        if(this.state.imageUploaded){
            redirectVal = <Redirect to="/companyHome"/>;
        }
        console.log(this.state.file);
        console.log(this.state.imageUploaded);
        const user_type = getUserType();
        const navbar = (user_type == 'student')?<StudentNavbar />:<CompanyNavbar />;
        if (this.state.imageUploaded) {
            // redirect to profile page
            return <Redirect to = {{ pathname: "/viewStudentProfile" }} />;
        }
        return (
            <div>
                {redirectVal}
                {navbar}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h2 className="display-6 text-center">
                                Upload Profile Picture
                             </h2>
                                <form onSubmit={() => this.uploadFile()}>
                                    {/* <div className="form-group row"> */}
                                    <div className="col-sm-5">
                                        <input
                                        label="upload file"
                                        type="file"
                                        required
                                        onChange={this.handleUpload}
                                        />
                                    </div>
                                    {/* </div>   */}
                                    {/* <div className="form-group row text-center"> */}
                                    <div className="col-sm-5">
                                        <button
                                        type="submit"
                                        className="btn btn-primary align-center"
                                        style={{ marginTop: "2em" }}
                                        >
                                        Upload
                                        </button>
                                    </div>
                                    {/* </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
