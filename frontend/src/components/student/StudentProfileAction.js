import React from 'react';
import { Link } from 'react-router-dom';

const StudentProfileAction = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/editStudentProfileBasic" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/studentExperience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/studentEducation" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
      <Link to="/uploadImage" className="btn btn-light">
        <i className="fas fa-file-image text-info mr-1" />
        Upload Image
      </Link>
    </div>
  );
};

export default StudentProfileAction;