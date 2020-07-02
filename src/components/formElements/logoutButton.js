import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUser } from '../../redux/actions/actions';
class LogoutButton extends Component {
  componentDidUpdate(prevProps) {
    let { isLoggedIn } = this.props;
    if (prevProps.isLoggedIn != isLoggedIn) {
      console.log('not matching');
      this.props.history.push(`/`);
    }
  }
  logout = () => {
    let { logout, isLoggedIn } = this.props;
    // console.log('log out');
    logout(false);
    console.log(isLoggedIn);
  };
  render() {
    return (
      <div
        style={{
          backgroundColor: 'rgba(204, 87, 74, 1)',
          borderRadius: '0px 30px 30px 0px',
          height: '36px',
          display: 'inline-flex',
          paddingTop: '7px 7px 0px 0px',
          marginTop: '-2px',
          verticalAlign: 'middle'
        }}
      >
        <a className="logoutButton" onClick={this.logout} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  //   dispatch,
  return {
    logout: (data) => {
      dispatch(logoutUser(data));
    }
  };
};
LogoutButton = withRouter(LogoutButton);
export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
