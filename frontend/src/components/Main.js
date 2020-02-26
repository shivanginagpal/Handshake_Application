import React, { Component } from 'react';
import {Route} from 'react-router-dom';


import Landing from './layout/Landing';
import CompanyProfile from './company/CompanyProfile';
import CompanyHome from './company/CompanyHome';
import JobPost from './company/JobPost';
import EventPost from './company/EventPost';
import StudentProfile from './student/StudentProfile';
import StudentHome from './student/StudentHome';
import Login from './auth/Login';

export default class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                
                <Route exact path="/" component={Landing}/>
                <Route path="/login" component={Login}/>
                <Route path="/company" component={CompanyProfile}/>
                <Route path="/companyHome" component={CompanyHome}/>
                <Route path="/jobPost" component={JobPost}/>
                <Route path="/eventPost" component={EventPost}/>
                <Route path="/studentHome" component={StudentHome}/>
                <Route path="/studentProfile" component={StudentProfile}/>
                
            </div>
        )
    }
}
