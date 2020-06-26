import React, { Component } from 'react';
import { connect } from 'react-redux';
import { messages } from '../redux/actions/actions';
export default function (ComposedComponent) {
  class Authenticate extends Component {
    componentDidMount = (e) => {
      if (!this.props.isLoggedIn) {
        console.log('you need to login to get this page');
        let { sendMessage } = this.props;
        let data = {
          Notifications: {
            Info: '',
            Warning: '',
            Success: '',
            Error: 'Error',
            Message: 'You need to be loged in to visit this page.'
          },
          userId: '',
          isLoggedIn: false
        };
        sendMessage(data);
        this.props.history.push(`/`);
      } else {
        // console.log('you are logged in');
      }
      e.preventDefault();
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      isLoggedIn: state.auth.isLoggedIn
    };
  }
  function mapDispatchToProps(dispatch, props) {
    return {
      // dispatch,
      sendMessage: (data) => {
        dispatch(messages(data));
      }
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
