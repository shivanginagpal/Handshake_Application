const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateUpdateBasic(data) {
  let errors = {};
  data.fname = !isEmpty(data.first_name) ? data.first_name : "";
  data.lname = !isEmpty(data.last_name) ? data.last_name : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone_num = !isEmpty(data.phone_num) ? data.phone_num : "";
  data.skill_set = !isEmpty(data.skill_set) ? data.skill_set : "";
  careerObj = !isEmpty(data.career_obj) ? data.careero_bj : "";

  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "Name field is required";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Name field is required";
  }

  if (Validator.isEmpty(data.dob)) {
    errors.dob = "DOB field is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "city field is required";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "This field is required";
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = "This field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "This field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = "This field is required";
  }
  if (Validator.isEmpty(data.phone_num)) {
    errors.phone_num = "This field is required";
  }
  if (!Validator.isLength(data.phone_num, { min: 10, max: 10 })) {
    errors.phone_num = "phone number must be 10 digits";
  }
  if (Validator.isEmpty(data.skill_set)) {
    errors.skill_set = "This field is required";
  }
  if (Validator.isEmpty(data.career_obj)) {
    errors.career_obj = "This field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};