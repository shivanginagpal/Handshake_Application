const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput (data)  {

    let errors ={};

    data.first_name =!isEmpty(data.first_name) ? data.first_name : '';
    data.last_name =!isEmpty(data.last_name) ? data.last_name : '';
    data.email =!isEmpty(data.email) ? data.email : '';
    data.password =!isEmpty(data.password) ? data.password : '';
    data.school =!isEmpty(data.school) ? data.school : '';
    
    if(!Validator.isLength(data.first_name,{min:2, max:30})) {
        errors.first_name ='Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.first_name)) {
        errors.first_name = 'Name field is required';
    }
    
    if(Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Name field is required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if(Validator.isEmpty(data.school)) {
        errors.school = 'School Name field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is Invalid';
    }
    if(!Validator.isLength(data.password,{min :6,max:30})){
        errors.password = 'Password must be atleast 6 characters';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};