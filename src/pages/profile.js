import React, { Component } from 'react';
import { connect } from 'react-redux';
import registerUserProfile from '../api/postProfile';
import updateUserProfile from '../api/updateUserProfile';
import getUserProfile from '../api/getUserProfileApi';
import uploadAvatar from '../api/postAvatarUpload';
import { Cities, States } from '../staticData';
import { CreateProfile, Toast, Header } from '../components';
import {
  messages,
  formValidation,
  closeMessages,
  isProfileComplete,
  getUserAvatar
} from '../redux/actions/actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: '',
      avatarUrl: '',
      imageSrc: '',
      checked: '',
      selectedCity: '',
      selectedState: '',
      imageLink: null,
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
    let {
      userId,
      isProfileComplete,
      profileIsComplete,
      userAvatar
    } = this.props;
    await getUserProfile(userId).then((resp) => {
      this.setState({ userProfileData: resp[0] });
    });

    if (!this.state.userProfileData) {
      profileIsComplete(false);
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
      // set the state in redux
      profileIsComplete(true);
      if (this.state.userProfileData.avatarUrl != null) {
        let origLink = this.state.userProfileData.avatarUrl;
        //link for avatar image
        let link = origLink.substring(8);
        // console.log(link);
        await this.setState({
          imageLink: link,
          avatarUrl: this.state.userProfileData.avatarUrl
        });
        let data = {
          avatarUrl: link,
          firstName: this.state.userProfileData.firstName,
          lastName: this.state.userProfileData.lastName,
          socialLinks: {
            pinterestLink: this.state.userProfileData.socialLinks.pinterestLink,
            facebookLink: this.state.userProfileData.socialLinks.facebookLink,
            linkedinLink: this.state.userProfileData.socialLinks.linkedinLink,
            twitterLink: this.state.userProfileData.socialLinks.twitterLink
          },

          location: {
            city: this.state.userProfileData.address.city,
            state: this.state.userProfileData.address.state
          }
        };
        userAvatar(data);
      }
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
        // console.log(this.state.selectedCity);
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
        // console.log(this.state.selectedState);
      }
    );
  };

  // handles the radiobutton changes
  handleRadioButtonChange = (event) => {
    let value = event.target.value;
    this.setState(
      (prevstate) => ({
        ...prevstate.avatarUrl,
        formVals: { ...prevstate.formVals, gender: value }
      }),
      () => {
        // console.log(this.state.formVals.gender);
      }
    );
  };

  // handle change on inputs
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevstate) => ({
        ...prevstate.avatarUrl,
        formVals: { ...prevstate.formVals, [name]: value }
      }),
      () => {
        // console.log(name + ':' + value);
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
    let { isProfileComplete } = this.props;
    let errors = {};
    let formIsValid = true;

    // console.log(this.state.formVals.firstName);
    if (this.state.formVals.firstName == '') {
      formIsValid = false;
      errors['firstName'] = 'First name cannot be empty';
    }
    // console.log(this.state.formVals.lastName);
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
      if (isProfileComplete == false) {
        this.registerProfile();
      } else {
        console.log('update user profile');
        this.updateProfile();
      }
    }
  };

  // register user
  registerProfile = () => {
    let { userId, sendMessage, userAvatar } = this.props;
    let { formVals, avatarUrl, selectedCity, selectedState } = this.state;
    // console.log('register profile' + JSON.stringify(formVals));
    console.log(avatarUrl);
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
    registerUserProfile(userId, data).then(async (resp) => {
      // console.log(resp);

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
      } else {
        let data = {
          Notifications: {
            Info: '',
            Warning: '',
            Success: 'Success',
            Error: '',
            Message: 'Your profile has been created successfully.'
          }
        };
        sendMessage(data);
        let origLink = resp.avatarUrl;
        //link for avatar image
        let link = origLink.substring(8);
        let avatarData = {
          avatarUrl: link,
          firstName: resp.firstName,
          lastName: resp.lastName,
          socialLinks: {
            pinterestLink: resp.socialLinks.pinterestLink,
            facebookLink: resp.socialLinks.facebookLink,
            linkedinLink: resp.socialLinks.linkedinLink,
            twitterLink: resp.socialLinks.twitterLink
          },
          location: {
            city: resp.address.city,
            state: resp.address.state
          }
        };
        userAvatar(avatarData);
      }
    });
  };

  // update user
  updateProfile = () => {
    let { userId, sendMessage, userAvatar } = this.props;
    let { formVals, avatarUrl, selectedCity, selectedState } = this.state;
    // console.log('register profile' + JSON.stringify(formVals));
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
    updateUserProfile(data).then((resp) => {
      console.log(resp);

      if (resp.error === 'update error') {
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
      } else {
        let origLink = resp.avatarUrl;
        //link for avatar image
        let link = origLink.substring(8);
        let avatarData = {
          avatarUrl: link,
          firstName: resp.firstName,
          lastName: resp.lastName,
          socialLinks: {
            pinterestLink: resp.socialLinks.pinterestLink,
            facebookLink: resp.socialLinks.facebookLink,
            linkedinLink: resp.socialLinks.linkedinLink,
            twitterLink: resp.socialLinks.twitterLink
          },
          location: {
            city: resp.address.city,
            state: resp.address.state
          }
        };
        userAvatar(avatarData);
        let data = {
          Notifications: {
            Info: '',
            Warning: '',
            Success: 'Success',
            Error: '',
            Message: 'Your profile has been updated successfully'
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
      selectedCity,
      selectedState,
      formVals
    } = this.state;
    let { formErrors, formIsValid, isProfileComplete } = this.props;

    return (
      <React.Fragment>
        <Header />
        <CreateProfile
          isProfileComplete={isProfileComplete}
          gender={formVals.gender}
          imageLink={imageLink}
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
    formIsValid: state.auth.formIsValid,
    userAvatar: state.profile.userAvatar,
    isProfileComplete: state.profile.isProfileComplete
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
    },
    userAvatar: (data) => {
      dispatch(getUserAvatar(data));
    },
    profileIsComplete: (data) => {
      dispatch(isProfileComplete(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
