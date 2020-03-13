import React, { Component } from 'react';
import axios from 'axios';
import { getID } from "../auth/HelperApis";
import CompanyNavbar from "./CompanyNavbar";
import { Redirect } from 'react-router-dom';

class jobPost extends Component {
    constructor() {
        super();
        this.state = {
            job_title: '',
            posting_date: '',
            app_deadline: '',
            salary: '',
            location: '',
            job_description: '',
            job_category: '',
            redir:false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let company_id = getID();
        console.log(`User Id is : ${company_id}`);
        //this.setState({id : company_id});

        const newJobPost = {
            job_title: this.state.job_title,
            posting_date: this.state.posting_date,
            app_deadline: this.state.app_deadline,
            salary: this.state.salary,
            location: this.state.location,
            job_description: this.state.job_description,
            job_category: this.state.job_category,
            company_id : company_id
        };
        console.log(newJobPost);
        axios
        .post('/addJobPost', newJobPost)
        .then(res=>{
            console.log(res.data);
            this.setState({redir:true})})
        .catch(err=> this.setState({errors: err.response.data}));
    }

    render() {
        let redirectVal = null;
        if(this.state.redir === true){
            redirectVal = <Redirect to="/companyHome"/>;
        }
        return (
            <div>
            {redirectVal}
            <CompanyNavbar/>
            <div className="container">
            <div className="col-md-8 m-auto">
            
            <form onSubmit={this.onSubmit}>
                <div class="form-group"><p>Job Title: </p><input type="text" placeholder="Job Title" name="job_title" onChange={this.onChange} value={this.state.job_title} /></div>

                <div class="form-group"><p>Job Posting Date: </p><input type="date" placeholder="Posting Date" name="posting_date" value={this.state.posting_date} onChange={this.onChange} /></div>

                <div class="form-group"><p>Application Deadline: </p><input type="date" placeholder="Application Deadline" name="app_deadline" value={this.state.app_deadline} onChange={this.onChange} /></div>

                <div class="form-group"><p>salary: </p><input type="text" placeholder="Salary" name="salary" value={this.state.salary} onChange={this.onChange} /></div>

                <div class="form-group"v><p>Job Location: </p><input type="text" placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} /></div>

                <div class="form-group"><p>Job Description: </p><input type="text" placeholder="Description" name="job_description" value={this.state.job_description} onChange={this.onChange} /></div>

                <div class="form-group"><p>Job Category: </p><input type="text" placeholder="Category" name="job_category" value={this.state.job_category} onChange={this.onChange} /></div>
               
                <br></br>
                <div class="form-group"><input type="submit" value="Post Job" /> </div>
            </form>
            </div>
            </div>
            </div>
        );
    }
}
export default jobPost;