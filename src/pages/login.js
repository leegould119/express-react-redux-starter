import React, { Component } from 'react';
import postLogin from '../api/postLoginApi';
import { connect } from 'react-redux';
import { Toast } from '../components/notifications';
import {
  loginUser,
  errorMessages,
  logoutUser,
  userIsLoggedIn,
  _formErrors
} from '../redux/actions/actions';
import { use } from 'passport';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userpassword: '',
      errors: {},
      formIsValid: true
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleValidation();
  };
  handleValidation = () => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    let errors = {};
    let formIsValid = true;

    //Name
    let { username, userpassword } = this.state;
    let { handleErrors } = this.props;
    console.log(username, userpassword);
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

    if (formIsValid == false) {
      let data = {
        formErrors: errors,
        formIsValid: formIsValid
      };
      handleErrors(data);
    } else {
      this.login(username, userpassword);
    }
    // this.setState({ errors: errors, formIsValid: formIsValid }, () => {
    //   console.log(this.state.errors);
    //   console.log(this.state.formIsValid);
    //   if (formIsValid) {
    //     this.login(username, userpassword);
    //   }
    // });
  };

  // loging request
  login = (username, userpassword) => {
    postLogin(username, userpassword)
      .then((resp, err) => {
        let { dispatch, sendErrorMessage, login } = this.props;
        console.log(resp);
        if (resp === 'Request failed with status code 401') {
          sendErrorMessage();
          return;
        } else {
          // data sent
          let data = {
            userId: resp.userId,
            isLoggedIn: resp.isLoggedIn
          };
          login(data);
        }
      })
      .then(() => {
        let { isLoggedIn, userId } = this.props;
        if (isLoggedIn == undefined && userId == undefined) return;
        console.log(isLoggedIn);
        console.log(userId);
      });
  };

  render() {
    console.log(JSON.stringify(this.props.Notifications));
    let { formErrors, formIsValid } = this.props;
    console.log(formErrors, formIsValid);
    return (
      <React.Fragment>
        <div className="background" />
        {/* login */}
        <div className="form">
          <div className="form-header">
            <div className="logo-large" />
            <h2>Login </h2>
          </div>
          <form method="POST" onSubmit={this.handleSubmit}>
            <input
              type="text"
              autoComplete="current-username"
              name="username"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <label className={formIsValid ? '' : 'errorMessages'}>
              {formErrors['username'] ? (
                <span> {formErrors['username']}</span>
              ) : (
                ''
              )}
            </label>

            <input
              autoComplete="current-password"
              type="password"
              name="userpassword"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <label className={formIsValid ? '' : 'errorMessages'}>
              {formErrors['userpassword'] ? (
                <span> {formErrors['userpassword']}</span>
              ) : (
                ''
              )}
            </label>
            <div style={{ width: '120px', margin: 'auto' }}>
              <input type="submit" value="Login" />
            </div>
          </form>
          <a href="/register">Register</a>
        </div>
        <Toast />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps = {}) => {
  return {
    r_auth: state.r_auth,
    Notifications: state.r_auth.Notifications,
    userId: state.r_auth.userId,
    isLoggedIn: state.r_auth.isLoggedIn,
    formErrors: state.r_auth.formErrors,
    formIsValid: state.r_auth.formIsValid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // dispatch,
    sendErrorMessage: () => {
      dispatch(errorMessages());
    },
    login: (data) => {
      dispatch(loginUser(data));
    },
    handleErrors: (data) => {
      dispatch(_formErrors(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
