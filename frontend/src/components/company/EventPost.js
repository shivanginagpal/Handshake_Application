import React, { Component } from 'react';
import axios from 'axios';
import { getID } from "../auth/HelperApis";
import CompanyNavbar from "./CompanyNavbar";
import { Redirect } from 'react-router-dom';

class eventPost extends Component {
    constructor() {
        super();
        this.state = {
            event_name : '',
            date_of_event : '',
            event_description : '',
            location : '',
            time : '',
            eligibility: '',
            redir: false,
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

        const newEventPost = {
            event_name: this.state.event_name,
            date_of_event: this.state.date_of_event,
            event_description: this.state.event_description,
            time: this.state.time,
            location: this.state.location,
            eligibility: this.state.eligibility,
            company_id : company_id
        };
        console.log(newEventPost);
        axios
        .post('http://localhost:5000/addEventPost', newEventPost)
        .then(res=>{
            this.setState({redir:true})
                }
            )
        .catch(err=> this.setState({errors: err.response.data}));
    }

    render() {
        let redirectVal = null;
        if(this.state.redir == true){
            redirectVal = <Redirect to="/companyHome"/>;
        }
        return (
            <div>
            {redirectVal}
            <CompanyNavbar/>
            <div className="container">
            <div className="col-md-8 m-auto">
            <form onSubmit={this.onSubmit}>
                <div><p>Event Name: </p><input type="text" placeholder="Event Name" name="event_name" onChange={this.onChange} value={this.state.event_name} /></div>

                <div><p>Date of the Event: </p><input type="date" placeholder="Event Date" name="date_of_event" value={this.state.date_of_event} onChange={this.onChange} /></div>

                <div><p>Event Description: </p><input type="text" placeholder="Event Description" name="event_description" value={this.state.event_description} onChange={this.onChange} /></div>

                <div><p>Event time: </p><input type="time" placeholder="Time" name="time" value={this.state.time} onChange={this.onChange} /></div>

                <div><p>Event Location: </p><input type="text" placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} /></div>

                <div><p>Event Category: </p><input type="text" placeholder="Eligibility" name="eligibility" value={this.state.eligibility} onChange={this.onChange} /></div>
                
                 <br></br>
                <div><input type="submit" value="Add Event" /> </div>
            </form>
            </div>
            </div>
            </div>
        );
    }
}
export default eventPost;