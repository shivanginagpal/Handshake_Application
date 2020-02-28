import React, { Component } from 'react';
import {Route} from 'react-router-dom';


import Landing from './layout/Landing';
import CompanyProfile from './company/CompanyProfile';
import CompanyHome from './company/CompanyHome';
import JobPost from './company/JobPost';
import EventPost from './company/EventPost';
import StudentProfileBasic from './student/StudentProfileBasic';
import StudentHome from './student/StudentHome';
import Login from './auth/Login';
import Register from './auth/Register';
import EditStudentProfileBasic from './student/EditStudentProfileBasic';
import StudentProfile from './studentProfile/StudentProfile';
import StudentExperience from './student/StudentExperience';
import StudentEducation from './student/StudentEducation';

export default class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                
                <Route exact path="/" component={Landing}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route path="/company" component={CompanyProfile}/>
                <Route path="/companyHome" component={CompanyHome}/>
                <Route path="/jobPost" component={JobPost}/>
                <Route path="/eventPost" component={EventPost}/>
                <Route path="/studentHome" component={StudentHome}/>
                <Route path="/studentProfileBasic" component={StudentProfileBasic}/>
                <Route path="/editStudentProfileBasic" component={EditStudentProfileBasic}/>
                <Route path="/viewStudentProfile" component={StudentProfile}/>
                <Route path="/studentExperience" component={StudentExperience}/>
                <Route path="/studentEducation" component={StudentEducation}/>
                
            </div>
        )
    }
}
