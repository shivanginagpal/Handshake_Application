import React, { Component } from 'react'
import axios from 'axios';
import { getID } from "../auth/HelperApis";
import Moment from 'react-moment';

export default class ApplicationFilter extends Component {
    constructor() {
        super();
        this.state = {
            appliedjobs:[],
            Keyword: "",
            errors: {}
        };
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        //this.onChange = this.onChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
    }
    searchChangeHandler(e) {
        this.setState({ Keyword: e.target.value });
    }

    async componentDidMount(){
        axios.defaults.withCredentials = true;  
        console.log("in componentDidMount");  
        const userId = getID();
        const user ={"user_id":userId}
        console.log(userId);
        //List of all applied jobs
        await axios.post('/getAppliedJobDetails',user )
        .then(res=>{
            const {appliedjobs}=res.data;
            //console.log(res.data);
            this.setState({appliedjobs: appliedjobs});
            console.log(appliedjobs);
        })

    }
    render() {
        console.log(this.state.Keyword);
        //const sty = {"max-width" : "18rem"};
        let appliedJobs = this.state.appliedjobs.map(job => {
            if (
                job.job_title
                  .toUpperCase()
                  .includes(this.state.Keyword.toUpperCase())
              )
            { return(
            <div class="col-sm-6">
            <div class="card">
            <div class="card-body">
            <h5 class="card-title">{job.job_title}</h5>
            <p class="card-text"><strong>{job.company_name}</strong>
            </p>
            <p class="card-text"><strong>Status:</strong> {job.app_status}
            </p>
            <p class="card-text"><strong>Applied date:</strong>
            <Moment format="YYYY/MM/DD">{job.date_applied}</Moment>
            </p>
      </div>
    </div>
  </div>
         ); }} )
        return (
            <div className="container">
                <div className="row">
            
                
                {/* <div class="card w-30">
                <div class="card-body"> */}
                <h5 class="card-title">Filter</h5>
                <form>
                
                    <div class="form-group form-row col-md-8">
                    <label for="Keyword">Search</label>
                    <input type="search" 
                    class="form-control" 
                    name="Keyword" 
                    placeholder="Enter a Keyword"
                    onChange={this.searchChangeHandler}
                    value={this.state.Keyword}/>
                    </div>
           
                <div class="form-group form-row col-md-8">
                    <label for="appType">Application Type</label>
                    <input type="text" class="form-control" id="appType" placeholder="+ Add Application Type"/>
                </div>
                
                <div class="form-group row col-md-4">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="pending"/>
                    <label class="form-check-label" for="pending">
                        Pending
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="approved"/>
                    <label class="form-check-label" for="approved">
                        Approved
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="declined"/>
                    <label class="form-check-label" for="declined">
                        Declined
                    </label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Search</button>
                </form>
                {/* </div>      
            </div> */}
            <div className="container">
            {appliedJobs}
            </div>
        </div>
        </div>

        )
    }
}
