import React, { Component } from 'react';
import postLogin from '../api/postLoginApi';
import { connect } from 'react-redux';
import { Toast } from '../components/notifications';
import {
  loginUser,
  messages,
  logoutUser,
  isAuthenticated,
  _formErrors,
  closeMessages
} from '../redux/actions/actions';

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
    let { username, userpassword } = this.state;
    console.log(username, userpassword);
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
    let { handleErrors, login, dispatch } = this.props;
    console.log(username, userpassword, handleErrors);
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
  };

  // loging request
  login = (username, userpassword) => {
    postLogin(username, userpassword)
      .then((resp, err) => {
        let { sendMessage, login } = this.props;
        console.log(resp);
        if (resp === 'Request failed with status code 401') {
          let data = {
            Notifications: {
              Info: '',
              Warning: '',
              Success: '',
              Error: 'Error',
              Message: 'Username or password is incorrect.'
            },
            userId: '',
            isLoggedIn: false
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
            this.props.history.push(`/protected`);
          }, 1000);
        }
      });
  };

  render() {
    console.log(JSON.stringify(this.props.Notifications));
    let { formErrors, formIsValid } = this.props;
    // console.log(formErrors, formIsValid);
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
    sendMessage: (data) => {
      dispatch(messages(data));
    },
    login: (data) => {
      dispatch(loginUser(data));
    },
    handleErrors: (data) => {
      dispatch(_formErrors(data));
    },
    closeMessageBox: (data) => {
      dispatch(closeMessages(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
