//import React,{Component} from "react";
import cookie from 'react-cookies';

export var isFieldEmpty = (prop)=>{
    if(prop === "" || prop === null || typeof prop === "undefined"){
        return true;
    } else{
        return false;
    }
};

export var getUserName = ()=> {
    let name = cookie.load("name");
    if(!isFieldEmpty(name)){
        return name;
    } else {
        return "";
    }
}
export var getUserType = ()=> {
    let user_type = cookie.load("user_type");
    if(!isFieldEmpty(user_type)){
        return user_type;
    } else {
        return "";
    }
}
export  var getID = ()=> {
    let id = cookie.load("id");
    if(!isFieldEmpty(id)){
        return id;
    } else {
        return "";
    }
}

export var handleLogout = () => {
    console.log("Removing cookies");
    cookie.remove("user_type", { path: '/' });
    cookie.remove("id", { path: '/' });
    cookie.remove("name", { path: '/' });
}