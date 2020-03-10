import React, { Component } from 'react';
import '../student/custom.css';

class insideNavbar extends Component {
    render() {
        console.log(this.props.links);
        let {home} = this.props.links;
        return (
          <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
              <div className="container">
                  <a className="navbar-brand" href="#">{home}</a>
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                          <span className="navbar-toggler-icon"></span>
                      </button>

              <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                          <a className="nav-link" href="/jobs">Job Search</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/applications">Applications</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/jobs">Employers</a>
                      </li>
                  </ul>
                </div>
            </div>
        </nav>
        )
    }
}

export default insideNavbar;