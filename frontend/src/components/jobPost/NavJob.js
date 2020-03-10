import React,{Component} from "react";
//import {handleLogout, getUserName} from "../auth/HelperApis";

function NavJob(){
     return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="landing.html">Company Dashboard</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/studentProfile"> Profile
                </a>
              </li>
            </ul>
    
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <a className="nav-link" href="/companyLanding">Company</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/eventPost">Add Event</a>
          </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

     );
 }
 export default NavJob;