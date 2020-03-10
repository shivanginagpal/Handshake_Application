import React, { Component } from 'react';
import StudentNavbar from "../student/StudentNavbar";
import InsideNavbar from './InsideNavbar';
import JobFilter from './JobFilter';

export default class Jobs extends Component {
    render() {
        let home = {home: "Job Search"};
        return (
            <div>
                <StudentNavbar />
                <InsideNavbar links={home}/>
                <JobFilter />
            </div>
        )
    }
}
