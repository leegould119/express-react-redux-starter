import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeMessages } from '../../redux/actions/actions';
class Toast extends Component {
  closeMessages = () => {
    console.log('clicked');
    let { userId, isLoggedIn, dispatch } = this.props;
    let Messages = {
      Notifications: {
        Info: '',
        Warning: '',
        Success: '',
        Error: '',
        Message: ' '
      },
      userId: userId,
      isLoggedIn: isLoggedIn
    };
    dispatch(closeMessages(Messages));
  };

  render() {
    let { Error, Warning, Success, Info, Message } = this.props;
    return (
      <React.Fragment>
        {Error ? (
          <div className="notifications error">
            <div className="error-icon" />
            <div className="close-btn" onClick={this.closeMessages}>
              &times;
            </div>
            <span className="header">{Error ? Error : ''}</span>
            <span className="message">{Message ? Message : ''}</span>
          </div>
        ) : (
          ''
        )}
        {Warning ? (
          <div className="notifications warning">
            <div className="warning-icon" />
            <div className="close-btn" onClick={this.closeMessages}>
              &times;
            </div>
            <span className="header">{Warning ? Warning : ''}</span>
            <span className="message">{Message ? Message : ''}</span>
          </div>
        ) : (
          ''
        )}
        {Success ? (
          <div className="notifications success">
            <div className="success-icon" />
            <div className="close-btn" onClick={this.closeMessages}>
              &times;
            </div>
            <span className="header">{Success ? Success : ''}</span>
            <span className="message">{Message ? Message : ''}</span>
          </div>
        ) : (
          ''
        )}

        {Info ? (
          <div className="notifications info">
            <div className="info-icon" />
            <div className="close-btn" onClick={this.closeMessages}>
              &times;
            </div>
            <span className="header">{Info ? Info : ''}</span>
            <span className="message">{Message ? Message : ''}</span>
          </div>
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    Info: state.r_auth.Notifications.Info,
    Warning: state.r_auth.Notifications.Warning,
    Success: state.r_auth.Notifications.Success,
    Error: state.r_auth.Notifications.Error,
    Message: state.r_auth.Notifications.Message,
    userId: state.r_auth.userId,
    isLoggedIn: state.r_auth.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(Toast);
