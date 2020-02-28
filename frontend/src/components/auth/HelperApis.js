//import React,{Component} from "react";
import jwt_decode from 'jwt-decode';

import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};


export var isFieldEmpty = (prop)=>{
    if(prop === "" || prop === null || typeof prop === "undefined"){
        return true;
    } else{
        return false;
    }
};

export var getUserName = ()=> {
    if(localStorage.jwtToken){
        const decoded = jwt_decode(localStorage.jwtToken);
        return decoded.first_name;
    }
    return "";
}
export var getUserType = ()=> {
    if(localStorage.jwtToken){
        const decoded = jwt_decode(localStorage.jwtToken);
        return decoded.userType;
    }
    return "";
}

export  var getID = ()=> {
    if(localStorage.jwtToken){
        const decoded = jwt_decode(localStorage.jwtToken);
        return decoded.id;
    }
    return "";
}

export default setAuthToken;