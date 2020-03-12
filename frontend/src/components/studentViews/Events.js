import "../student/custom.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentNavbar from "../student/StudentNavbar";
import RegisteredEvents from "./RegisteredEvents";
import axios from "axios";
import Moment from 'react-moment';
//import vieweventModal from "./vieweventModal";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getID, getUserType} from "../auth/HelperApis";
import swal from "sweetalert";

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      searchString: "",
      displayAck: false,
      success: false,
      viewevent:null,
      modal: false
    };
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
  }
  searchChangeHandler(e) {
    this.setState({ searchString: e.target.value });
  }
  showModal = () => {
    this.setState({
      modal: !this.state.modal
      //events: this.state.events
    });
  };

  showModal1 = (viewevent) => {
    this.setState({
      modal: !this.state.modal,
      viewevent: viewevent
    });
  };

  async componentDidMount() {
    const user_id = getID();
    const user_type = getUserType();
    axios("/getEventDetails", {
      method: "get",
      params: {"id":user_id, "user_type":user_type}
    }).then(response => {
      this.setState({
        events: this.state.events.concat(response.data.events) //events[0]
      });
      console.log(this.state.events);
    });
  }

  register = event_id => {
    axios.defaults.withCredentials = true;
    const user_id = getID();
    const reg = "Registered";
    console.log("In REGISTER EVENT CLICK");
    console.log(event_id);

    const registerEvent = {
      event_id: event_id,
      user_id: user_id,
      register_status: reg
    };
    console.log(registerEvent);
    axios
      .post("/registerEvent", registerEvent)
      .then(res => {
        console.log(res.data.status);
        if (res.data.status === true){
          swal({
            title: "Congratulations!",
            text: "You Successfully registered for the Event!",
            icon: "success",
            button: "OK"
          }).then(() => {
            window.location.reload();
          })
        }else{
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'You are not eligible to register for this event!',
            button: "OK"
          }).then(() => {
            window.location.reload();
        })
      }}
      )
      .catch(error => console.log(error.response.data));
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={() => this.showModal()}>
        &times;
      </button>
    );
    let eventsList = this.state.events.map(viewevent => {
      if (
          (viewevent.company_name
          .toUpperCase()
          .includes(this.state.searchString.toUpperCase())) || 
          (viewevent.event_name
          .toUpperCase()
          .includes(this.state.searchString.toUpperCase()))
      ) {
        return (
          <div className="card w-100" id="eventscard">
            <div className="card-body">
              <div className="row">
                <h5 className="card-title col-7" id="eventtext">
                  Event name: {viewevent.event_name}
                </h5>
                <div className="col-3">
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => this.showModal1(viewevent)}
                  >
                    View Event Details
                  </button>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.register(viewevent.event_id)}
                  >
                    Register
                  </button>
                </div>
              </div>
              <p className="card-text" id="eventtext">
                Company Name: {viewevent.company_name}
              </p>
              <p className="card-text" id="eventtext">
                eligibility: {viewevent.eligibility}
              </p>
              <div className="row">
                <div className="col-10"></div>
                {/* <a
                  href="/studentviewevents"
                  class="btn btn-primary"
                  onClick={this.register(viewevent.event_id)}
                >
                  Register
                </a> */}
              </div>
            </div>
          </div>
        );
      }
    });

    return (
      <div className="viewevent">
        <StudentNavbar />
        <div className="container">
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                onChange={this.searchChangeHandler}
                value={this.state.searchString}
                placeholder="Search"
                aria-label="Search"
              />
              <Link
                to="/RegisteredEvents"
                className="btn btn-outline-dark my-2 my-sm-0"
              >
                View Registered Events
              </Link>
            </form>
          </nav>
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div className="dash-one">
                <h4 className="font-weight-bold">Events</h4>
                {this.state.events.length > 0 ? (
                  <div className="col-10">
                    {eventsList}
                    {this.state.viewevent != null ? (
                        <Modal
                      isOpen={this.state.modal}
                      toggle={() => this.showModal()}
                      className="modal-popup"
                      scrollable
                    >
                      <ModalHeader
                        toggle={() => this.showModal()}
                        close={closeBtn}
                      >
                        EventDetails
                      </ModalHeader>
                      <ModalBody className="modal-body">
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Event Name: {this.state.viewevent.event_name}
                          </h4>
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Event Description:{" "}
                            {this.state.viewevent.event_description}
                          </h4>
                          <br />
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Location:{this.state.viewevent.location}
                          </h4>
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            DATE: 
                            <Moment format="YYYY/MM/DD">{this.state.viewevent.date_of_event}</Moment>
                          </h4>
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            TIME: {(this.state.viewevent.time)}
                          </h4>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        {/* <Button
                        color="secondary"
                        onClick={() => this.showModal()}
                      >
                        Cancel
                      </Button> */}
                      </ModalFooter>
                    </Modal> 
                    ) : (
                      null
                    )}
                    
                  </div>
                ) : (
                  <div>
                    <h4 style={{ margin: "3em" }}>No new events to display!</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Events;