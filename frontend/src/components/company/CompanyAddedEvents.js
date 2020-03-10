import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Moment from 'react-moment';
import { PropTypes } from 'prop-types';
import { getStudentsForEvent } from '../../actions/companyActions'
//import StudentsRegisteredEvent from '../eventPost/StudentsRegisteredEvent';
import { createCompanyProfile } from '../../actions/profileActions';

class CompanyAddedEvents extends Component {

    eventClick = (event_id) => {
        console.log("Came inside event-click");
        this.props.getStudentsForEvent(event_id);
    }

    render() {
        console.log(this.props);
        console.log("In Company Posted Events");
        console.log(this.props.companyevents.events);
        const { events } = this.props.companyevents;
        // const { eventstudents } = this.props.studentevent;
        //companyevents = Object.values(companyevents);
        let eventDetails = events.map((event) =>  (
                <div>
                    <div class="card w-75" id="eventscard">
                        <div class="card-body">
                            <div className="row">
                                <strong>Event Name :</strong>
                                {event.event_name}
                            </div>
                            <div className="row">
                                <strong>Date of Event :</strong> 
                                <Moment format="YYYY/MM/DD">{event.date_of_event}</Moment>
                            </div>
                            <div className="row">
                                <strong>Location :</strong>{event.location}
                            </div>
                            <div className="row">
                                <strong>Time : </strong>{event.time}
                            </div>
                            <div className="row">
                                <strong>Eligibility :</strong>{event.eligibility}
                            </div>
                            <div className="row">
                                <strong>Event Description :</strong>{event.event_description}
                            </div>
                            <div className="row">
                                <a href="#" onClick={() => this.eventClick(event.event_id)}> Student List</a>
                            </div>
                        </div>
                    </div>
                    {/* <StudentsRegisteredEvent eventstudents={eventstudents} /> */}
                </div>)
        )
        return (
            <div className="col-12">
                <div className="dash-one">
                    <h4 className="font-weight-bold">All Events</h4>
                    {eventDetails.length > 0 ? (
                        <div className="col-10">{eventDetails}</div>
                    ) : (
                            <div>
                                <h4 style={{ margin: "3em" }}>No events added, click on 'Add Event' to post an event.</h4>
                            </div>
                        )}
                </div>
            </div>)
    }
}

// CompanyAddedEvents.propTypes = {
//     getStudentsForEvent: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     profile: state.profile,
//     auth: state.auth,
//     studentevent: state.studentevent,
//     companyevents: state.companyevents
// });

//export default connect(mapStateToProps, { getStudentsForEvent })(CompanyAddedEvents);
export default connect(null)(withRouter(CompanyAddedEvents))