import React,{Component} from "react";
import {Card} from 'react-bootstrap';
import {Button, Container, Row, Col} from 'react-bootstrap';
//import './buyerHome.css';
import axios from 'axios';
//import {getBuyerID, isFieldEmpty, CheckValidBuyer} from "../genericapis.js";
import CompanyNavbar from "./CompanyNavbar";

// class NonImageElement extends Component{
//     state={
//         element:"",
//         value : "",
//         editClicked : false,
//         newValue : ""
//     }
//     constructor(props){
//         super(props);
//         this.state.element = this.props.element;
//         this.state.value = this.props.value;
//         this.state.newValue = this.props.value;
//         this.state.editClicked = false;
//         this.modifiedElement = this.modifiedElement.bind(this);
//         this.modifiedValue = this.modifiedValue.bind(this);
//         this.elementChangeHandler = this.elementChangeHandler.bind(this);
//     }
//     elementChangeHandler(evt){
//         let value = evt.target.value;
//         this.setState({
//             newValue : value
//         });
//     }
//     submitModalHandler = async (evt) =>{
//         //axios request to server
//         evt.preventDefault();
//         axios.defaults.withCredentials = true;
//         let company_id = getBuyerID();
//         let data = {
//             company_id,
//             company_colValue : this.state.newValue,
//             company_colName : this.state.element
//         }
//         await axios({
//             method: 'post',
//             url: "http://localhost:5000/updateCompanyProfile",
//             // data: {"jsonData" : JSON.stringify(data)},        
//             data,
//             config: { headers: { 'Content-Type': 'multipart/form-data' } }
//         })
//             .then((response) => {
//                 if (response.status >= 500) {
//                     throw new Error("Bad response from server");
//                 }
//                 return response.data;
//             })
//             .then((responseData) => {
//                 console.log(responseData.message);
//                 if(responseData.status){
//                     this.setState({
//                         editClicked : false,
//                         value : responseData.message[this.state.element]
//                     });
//                 } else {
//                     //alert(responseData.message);
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//             });
//     }
//     cancelModalHandler = () => {
//         //set editClicked to false
//         this.setState({
//             editClicked : false
//         });
//     }
//     renderProfileModal(){
//         if (this.state.editClicked){
//             return(
//                 <Container>
//                     <Col xs={4}>
//                         <Row><h4>Update {this.modifiedElement(this.state.element)}</h4></Row>
//                         <form onSubmit={this.submitModalHandler}>
//                             <div className="form-group">
//                                 <input className="form-control" type="text" name={this.state.element} defaultValue={this.state.value} onChange = {this.elementChangeHandler}/>
//                             </div>
//                             <button className="btn btn-success" type="submit">Submit</button> &nbsp; &nbsp;
//                             <button className="btn btn-success" onClick={this.cancelModalHandler}>Cancel</button>
//                         </form>
//                         <Row></Row>
//                         <Row> 
//                             <Col xs={2}>  </Col> 
//                             <Col xs={2}>  </Col> 
//                         </Row>
//                     </Col>
//                 </Container>
//             );
//         } else {
//             return <div> {this.modifiedValue(this.state.value)} </div>
//         }
//     }
//     modifiedValue = (value)=>{
//         value = isFieldEmpty(value) ? "--" : value;
//         return value;
//     }
//     modifiedElement=(element)=>{
//         let elementsMap = {
//             "buyer_name" : "Name",
//             "buyer_email" : "Email",
//             "buyer_phoneNumber" : "Phone number",
//             "buyer_profileImage" : "Profile Image",
//             "buyer_address" : "Address"
//         }
//         return elementsMap[element];
//     }
//     render(){
//         //key={this.modifiedElement(this.state.element)}
//         return(
//             <Card className="row profileElement">
//             <Card.Body><h6>{this.modifiedElement(this.state.element)}</h6></Card.Body>
//             <Card.Body>
//                 {this.renderProfileModal()}
//                 <div className="float-right"><a href="#editBuyerProfile" onClick={()=>{this.setState({ editClicked : true })} }>Edit</a></div>
//             </Card.Body>
//         </Card>
//         );
//     }
// }
// class ProfileImage extends Component{
//     state={
//         buyer_profileImage : "",
//         editClicked : false,
//         newProfileImg : ""
//     }
//     constructor(props){
//         super(props);
//         this.state.buyer_profileImage = this.props.buyer_profileImage;
//         this.state.newProfileImg = this.props.buyer_profileImage;
//         this.state.editClicked = false;
//     }
//     /*elementChangeHandler(evt){
//         let value = evt.target.value;
//         this.setState({
//             newValue : value
//         });
//     }*/
//     submitModalHandler = async (evt) =>{
//         //axios request to server
//         evt.preventDefault();
//         axios.defaults.withCredentials = true;
//         let buyer_id = getBuyerID();
//         let data = new FormData();
//         data.append('buyer_id', buyer_id);
//         data.append('selectedFile', evt.target.elements["buyer_profileImage"].files[0]);
//         //form.elements["buyer_profileImage"].files;
//         console.log(evt.target.elements["buyer_profileImage"].files[0]);
//         await axios({
//             method: 'post',
//             url: "http://54.147.235.117:3001/updateBuyerProfileImage",
//             // data: {"jsonData" : JSON.stringify(data)},        
//             data,
//             config: { headers: { 'Content-Type': 'multipart/form-data' } }
//         })
//             .then((response) => {
//                 if (response.status >= 500) {
//                     throw new Error("Bad response from server");
//                 }
//                 return response.data;
//             })
//             .then((responseData) => {
//                 console.log(responseData.message);
//                 if(responseData.status){
//                     this.setState({
//                         editClicked : false,
//                         buyer_profileImage : responseData.message["buyer_profileImage"]
//                     });
//                 } else {
//                     alert(responseData.message);
//                 }
//             }).catch(function (err) {
//                 console.log(err);
//             });
//     }
//     cancelModalHandler = () => {
//         //set editClicked to false
//         this.setState({
//             editClicked : false
//         });
//     }
//     renderProfileImageOverlay(){
//         if (this.state.editClicked){
//             return(
//                 <Container>
//                     <Col xs={4}>
//                         <Row><h4>Update profile picture</h4></Row>
//                         <form onSubmit={this.submitModalHandler} encType="multipart/form-data">
//                             <div className="form-group">
//                                 <input type='file' id='single' name="buyer_profileImage" accept="image/x-png,image/gif,image/jpeg"/>
//                             </div>
//                             <button className="btn btn-success" type="submit">Submit</button> &nbsp; &nbsp;
//                             <button className="btn btn-success" onClick={this.cancelModalHandler}>Cancel</button>
//                         </form>
//                     </Col>
//                 </Container>
//             );
//         } else {
//             let eleValue = "--";
//             if(isFieldEmpty(this.state.buyer_profileImage)){
//                 eleValue = "--";
//             } else {
//                 eleValue = <img className="img-fluid" src={this.state.buyer_profileImage} alt="Profile Image"/>
//             }
//             return <div> {eleValue} </div>
//         }
//     }
//     render(){
//         //key={this.modifiedElement(this.state.element)}
//         return(
//             <Card className="row profileElement">
//             <Card.Body><h6>Profile picture</h6></Card.Body>
//             <Card.Body>
//                 {this.renderProfileImageOverlay()}
//                 <div className="float-right"><a href="#editBuyerProfile" onClick={()=>{this.setState({ editClicked : true })} }>Edit</a></div>
//             </Card.Body>
//         </Card>
//         );
//     }
// }
export class CompanyProfile extends Component{
    state={
        isRendered : false,
        companyProfile : {}
    }
    constructor(props){
        super(props);
        this.state.companyProfile = {};
       // this.updateProfileModal = this.updateProfileModal.bind(this);
    }
    componentDidMount=async()=>{
        axios.defaults.withCredentials = true;
        //let company_id = getBuyerID();
        let company_id = 1;
        let searchType = "id";
        let data ={
            searchType : searchType,
            value : company_id
        }
        await axios({
            method: 'post',
            url: "http://localhost/getCompanyProfile",
            // data: {"jsonData" : JSON.stringify(data)},        
            data: data,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                return response.data;
            })
            .then((responseData) => {
                console.log(responseData.message);
                if(responseData.status){
                    this.setState({
                        isRendered : true,
                        companyProfile : responseData.message
                    });
                } else {
                    //alert(responseData.message);
                }
            }).catch(function (err) {
                console.log(err)
            });
    }
    
    render(){
        // let renderProfileElements=()=>{
        //     let allEles= [];
        //     for(let element in  this.state.companyProfile){
        //         let value = this.state.companyProfile[element];
        //         //allCards.push(this.renderCardComponent(element, value));
        //         if(element != "company_profileImage"){
        //             allEles.push(<NonImageElement key={element} element={element} value={value}/>);
        //         }
        //     }
        //     allEles.push( <ProfileImage key="company_profileImage" company_profileImage={this.state.companyProfile.company_profileImage}/>);
        //     return allEles;
        // }
        // let renderProfile = () => {
        //     if(!this.state.isRendered){
        //         return <div></div>
        //     } else{
        //         return (
        //             renderProfileElements()
        //         );
        //     }
        // }
        // return(
        //     <div>
        //     <CheckValidCompany/>
        //     <CompanyNavbar/>
        //     <Container>
        //         <Col xs={9} className="offset-xs-2">
        //         {renderProfile()}
        //         </Col>
        //     </Container>
        //     </div>
        // );
        return(
            <div>
            <CompanyNavbar/>
            
            </div>
        );
    }
}
export default CompanyProfile;