import React, { Component } from 'react';
import { connect } from 'react-redux';
class Profile extends Component {
  render() {
    let { userId } = this.props;
    return (
      <React.Fragment>
        <div className="background" />
        <section style={{ position: 'absolute' }}>
          <h1>your profile</h1>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    auth: state.auth,
    Notifications: state.auth.Notifications,
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
      dispatch(_formErrors(data));
    },
    closeMessageBox: (data) => {
      dispatch(closeMessages(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
