import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect}  from 'react-router';

import { getUserType } from "./HelperApis";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            userType: '',
            errors: {},
            authFlag : false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            email : this.state.email,
            password : this.state.password,
            userType : this.state.userType
        };
        console.log(user);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
    
        axios.post('http://localhost:5000/signIn',user)
        .then(res => {
            console.log(res.data);
            if(res.status === 200){
                this.setState({
                    authFlag : true,
                })
            }else{
                this.setState({
                    authFlag : false,
                })
                }
            })
        }

    render() {
        console.log("In Render function..");
        let redirectVar;
        let user_type = getUserType();
        console.log(user_type);
        if(!cookie.load('user_type')){
            redirectVar = <Redirect to= "/login"/>
        }

        if( user_type === "company"){
            console.log("Cookies found");
            redirectVar = <Redirect to= "/companyHome"/>
        }else if(user_type === "student")
        {
            console.log("Redirecting to student");
            redirectVar = <Redirect to= "/studentHome"/>
        }

        return (
            <div>
                {redirectVar}
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your Handshake account</p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-lg" placeholder="Email Address" 
                            name="email" value={this.state.email} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-lg" placeholder="Password" 
                            name="password" value={this.state.password} onChange={this.onChange}/>
                    </div>
                    
                    <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" className="custom-control-input" id="student" name="userType" 
                            value="student" onChange={this.onChange} />
                        <label className="custom-control-label" htmlFor="student">Student</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" className="custom-control-input" id="company" name="userType"
                            value="company" onChange={this.onChange} />
                        <label className="custom-control-label" htmlFor="company">Company</label>
                    </div>
                    
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }
}

export default Login;