import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import registerUserProfile from '../api/postProfile';
import getUserProfile from '../api/getUserProfileApi';
import uploadAvatar from '../api/postAvatarUpload';
import { Cities, States } from '../staticData';
import { CreateProfile, Toast } from '../components';
import {
  messages,
  formValidation,
  closeMessages
} from '../redux/actions/actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: '',
      imageSrc: '',
      checked: '',
      selectedCity: '',
      selectedState: '',
      imageLink: '',
      // form values
      formVals: {
        firstName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        streetAddress: '',
        postalCode: '',
        facebookLink: '',
        twitterLink: '',
        pinterestLink: '',
        linkedinLink: '',
        avatarUrl: ''
      },
      errors: {},
      formIsValid: true,
      // form data
      userProfileData: {
        userId: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gender: '',
        avatarUrl: '',
        socialLinks: {
          facebookLink: '',
          twitterLink: '',
          pinterestLink: '',
          linkedinLink: ''
        },
        address: {
          street: '',
          city: '',
          state: '',
          postalCode: ''
        }
      }
    };
  }

  componentDidMount = () => {
    this.getUserProfileData();
  };
  // get the user profile
  getUserProfileData = async () => {
    let { userId } = this.props;
    await getUserProfile(userId).then((resp) => {
      this.setState({ userProfileData: resp[0] });
    });
    if (!this.state.userProfileData) {
      return;
    } else {
      await this.setState({
        selectedCity: {
          label: this.state.userProfileData.address.city,
          value: this.state.userProfileData.address.city
        },
        selectedState: {
          label: this.state.userProfileData.address.state,
          value: this.state.userProfileData.address.state
        },
        formVals: {
          firstName: this.state.userProfileData.firstName,
          lastName: this.state.userProfileData.lastName,
          gender: this.state.userProfileData.gender,
          phoneNumber: this.state.userProfileData.phoneNumber,
          streetAddress: this.state.userProfileData.address.street,
          postalCode: this.state.userProfileData.address.postalCode,
          facebookLink: this.state.userProfileData.socialLinks.facebookLink,
          linkedinLink: this.state.userProfileData.socialLinks.linkedinLink,
          twitterLink: this.state.userProfileData.socialLinks.twitterLink,
          pinterestLink: this.state.userProfileData.socialLinks.pinterestLink
        }
      });

      let origLink = this.state.userProfileData.avatarUrl;
      //link for avatar image
      let link = origLink.substring(8);
      console.log(link);
      await this.setState({ imageLink: link });
    }
  };
  // gets the file from the fileInput
  getFile = (event) => {
    //the input
    let fd = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', fd);

    // upload avatar image
    uploadAvatar(formdata).then((response) => {
      this.setState({ avatarUrl: response });
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
    this.setState(
      {
        selectedCity: {
          label: selectedOption.label,
          value: selectedOption.value
        }
      },
      () => {
        console.log(this.state.selectedCity);
      }
    );
  };

  // handles the state change
  handleStateSelectChange = (selectedOption) => {
    this.setState(
      {
        selectedState: {
          label: selectedOption.label,
          value: selectedOption.value
        }
      },
      () => {
        console.log(this.state.selectedState);
      }
    );
  };

  // handles the radiobutton changes
  handleRadioButtonChange = (event) => {
    let value = event.target.value;
    this.setState(
      (prevstate) => ({ formVals: { ...prevstate.formVals, gender: value } }),
      () => {
        console.log(this.state.formVals.gender);
      }
    );
  };

  // handle change on inputs
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevstate) => ({ formVals: { ...prevstate.formVals, [name]: value } }),
      () => {
        console.log(name + ':' + value);
      }
    );
  };

  // submit validate then register
  handleSubmit = (e) => {
    // console.log(JSON.stringify(this.state.formVals));
    e.preventDefault();
    this.handleValidation();
  };
  // validate user
  handleValidation = (e) => {
    let errors = {};
    let formIsValid = true;

    console.log(this.state.formVals.firstName);
    if (this.state.formVals.firstName == '') {
      formIsValid = false;
      errors['firstName'] = 'First name cannot be empty';
    }
    console.log(this.state.formVals.lastName);
    if (this.state.formVals.lastName == '') {
      formIsValid = false;
      errors['lastName'] = 'Last name cannot be empty';
    }
    if (this.state.formVals.phoneNumber == '') {
      formIsValid = false;
      errors['phoneNumber'] = 'Phone number cannot be empty';
    }
    if (this.state.selectedCity == '') {
      formIsValid = false;
      errors['city'] = 'City cannot be empty';
    }
    if (this.state.selectedState == '') {
      formIsValid = false;
      errors['state'] = 'State cannot be empty';
    }
    if (this.state.formVals.streetAddress == '') {
      formIsValid = false;
      errors['streetAddress'] = 'Street address cannot be empty';
    }
    if (this.state.formVals.postalCode == '') {
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
      this.registerProfile();
    }
  };

  // register user
  registerProfile = () => {
    let { userId, sendMessage } = this.props;
    let { formVals, avatarUrl, selectedCity, selectedState } = this.state;

    console.log('register profile' + JSON.stringify(formVals));
    let _phoneNumber = formVals.phoneNumber;
    let _postalCode = formVals.postalCode;
    const data = {
      userId: userId,
      firstName: formVals.firstName,
      lastName: formVals.lastName,
      phoneNumber: parseInt(_phoneNumber),
      gender: formVals.gender,
      avatarUrl: avatarUrl,
      socialLinks: {
        facebookLink: formVals.facebookLink,
        twitterLink: formVals.twitterLink,
        pinterestLink: formVals.pinterestLink,
        linkedinLink: formVals.linkedinLink
      },
      address: {
        street: formVals.streetAddress,
        city: selectedCity.value,
        state: selectedState.value,
        postalCode: parseInt(_postalCode)
      }
    };
    registerUserProfile(userId, data).then((resp) => {
      console.log(resp);
      if (resp.error === 'profile error') {
        let data = {
          Notifications: {
            Info: '',
            Warning: '',
            Success: '',
            Error: 'Error',
            Message: resp.message
          }
        };
        sendMessage(data);
      }
    });
  };

  handleFormErrors = (data) => {
    let { handleErrors } = this.props;
    handleErrors(data);
  };

  render() {
    let {
      imageLink,
      imageSrc,
      avatarUrl,
      userProfileData,
      selectedCity,
      selectedState,
      formVals
      // gender
    } = this.state;
    let { formErrors, formIsValid } = this.props;
    console.log(imageLink);

    return (
      <React.Fragment>
        <CreateProfile
          // userProfileData={userProfileData}
          gender={formVals.gender}
          imageLink={this.state.imageLink}
          imageSrc={imageSrc}
          getFile={this.getFile}
          States={States}
          Cities={Cities}
          formVals={formVals}
          handleChange={this.handleChange}
          handleStateSelectChange={this.handleStateSelectChange}
          handleCitySelectChange={this.handleCitySelectChange}
          handleRadioButtonChange={this.handleRadioButtonChange}
          handleSubmit={this.handleSubmit}
          formErrors={formErrors}
          formIsValid={formIsValid}
          selectedCity={selectedCity}
          selectedState={selectedState}
        />
        <Toast />
      </React.Fragment>
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
