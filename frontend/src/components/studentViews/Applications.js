import React, { Component } from 'react';
import StudentNavbar from "../student/StudentNavbar";
import InsideNavbar from './InsideNavbar';
import ApplicationFilter from './ApplicationFilter';

export default class Applications extends Component {

    render() {
        let home = {home: "Applications"};
        return (
            <div>
                <StudentNavbar />
                <InsideNavbar links={home}/>
                <ApplicationFilter />
            </div>
        )
    }
}
