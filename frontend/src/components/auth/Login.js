import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authAction';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            userType: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            if(this.props.auth.user.userType ==='student')
                this.props.history.push('/studentHome');
            else if(this.props.auth.user.userType === 'company')
                this.props.history.push('/companyHome');
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            if(nextProps.auth.user.userType ==='student')
                this.props.history.push('/studentHome');
            else if(nextProps.auth.user.userType === 'company')
                this.props.history.push('/companyHome');
        }
        if(nextProps.errors) {
            this.setState({errors:nextProps.errors});
        }
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
        this.props.loginUser(user);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
    
        // axios.post('http://localhost:5000/signIn',user)
        // .then(res => {
        //     console.log(res.data);
        //     if(res.status === 200){
        //         this.setState({
        //             authFlag : true,
        //         })
        //     }else{
        //         this.setState({
        //             authFlag : false,
        //         })
        //         }
        //     })
        }

    render() {
        const { errors } = this.state;

        return (
            
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your Handshake account</p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input type="email" 
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.email
                        })} 
                        placeholder="Email Address" 
                        name="email" 
                        value={this.state.email} 
                        onChange={this.onChange} />
                            {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                             )}
                    </div>
                    <div className="form-group">
                      <input type="password" 
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                        })} 
                        placeholder="Password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.onChange}/>
                        {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                            )}
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
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
 
export default connect (mapStateToProps, {loginUser}) (Login);