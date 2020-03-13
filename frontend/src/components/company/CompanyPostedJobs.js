import React, { Component } from 'react';
import Moment from 'react-moment';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';


class CompanyPostedJobs extends Component {
    jobClick = (job_id) => {
        console.log("Came inside job-click");
        console.log(job_id);

        this.props.history.push({
            pathname:"/studentAppliedJobs",
            state:{
                job_id:job_id
            }
        });
    }
    render() {
        console.log("In Company Posted Jobs");
        console.log(this.props.companyjobs.jobs);
        const { jobs } = this.props.companyjobs;

        console.log(this.props);
       
       
        let jobDetails = jobs.map(job => (
                <div>
                    <div class="card w-75" id="eventscard">
                        <div class="card-body">
                            <div className="row">
                                <strong>Job Title :</strong> {job.job_title}
                            </div>
                            <div className="row">
                                <strong>Posting Date :</strong>
                                <Moment format="YYYY/MM/DD">{job.posting_date}</Moment>
                            </div>
                            <div className="row">
                                <strong>Application Deadline :</strong>
                                <Moment format="YYYY/MM/DD">{job.app_deadline}</Moment>

                            </div>
                            <div className="row">
                                <strong>Salary : </strong> {job.salary}
                            </div>
                            <div className="row">
                                <strong>Job Decsription : </strong> {job.job_description}
                            </div>
                            <div className="row">
                                <strong>Job Category : </strong>{job.job_category}
                            </div>
                            <div className="row">
                                <a href="#" onClick={() => this.jobClick(job.job_id)}> Student List</a>
                            </div>
                        </div>
                    </div>
                </div>
        ))
        return (
            <div className="container">
                {/* <CompanyNavbar /> */}
                <div className="row justify-content-center align-items-center">
                    <div className="col-12">
                        <div className="dash-one">
                            <h4 className="font-weight-bold">All Jobs</h4>
                            {jobDetails.length > 0 ? (
                                <div className="col-10">{jobDetails}</div>
                            ) : (
                                    <div>
                                        <h4 style={{ margin: "3em" }}>No jobs added, click on 'Post Job' to add a new job opening.</h4>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>)
    }
}



//export default connect(mapStateToProps, { getStudentsForJob })(withRouter(CompanyPostedJobs));
export default connect(null)(withRouter(CompanyPostedJobs))