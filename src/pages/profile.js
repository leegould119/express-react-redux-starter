import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import registerUserProfile from '../api/postProfile';
import uploadAvatar from '../api/postAvatarUpload';
import { Cities, States } from '../staticData';
import { CreateProfile } from '../components';
import {
  messages,
  formValidation,
  closeMessages
} from '../redux/actions/actions';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: null,
      imageSrc: null,
      checked: null,
      selectedCity: null,
      selectedState: null,
      // form values
      firstName: null,
      lastName: null,
      phoneNumber: null,
      streetAddress: null,
      postalCode: null,
      facebookLink: null,
      twitterLink: null,
      pinterestLink: null,
      linkedinLink: null,
      errors: {},
      formIsValid: true
    };
  }

  registerProfile = () => {
    let { userId } = this.props;
    console.log('register profile');
    // registerUserProfile(userId).then((resp) => {
    //   console.log(JSON.stringify(resp));
    // });
  };
  // gets the file from the fileInput
  getFile = (event) => {
    //the input
    let fd = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', fd);

    // upload avatar image
    uploadAvatar(formdata).then((response) => {
      console.log(response);
    });

    // render the uploaded file here
    let reader = new FileReader();
    let imageUrl = reader.readAsDataURL(fd);
    reader.onloadend = (e) => {
      this.setState({
        imageSrc: [reader.result]
      });
    };
  };
  // handles the city change
  handleCitySelectChange = (selectedOption) => {
    this.setState({ selectedCity: selectedOption.value }, () => {
      console.log(this.state.selectedCity);
    });
  };
  // handles the state change
  handleStateSelectChange = (selectedOption) => {
    this.setState({ selectedState: selectedOption.value }, () => {
      console.log(this.state.selectedState);
    });
  };
  // handles the radiobutton changes
  handleRadioButtonChange = (event) => {
    let value = event.target.value;
    this.setState({ checked: value }, () => {
      console.log(this.state.checked);
    });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      console.log(name + ':' + value);
    });
  };
  // Validation
  handleSubmit = (e) => {
    e.preventDefault();
    this.handleValidation();
  };
  handleValidation = (e) => {
    let errors = {};
    let formIsValid = true;

    let {
      firstName,
      lastName,
      phoneNumber,
      selectedState,
      selectedCity,
      streetAddress,
      postalCode
    } = this.state;

    if (!firstName) {
      formIsValid = false;
      errors['firstName'] = 'First name cannot be empty';
    }
    if (!lastName) {
      formIsValid = false;
      errors['lastName'] = 'Last name cannot be empty';
    }
    if (!phoneNumber) {
      formIsValid = false;
      errors['phoneNumber'] = 'Phone number cannot be empty';
    }
    if (!selectedCity) {
      formIsValid = false;
      errors['city'] = 'City cannot be empty';
    }
    if (!selectedState) {
      formIsValid = false;
      errors['state'] = 'State cannot be empty';
    }
    if (!streetAddress) {
      formIsValid = false;
      errors['streetAddress'] = 'Street address cannot be empty';
    }
    if (!postalCode) {
      formIsValid = false;
      errors['postalCode'] = 'Postal code cannot be empty';
    }

    if (formIsValid == false) {
      let data = {
        formErrors: errors,
        formIsValid: formIsValid
      };
      this.handleFormErrors(data);
    }
    if (formIsValid == true) {
      let data = {
        formErrors: errors,
        formIsValid: formIsValid
      };
      this.handleFormErrors(data);
      // this.registerProfile();
    }
  };

  handleFormErrors = (data) => {
    let { handleErrors } = this.props;
    handleErrors(data);
  };

  render() {
    let { imageSrc } = this.state;
    let { formErrors, formIsValid } = this.props;
    return (
      <CreateProfile
        imageSrc={imageSrc}
        getFile={this.getFile}
        States={States}
        Cities={Cities}
        handleChange={this.handleChange}
        handleStateSelectChange={this.handleStateSelectChange}
        handleCitySelectChange={this.handleCitySelectChange}
        handleRadioButtonChange={this.handleRadioButtonChange}
        handleSubmit={this.handleSubmit}
        formErrors={formErrors}
        formIsValid={formIsValid}
      />
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    auth: state.auth,
    isLoggedIn: state.auth.isLoggedIn,
    Notifications: state.auth.Notifications,
    userId: state.auth.userId,
    formErrors: state.auth.formErrors,
    formIsValid: state.auth.formIsValid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    sendMessage: (data) => {
      dispatch(messages(data));
    },
    handleErrors: (data) => {
      dispatch(formValidation(data));
    },
    closeMessageBox: (data) => {
      dispatch(closeMessages(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
