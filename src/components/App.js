import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import postLogin from '../api/postLoginApi';
import getLogout from '../api/logoutApi';
import postRegister from '../api/postRegisterApi';
import checkAuth from '../api/checkAuthApi';
import Page404 from '../pages/error404';
import Profile from '../pages/profile';
import Authenticate from '../utils/Authenticate';
// redux
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../redux/actions/actions';

// PAGES
import Login from '../pages/login';
import '../sass/main.scss';

class App extends Component {
  login = () => {
    postLogin()
      .then((resp, err) => {
        let { dispatch } = this.props;
        if (resp == undefined) return;
        dispatch(loginUser(resp));

        console.log(this.props.r_auth);
      })
      .then(() => {
        let { isLoggedIn, userId } = this.props;
        console.log(isLoggedIn);
        console.log(userId);
      });
  };

  logout = () => {
    getLogout()
      .then((resp) => {
        console.log(resp);
        let { dispatch } = this.props;
        dispatch(logoutUser(resp));
      })
      .then(() => {
        let { isLoggedIn } = this.props;
        console.log(isLoggedIn);
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
      if (key === 'userId') {
        return value;
      }
    });

    // check the user is logged in
    checkAuth(uid)
      .then((resp) => {
        console.log(resp);
        dispatch(userIsLoggedIn(resp));
      })
      .then(() => {
        let { isLoggedIn } = this.props;
        console.log(isLoggedIn);
      });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/profile" component={Authenticate(Profile)} />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    auth: state.auth,
    userId: state.auth.userId,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  dispatch
});

// const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
