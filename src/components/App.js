import React, { Component } from 'react';
import postLogin from '../api/postLoginApi';
import getLogout from '../api/logoutApi';
import postRegister from '../api/postRegisterApi';
import checkAuth from '../api/checkAuthApi';
let Cookies = require('cookies-js');

import { connect } from 'react-redux';
import {
  loginUser,
  logoutUser,
  userIsLoggedIn
} from '../redux/actions/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: null, isLoggedIn: false };
  }
  componentDidMount = () => {};
  login = () => {
    postLogin().then((resp, err) => {
      let { dispatch } = this.props;
      if (resp == undefined) return;
      dispatch(loginUser(resp));

      console.log(this.props.r_auth);
    });
  };

  logout = () => {
    getLogout().then((resp) => {
      console.log(resp);
      let { dispatch } = this.props;
      dispatch(logoutUser(resp));
    });
  };

  // todo
  register = () => {
    postRegister().then((resp) => {
      console.log(resp);
    });
  };

  isAuthorised = () => {
    let { r_auth, dispatch } = this.props;
    const uid = Object.entries(r_auth).map(([key, value]) => {
      // console.log(key + ' key ' + value + ' value ');
      if (key === 'userId') {
        return value;
      }
    });

    // check the user is logged in
    checkAuth(uid).then((resp) => {
      console.log(resp);
      dispatch(userIsLoggedIn(resp));
    });
  };

  render() {
    return (
      <div>
        <p>starter template</p>
        <button onClick={this.register}>register</button>
        <button onClick={this.login}> login </button>
        <button onClick={this.logout}> logout </button>
        <button onClick={this.isAuthorised}> is auth </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  r_auth: state.r_auth
});
const mapDispatchToProps = (dispatch, props) => ({
  dispatch
});

// const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
