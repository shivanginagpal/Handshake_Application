import React, { Component } from 'react'
import StudentNavbar from "./StudentNavbar";
import cookie from 'react-cookies';

export default class StudentHome extends Component {
    
    render() {
        return (
            <div>
                <StudentNavbar />
                Welcome to student Home.
            </div>
        )
    }
}
