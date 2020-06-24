import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import registerUser from '../api/postProfile';
import uploadAvatar from '../api/postAvatarUpload';
import {
  AvatarUpload,
  Input,
  RadioButton,
  Select
} from '../components/formElements';
import { Cities, States } from '../staticData';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: null,
      imageSrc: null,
      checked: null,
      cities: Cities,
      states: States
    };
  }

  // https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
  register = () => {
    let { userId } = this.props;
    registerUser(userId).then((resp) => {
      console.log(JSON.stringify(resp));
    });
  };

  handleRadioButtonChange = (event) => {
    let value = event.target.value;
    this.setState({ checked: value }, () => {
      console.log(this.state.checked);
    });
  };

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

  render() {
    let { imageSrc, checked, cities, states } = this.state;
    console.log(JSON.stringify(cities));
    console.log(JSON.stringify(states));
    let genderOptions = ['Male', 'Female'];
    return (
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <AvatarUpload imageSrc={imageSrc} getFile={this.getFile} />
            <form>
              <Input
                type="text"
                autoComplete="first-name"
                name="firstName"
                placeholder="First name"
              />
              <Input
                type="text"
                autoComplete="last-name"
                name="lastName"
                placeholder="Last name"
              />
              <Input
                type="tel"
                autoComplete="phone-number"
                name="phoneNumber"
                placeholder="Phone number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
              <RadioButton
                id="gender"
                options={genderOptions}
                handleChange={this.handleRadioButtonChange}
              />
              <Input
                type="text"
                autoComplete="street-address"
                name="streetAddress"
                placeholder="street address"
              />
              <Select options={States} />
              <Select options={Cities} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    auth: state.auth,
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
      dispatch(_formErrors(data));
    },
    closeMessageBox: (data) => {
      dispatch(closeMessages(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
