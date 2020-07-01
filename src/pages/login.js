import React, { Component } from 'react';
import postLogin from '../api/postLoginApi';
import postRegister from '../api/postRegisterApi';
import { connect } from 'react-redux';
import { Toast, LoginForm, RegisterForm } from '../components';

import {
  loginUser,
  messages,
  formValidation,
  closeMessages
} from '../redux/actions/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userpassword: '',
      userpasswordverify: '',
      errors: {},
      formIsValid: true,
      formName: 'Login'
    };
  }

  handleFormErrors = (data) => {
    let { handleErrors } = this.props;
    handleErrors(data);
  };

  handleFormChange = (e) => {
    this.setState({ formName: e.target.name });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    let { username, userpassword, formName } = this.state;
    console.log(formName);
    console.log(username, userpassword);
    event.preventDefault();
    this.handleValidation(formName);
  };

  // validate forms
  handleValidation = (formName) => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    let errors = {};
    let formIsValid = true;

    //Name
    let { username, userpassword, userpasswordverify } = this.state;
    let { handleErrors } = this.props;
    console.log(username, userpassword, userpasswordverify);
    if (validEmailRegex.test(username) == false) {
      formIsValid = false;
      errors['username'] = 'Email is not a valid format';
    }
    if (!username) {
      formIsValid = false;
      errors['username'] = 'Email cannot be empty';
    }
    //UserPassword
    if (userpassword.length <= 6) {
      formIsValid = false;
      errors['userpassword'] =
        'Password cannnot be less than 6 characters long';
    }
    if (!userpassword) {
      formIsValid = false;
      errors['userpassword'] = 'Password cannnot be empty';
    }

    if (formName === 'Register') {
      if (userpasswordverify.length <= 6) {
        formIsValid = false;
        errors['userpasswordverify'] =
          'Password cannnot be less than 6 characters long';
      }

      if (!userpasswordverify) {
        formIsValid = false;
        errors['userpasswordverify'] = 'Password cannnot be empty';
      }
      if (
        userpassword !== userpasswordverify ||
        userpasswordverify !== userpassword
      ) {
        formIsValid = false;
        errors['userpasswordverify'] = 'Passwords do not match';
      }
    }

    if (formIsValid == false) {
      let data = {
        formErrors: errors,
        formIsValid: formIsValid
      };

      this.handleFormErrors(data);
    } else {
      let data = {
        formErrors: '',
        formIsValid: {}
      };
      this.handleFormErrors(data);
      if (formName === 'Login') {
        this.login(username, userpassword);
      }
      if (formName === 'Register') {
        this.register(username, userpassword);
      }
    }
  };

  // loging request
  login = (username, userpassword) => {
    let { handleErrors } = this.props;
    let data = {
      formErrors: '',
      formIsValid: {}
    };
    handleErrors(data);
    postLogin(username, userpassword)
      .then((resp, err) => {
        let { sendMessage, login } = this.props;
        console.log(resp);
        if (resp === 'Request failed with status code 401') {
          let isNotLoggedIn = {
            userId: '',
            isLoggedIn: false
          };
          login(isNotLoggedIn);
          let data = {
            Notifications: {
              Info: '',
              Warning: '',
              Success: '',
              Error: 'Error',
              Message: 'Username or password is incorrect.'
            }
          };
          sendMessage(data);

          return;
        } else {
          // data sent
          let data = {
            userId: resp.userId,
            isLoggedIn: resp.isLoggedIn
          };
          login(data);
          let Notifications = {
            Notifications: {
              Info: '',
              Warning: '',
              Success: 'Success',
              Error: '',
              Message: 'you have successfully logged in'
            }
          };
          sendMessage(Notifications);
        }
      })
      .then(() => {
        let { isLoggedIn, userId, closeMessageBox } = this.props;
        if (isLoggedIn == undefined && userId == undefined) return;
        console.log(isLoggedIn);
        console.log(userId);
        if (isLoggedIn == true) {
          setTimeout(() => {
            let data = {
              userId: userId,
              isLoggedIn: isLoggedIn
            };
            closeMessageBox(data);
            this.props.history.push(`/profile`);
          }, 1000);
        }
      });
  };

  // register request
  register = (username, userpassword) => {
    postRegister(username, userpassword).then((resp) => {
      console.log(resp);
      let { sendMessage } = this.props;
      if (resp.error === 'registration error') {
        let data = {
          Notifications: {
            Info: '',
            Warning: '',
            Success: '',
            Error: 'Error',
            Message: resp.message
          },
          userId: '',
          isLoggedIn: false
        };
        sendMessage(data);
        return;
      } else {
        let data = {
          Notifications: {
            Info: '',
            Warning: '',
            Success: 'Success',
            Error: '',
            Message: 'User account created successfully'
          },
          userId: resp.userId,
          isLoggedIn: resp.isLoggedIn
        };
        sendMessage(data);
      }
    });
  };

  render() {
    let { formErrors, formIsValid } = this.props;
    let { formName } = this.state;
    return (
      <React.Fragment>
        <div className="background" />
        <div className="container ">
          <div className="row">
            <div className="col-5" style={{ marginTop: '100px' }}>
              {(() => {
                switch (formName) {
                  case 'Login':
                    return (
                      <LoginForm
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        handleFormChange={this.handleFormChange}
                        formErrors={formErrors}
                        formIsValid={formIsValid}
                      />
                    );
                    break;
                  case 'Register':
                    return (
                      <RegisterForm
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        handleFormChange={this.handleFormChange}
                        formErrors={formErrors}
                        formIsValid={formIsValid}
                      />
                    );
                    break;
                  default:
                    break;
                }
              })()}
            </div>
          </div>
        </div>

        <Toast />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    auth: state.auth,
    alerts: state.alerts,
    Notifications: state.alerts.Notifications,
    userId: state.auth.userId,
    isLoggedIn: state.auth.isLoggedIn,
    formErrors: state.auth.formErrors,
    formIsValid: state.auth.formIsValid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // dispatch,
    sendMessage: (data) => {
      dispatch(messages(data));
    },
    login: (data) => {
      dispatch(loginUser(data));
    },
    handleErrors: (data) => {
      dispatch(formValidation(data));
    },
    closeMessageBox: (data) => {
      dispatch(closeMessages(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
