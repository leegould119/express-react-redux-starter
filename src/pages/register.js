import React, { Component } from 'react';
import { connect } from 'react-redux';
import postRegister from '../api/postRegisterApi';
import { Toast } from '../components/notifications';
import {
  loginUser,
  messages,
  logoutUser,
  isAuthenticated,
  _formErrors
} from '../redux/actions/actions';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userpassword: '',
      userpasswordverify: '',
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
    let { username, userpassword, userpasswordverify } = this.state;
    let { handleErrors, login, dispatch } = this.props;
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
    if (formIsValid == false) {
      let data = {
        formErrors: errors,
        formIsValid: formIsValid
      };
      handleErrors(data);
    } else {
      this.register(username, userpassword);
    }
  };

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
    return (
      <React.Fragment>
        <div className="background" />
        {/* login */}
        <div className="form">
          <div className="form-header">
            <div className="logo-large" />
            <h2>Register</h2>
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
            <input
              autoComplete="current-password"
              type="password"
              name="userpasswordverify"
              placeholder="Verify password"
              onChange={this.handleChange}
            />
            <label className={formIsValid ? '' : 'errorMessages'}>
              {formErrors['userpasswordverify'] ? (
                <span> {formErrors['userpasswordverify']}</span>
              ) : (
                ''
              )}
            </label>
            <div style={{ width: '120px', margin: 'auto' }}>
              <input type="submit" value="Register" />
            </div>
          </form>
          <a href="/">Login</a>
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
    dispatch,
    sendMessage: (data) => {
      dispatch(messages(data));
    },
    handleErrors: (data) => {
      dispatch(_formErrors(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
