/* test/test.js */

var app = require('../server');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var should = require('chai').should();

describe('Handshake Mocha Tests', () => {

   // SignUp Company
    it("Test Case 1 -  SignUp Post", (done) => { 

        const companySignupData = {
            "company_name": 'Apple',
            "email": 'sulay.shah@apple.com',
            "password" : '12345',
            "location" : 'Santa Clara'
        }

        chai.request('http://localhost:5000')
        .post('/signUpCompany')
        .send(companySignupData)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
        done();
        });
    })

    // SignIn Company
    it("Test Case 2 -  SignIn Post", (done) => { 

        const companySignInData = {
            "email": 'sulay.shah@apple.com',
            "password" : '12345',
            "userType" : 'company'
        }

        chai.request('http://localhost:5000')
        .post('/signIn')
        .send(companySignInData)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
        done();
        });
    })

    // Get exsisting student profile
    it("Test Case 3 - Get Details of an existing student profile ", (done) => {
        chai.request('http://localhost:5000')
        .get(`/getStudentProfile`)
        .query({"id" : 1})
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('object');
            res.status.should.be.equal(200);
            expect(res.body[0].email).to.equal("shivangi.nagpal@sjsu.edu");
            expect(res.body[0].school).to.equal("SJSU");
        done();
        });
    })

    // Post an event: company
    it("Test Case 4 -  Event Post", (done) => { 

        const eventDetails = {
            "company_id": 6,
            "event_name" : 'Python workshop',
            "location" : 'Eng - 337',
            "date_of_event": '05-15-2020',
            "event_description": 'Learning python basics',
            "time": '02:00 PM',
            "eligibility": 'Computer Engineering'
        }

        chai.request('http://localhost:5000')
        .post('/addEventPost')
        .send(eventDetails)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
        done();
        });
    })

    // Get exsisting event details
    it("Test Case 5 - Get Details of an existing event ", (done) => {
        chai.request('http://localhost:5000')
        .get(`/getEventDetails`)
        .query({"id" : 6,
                "user_type":'company'})  
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('object');
            res.status.should.be.equal(200);
        done();
        });
    })
})