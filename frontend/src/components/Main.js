import React, { Component } from 'react';
import {Route} from 'react-router-dom';


import Landing from './layout/Landing';
import CompanyProfile from './company/CompanyProfile';
import CompanyHome from './company/CompanyHome';
import EditCompanyProfile from './company/EditCompanyProfile';
import JobPost from './company/JobPost';
import EventPost from './company/EventPost';
import StudentProfileBasic from './student/StudentProfileBasic';
import StudentHome from './student/StudentHome';
import Login from './auth/Login';
import Register from './auth/Register';
import RegisterCompany from './auth/RegisterCompany';
import EditStudentProfileBasic from './student/EditStudentProfileBasic';
import StudentProfile from './studentProfile/StudentProfile';
import StudentExperience from './student/StudentExperience';
import StudentEducation from './student/StudentEducation';
import UploadImage from './common/UploadImage';
import Jobs from './studentViews/Jobs';
import Events from './studentViews/Events';
import Applications from './studentViews/Applications';
import RegisteredEvents from './studentViews/RegisteredEvents';
import StudentsRegisteredEvent from './company/StudentRegisteredEvent';
import StudentAppliedJobs from './company/StudentAppliedJobs';
import CompanyViewStudentProfile from './company/CompanyViewStudentProfile';
import ViewAllStudents from './common/ViewAllStudents';
import ViewStudentResume from './company/ViewStudentResume';

export default class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                
                <Route exact path="/" component={Landing}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/registerCompany" component={RegisterCompany}/>
                <Route path="/companyProfile" component={CompanyProfile}/>
                <Route path="/companyHome" component={CompanyHome}/>
                <Route path="/jobPost" component={JobPost}/>
                <Route path="/eventPost" component={EventPost}/>
                <Route path="/studentHome" component={StudentHome}/>
                <Route path="/studentProfileBasic" component={StudentProfileBasic}/>
                <Route path="/editStudentProfileBasic" component={EditStudentProfileBasic}/>
                <Route path="/viewStudentProfile" component={StudentProfile}/>
                <Route path="/studentExperience" component={StudentExperience}/>
                <Route path="/studentEducation" component={StudentEducation}/>
                <Route path="/jobs" component={Jobs}/>
                <Route path="/events" component={Events}/>
                <Route path="/applications" component={Applications}/>
                <Route path="/editCompanyProfile" component={EditCompanyProfile}/>
                <Route path="/registeredEvents" component={RegisteredEvents}/>
                <Route path="/uploadImage" component={UploadImage}/>
                <Route path="/studentsRegisteredEvent" component={StudentsRegisteredEvent}/>
                <Route path="/studentAppliedJobs" component={StudentAppliedJobs}/>
                <Route path="/companyViewStudentProfile" component={CompanyViewStudentProfile}/>
                <Route path="/viewAllStudents" component={ViewAllStudents}/>
                <Route path="/viewStudentResume" component={ViewStudentResume}/>
                
            </div>
        )
    }
}
