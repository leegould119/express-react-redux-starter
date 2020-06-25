import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import registerUser from '../api/postProfile';
import uploadAvatar from '../api/postAvatarUpload';
import Select from 'react-select';
import {
  AvatarUpload,
  Input,
  RadioButton,
  Button
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
      states: States,
      selectedCity: null,
      selectedState: null
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

  handleCitySelectChange = (selectedOption) => {
    this.setState({ selectedCity: selectedOption.value }, () => {
      console.log(this.state.selectedCity);
    });
  };

  handleStateSelectChange = (selectedOption) => {
    this.setState({ selectedState: selectedOption.value }, () => {
      console.log(this.state.selectedState);
    });
  };

  render() {
    let { imageSrc, checked, cities, states, selectedCity } = this.state;
    // console.log(selectedCity);
    let genderOptions = ['Male', 'Female'];

    const customStyles = {
      container: () => ({
        width: '95%'
      }),
      indicatorSeparator: (styles) => ({ display: 'none' }),
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid rgba(240,240,240,1)',
        width: '100%'
      }),
      menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        color: state.selectProps.menuColor,
        width: '100%',
        borderRadius: '0px',
        fontSize: '0.9em'
      }),
      control: (provider, state) => ({
        // none of react-select's styles are passed to <Control />
        ...provider,
        width: 'calc(100%-5px)',
        borderRadius: '0px',
        fontSize: '0.8em',
        border: state.isFocused ? 0 : 0,
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
          border: state.isFocused ? 0 : 0
        },
        borderBottom: '1px solid rbga(204,204,204,1)'
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
      }
    };

    return (
      <React.Fragment>
        <div className="background" />
        <div className="container ">
          <div className="row">
            <div className="col-5">
              <form className="form">
                <div className="dark-orange">
                  <AvatarUpload imageSrc={imageSrc} getFile={this.getFile} />
                </div>
                <label className="label">Personal info</label>
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

                <label className="label">Address</label>
                <div
                  style={{
                    borderBottom: '1px solid rgba(240,240,240,1)',
                    display: 'block',
                    position: 'relative',
                    margin: '0px 0px 0 10px',
                    width: 'calc(100% - 20px)'
                  }}
                >
                  <Select
                    id="state"
                    options={States}
                    styles={customStyles}
                    isSearchable={true}
                    onChange={this.handleStateSelectChange}
                    placeholder={'State'}
                  />
                </div>
                <div
                  style={{
                    borderBottom: '1px solid rgba(240,240,240,1)',
                    display: 'block',
                    position: 'relative',
                    margin: '0px 0px 0 10px',
                    width: 'calc(100% - 20px)'
                  }}
                >
                  <Select
                    id="city"
                    options={Cities}
                    styles={customStyles}
                    isSearchable={true}
                    onChange={this.handleCitySelectChange}
                    placeholder={'City'}
                  />
                </div>
                <Input
                  type="text"
                  autoComplete="street-address"
                  name="streetAddress"
                  placeholder="Street address"
                />
                <Input
                  type="text"
                  autoComplete="postal-code"
                  name="postalCode"
                  placeholder="Postal code"
                />
                <label className="label">Gender</label>
                <div style={{ marginTop: '15px' }}>
                  <RadioButton
                    id="gender"
                    options={genderOptions}
                    handleChange={this.handleRadioButtonChange}
                  />
                </div>
                <div style={{ width: '180px', margin: 'auto' }}>
                  <input type="submit" value="Update profile" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
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
