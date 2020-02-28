import React,{Component} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
import { clearProfile } from '../../actions/profileActions';

class StudentNavbar extends Component{
  handleLogout(e){
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearProfile();
    window.location.href = '/';
  }
  render(){
      //const {isAuthenticated, user} = this.props.auth;

     //let name = getUserName();
     return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/studentHome">Student Dashboard</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/viewStudentProfile"> Profile
                </a>
              </li>
            </ul>
    
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/studentHome"> Jobs
                </a>
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/studentHome"> Events
                </a>
              </li>
            </ul>
    
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={this.handleLogout.bind(this)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
 }
}
 StudentNavbar.propTypes = {
   logoutUser: PropTypes.func.isRequired,
   //auth: PropTypes.object.isRequired 
 }
//  const mapStateToProps = (state) => ({
//    auth: state.auth
//  });
 export default connect (null,{logoutUser,clearProfile}) (StudentNavbar);